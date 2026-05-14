import { Link } from 'react-router-dom'
import img from '../../public/assets/svg/error.svg'
import logo from '../../public/assets/svg/logo.svg'

const Error = () => {
  return (
    <main className="error-page">
      <header>
        <Link to='/'>
          <img src={logo} alt="logo-snakr" draggable={false} />
        </Link>
      </header>

      <section className='error-page-content'>
        <h1>Oops!...</h1>
        <img src={img} draggable={false} />
        <h1>Página não encontrada</h1>
        <p>Você não deveria estar aqui — acontece.<br />Se precisar de ajuda, entre em contato conosco.</p>
      </section>

      <section className='error-page-btns'>
        <Link to='/home'>Início</Link>
        <Link to='https://github.com/leoosilvp/FIAP-achievements/issues' target='_blank'>Contate-nos</Link>
      </section>
    </main>
  )
}

export default Error
