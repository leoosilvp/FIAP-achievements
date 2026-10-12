// FIAP Achievements — dynamic SVG badge handler.
// Editorial credential system: warm paper, precise Carbon-like hierarchy,
// FIAP accent, larger small text, and one restrained mark per achievement.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const THEMES = ['light', 'dark', 'black', 'carbon', 'pink', 'panda', 'dracula']
const DEFAULT_THEME = 'carbon'
const DEFAULT_RANKING = '1'
const FONT_SANS = "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif"
const FONT_SERIF = "'IBM Plex Serif', Georgia, 'Times New Roman', serif"

const THEME_PALETTE = {
    light: {
        bg: '#f8f7f4', text: '#29251f', muted: '#655f58', accent: '#b54d3d',
        edge: '#c7c3bb', line: '#d1ccc3',
    },
    dark: {
        bg: '#c40847', text: '#fff', muted: '#ffd1e0', accent: '#ffbfd4',
        edge: '#9a0d3c', line: '#9a0d3c',
    },
    black: {
        bg: '#000000', text: '#ffffff', muted: '#f5f5f5', accent: '#ffffff',
        edge: '#555555', line: '#5a5a5a',
    },
    carbon: {
        bg: '#141414', text: '#d9d9d9', muted: '#767676', accent: '#d9d9d9',
        edge: '#555555', line: '#5a5a5a',
    },
    pink: {
        bg: '#ffcbea', text: '#f0249b', muted: '#c75095', accent: '#ff0095',
        edge: '#d68bb7', line: '#e690c2',
    },
    panda: {
        bg: '#33353b', text: '#f8f8f2', muted: '#6fc1ff', accent: '#ff4b82',
        edge: '#61646f', line: '#50525a',
    },
    dracula: {
        bg: '#45475a', text: '#f8f8f2', muted: '#8a97bc', accent: '#ff79c6',
        edge: '#6f7388', line: '#5f6275',
    },
}

// Palette overrides are intentionally allowlisted so query-string values can
// never inject arbitrary SVG/CSS content into the generated badge.
const PALETTE_QUERY_PARAMS = [
    { key: 'bg', names: ['background', 'bg'] },
    { key: 'text', names: ['text_color', 'text'] },
    { key: 'muted', names: ['muted_color', 'muted'] },
    { key: 'accent', names: ['accent_color', 'accent'] },
    { key: 'edge', names: ['edge_color', 'edge'] },
    { key: 'line', names: ['line_color', 'line'] },
]

const NAMED_BADGE_TYPES = {
    challenge: { label: 'Challenge', params: ['year', 'company'] },
    gs: { label: 'Global Solution', params: ['year', 'topic'] },
    ic: { label: 'Scientific Initiation', params: ['year', 'ranking'] },
}

function loadAchievements() {
    const file = path.resolve(__dirname, '../src/utils/achievements.json')
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'))
    } catch {
        return null
    }
}

export default async function handler(req, res) {
    const theme = resolveTheme(req.query)
    try {
        if (req.method !== 'GET') {
            return serveSvg(res, generateErrorSvg(theme), { status: 'method-not-allowed', cache: 'no-store' })
        }

        const badge = sanitizeSlug(req.query?.badge)
        if (!badge) {
            console.warn('[badge-api] Parâmetro "badge" ausente')
            return serveSvg(res, generateErrorSvg(theme), { status: 'bad-request', cache: 'no-store' })
        }

        if (isNumericId(badge)) return handleNano(res, { id: badge, theme })
        return handleNamedType(res, badge, req.query ?? {}, theme)
    } catch (error) {
        console.error('[badge-api] Erro inesperado:', error)
        return serveSvg(res, generateErrorSvg(theme), { status: 'internal-error', cache: 'no-store' })
    }
}

function handleNano(res, { id, theme }) {
    const data = loadAchievements()
    if (!data) {
        console.warn('[badge-api] achievements.json não encontrado')
        return serveSvg(res, generateErrorSvg(theme), { status: 'not-found', cache: 'short' })
    }

    const courses = data.Achievements?.['Nano Courses'] ?? {}
    const entry = Object.values(courses).find((item) => String(item.id) === String(id))
    if (!entry) {
        console.warn(`[badge-api] Nano course não encontrado: id=${id}`)
        return serveSvg(res, generateErrorSvg(theme), { status: 'not-found', cache: 'short' })
    }

    return serveSvg(res, generateNanoSvg({ name: entry.name_en, hours: entry.hours, theme }), {
        status: 'ok', cache: 'immutable',
    })
}

