import logo from '../../public/assets/svg/icon.svg'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className="header-main">
            <section className='header-content'>
                <img draggable={false} src={logo} />

                <nav className='header-nav'>
                    <Link>Início</Link>
                    <Link>Catálogo</Link>
                    <Link to='badge?badge=nano'>Badge Nano</Link>
                    <Link>FIAP ON</Link>
                    <Link>Talent Lab</Link>
                </nav>
            </section>

            <button>GitHub</button>
        </header>
    )
}

export default Header
