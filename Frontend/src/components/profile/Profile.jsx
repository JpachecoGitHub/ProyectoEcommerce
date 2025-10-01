import React, { useContext, useRef, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Profile = () => {
  const { user, purchaseHistory, loading, logout, uploadProfileImage, updateProfile } = useContext(UserContext)

  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // ESTADOS PARA EDICIÓN
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  // Para actualiza el formData cuando el usuario cambia inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handlers de Interacción

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleEditProfile = () => {
    setFormData(user)
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    // Llamamos la función del contexto para guardar los cambios
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleImageUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      uploadProfileImage(file)
    }
  }

  // Renderizado de Carga y Autenticación

  if (loading) {
    return (
      <div className='container my-5 text-center'>
        <p> Cargando información del perfil... </p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='container my-5 text-center'>
        <p> Por favor, inicia sesión para ver tu perfil. </p>
      </div>
    )
  }

  return (
    <div className='container-fluid bg-light p-0'>
      <main className='container my-5'>
        {/* Profile Section */}
        <section className='bg-white p-4 rounded shadow-sm mb-5'>
          <h2 className='mb-4'> Perfil </h2>
          <hr />
          <Row className='g-4 align-items-start'>
            <Col md={3} className='text-center'>

              <div
                className='bg-light border border-secondary d-flex justify-content-center align-items-center mb-3 overflow-hidden'
                style={{ width: '150px', height: '150px', margin: '0 auto', borderRadius: '50%' }}
              >
                {user.imageUrl
                  ? (
                    <img
                      src={user.imageUrl}
                      alt='Perfil'
                      style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#fff' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150' }}
                    />
                    )
                  : (
                    <span className='text-secondary'> Imagen </span>
                    )}
              </div>

              {/* Input de tipo 'file' oculto */}
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept='image/*'
              />
              <Button variant='dark' className='w-75 mb-3' onClick={handleImageUploadClick}> Anadir/Cambiar Foto </Button>
            </Col>

            <Col md={6}>
              <Form>
                <Row className='mb-2'>
                  <Col>
                    <strong> Nombre: </strong>
                    {isEditing
                      ? (
                        <Form.Control type='text' name='nombre' value={formData.nombre || ''} onChange={handleChange} />
                        )
                      : (
                        <p className='mb-0'>{user.nombre || 'N/A'}</p>
                        )}
                  </Col>
                  <Col>
                    <strong> Apellido: </strong>
                    {isEditing
                      ? (
                        <Form.Control type='text' name='apellido' value={formData.apellido || ''} onChange={handleChange} />
                        )
                      : (
                        <p className='mb-0'>{user.apellido || 'N/A'}</p>
                        )}
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col>
                    <strong>Email:</strong>
                    <p className='mb-0'>{user.email || 'N/A'}</p>
                  </Col>
                  <Col>
                    <strong> Telefono: </strong>
                    {isEditing
                      ? (
                        <Form.Control type='text' name='telefono' value={formData.telefono || ''} onChange={handleChange} />
                        )
                      : (
                        <p className='mb-0'>{user.telefono || 'N/A'}</p>
                        )}
                  </Col>
                </Row>
                <div className='mb-3'>
                  <strong> Direccion: </strong>
                  {isEditing
                    ? (
                      <Form.Control type='text' name='direccion' value={formData.direccion || ''} onChange={handleChange} />
                      )
                    : (
                      <p className='mb-0'>{user.direccion || 'N/A'}</p>
                      )}
                </div>
              </Form>

              <div className='mt-4'>
                {isEditing
                  ? (
                    <>
                      <Button variant='success' className='me-2' onClick={handleSaveProfile}> Guardar </Button>
                      <Button variant='secondary' onClick={() => setIsEditing(false)}> Cancelar </Button>
                    </>
                    )
                  : (
                    <>
                      <Button variant='dark' className='me-2' onClick={handleEditProfile}> Edita </Button>
                      <Button variant='danger' onClick={handleLogout}> Cerrar Sesion </Button>
                    </>
                    )}
              </div>
            </Col>
          </Row>
        </section>

        {/* Historial de Compras */}
        <section className='bg-white p-4 rounded shadow-sm'>
          <h2 className='mb-4'> Historial de Compras </h2>
          <hr />
          {purchaseHistory && purchaseHistory.length > 0
            ? (
                purchaseHistory.map(item => (
                  <div key={item.id} className='d-flex align-items-center border-bottom py-3'>
                    <div className='me-4 bg-light border' style={{ width: '80px', height: '80px' }}>
                      <img src={item.imageUrl} alt={item.productName} className='img-fluid' />
                    </div>
                    <div className='flex-grow-1'>
                      <h5 className='mb-1'>{item.productName}</h5>
                      <p className='text-muted mb-0'>{item.description}</p>
                    </div>
                    <div className='text-center me-4'>
                      <strong className='d-block'>${item.price}</strong>
                    </div>
                    <div className='text-center me-4'>
                      <small>x{item.quantity}</small>
                    </div>
                    <Button variant='dark'> Comprar de Nuevo </Button>
                  </div>
                ))
              )
            : (
              <p className='text-center'> No hay historial de compras. </p>
              )}
        </section>
      </main>
    </div>
  )
}

export default Profile
