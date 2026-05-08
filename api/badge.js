import fs from 'fs'
import path from 'path'

const THEMES = ['light', 'dark', 'black']

const DEFAULT_THEME = 'light'
const DEFAULT_BADGE = '404'

export default async function handler(req, res) {
    try {
        const badge = sanitize(
            req.query.badge || DEFAULT_BADGE
        )

        const requestedTheme = sanitize(
            req.query.theme || DEFAULT_THEME
        )

        const theme = THEMES.includes(requestedTheme)
            ? requestedTheme
            : DEFAULT_THEME

        const svgPath = path.join(
            process.cwd(),
            'public',
            'assets',
            'svg',
            theme,
            `${badge}.svg`
        )

        const fallbackPath = path.join(
            process.cwd(),
            'public',
            'assets',
            'svg',
            DEFAULT_THEME,
            `${DEFAULT_BADGE}.svg`
        )

        const finalPath = fs.existsSync(svgPath)
            ? svgPath
            : fallbackPath

        const svg = fs.readFileSync(
            finalPath,
            'utf8'
        )

        res.setHeader(
            'Content-Type',
            'image/svg+xml'
        )

        res.setHeader(
            'Cache-Control',
            'public, immutable, max-age=31536000'
        )

        return res.status(200).send(svg)

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: 'Failed to render badge'
        })
    }
}

function sanitize(value = '') {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
}