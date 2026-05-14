import fs from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'public/assets/certificates')

const THEMES = ['black', 'dark', 'light']

function formatTitle(slug = '') {
    return slug
        .split('-')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function existsDir(p) {
    return fs.existsSync(p) && fs.statSync(p).isDirectory()
}

function getDirectories(source) {
    if (!existsDir(source)) return []
    return fs.readdirSync(source).filter((name) => existsDir(path.join(source, name)))
}

function getSvgFiles(dirPath) {
    if (!fs.existsSync(dirPath)) return []
    return fs.readdirSync(dirPath).filter((f) => f.endsWith('.svg'))
}

function buildDeepBadges({ type, year, topic }) {
    const basePath = path.join(ROOT, type, year, topic)

    if (!existsDir(basePath)) return null

    const referenceTheme = THEMES.find((t) => existsDir(path.join(basePath, t))) ?? null

    if (!referenceTheme) return []

    const files = getSvgFiles(path.join(basePath, referenceTheme))

    return files.map((file) => {
        const id = file.replace('.svg', '')

        return {
            id,
            themes: Object.fromEntries(
                THEMES.map((t) => [
                    t,
                    `/assets/certificates/${type}/${year}/${topic}/${t}/${file}`,
                ])
            ),
        }
    })
}

function buildNanoBadges() {
    const basePath = path.join(ROOT, 'nano')

    if (!existsDir(basePath)) return null

    const referenceTheme = THEMES.find((t) => existsDir(path.join(basePath, t))) ?? null

    if (!referenceTheme) return []

    const files = getSvgFiles(path.join(basePath, referenceTheme))

    return files.map((file) => {
        const id = file.replace('.svg', '')

        return {
            id,
            themes: Object.fromEntries(
                THEMES.map((t) => [t, `/assets/certificates/nano/${t}/${file}`])
            ),
        }
    })
}

function buildCatalog() {
    const catalog = {}
    const types = getDirectories(ROOT)

    for (const currentType of types) {
        if (currentType === 'nano') {
            catalog['nano'] = {}
            continue
        }

        const typePath = path.join(ROOT, currentType)
        catalog[currentType] = {}

        const years = getDirectories(typePath)

        for (const currentYear of years) {
            const yearPath = path.join(typePath, currentYear)
            const topics = getDirectories(yearPath)

            catalog[currentType][currentYear] = topics
                .map((t) => ({
                    title: formatTitle(t),
                    slug: t,
                    type: currentType,
                    year: Number(currentYear),
                }))
                .sort((a, b) => a.title.localeCompare(b.title))
        }
    }

    return catalog
}

export default function handler(req, res) {
    try {
        const { type, year, topic, company } = req.query

        const isCatalogMode = !type && !year && !topic && !company

        if (isCatalogMode) {
            const catalog = buildCatalog()

            return res.status(200).json({
                success: true,
                mode: 'catalog',
                data: catalog,
            })
        }

        if (type === 'nano') {
            const badges = buildNanoBadges()

            if (badges === null) {
                return res.status(404).json({
                    success: false,
                    message: 'Nano badges directory not found',
                })
            }

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

        const finalTopic = topic || company

        if (!type || !year || !finalTopic) {
            return res.status(400).json({
                success: false,
                message: 'type, year and topic/company are required',
            })
        }

        const badges = buildDeepBadges({ type, year, topic: finalTopic })

        if (badges === null) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found',
            })
        }

        return res.status(200).json({
            success: true,
            mode: 'badges',
            data: {
                title: formatTitle(finalTopic),
                slug: finalTopic,
                type,
                year: Number(year),
                total: badges.length,
                badges,
            },
        })
    } catch (error) {
        console.error('[catalog handler]', error)

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error?.message ?? 'unknown error',
        })
    }
}