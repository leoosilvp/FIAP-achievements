import logo from '../../public/assets/svg/icon.svg'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className="header-main">
            <section className='header-content'>
                <Link to='/home'>
                    <img draggable={false} src={logo} />
                </Link>

                <nav className='header-nav'>
                    <Link to='/home'>Início</Link>
                    <Link to='/catalog'>Catálogo</Link>
                    <Link to='/badge?badge=nano'>Badge Nano</Link>
                    <Link to='https://on.fiap.com.br/' target='_blank'>FIAP ON</Link>
                    <Link to='https://fiap-csm.symplicity.com/students/?signin_tab=0' target='_blank'>Talent Lab</Link>
                    <Link to='https://gitcv-app.vercel.app/' target='_blank'>GitCV</Link>
                </nav>
            </section>

            <button onClick={()=> window.open('https://github.com/leoosilvp/FIAP-achievements')}>GitHub</button>
        </header>
    )
}

export default Header
