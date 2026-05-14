import '../css/catalog.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Search, Filter, Award, Loader, BookOpen, Globe, AlertTriangle } from '@geist-ui/icons'
import { Link } from 'react-router-dom'
import { useCatalog } from '../hooks/useCatalog'

const Catalog = () => {
  const {
    search,
    setSearch,
    filteredCatalog,
    loading,
    error,
    hasResults,
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
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className='catalog-main'>
        <Header />
        <section className='catalog-content'>
          <div className='catalog-empty'>
            <AlertTriangle size={40} />
            <h3>Erro ao carregar catálogo!</h3>
            <p>Tente novamente mais tarde</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className='catalog-main'>
      <Header />
      <section className='catalog-content'>
        <div className='catalog-header'>
          <span className='catalog-tag'>Catálogo</span>
          <h1>Explore suas badges acadêmicas</h1>
          <p>Todas as conquistas da sua jornada na FIAP organizadas por categoria, ano e tipo de desafio.</p>
        </div>

        <div className='catalog-filters'>
          <div className='catalog-search'>
            <Search size={16} />
            <input type='text' placeholder='Buscar Challenge ou G.S...' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className='catalog-filter-chip'>
            <Filter size={14} />
            <span>Automático</span>
          </div>
        </div>

        {Object.entries(filteredCatalog)
          .sort(([a], [b]) => {
            if (a === 'nano') return -1
            if (b === 'nano') return 1
            return a.localeCompare(b)
          })
          .map(([type, years]) => {
            if (type === 'nano') {
              return (
                <section className='catalog-grid-main' key='nano'>
                  <h1>Nano Course</h1>
                  <div className='catalog-grid'>
                    <Link to='/badge?badge=nano' className='catalog-card'>
                      <div className='catalog-card-icon'>
                        <BookOpen size={20} />
                      </div>
                      <div className='catalog-card-content'>
                        <h3>Nano Courses</h3>
                        <div className='catalog-meta'>
                          <span>Nano Course</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </section>
              )
            }

            if (type === 'challenge') {
              return Object.entries(years)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, topics]) => (
                  <section className='catalog-grid-main' key={`${type}-${year}`}>
                    <h1>Challenge {year}</h1>
                    <div className='catalog-grid'>
                      {topics.map((topic) => (
                        <Link key={`${type}-${year}-${topic.slug}`} to={`/badge?badge=challenge&year=${year}&company=${topic.slug}`} className='catalog-card'>
                          <div className='catalog-card-icon'>
                            <Award size={20} />
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
                    </div>
                  </section>
                ))
            }

            if (type === 'gs') {
              return Object.entries(years)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, topics]) => (
                  <section className='catalog-grid-main' key={`${type}-${year}`}>
                    <h1>Global Solution {year}</h1>
                    <div className='catalog-grid'>
                      {topics.map((topic) => (
                        <Link key={`${type}-${year}-${topic.slug}`} to={`/badge?badge=gs&year=${year}&topic=${topic.slug}`} className='catalog-card'>
                          <div className='catalog-card-icon'>
                            <Globe size={20} />
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
                    </div>
                  </section>
                ))
            }

            return null
          })}

        {!hasResults && (
          <div className='catalog-empty'>
            <h3>Nenhuma badge encontrada!</h3>
            <p>Tente ajustar sua busca ou filtros.</p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}

export default Catalog