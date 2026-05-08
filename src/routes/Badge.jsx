import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import '../css/badge.css'

const THEMES = ['light', 'dark', 'black']

const DEFAULT_THEME = 'light'
const DEFAULT_SIZE = 150
const FALLBACK_BADGE = '404'

const Badge = () => {
    const [searchParams] = useSearchParams()

    const badge = sanitize(
        searchParams.get('badge') || FALLBACK_BADGE
    )

    const requestedTheme = sanitize(
        searchParams.get('theme') || DEFAULT_THEME
    )

    const theme = THEMES.includes(requestedTheme)
        ? requestedTheme
        : DEFAULT_THEME

    const size = Math.max(
        32,
        Number(searchParams.get('size')) || DEFAULT_SIZE
    )

    const badgeSrc = useMemo(() => {
        return `/api/badge?badge=${badge}&theme=${theme}`
    }, [badge, theme])

    return (
        <img
            src={badgeSrc}
            className="badge"
            alt={`${badge} badge`}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={(e) => {
                e.currentTarget.src =
                    `/api/badge?badge=${FALLBACK_BADGE}&theme=${DEFAULT_THEME}`
            }}
        />
    )
}

function sanitize(value = '') {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
}

export default Badge