import { useEffect, useRef, useState } from 'react'
import '../css/catalog.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Badge, Book, ChevronDown, ChevronUp, Filter, Microscope, Search, WarningAlt, Wikis } from '@carbon/icons-react'
import { Loader } from '@geist-ui/icons'
import { Link } from 'react-router-dom'
import { useCatalog } from '../hooks/useCatalog'

const MAX_VISIBLE_ROWS = 5

const CatalogGrid = ({ children }) => {
  const gridRef = useRef(null)
  const [canToggle, setCanToggle] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const measure = () => {
      const items = Array.from(grid.children)
      if (items.length === 0) {
        setCanToggle(false)
        return
      }

      const rowOffsets = new Set(items.map((item) => item.offsetTop))
      setCanToggle(rowOffsets.size > MAX_VISIBLE_ROWS)
    }

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(grid)

    return () => resizeObserver.disconnect()
  }, [children])

  const isMinimized = canToggle && !expanded

  return (
    <>
      <div ref={gridRef} className={`catalog-grid${isMinimized ? ' minimized' : ''}`}>
        {children}
      </div>
      <div className="trans-smooth" />
      {canToggle && (
        <button
          type='button'
          className='catalog-toggle-btn'
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>{expanded ? 'Ver menos' : 'Ver mais'}</span>
        </button>
      )}
    </>
  )
}

const Catalog = () => {
  const {
    search,
    setSearch,
    filteredCatalog,
    loading,
    error,
  } = useCatalog()

  if (loading) {
    return (
      <main className='catalog-main'>
        <Header />
        <section className='catalog-content'>
          <div className='catalog-loading'>
            <Loader size={30} className='loading' />
            <h1>Buscando categorias</h1>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className='catalog-main'>
        <Header />
        <section className='catalog-content'>
          <div className='catalog-empty'>
            <WarningAlt size={40} color='#e9cf08' />
            <h3>Erro ao carregar catálogo!</h3>
            <p>Tente novamente mais tarde</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className='catalog-main'>
      <Header />
      <section className='catalog-content'>
        <div className='catalog-header'>
          <h1>Explore suas badges<br />acadêmicas</h1>
          <p>Todas as conquistas da sua jornada na FIAP organizadas<br />por categoria, ano e tipo de desafio.</p>
        </div>

        <div className='catalog-filters'>
          <div className='catalog-search'>
            <Search size={16} />
            <input type='text' placeholder='Buscar Challenges, G.S, I.C...' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className='catalog-filter-chip'>
            <Filter size={14} />
            <span>Automático</span>
          </div>
        </div>

        {Object.entries(filteredCatalog)
          .sort(([a], [b]) => {
            const order = { nano: 0, ic: 1, challenge: 2, gs: 3 }
            return order[a] - order[b]
          })
          .map(([type, years]) => {
            if (type === 'nano') {
              return (
                <section className='catalog-grid-main' key='nano'>
                  <h1>Nano Course<div className='hr' /></h1>
                  <CatalogGrid>
                    <Link to='/badge?badge=nano' className='catalog-card'>
                      <div className='catalog-card-icon'>
                        <Book size={20} />
                      </div>
                      <div className='catalog-card-content'>
                        <h3>Nano Courses</h3>
                        <div className='catalog-meta'>
                          <span>Nano Course</span>
                        </div>
                      </div>
                    </Link>
                  </CatalogGrid>
                </section>
              )
            }

            if (type === 'ic') {
              return (
                <section className='catalog-grid-main' key={type}>
                  <h1>Iniciação Científica<div className='hr' /></h1>
                  <CatalogGrid>
                    {Object.keys(years).sort((a, b) => Number(b) - Number(a)).map((year) => (
                      <Link key={`${type}-${year}`} to={`/badge?badge=ic&year=${year}`} className='catalog-card'>
                        <div className='catalog-card-icon'>
                          <Microscope size={20} />
                        </div>
                        <div className='catalog-card-content'>
                          <h3>I.C {year}</h3>
                          <div className='catalog-meta'>
                            <span>Iniciação Científica</span>
                            <span>{year}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CatalogGrid>
                </section>
              );
            }

            if (type === 'challenge') {
              return Object.entries(years)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, topics]) => (
                  <section className='catalog-grid-main' key={`${type}-${year}`}>
                    <h1>Challenge {year}<div className='hr' /></h1>
                    <CatalogGrid>
                      {topics.map((topic) => (
                        <Link key={`${type}-${year}-${topic.slug}`} to={`/badge?badge=challenge&year=${year}&company=${topic.slug}`} className='catalog-card'>
                          <div className='catalog-card-icon'>
                            <Badge size={20} />
                          </div>
                          <div className='catalog-card-content'>
                            <h3>{topic.title}</h3>
                            <div className='catalog-meta'>
                              <span>Challenge</span>
                              <span>{year}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CatalogGrid>
                  </section>
                ))
            }

            if (type === 'gs') {
              return Object.entries(years)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, topics]) => (
                  <section className='catalog-grid-main' key={`${type}-${year}`}>
                    <h1>Global Solution {year}<div className='hr' /></h1>
                    <CatalogGrid>
                      {topics.map((topic) => (
                        <Link key={`${type}-${year}-${topic.slug}`} to={`/badge?badge=gs&year=${year}&topic=${topic.slug}`} className='catalog-card'>
                          <div className='catalog-card-icon'>
                            <Wikis size={20} />
                          </div>
                          <div className='catalog-card-content'>
                            <h3>{topic.title}</h3>
                            <div className='catalog-meta'>
                              <span>Global Solution</span>
                              <span>{year}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CatalogGrid>
                  </section>
                ))
            }

            return null
          })}
      </section>
      <Footer />
    </main>
  )
}

export default Catalog