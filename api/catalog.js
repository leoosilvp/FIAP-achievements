import fs from 'fs'
import path from 'path'

const ROOT = path.join(
    process.cwd(),
    'public/assets/certificates'
)

function formatTitle(slug) {
    return slug
        .split('-')
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}

function getDirectories(source) {
    return fs
        .readdirSync(source)
        .filter((name) => {
            return fs.statSync(path.join(source, name)).isDirectory()
        })
}

function getFiles(source) {
    return fs
        .readdirSync(source)
        .filter((file) => {
            return file.endsWith('.svg')
        })
}

function getThemeFiles(basePath) {
    const blackPath = path.join(basePath, 'black')

    if (!fs.existsSync(blackPath)) {
        return []
    }

    return getFiles(blackPath)
}

export default function handler(req, res) {
    try {
        const { type, year, topic } = req.query

        // =========================================================
        // MODO 1 — LISTAGEM AGRUPADA
        // =========================================================

        if (!type && !year && !topic) {
            const catalog = {}

            const types = getDirectories(ROOT)

            for (const currentType of types) {
                catalog[currentType] = {}

                const typePath = path.join(ROOT, currentType)

                const years = getDirectories(typePath)

                for (const currentYear of years) {
                    catalog[currentType][currentYear] = []

                    const yearPath = path.join(typePath, currentYear)

                    const topics = getDirectories(yearPath)

                    for (const currentTopic of topics) {
                        catalog[currentType][currentYear].push({
                            title: formatTitle(currentTopic),
                            slug: currentTopic,
                            type: currentType,
                            year: Number(currentYear),
                        })
                    }

                    catalog[currentType][currentYear].sort((a, b) => {
                        return a.title.localeCompare(b.title)
                    })
                }
            }

            return res.status(200).json({
                success: true,
                mode: 'catalog',
                data: catalog,
            })
        }

        // =========================================================
        // MODO 2 — LISTAGEM DE BADGES
        // =========================================================

        if (!type || !year || !topic) {
            return res.status(400).json({
                success: false,
                message: 'type, year and topic are required',
            })
        }

        const targetPath = path.join(
            ROOT,
            type,
            year,
            topic
        )

        if (!fs.existsSync(targetPath)) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found',
            })
        }

        const files = getThemeFiles(targetPath)

        const badges = files.map((file) => {
            const fileName = file.replace('.svg', '')

            return {
                id: fileName,
                themes: {
                    black: `/assets/certificates/${type}/${year}/${topic}/black/${file}`,
                    dark: `/assets/certificates/${type}/${year}/${topic}/dark/${file}`,
                    light: `/assets/certificates/${type}/${year}/${topic}/light/${file}`,
                },
            }
        })

        return res.status(200).json({
            success: true,
            mode: 'badges',
            data: {
                title: formatTitle(topic),
                slug: topic,
                type,
                year: Number(year),
                total: badges.length,
                badges,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        })
    }
}