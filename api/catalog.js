// - FIAP achievements — catalog handler (JSON-driven) -------- @leoosilvp
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const THEMES = ['black', 'dark', 'light', 'carbon', 'pink', 'panda', 'dracula']

// - Carrega achievements.json ---------------------------------------------

function loadAchievements() {
    const p = path.resolve(__dirname, '../src/utils/achievements.json')
    try {
        return JSON.parse(fs.readFileSync(p, 'utf8'))
    } catch (err) {
        console.error('[catalog-api] Falha ao ler achievements.json:', err.message)
        return null
    }
}

// - Helpers ---------------------------------------------------------------

/**
 * Monta a URL da badge dinâmica no padrão já usado pelos consumers:
 *   /api/badge?badge=<type>&...&theme=<theme>
 * Para Nano Courses, usa o id numérico diretamente.
 */
function badgeUrl(params) {
    const q = new URLSearchParams(params)
    return `/api/badge?${q.toString()}`
}

/**
 * Gera o objeto de temas { black, dark, light } com a URL da badge.
 */
function themeUrls(params) {
    return Object.fromEntries(
        THEMES.map((t) => [t, badgeUrl({ ...params, theme: t })])
    )
}

function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
}

// - Builder de catálogo ---------------------------------------------------

/**
 * Monta o catálogo no mesmo formato retornado anteriormente:
 * {
 *   nano: {},
 *   challenge: { 2026: [...topics], 2025: [...topics] },
 *   gs: { 2026: [...topics] },
 *   ic: { 2025: [...topics] }
 * }
 */
function buildCatalog(data) {
    const ach = data.Achievements
    const catalog = {}

    // - Nano Courses
    catalog['nano'] = {}

    // - Challenges
    const challenges = ach['Challenges'] ?? {}
    catalog['challenge'] = {}
    for (const [year, companies] of Object.entries(challenges)) {
        catalog['challenge'][year] = companies
            .map((c) => ({
                title: c,
                slug: slugify(c),
                type: 'challenge',
                year: Number(year),
            }))
            .sort((a, b) => a.title.localeCompare(b.title))
    }

    // - Global Solutions
    const gs = ach['Global Solutions'] ?? {}
    catalog['gs'] = {}
    for (const [year, topics] of Object.entries(gs)) {
        catalog['gs'][year] = topics
            .map((t) => ({
                title: t,
                slug: slugify(t),
                type: 'gs',
                year: Number(year),
            }))
            .sort((a, b) => a.title.localeCompare(b.title))
    }

    // - I.C
    const ic = ach['I.C'] ?? {}
    catalog['ic'] = {}
    for (const [year, rankings] of Object.entries(ic)) {
        catalog['ic'][year] = Object.entries(rankings)
            .map(([ranking, projectName]) => ({
                title: projectName,
                slug: ranking,
                type: 'ic',
                year: Number(year),
                ranking,
            }))
            .sort((a, b) => Number(a.ranking) - Number(b.ranking))
    }

    return catalog
}

/**
 * Constrói as badges de Nano Courses com URLs dinâmicas.
 */
function buildNanoBadges(data) {
    const nano = data.Achievements?.['Nano Courses'] ?? {}

    return Object.values(nano).map((entry) => ({
        id: String(entry.id),
        name: entry.name_en,
        hours: entry.hours ?? null,
        themes: themeUrls({ badge: entry.id }),
    }))
}

/**
 * Constrói as badges de Challenge para um ano/company específico.
 */
function buildChallengeBadges(data, year, company) {
    const challenges = data.Achievements?.['Challenges'] ?? {}
    const yearList = challenges[year] ?? []

    const match = yearList.find(
        (c) => slugify(c) === company || c.toLowerCase() === company.replace(/-/g, ' ')
    )

    if (!match) return null

    // Challenges podem ter múltiplos rankings (1, 2, 3)
    // Retornamos todos os rankings disponíveis
    const rankings = ['1', '2', '3']
    return {
        title: match,
        slug: slugify(match),
        type: 'challenge',
        year: Number(year),
        total: rankings.length,
        badges: rankings.map((ranking) => ({
            id: ranking,
            themes: themeUrls({ badge: 'challenge', year, company, ranking }),
        })),
    }
}