function handleNamedType(res, badge, query, theme) {
    const type = NAMED_BADGE_TYPES[badge]
    if (!type) {
        console.warn(`[badge-api] Tipo desconhecido: "${badge}"`)
        return serveSvg(res, generateErrorSvg(theme), { status: 'bad-request', cache: 'no-store' })
    }

    const params = parseParams(query, theme)
    const validation = validate(type, params)
    if (!validation.ok) {
        console.warn(`[badge-api] Parâmetros inválidos: ${validation.message}`)
        return serveSvg(res, generateErrorSvg(theme), { status: 'bad-request', cache: 'no-store' })
    }

    const data = loadAchievements()
    if (!data) return serveSvg(res, generateErrorSvg(theme), { status: 'not-found', cache: 'short' })
    if (badge === 'challenge') return handleChallenge(res, params, data, theme)
    if (badge === 'gs') return handleGlobalSolution(res, params, data, theme)
    if (badge === 'ic') return handleIC(res, params, data, theme)
    return serveSvg(res, generateErrorSvg(theme), { status: 'bad-request', cache: 'no-store' })
}

function handleChallenge(res, params, data, theme) {
    const { year, company, ranking } = params
    const entries = data.Achievements?.Challenges?.[year] ?? []
    const normalized = company.toLowerCase().replace(/-/g, ' ')
    const match = entries.find((item) => item.toLowerCase() === normalized)
        ?? entries.find((item) => slugify(item) === company)
    if (!match) {
        console.warn(`[badge-api] Challenge não encontrado: ${year}/${company}`)
        return serveSvg(res, generateErrorSvg(theme), { status: 'not-found', cache: 'short' })
    }

    return serveSvg(res, generateChallengeSvg({ name: match, year, ranking, theme }), {
        status: 'ok', cache: 'immutable',
    })
}

function handleGlobalSolution(res, params, data, theme) {
    const { year, topic } = params
    const entries = data.Achievements?.['Global Solutions']?.[year] ?? []
    const normalized = topic.toLowerCase().replace(/-/g, ' ')
    const match = entries.find((item) => item.toLowerCase() === normalized)
        ?? entries.find((item) => slugify(item) === topic)
    if (!match) {
        console.warn(`[badge-api] GS não encontrado: ${year}/${topic}`)
        return serveSvg(res, generateErrorSvg(theme), { status: 'not-found', cache: 'short' })
    }

    return serveSvg(res, generateGSSvg({ name: match, year, theme }), {
        status: 'ok', cache: 'immutable',
    })
}

function handleIC(res, params, data, theme) {
    const { year, ranking } = params
    const project = data.Achievements?.['I.C']?.[year]?.[ranking]
    if (!project) {
        console.warn(`[badge-api] I.C não encontrado: ${year}/${ranking}`)
        return serveSvg(res, generateErrorSvg(theme), { status: 'not-found', cache: 'short' })
    }

    return serveSvg(res, generateICSvg({ name: project, year, ranking, theme }), {
        status: 'ok', cache: 'immutable',
    })
}

// The selected editorial layout is shared across categories. Their top-right
// identifier and small lower-left credential mark provide subtle distinction.
function generateNanoSvg({ name, hours, theme }) {
    const courseName = name || 'Nano Course'
    const hoursLabel = hours ? `${String(hours).padStart(2, '0')} HOURS` : 'NANO COURSE'
    return renderCredential({
        theme,
        title: courseName,
        eyebrow: 'CERTIFICATE OF COMPLETION',
        headerLabel: 'NANO COURSES',
        headerDetail: hoursLabel,
        footer: `FIAP  |  Nano Courses${hours ? ` · ${hours}h` : ''}`,
        mark: nanoMark(palette(theme)),
        description: `FIAP Nano Course: ${courseName}${hours ? `, ${hours} horas` : ''}`,
    })
}

function generateChallengeSvg({ name, year, ranking, theme }) {
    const rank = ordinalLabel(ranking)
    return renderCredential({
        theme,
        title: name,
        eyebrow: 'CERTIFICATE OF VICTORY',
        headerLabel: 'CHALLENGE',
        headerDetail: `${year}  ·  ${rank.toUpperCase()} PLACE`,
        footer: `FIAP  |  Challenge · ${year} · ${rank} place`,
        mark: challengeMark(palette(theme), ranking),
        description: `FIAP Challenge ${year}, ${rank} place: ${name}`,
    })
}

function generateGSSvg({ name, year, theme }) {
    return renderCredential({
        theme,
        title: name,
        eyebrow: 'CERTIFICATE OF ACHIEVEMENT',
        headerLabel: 'GLOBAL SOLUTION',
        headerDetail: String(year),
        footer: `FIAP  |  Global Solution · ${year}`,
        mark: globeMark(palette(theme)),
        description: `FIAP Global Solution ${year}: ${name}`,
    })
}

