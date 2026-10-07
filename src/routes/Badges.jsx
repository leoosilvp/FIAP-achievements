import '../css/badge.css'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { Loader, AlertTriangle, Copy, Check } from '@geist-ui/icons'
import Header from '../components/Header'
import Footer from '../components/Footer'

const BASE_URL = 'https://fiap-achievements.vercel.app/api/badge'

function buildBadgeUrl({ type, year, company, topic, badgeId, theme }) {
  const params = new URLSearchParams({ theme })

  switch (type) {
    case 'nano':
      params.set('badge', badgeId)
      break

    case 'gs':
      params.set('badge', 'gs')
      params.set('year', year)
      params.set('topic', topic)
      break

    case 'challenge':
      params.set('badge', 'challenge')
      params.set('year', year)
      params.set('company', company)
      params.set('ranking', badgeId)
      break

    default:
      return ''
  }

  return `${BASE_URL}?${params.toString()}`
}

const THEMES = [
  { name: 'Dark', key: 'dark' },
  { name: 'Black', key: 'black' },
  { name: 'Light', key: 'light' }
]

const DEFAULT_THEME = THEMES[0]

const Badges = () => {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()

  const query = useMemo(() => new URLSearchParams(location.search), [location.search])

  const type = query.get('badge')
  const year = query.get('year')
  const company = query.get('company')
  const topic = query.get('topic')

  const activeTheme = useMemo(() => {
    const requested = query.get('theme')?.toLowerCase()
    return THEMES.find((t) => t.key === requested) || DEFAULT_THEME
  }, [query])

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copiedMap, setCopiedMap] = useState({})

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true)
        setError(false)

        const params = new URLSearchParams()

        if (type) params.append('type', type)
        if (year) params.append('year', year)
        if (company) params.append('company', company)
        if (topic) params.append('topic', topic)

        const response = await fetch(`/api/catalog?${params.toString()}`)
        const result = await response.json()

        if (!result.success) throw new Error(result.message)

        setData(result.data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
  }, [type, year, company, topic])

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedMap((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => setCopiedMap((prev) => ({ ...prev, [key]: false })), 1200)
  }

  const changeTheme = (themeKey) => {
    if (themeKey === activeTheme.key) return

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('theme', themeKey)
        return next
      },
      { replace: true }
    )
  }

  const title = useMemo(() => {
    if (type === 'gs') return 'Global Solution'
    if (type === 'challenge') return 'Challenge'
    if (type === 'nano') return 'Nano Course'
    return 'Badges'
  }, [type])

  if (!type) return <Navigate to='/catalog' />

  if (loading)
    return (
      <main className='badge-main'>
        <Header />
        <section className='badge-content'>
          <div className='catalog-loading'>
            <Loader size={30} className='loading' />
            <h1>Carregando badges...</h1>
          </div>
        </section>
      </main>
    )

  if (error || !data)
    return (
      <main className='badge-main'>
        <Header />
        <section className='badge-content'>
          <div className='badge-empty'>
            <AlertTriangle size={40} color='#e9cf08' />
            <h3>Erro ao carregar badges</h3>
            <p>Tente novamente mais tarde</p>
          </div>
        </section>
      </main>
    )

  return (
    <main className='badge-main'>
      <Header />
      <section className='badge-content'>
        <div className='badge-header'>
          <h1>{data.title || title}</h1>
          <p>Total de conquistas disponíveis nesta categoria</p>
        </div>

        <div className='badge-theme-switcher' role='group' aria-label='Selecionar tema das badges'>
          {THEMES.map((t) => (
            <button
              key={t.key}
              type='button'
              className={`badge-theme-btn ${activeTheme.key === t.key ? 'active' : ''}`}
              onClick={() => changeTheme(t.key)}
              aria-pressed={activeTheme.key === t.key}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className='badge-table-wrapper'>
          <table className='badge-table'>
            <thead>
              <tr>
                <th>Badge</th>
                <th>Tema</th>
                <th>Prévia</th>
                <th>URL</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.badges?.map((badge, index) => {
                const src = badge.themes?.[activeTheme.key]
                const url = buildBadgeUrl({
                  type,
                  year,
                  company,
                  topic,
                  badgeId: badge.id,
                  theme: activeTheme.key,
                })
                const key = `${badge.id}-${activeTheme.key}`

                return (
                  <tr key={`${index}-${activeTheme.key}`} className='badge-row'>
                    <td>{badge.id}º</td>
                    <td>
                      <span className={`badge-theme badge-theme-${activeTheme.key}`}>{activeTheme.name}</span>
                    </td>
                    <td>
                      {src ? (
                        <img src={src} alt={activeTheme.name} className='badge-table-preview' draggable={false} />
                      ) : (
                        <span className='badge-theme-missing'>—</span>
                      )}
                    </td>
                    <td className='badge-url-cell'>
                      <code>{url}</code>
                    </td>
                    <td>
                      <button
                        className='badge-copy-btn'
                        onClick={() => copyToClipboard(url, key)}
                        aria-label={`Copiar URL ${activeTheme.name}`}
                      >
                        {copiedMap[key] ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button className='scroolToTop' onClick={() => window.scrollTo({ top: 0 })}>Voltar ao topo</button>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Badges