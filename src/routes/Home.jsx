import '../css/home.css'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { GitPullRequest, Search, Award, Users, Star, ArrowRight, Grid } from '@geist-ui/icons'
import badge1 from '../../public/assets/certificates/gs/2025/future-of-work/black/1.svg'
import badge2 from '../../public/assets/certificates/challenge/2026/totvs/dark/1.svg'
import badge3 from '../../public/assets/certificates/challenge/2026/jovi/light/1.svg'

const features = [
  {
    icon: <Award size={22} />,
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
    icon: <Users size={22} />,
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

      <div className='home-content'>
        <section className='home-presentation'>
          <div className='home-presentation-left'>
            <h1>Seu esforço acadêmico agora faz parte do seu portfólio</h1>

            <p>
              Seus certificados não deveriam ficar perdidos em PDFs. Organize e
              exiba suas conquistas da FIAP em uma experiência visual feita para
              estudantes e desenvolvedores.
            </p>

            <div className='home-presentation-buttons'>
              <Link to='/catalog' className='active'>
                <Grid size={19} />
                Catálogo de Badges
              </Link>

              <Link to='https://github.com/leoosilvp/FIAP-achievements' target='_blank' >
                <GitPullRequest size={19} />
                Tem uma ideia? abra um P.R.
              </Link>
            </div>

            <h3>
              Aplicação independente desenvolvida pela comunidade FIAP, sem
              vínculo institucional oficial.
            </h3>
          </div>

          <div className='home-presentation-right'>
            <section className='home-presentation-badges'>
              <img src={badge2} draggable={false} alt='Badge FIAP Future of Work 2025' />
              <img src={badge1} draggable={false} alt='Badge FIAP Future of Work 2025' />
              <img src={badge3} draggable={false} alt='Badge FIAP Future of Work 2025' />
            </section>
          </div>
        </section>

        <section className='home-section home-features'>
          <div className='home-section-header'>
            <span className='home-section-tag'>Plataforma</span>
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
            <span className='home-section-tag'>Processo</span>
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
                    <ArrowRight size={16} />
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
            <span className='home-section-tag'>Catálogo</span>
            <h2>Explore as categorias de badges</h2>
            <p>
              Badges organizadas por eventos, trilhas e desafios da FIAP —
              cada uma representando uma conquista real.
            </p>
          </div>

          <div className='home-categories-grid'>
            {badgeCategories.map((category, index) => (
              <div key={index} className='home-categories-card'>
                <div className='home-categories-card-icon'>
                  <Award size={28} />
                </div>
                <span className='home-categories-card-tag'>
                  {category.tag}
                </span>
                <h3>{category.name}</h3>
              </div>
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
                <Grid size={19} />
                Acessar catálogo
              </Link>

              <Link
                to='https://github.com/leoosilvp/FIAP-achievements'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitPullRequest size={19} />
                Contribuir no GitHub
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default Home