import { Link } from 'react-router-dom'
import notFoundImage from '../../assets/imgs/error404.jpg'

const NotFound = () => {
  return (
    <main className='container text-center mt-5'>
      <h2 className='mt-4 text-danger'> ¡Oops! Página no encontrada. </h2>
      <p className='text-muted'> Parece que la página que estás buscando no existe o ha sido movida. </p>
      <div className='error-image'>
        <img src={notFoundImage} alt='Error 404' className='img-fluid w-50' />
      </div>
      <Link to='/' className='btn btn-primary mt-3 mb-3'> Volver a la página principal </Link>
    </main>
  )
}

export default NotFound
