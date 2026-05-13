import { Link } from 'react-router-dom'
import Header from '../components/Header'
import '../css/home.css'
import { GitPullRequest, Search } from '@geist-ui/icons'
import badge from '../../public/assets/certificates/gs/2025/future-of-work/black/1.svg'

const Home = () => {
  return (
    <main className='home-main'>
      <Header />
      <section className='home-content'>
        <section className='home-presentation'>
          <div className='home-presentation-left'>
            <h1>Seu esforço acadêmico agora faz parte do seu portfólio</h1>
            <p>Seus certificados não deveriam ficar perdidos em PDFs. Organize e exiba suas conquistas da FIAP em uma experiência visual feita para estudantes e desenvolvedores.</p>
            <div>
              <Link className='active'><Search size={19} />Catálogo de Badges</Link>
              <Link><GitPullRequest size={19} />Tem uma ideia? abra um P.R.</Link>
            </div>
            <h3>Aplicação independente desenvolvida pela comunidade FIAP, sem vínculo institucional oficial.</h3>
          </div>
          <div className='home-presentation-right'>
            <img src={badge} />
          </div>
        </section>

        <section className='home-certificates'>
          <h1>Certificados Nanos</h1>
        </section>
      </section>
    </main>
  )
}

export default Home
