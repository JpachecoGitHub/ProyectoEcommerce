import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'

// Constantes de EmailJS
const EMAILJS_SERVICE_ID = 'Correo_Confirmacion'
const EMAILJS_TEMPLATE_ID = 'dnrd78a'
const EMAILJS_PUBLIC_KEY = '_zHqCCTvfqvHTcXsm'

// Para mostrar un solo ítem del carrito
const CartItem = ({ item }) => (
  <li className='list-group-item d-flex justify-content-between align-items-center p-3 mb-2 bg-light rounded shadow-sm'>
    <div className='d-flex align-items-center'>
      <img
        src={item.img}
        alt={item.name}
        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '0.3rem', marginRight: '1rem' }}
      />
      <div>
        <strong className='text-dark'>{item.name}</strong>
        <span className='text-muted small'> x{item.quantity}</span>
        <p className='mb-0 text-secondary small'>{item.description || 'Producto'}</p>
      </div>
    </div>
    <span className='fw-bold text-success'>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
  </li>
)

const FormularioPago = () => {
  const { cart, calcularTotal, vaciarCart } = useContext(CartContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const total = calcularTotal(cart)

  // Estado inicial del formulario
  const [form, setForm] = useState({
    nombre: user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : '',
    correo: user ? user.email : '',
    direccion: user && user.direccion ? user.direccion : '',
    ciudad: '',
    tarjeta: '',
    vencimiento: '',
    cvv: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Envía el correo de confirmación de compra usando EmailJS.

  const sendEmail = () => {
    const total = calcularTotal(cart)
    const orderId = 'ORD-' + Date.now()

    const pedidos = cart.map(item => ({
      nombre: item.name,
      unidades: item.quantity,
      precio: item.price.toFixed(2)
    }))

    const templateParams = {
      order_id: orderId,
      email: form.correo,
      nombre: form.nombre,

      pedidos,

      costo: {
        envio: '0.00',
        impuesto: '0.00',
        total: total.toLocaleString('es-CL')
      },

      user_address: form.direccion + ', ' + form.ciudad
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('Correo de confirmación enviado con éxito!', response.status, response.text)
      }, (err) => {
        console.error('ERROR al enviar el correo:', err)
      })
  }

  // validación y simulación del pago.

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      Swal.fire({ icon: 'warning', title: 'Carrito vacío', text: 'No tienes productos para pagar.' })
      return
    }

    const requiredFields = ['nombre', 'correo', 'direccion', 'ciudad', 'tarjeta', 'vencimiento', 'cvv']
    const isIncomplete = requiredFields.some(field => !form[field].trim())

    if (isIncomplete) {
      Swal.fire({ icon: 'error', title: 'Campos incompletos', text: 'Por favor, completa todos los campos para continuar.' })
      return
    }

    // Validación de formato de correo
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
      Swal.fire({ icon: 'error', title: 'Correo inválido', text: 'Por favor, ingresa un correo electrónico válido.' }); return
    }
    // Validación de tarjeta
    if (!/^\d{16}$/.test(form.tarjeta)) {
      Swal.fire({ icon: 'error', title: 'Tarjeta inválida', text: 'El número de tarjeta debe tener 16 dígitos.' }); return
    }
    // Validación de vencimiento (MM/AA)
    if (!/^\d{2}\/\d{2}$/.test(form.vencimiento)) {
      Swal.fire({ icon: 'error', title: 'Vencimiento inválido', text: 'El formato de vencimiento debe ser MM/AA.' }); return
    }
    // Validación de CV
    if (!/^\d{3,4}$/.test(form.cvv)) {
      Swal.fire({ icon: 'error', title: 'CVV inválido', text: 'El CVV debe tener 3 o 4 dígitos.' }); return
    }

    // 2. SIMULACIÓN DE PAGO
    Swal.fire({
      title: 'Procesando pago...',
      html: `No cierres esta ventana. Total a pagar: <b>$${total.toLocaleString('es-CL')}</b>`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
        sendEmail()
        vaciarCart()
        navigate('/AgradecimientoCompra', { state: { email: form.correo } })
      }
    })
  }

  return (
    <div className='container my-5'>
      <h1 className='text-center mb-5 text-primary'>Finalizar Compra</h1>

      <div className='row g-5'>

        {/* Columna de Detalle de la Compra */}
        <div className='col-md-5 order-md-2'>
          <h4 className='d-flex justify-content-between align-items-center mb-3'>
            <span className='text-secondary'> Tu Carrito </span>
            <span className='badge bg-primary rounded-pill'>{cart.length}</span>
          </h4>

          {/* Lista de Productos */}
          <ul className='list-group mb-3'>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Total a Pagar */}
            <li className='list-group-item d-flex justify-content-between bg-light'>
              <span className='text-secondary fw-bold'>Total a pagar:</span>
              <strong className='text-primary fw-bold fs-5'>${total.toLocaleString('es-CL')}</strong>
            </li>
          </ul>
        </div>

        {/* Formulario de Pago */}
        <div className='col-md-7 order-md-1'>
          <h4 className='mb-3 text-secondary'>Información de Envío y Pago</h4>
          <form className='needs-validation' onSubmit={handleSubmit} noValidate>

            {/* Datos de Contacto y Envío */}
            <div className='row g-3 mb-4 p-3 border rounded'>
              <h5 className='text-dark'> Datos Personales </h5>

              <div className='col-sm-6'>
                <label htmlFor='nombre' className='form-label'> Nombre completo </label>
                <input
                  type='text'
                  className='form-control'
                  id='nombre'
                  name='nombre'
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
                <div className='invalid-feedback'>
                  Se requiere un nombre válido.
                </div>
              </div>

              <div className='col-sm-6'>
                <label htmlFor='correo' className='form-label'> Correo electrónico </label>
                <input
                  type='email'
                  className='form-control'
                  id='correo'
                  name='correo'
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
                <div className='invalid-feedback'>
                  Por favor, introduce un correo electrónico válido.
                </div>
              </div>

              <div className='col-12'>
                <label htmlFor='direccion' className='form-label'> Dirección </label>
                <input
                  type='text'
                  className='form-control'
                  id='direccion'
                  name='direccion'
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='col-12'>
                <label htmlFor='ciudad' className='form-label'> Ciudad </label>
                <input
                  type='text'
                  className='form-control'
                  id='ciudad'
                  name='ciudad'
                  value={form.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Datos de Pago */}
            <div className='row g-3 p-3 border rounded'>
              <h5 className='text-dark'> Información de Pago </h5>

              <div className='col-12'>
                <label htmlFor='tarjeta' className='form-label'> Número de tarjeta (16 dígitos) </label>
                <input
                  type='text'
                  className='form-control'
                  id='tarjeta'
                  name='tarjeta'
                  value={form.tarjeta}
                  onChange={handleChange}
                  maxLength={16}
                  required
                />
              </div>

              <div className='col-md-6'>
                <label htmlFor='vencimiento' className='form-label'> Vencimiento (MM/AA)</label>
                <input
                  type='text'
                  className='form-control'
                  id='vencimiento'
                  name='vencimiento'
                  value={form.vencimiento}
                  onChange={handleChange}
                  placeholder='MM/AA'
                  maxLength={5}
                  required
                />
              </div>

              <div className='col-md-6'>
                <label htmlFor='cvv' className='form-label'> CVV </label>
                <input
                  type='text'
                  className='form-control'
                  id='cvv'
                  name='cvv'
                  value={form.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <hr className='my-4' />

            <button
              className='w-100 btn btn-primary btn-lg'
              type='submit'
              disabled={cart.length === 0}
            >
              Pagar ${total.toLocaleString('es-CL')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormularioPago
