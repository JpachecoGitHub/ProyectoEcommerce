import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

const AgradecimientoCompra = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center text-center p-5 vh-100 bg-light'>
      <i className='bi bi-check-circle-fill text-success' style={{ fontSize: '5rem' }} />
      <h2 className='display-4 my-4'> ¡Gracias por tu compra! </h2>
      <p className='lead mb-4'>
        Te mantendremos informado sobre el estado de tu pedido a través de tu correo electrónico.
      </p>
      <Link to='/' className='btn btn-primary btn-lg'>
        <i className='bi bi-arrow-left me-2' />Volver al inicio
      </Link>
    </div>
  )
}

export default AgradecimientoCompra
