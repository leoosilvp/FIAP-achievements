import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='footer-main'>
            <section className='footer-content'>
                <div className='footer-top'>
                    <article className='footer-column'>
                        <h4>Plataforma</h4>

                        <nav>
                            <Link to='/catalog'>Catálogo de Badges</Link>
                            <Link to='https://canva.link/8nb1a3rlbru5tsh' target='_blank' rel='noopener noreferrer'>
                                Template Canva
                            </Link>
                            <Link to='https://github.com/leoosilvp/FIAP-achievements' target='_blank' rel='noopener noreferrer'>
                                GitHub
                            </Link>
                        </nav>
                    </article>

                    <article className='footer-column'>
                        <h4>FIAP</h4>

                        <nav>
                            <Link to='https://fiap-csm.symplicity.com/students/' target='_blank' rel='noopener noreferrer'>
                                Talent Lab
                            </Link>
                            <Link to='https://on.fiap.com.br/' target='_blank' rel='noopener noreferrer'>
                                FIAP ON
                            </Link>
                        </nav>
                    </article>

                    <article className='footer-column'>
                        <h4>Comunidade</h4>

                        <nav>
                            <Link to='https://github.com/leoosilvp/FIAP-achievements/issues' target='_blank' rel='noopener noreferrer'>
                                Reportar bug
                            </Link>
                            <Link to='https://github.com/leoosilvp/FIAP-achievements/pulls' target='_blank' rel='noopener noreferrer'>
                                Abrir Pull Request
                            </Link>
                        </nav>
                    </article>
                </div>

                <div className='footer-bottom'>
                    <p className='footer-disclaimer'>Projeto open-source independente, desenvolvido pela comunidade FIAP. Não possui vínculo oficial com a instituição FIAP.</p>
                    <p className='footer-copy'>FIAP Achievements · © {new Date().getFullYear()}</p>
                </div>
            </section>
        </footer>
    )
}

export default Footer