function generateICSvg({ name, year, ranking, theme }) {
    const rank = ordinalLabel(ranking)
    return renderCredential({
        theme,
        title: name,
        eyebrow: 'CERTIFICATE OF RECOGNITION',
        headerLabel: 'SCIENTIFIC INITIATION',
        headerDetail: `${year}  ·  ${rank.toUpperCase()}`,
        footer: `FIAP  |  Scientific Initiation · ${year} · ${rank} place`,
        mark: innovationMark(palette(theme)),
        description: `FIAP Scientific Initiation ${year}, ${rank} place: ${name}`,
    })
}

function renderCredential({ theme, title, eyebrow, headerLabel, headerDetail, footer, mark, description }) {
    const p = palette(theme)
    const titleMarkup = fitTitle(title, p)
    const body = `
    ${issuerAndHeader(p, headerLabel, headerDetail)}
    <line x1="30" y1="94" x2="470" y2="94" stroke="${p.line}" stroke-width="1"/>
    <line x1="30" y1="94" x2="87" y2="94" stroke="${p.accent}" stroke-width="2.5"/>
    ${mark}
    <text x="30" y="240" font-family="${FONT_SANS}" font-size="17.2" font-weight="600" letter-spacing="1.15" fill="${p.text}">${escapeXml(eyebrow)}</text>
    ${titleMarkup}
    <line x1="30" y1="431" x2="470" y2="431" stroke="${p.line}" stroke-width="1"/>
    <text x="30" y="470" font-family="${FONT_SANS}" font-size="19.2" font-weight="400" fill="${p.muted}">${escapeXml(footer)}</text>
  `

    return svgDocument({ theme, title: `${title} | FIAP`, description, body })
}

function issuerAndHeader(p, label, detail) {
    return `<text x="30" y="59" font-family="${FONT_SANS}" font-size="37" font-weight="300" letter-spacing="2.6" fill="${p.text}">FIAP</text>
  <text x="470" y="37" text-anchor="end" font-family="${FONT_SANS}" font-size="14.5" font-weight="600" letter-spacing="1.1" fill="${p.muted}">${escapeXml(label)}</text>
  <text x="470" y="60" text-anchor="end" font-family="${FONT_SANS}" font-size="17.2" font-weight="500" letter-spacing="0.2" fill="${p.muted}">${escapeXml(detail)}</text>`
}

function fitTitle(text, p) {
    const box = { x: 30, labelBaseline: 240, width: 438 }
    let size = 44
    let lines = []
    while (size >= 32) {
        const maxChars = Math.max(12, Math.floor(box.width / (size * 0.49)))
        lines = wrapText(text, maxChars)
        if (lines.length <= 3) break
        size -= 1
    }
    if (lines.length > 3) lines = [...lines.slice(0, 2), lines.slice(2).join(' ')]
    const lineHeight = Math.round(size * 1.12)
    const firstBaseline = Math.round(box.labelBaseline + size + 12)

    return lines.map((line, index) => `<text x="${box.x}" y="${firstBaseline + index * lineHeight}" font-family="${FONT_SERIF}" font-size="${size}" font-weight="400" letter-spacing="-0.55" fill="${p.text}">${escapeXml(line)}</text>`).join('\n')
}

function nanoMark(p) {
    return `<g transform="translate(-6.84 -17.4) scale(1.12)" fill="none" stroke="${p.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="57" cy="145" r="21"/>
    <path d="M48 145 L55 152 L68 137"/>
  </g>`
}

function challengeMark(p, ranking) {
    return `<g transform="translate(-6.84 -17.04) scale(1.12)" fill="none" stroke="${p.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="57" cy="142" r="21"/>
    <path d="M48 159 L46 169 L57 163 L68 169 L66 159"/>
    <text x="57" y="148" text-anchor="middle" font-family="${FONT_SANS}" font-size="16" font-weight="500" fill="${p.text}" stroke="none">${escapeXml(ranking)}</text>
  </g>`
}

function globeMark(p) {
    return `<g transform="translate(-6.84 -17.4) scale(1.12)" fill="none" stroke="${p.accent}" stroke-linecap="round">
    <circle cx="57" cy="145" r="21" stroke-width="1.6"/>
    <ellipse cx="57" cy="145" rx="9" ry="21" stroke-width="1.2"/>
    <path d="M36 145 H78 M41 136 C50 140 64 140 73 136 M41 154 C50 150 64 150 73 154" stroke-width="1.2"/>
  </g>`
}

