import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-dark text-white pt-4 pb-3'>
      <div className='container'>
        <div className='row justify-content-center text-center'>

          {/* Columna del logo */}
          {/* <div className="col-12 col-md-auto mb-3 mb-md-0 text-center">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
          </div> */}

          <div className='col-12 col-md-8 mb-3 mb-md-0'>
            <ul className='list-unstyled d-flex flex-wrap justify-content-center m-0 p-0'>
              <li className='mx-2'><Link to='/' className='text-white text-decoration-none'>Inicio</Link></li>
              <li className='mx-2'><Link to='/productos' className='text-white text-decoration-none'>Nuestros Productos</Link></li>
              <li className='mx-2'><Link to='/contacto' className='text-white text-decoration-none'>Contáctanos</Link></li>
            </ul>
          </div>

          <div className='col-12 col-md-8 text-center mt-3 mt-md-0'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-white mx-2 fs-4'>
              <i className='bi bi-facebook' />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-white mx-2 fs-4'>
              <i className='bi bi-instagram' />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-white mx-2 fs-4'>
              <i className='bi bi-twitter' />
            </a>
          </div>
        </div>

        <div className='text-center pt-3 mt-3 border-top border-secondary'>
          <p className='m-0'>&copy; {new Date().getFullYear()} Todos los derechos reservados. Prohibida su copia parcial o total bajo la ley nacional e internacional. </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
