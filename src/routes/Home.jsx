import '../css/home.css'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { ArrowRight, Badge, Book, Events, Grid, PullRequest, Search, Star, Wikis, } from '@carbon/icons-react'

const features = [
  {
    icon: <Badge size={22} />,
    title: 'Badges organizadas',
    description:
      'Todas as suas conquistas da FIAP centralizadas em um único lugar, organizadas por categoria e ano.',
  },
  {
    icon: <Search size={22} />,
    title: 'Catálogo visual',
    description:
      'Navegue por um catálogo interativo de badges com filtros por curso, trilha e período.',
  },
  {
    icon: <Events size={22} />,
    title: 'Feito pela comunidade',
    description:
      'Projeto open-source mantido por estudantes FIAP. Contribua com novas badges via Pull Request.',
  },
  {
    icon: <Star size={22} />,
    title: 'Portfólio profissional',
    description:
      'Transforme suas certificações acadêmicas em um portfólio visual para impressionar recrutadores.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Acesse o catálogo',
    description:
      'Abra o catálogo de badges e encontre as certificações que você conquistou durante sua jornada na FIAP.',
  },
  {
    number: '02',
    title: 'Selecione suas badges',
    description:
      'Filtre por categoria, curso ou período e identifique todas as suas conquistas acadêmicas.',
  },
  {
    number: '03',
    title: 'Monte URL',
    description:
      'Personalize sua página usando os parâmetros da URL para definir tema, ranking e exibir suas badges do seu jeito.',
  },
  {
    number: '04',
    title: 'Adicione ao GitHub',
    description:
      'Coloque a URL da sua badge do FIAP Achievements na bio ou nos projetos do GitHub para destacar suas conquistas acadêmicas.',
  },
]

const stats = [
  { value: '400+', label: 'Badges catalogadas' },
  { value: '3', label: 'Categorias disponíveis' },
  { value: '100%', label: 'Open source' },
  { value: '0', label: 'Vínculos institucionais' },
]

const badgeCategories = [
  { name: 'Global Solution', tag: 'G.S' },
  { name: 'Challenge', tag: 'Challenge' },
  { name: 'Nano Course', tag: 'Nano' },
]

const Home = () => {
  return (
    <main className='home-main'>
      <Header />

      <section className='home-presentation'>
        <div />
        <div className='home-presentation-content'>
          <section className='home-presentation-left-content'>
            <h1>Certificados<br />De Conquistas</h1>
            <div>
              <Link to='/catalog' className='active'>Badges</Link>
              <Link to='https://github.com/leoosilvp/FIAP-achievements' target='_blank'><PullRequest size={16} />Contribuir</Link>
            </div>
          </section>

          <section className='home-presentation-right-content'>
            <article>
              <h1>Badges organizadas <span>para destacar cada conquista acadêmica de forma clara e acessível.</span></h1>
            </article>
            <article>
              <h1>Conquistas em destaque <span>através de uma coleção de badges conquistadas na FIAP.</span></h1>
            </article>
            <article>
              <h1>Cada badge importa <span>representando um marco da sua jornada acadêmica na FIAP.</span></h1>
            </article>
          </section>
        </div>

        <div className='home-presentation-logos'>
          <img draggable={false} src="https://companieslogo.com/img/orig/TOTS3.SA_BIG.D-b21debeb.png?t=1720244494" />
          <img draggable={false} className='light' src="https://cdn.freebiesupply.com/images/large/2x/oracle-logo-black-transparent.png" />
          <img draggable={false} src="https://content.b3.com.br/wp-content/uploads/2026/01/Logo-B3-300x258-1.png" />
          <img draggable={false} className='light' src="https://logodownload.org/wp-content/uploads/2014/04/ibm-logo-1.png" />
          <img draggable={false} className='light' src="https://freepngimg.com/thumb/ford/28457-6-ford-logo-file.png" />
          <img draggable={false} src="https://companieslogo.com/img/orig/SAN_BIG.D-fd4311d2.png?t=1720244493" />
          <img draggable={false} className='light' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Vivo_Horizontal_Black_RGB.svg/250px-Vivo_Horizontal_Black_RGB.svg.png" />
        </div>
      </section>

      <section className='home-section home-features'>
        <div className='home-section-header'>
          <h2>Tudo que você precisa para exibir suas conquistas</h2>
          <p>
            Uma ferramenta construída por estudantes, para estudantes —
            pensada para valorizar cada certificado conquistado na FIAP.
          </p>
        </div>

        <div className='home-features-grid'>
          {features.map((feature, index) => (
            <article key={index} className='home-features-card'>
              <div className='home-features-card-icon'>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='home-section home-process'>
        <div className='home-section-header'>
          <h2>Como funciona</h2>
          <p>Do catálogo ao portfólio em quatro passos simples.</p>
        </div>

        <div className='home-process-list'>
          {steps.map((step, index) => (
            <div key={index} className='home-process-item'>
              <span className='home-process-number'>{step.number}</span>

              <div className='home-process-content'>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className='home-process-connector'>
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className='home-section home-stats'>
        <div className='home-stats-grid'>
          {stats.map((stat, index) => (
            <div key={index} className='home-stats-item'>
              <span className='home-stats-value'>{stat.value}</span>
              <span className='home-stats-label'>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className='home-section home-categories'>
        <div className='home-section-header'>
          <h2>Explore as categorias de badges</h2>
          <p>
            Badges organizadas por eventos, trilhas e desafios da FIAP —
            cada uma representando uma conquista real.
          </p>
        </div>

        <div className='home-categories-grid'>
          {badgeCategories.map((category, index) => (
            <Link to='/catalog' key={index} className='home-categories-card'>
              <div className='home-categories-card-icon'>
                {category.name === 'Nano Course' ? <Book size={28} /> : category.name === 'Global Solution' ? <Wikis size={28} /> : <Badge size={28} />}
              </div>
              <span className='home-categories-card-tag'>
                {category.tag}
              </span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className='home-section home-cta'>
        <div className='home-cta-content'>
          <h2>Pronto para montar seu portfólio?</h2>
          <p>
            Acesse o catálogo, selecione suas badges e mostre ao mundo tudo
            que você conquistou na FIAP.
          </p>
          <div className='home-cta-buttons'>
            <Link to='/catalog' className='active'>
              <Grid size={16} />
              Acessar catálogo
            </Link>

            <Link
              to='https://github.com/leoosilvp/FIAP-achievements'
              target='_blank'
              rel='noopener noreferrer'
            >
              <PullRequest size={16} />
              Contribuir no GitHub
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Home