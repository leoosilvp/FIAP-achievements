import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../css/badge.css'

const THEMES = ['light', 'dark']
const DEFAULT_THEME = 'light'
const DEFAULT_SIZE = 150
const FALLBACK_BADGE = '404'

const Badge = () => {
    const [searchParams] = useSearchParams()

    const badge = searchParams.get('badge') || FALLBACK_BADGE
    const theme = THEMES.includes(searchParams.get('theme'))
        ? searchParams.get('theme')
        : DEFAULT_THEME

    const size = Number(searchParams.get('size')) || DEFAULT_SIZE

    const badgeSrc = useMemo(() => {
        return `/src/assets/svg/${theme}/${badge}.svg`
    }, [badge, theme])

    return (
        <main className='badge-main'>
            <img
                src={badgeSrc}
                className='badge'
                width={size}
                height={size}
                loading="lazy"
                draggable={false}
                onError={(e) => {
                    e.currentTarget.src = `/assets/svg/${DEFAULT_THEME}/${FALLBACK_BADGE}.svg`
                }}
            />
        </main>
    )
}

export default Badge