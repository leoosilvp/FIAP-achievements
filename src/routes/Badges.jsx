import '../css/badge.css'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader, AlertTriangle, Copy, Check, ChevronLeft } from '@geist-ui/icons'
import Header from '../components/Header'

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
      params.set('ranking', '1')
      break

    default:
      return ''
  }

  return `${BASE_URL}?${params.toString()}`
}

const THEMES = [
  { name: 'Black', key: 'black' },
  { name: 'Dark', key: 'dark' },
  { name: 'Light', key: 'light' },
]

const Badges = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const query = useMemo(() => new URLSearchParams(location.search), [location.search])

  const type = query.get('badge')
  const year = query.get('year')
  const company = query.get('company')
  const topic = query.get('topic')

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

  const title = useMemo(() => {
    if (!type) return 'Badges'
    if (type === 'gs') return 'Global Solution'
    if (type === 'challenge') return 'Challenge'
    if (type === 'nano') return 'Nano Course'
    return 'Badges'
  }, [type])

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
            <AlertTriangle size={40} color='#e9cf08'/>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='badge-tag'>{title}</span>
            <button onClick={() => navigate('/catalog')} className='badge-back-btn'>
              <ChevronLeft size={16} />
              Voltar
            </button>
          </div>
          <h1>{data.title || title}</h1>
          <p>Total de conquistas disponíveis nesta categoria</p>
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
              {data.badges?.flatMap((badge, index) =>
                THEMES.map((t, i) => {
                  const src = badge.themes?.[t.key]
                  const url = buildBadgeUrl({
                    type,
                    year,
                    company,
                    topic,
                    badgeId: badge.id,
                    theme: t.key,
                  })
                  const key = `${badge.id}-${t.key}`

                  return (
                    <tr key={`${index}-${i}`} className='badge-row'>
                      <td>{badge.id}º</td>
                      <td>
                        <span className={`badge-theme badge-theme-${t.key}`}>{t.name}</span>
                      </td>
                      <td>
                        {src ? (
                          <img src={src} alt={t.name} className='badge-table-preview' />
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
                          aria-label={`Copiar URL ${t.name}`}
                        >
                          {copiedMap[key] ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Badges