/**
 * Constrói as badges de Global Solution para um ano/topic.
 */
function buildGSBadges(data, year, topic) {
    const gs = data.Achievements?.['Global Solutions'] ?? {}
    const yearList = gs[year] ?? []

    const match = yearList.find(
        (t) => slugify(t) === topic || t.toLowerCase() === topic.replace(/-/g, ' ')
    )

    if (!match) return null

    return {
        title: match,
        slug: slugify(match),
        type: 'gs',
        year: Number(year),
        total: 1,
        badges: [
            {
                id: '1',
                themes: themeUrls({ badge: 'gs', year, topic }),
            },
        ],
    }
}

/**
 * Constrói as badges de I.C para um ano.
 */
function buildICBadges(data, year) {
    const ic = data.Achievements?.['I.C'] ?? {}
    const yearMap = ic[year]

    if (!yearMap) return null

    const badges = Object.entries(yearMap).map(([ranking, name]) => ({
        id: ranking,
        name,
        themes: themeUrls({ badge: 'ic', year, ranking }),
    }))

    return {
        title: 'Innovation Championship',
        slug: 'ic',
        type: 'ic',
        year: Number(year),
        total: badges.length,
        badges,
    }
}

// - Handler principal -----------------------------------------------------

export default function handler(req, res) {
    try {
        const data = loadAchievements()

        if (!data) {
            return res.status(503).json({
                success: false,
                message: 'achievements.json unavailable',
            })
        }

        const { type, year, topic, company } = req.query
        const isCatalogMode = !type && !year && !topic && !company

        // - Modo catálogo: retorna estrutura completa
        if (isCatalogMode) {
            return res.status(200).json({
                success: true,
                mode: 'catalog',
                data: buildCatalog(data),
            })
        }

        // - Nano Courses
        if (type === 'nano') {
            const badges = buildNanoBadges(data)
            return res.status(200).json({
                success: true,
                mode: 'badges',
                data: {
                    title: 'Nano Courses',
                    slug: 'nano',
                    type: 'nano',
                    year: null,
                    total: badges.length,
                    badges,
                },
            })
        }

        // - I.C
        if (type === 'ic') {
            if (!year) {
                return res.status(400).json({
                    success: false,
                    message: 'year is required for type=ic',
                })
            }

            const result = buildICBadges(data, year)
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: `I.C data not found for year ${year}`,
                })
            }

            return res.status(200).json({ success: true, mode: 'badges', data: result })
        }

        // - Challenge
        if (type === 'challenge') {
            const finalCompany = company ?? topic

            if (!year || !finalCompany) {
                return res.status(400).json({
                    success: false,
                    message: 'year and company are required for type=challenge',
                })
            }

            const result = buildChallengeBadges(data, year, finalCompany)
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: `Challenge not found: ${year}/${finalCompany}`,
                })
            }

            return res.status(200).json({ success: true, mode: 'badges', data: result })
        }

        // - Global Solution
        if (type === 'gs') {
            const finalTopic = topic ?? company

            if (!year || !finalTopic) {
                return res.status(400).json({
                    success: false,
                    message: 'year and topic are required for type=gs',
                })
            }

            const result = buildGSBadges(data, year, finalTopic)
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: `Global Solution not found: ${year}/${finalTopic}`,
                })
            }

            return res.status(200).json({ success: true, mode: 'badges', data: result })
        }

        // - Tipo desconhecido
        return res.status(400).json({
            success: false,
            message: `Unknown type: "${type}"`,
        })

    } catch (error) {
        console.error('[catalog-api]', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error?.message ?? 'unknown error',
        })
    }
}   