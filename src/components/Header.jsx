import logo from '../../public/assets/svg/logo.svg'
import { Link } from 'react-router-dom'
import { Github } from '@geist-ui/icons'

const Header = () => {
    return (
        <header className='header-main'>
            <img src={logo} />
            <nav>
                <ul>
                    <Link>Catálogo</Link>
                    <Link to='https://canva.link/8nb1a3rlbru5tsh' target='_blank'>Canva</Link>
                    <Link to='https://fiap-csm.symplicity.com/students/' target='_blank'>Talent Lab</Link>
                    <Link to='https://on.fiap.com.br/' target='_blank'>FIAP ON</Link>
                    <Link to='https://github.com/leoosilvp/FIAP-achievements' target='_blank'><Github size={16} /></Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header
