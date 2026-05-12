import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../css/badge.css'

const THEMES = ['light', 'dark', 'black']

const DEFAULTS = {
    theme: 'dark',
    size: 150,
    ranking: '1',
}

const MIN_SIZE = 32
const MAX_SIZE = 600

const Badge = () => {
    const [searchParams] = useSearchParams()

    const badge = sanitizeSlug(searchParams.get('badge'))
    const theme = sanitizeTheme(searchParams.get('theme'))
    const size = sanitizeSize(searchParams.get('size'))

    const year = sanitizeNumeric(searchParams.get('year'))
    const company = sanitizeSlug(searchParams.get('company'))
    const topic = sanitizeSlug(searchParams.get('topic'))
    const ranking = sanitizeNumeric(searchParams.get('ranking')) || DEFAULTS.ranking

    const badgeSrc = useMemo(() => {
        if (!badge) return null

        const params = new URLSearchParams({ badge, theme })

        if (year) params.set('year', year)
        if (company) params.set('company', company)
        if (topic) params.set('topic', topic)
        if (ranking) params.set('ranking', ranking)

        return `/api/badge?${params.toString()}`
    }, [badge, theme, year, company, topic, ranking])

    if (!badgeSrc) return null

    return (
        <img
            src={badgeSrc}
            className="badge"
            alt={`FIAP badge ${badge}`}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            draggable={false}
        />
    )
}

function sanitizeSlug(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
}

function sanitizeNumeric(value) {
    return String(value ?? '')
        .trim()
        .replace(/\D/g, '')
}

function sanitizeTheme(value) {
    const t = sanitizeSlug(value)
    return THEMES.includes(t) ? t : DEFAULTS.theme
}

function sanitizeSize(value) {
    const n = parseInt(value, 10)
    if (isNaN(n)) return DEFAULTS.size
    return Math.min(MAX_SIZE, Math.max(MIN_SIZE, n))
}

export default Badge