function innovationMark(p) {
    return `<g transform="translate(-6.84 -17.04) scale(1.12)" fill="none" stroke="${p.accent}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M57 121 L77 133 V157 L57 169 L37 157 V133 Z"/>
    <text x="57" y="149" text-anchor="middle" font-family="${FONT_SANS}" font-size="13.5" font-weight="600" fill="${p.text}" stroke="none">I.C</text>
  </g>`
}

function svgDocument({ theme, title, description, body }) {
    const p = palette(theme)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500" role="img" aria-labelledby="badge-title badge-description">
  <title id="badge-title">${escapeXml(title)}</title>
  <desc id="badge-description">${escapeXml(description)}</desc>
  <rect width="500" height="500" fill="${p.bg}"/>
  <rect x="1" y="1" width="498" height="498" fill="none" stroke="${p.edge}" stroke-width="1.2"/>
  <g transform="translate(-10 -10) scale(1.04)">
  ${body}
  </g>
</svg>`
}

function wrapText(text, maxChars) {
    const words = String(text ?? '').trim().split(/\s+/).filter(Boolean)
    const lines = []
    let line = ''
    for (const word of words) {
        const next = line ? `${line} ${word}` : word
        if (next.length > maxChars && line) {
            lines.push(line)
            line = word
        } else {
            line = next
        }
    }
    if (line) lines.push(line)
    return lines.length ? lines : ['']
}

function generateErrorSvg(theme) {
    const p = palette(theme)
    return svgDocument({
        theme,
        title: 'Badge não encontrada',
        description: 'Verifique os parâmetros informados',
        body: `<text x="250" y="238" text-anchor="middle" font-family="${FONT_SANS}" font-size="18" font-weight="600" fill="${p.text}">Badge não encontrada</text>
      <text x="250" y="268" text-anchor="middle" font-family="${FONT_SANS}" font-size="15" fill="${p.muted}">Verifique os parâmetros informados</text>`,
    })
}

const CACHE_POLICIES = {
    immutable: 'public, immutable, max-age=31536000',
    short: 'public, max-age=60',
    'no-store': 'no-store',
}

function serveSvg(res, svg, { status, cache }) {
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Cache-Control', CACHE_POLICIES[cache] ?? CACHE_POLICIES['no-store'])
    res.setHeader('X-Badge-Status', status)
    return res.status(200).send(svg)
}

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

function validate(type, params) {
    for (const param of type.params) {
        if (!params[param]) return { ok: false, message: `Parâmetro obrigatório ausente para ${type.label}: "${param}"` }
    }
    return { ok: true }
}

function palette(theme) {
    const themeName = typeof theme === 'string' ? theme : theme?.name
    const base = THEME_PALETTE[themeName] ?? THEME_PALETTE[DEFAULT_THEME]
    const overrides = typeof theme === 'object' && theme !== null ? theme.overrides : null
    return { ...base, ...(overrides ?? {}) }
}

function resolveTheme(query = {}) {
    const name = sanitizeTheme(query?.theme)
    const overrides = parsePaletteOverrides(query)
    return {
        name,
        overrides,
        hasOverrides: Object.keys(overrides).length > 0,
    }
}

function parsePaletteOverrides(query = {}) {
    const overrides = {}

    for (const { key, names } of PALETTE_QUERY_PARAMS) {
        for (const name of names) {
            const color = sanitizeColor(query?.[name])
            if (color) {
                overrides[key] = color
                break
            }
        }
    }

    return overrides
}

function sanitizeColor(value) {
    if (Array.isArray(value)) return ''

    const raw = String(value ?? '').trim()
    if (!raw) return ''

    // Accept both URL-friendly "29251f" and the conventional "#29251f".
    const color = raw.startsWith('#') ? raw : `#${raw}`
    return /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(color)
        ? color.toLowerCase()
        : ''
}

function sanitizeSlug(value) {
    return String(value ?? '').trim().toLowerCase().replace(/[^a-z0-9-_]/g, '')
}

function sanitizeNumeric(value) {
    return String(value ?? '').trim().replace(/\D/g, '')
}

function sanitizeTheme(value) {
    const theme = sanitizeSlug(value)
    return THEMES.includes(theme) ? theme : DEFAULT_THEME
}

function isNumericId(value) {
    return /^\d+$/.test(value)
}

function slugify(value) {
    return String(value ?? '').toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}

function ordinalLabel(value) {
    const number = Number(value)
    if (!Number.isSafeInteger(number) || number < 0) return String(value)
    const lastTwo = number % 100
    const suffix = lastTwo >= 11 && lastTwo <= 13
        ? 'th'
        : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] ?? 'th')
    return `${number}${suffix}`
}

function escapeXml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}
