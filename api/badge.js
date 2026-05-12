// - FIAP achievements --------------- @leoosilvp
import fs from 'fs'
import path from 'path'


const THEMES = ['light', 'dark', 'black']
const DEFAULT_THEME = 'dark'

/**
 * Tipos nomeados de badge — ativados quando badge=challenge ou badge=gs.
 * Quando o valor de badge for numérico, o roteamento vai direto para os Nano Courses.
 */
const NAMED_BADGE_TYPES = {
    challenge: {
        label: 'Challenge',
        params: ['year', 'company', 'ranking'],
        resolver: ({ year, company, ranking, theme }) =>
            path.join('challenge', year, company, theme, `${ranking}.svg`),
    },

    gs: {
        label: 'Global Solution',
        params: ['year', 'topic'],
        resolver: ({ year, topic, theme }) =>
            path.join('gs', year, topic, theme, `${DEFAULT_RANKING}.svg`),
    },
}

const DEFAULT_RANKING = '1'

/** Diretório raiz onde todos os SVGs de certificado estão armazenados. */
const CERT_BASE = path.join(process.cwd(), 'public', 'assets', 'certificates')

// - Handler Principal -------------------
export default async function handler(req, res) {

    // Tema é extraído aqui para poder ser utilizado no fallback de erro,
    // mesmo que a requisição falhe antes da validação completa.
    const theme = sanitizeTheme(req.query.theme)

    try {
        if (req.method !== 'GET') {
            return serveSvg(res, errorSvgPath(theme), {
                status: 'method-not-allowed',
                cache: 'no-store',
            })
        }

        const rawBadge = sanitizeSlug(req.query.badge)

        if (!rawBadge) {
            console.warn('[badge-api] Parâmetro "badge" ausente na requisição')
            return serveSvg(res, errorSvgPath(theme), {
                status: 'bad-request',
                cache: 'no-store',
            })
        }

        // Roteamento principal:
        //   - badge numérico (ex: 294870) → Nano Course direto pelo ID
        //   - badge nomeado (ex: challenge, gs) → tipo específico com parâmetros próprios
        if (isNumericId(rawBadge)) {
            return handleNano(res, { id: rawBadge, theme })
        }

        return handleNamedType(res, rawBadge, req.query, theme)

    } catch (err) {
        // Qualquer erro inesperado também retorna o SVG de erro — nunca uma página de erro HTTP.
        console.error('[badge-api] Erro inesperado:', err)
        return serveSvg(res, errorSvgPath(theme), {
            status: 'internal-error',
            cache: 'no-store',
        })
    }
}

// - Roteadores -------------------------

/**
 * Rota direta para Nano Course.
 * Ativada quando badge= recebe um valor numérico (o ID do curso).
 * Ex.: /api/badge?badge=294870&theme=dark
 */
function handleNano(res, { id, theme }) {
    const absolutePath = path.join(CERT_BASE, 'nano', theme, `${id}.svg`)
    return serveResolved(res, absolutePath, theme)
}

/**
 * Rota para tipos nomeados (challenge, gs).
 * Valida os parâmetros específicos do tipo antes de resolver o caminho.
 * Ex.: /api/badge?badge=challenge&year=2025&company=jovi&ranking=1&theme=dark
 */
function handleNamedType(res, badge, query, theme) {
    const type = NAMED_BADGE_TYPES[badge]

    if (!type) {
        console.warn(`[badge-api] Tipo de badge desconhecido: "${badge}"`)
        return serveSvg(res, errorSvgPath(theme), {
            status: 'bad-request',
            cache: 'no-store',
        })
    }

    // 1. Parseia e normaliza todos os parâmetros da query
    const params = parseParams(query, theme)

    // 2. Valida os parâmetros obrigatórios para o tipo de badge solicitado
    const validation = validate(type, params)
    if (!validation.ok) {
        console.warn(`[badge-api] Requisição inválida: ${validation.message}`)
        return serveSvg(res, errorSvgPath(theme), {
            status: 'bad-request',
            cache: 'no-store',
        })
    }

    // 3. Resolve o caminho do SVG no sistema de arquivos
    const absolutePath = path.join(CERT_BASE, type.resolver(params))
    return serveResolved(res, absolutePath, theme)
}

/**
 * Serve o SVG encontrado ou o SVG de erro temático como fallback.
 */
function serveResolved(res, absolutePath, theme) {
    if (fs.existsSync(absolutePath)) {
        return serveSvg(res, absolutePath, {
            status: 'ok',
            cache: 'immutable',
        })
    }

    console.warn(`[badge-api] Badge não encontrada: ${absolutePath}`)
    return serveSvg(res, errorSvgPath(theme), {
        status: 'not-found',
        cache: 'short',
    })
}

// - Servir SVG ---------------------

/**
 * Política de cache utilizada em cada cenário:
 *
 *   immutable  → badge encontrada com sucesso: cache de 1 ano na CDN
 *   short      → badge não encontrada: cache curto (60s) pois pode ser adicionada em breve
 *   no-store   → erro de requisição ou erro interno: não armazena em cache
 */
const CACHE_POLICIES = {
    immutable: 'public, immutable, max-age=31536000',
    short: 'public, max-age=60',
    'no-store': 'no-store',
}

/**
 * Lê e envia um arquivo SVG como resposta.
 * Sempre retorna HTTP 200 com Content-Type image/svg+xml —
 * independentemente do que ocorreu internamente.
 *
 * @param {object} res            - Objeto de resposta do servidor
 * @param {string} filePath       - Caminho absoluto do SVG a ser servido
 * @param {object} options
 * @param {string} options.status - Rótulo interno do estado (usado no header X-Badge-Status)
 * @param {string} options.cache  - Chave da política de cache (ver CACHE_POLICIES)
 */
function serveSvg(res, filePath, { status, cache }) {
    try {
        const svg = fs.readFileSync(filePath, 'utf8')

        res.setHeader('Content-Type', 'image/svg+xml')
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('Cache-Control', CACHE_POLICIES[cache] ?? CACHE_POLICIES['no-store'])
        res.setHeader('X-Badge-Status', status)

        return res.status(200).send(svg)

    } catch (readErr) {
        // Último recurso: se nem o SVG de erro pôde ser lido, retorna uma resposta SVG inline
        // para garantir que o cliente nunca receba uma página de erro HTML.
        console.error('[badge-api] Falha ao ler SVG de erro:', readErr)
        return res.status(200)
            .setHeader('Content-Type', 'image/svg+xml')
            .send(INLINE_ERROR_SVG)
    }
}

// - Parsear Parâmetros ------------------

/**
 * Normaliza e sanitiza todos os parâmetros recebidos na query string.
 * O tema já foi extraído antes do bloco try/catch para uso no fallback de erro.
 */
function parseParams(query, theme) {
    return {
        badge: sanitizeSlug(query.badge),
        theme,
        year: sanitizeNumeric(query.year),
        company: sanitizeSlug(query.company),
        topic: sanitizeSlug(query.topic),
        ranking: sanitizeNumeric(query.ranking) || DEFAULT_RANKING,
    }
}

// - Validação ---------------------

/**
 * Valida os parâmetros obrigatórios conforme o tipo de badge solicitado.
 * Retorna { ok: true } em caso de sucesso ou { ok: false, message } em caso de falha.
 */
function validate(type, params) {
    for (const param of type.params) {
        if (!params[param]) {
            return fail(`Parâmetro obrigatório ausente para ${type.label}: "${param}"`)
        }
    }

    return { ok: true }
}

// - Resolução do Fallback de Erro ---------------

/**
 * Retorna o caminho absoluto do SVG de erro correspondente ao tema solicitado.
 * Ex.: theme=dark → .../certificates/error-dark.svg
 */
function errorSvgPath(theme) {
    return path.join(CERT_BASE, `error-${theme}.svg`)
}

/**
 * SVG de erro embutido no código — utilizado apenas como último recurso,
 * caso os arquivos error-{theme}.svg também não possam ser lidos do disco.
 * Garante que a resposta nunca quebre a tag <img> no cliente.
 */
const INLINE_ERROR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="16" fill="#1a1a1a"/>
  <text x="100" y="108" font-family="sans-serif" font-size="13" fill="#888" text-anchor="middle">badge não encontrada</text>
</svg>`

// - Sanitizadores --------------------

/**
 * Sanitiza slugs: permite apenas letras minúsculas, dígitos, hifens e underscores.
 * Elimina qualquer tentativa de path traversal (ex: "../../../etc/passwd").
 */
function sanitizeSlug(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
}

/**
 * Sanitiza valores numéricos (ano, ranking): permite apenas dígitos.
 */
function sanitizeNumeric(value) {
    return String(value ?? '')
        .trim()
        .replace(/\D/g, '')
}

/**
 * Sanitiza e valida o tema.
 * Se o valor recebido não estiver na lista de temas permitidos, retorna o tema padrão.
 */
function sanitizeTheme(value) {
    const t = sanitizeSlug(value)
    return THEMES.includes(t) ? t : DEFAULT_THEME
}

// - Utilitários ---------------------

/**
 * Verifica se o valor é um ID numérico puro — indica roteamento para Nano Course.
 */
function isNumericId(value) {
    return /^\d+$/.test(value)
}

function fail(message) {
    return { ok: false, message }
}