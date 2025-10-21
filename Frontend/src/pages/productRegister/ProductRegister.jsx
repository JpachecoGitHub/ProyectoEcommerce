import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import { ProductosContext } from '../../context/ProductContext'
import { CategoriasContext } from '../../context/CategoriasContext'
import { useNavigate } from 'react-router-dom'

const ProductRegister = () => {
  const { user, loading: userLoading } = useContext(UserContext)
  const { productos, addProduct, deleteProduct, updateProduct } = useContext(ProductosContext)
  const { categorias, loading: categoriasLoading } = useContext(CategoriasContext)
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState('')

  const getCategoryName = (id) => {
    const category = categorias.find(cat => cat.id === id)
    return category ? category.nombre : 'Desconocida'
  }

  const [formData, setFormData] = useState({
    nombre: '',
    categoria_id: '',
    stock: 0,
    precio: 0,
    imagen_url: '',
    descripcion: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type } = e.target

    let finalValue = value

    if (type === 'number') {
      finalValue = value === '' ? 0 : (name === 'stock' ? parseInt(value, 10) : parseFloat(value))
    } else if (name === 'categoria_id') {
      // Mantiene categoria_id como cadena
      finalValue = value
    }

    setFormData({
      ...formData,
      [name]: finalValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (
      formData.nombre.trim() === '' ||
      formData.categoria_id === '' ||
      formData.descripcion.trim() === '' ||
      formData.imagen_url.trim() === ''
    ) {
      alert('Por favor, complete todos los campos requeridos (Nombre, Categoría, Descripción, etc.).')
      setIsSubmitting(false)
      return
    }

    // Asegurar de que el usuario existe antes de intentar obtener su ID
    if (!user || !user.id) {
      alert('Error de autenticación: ID de administrador no disponible.')
      setIsSubmitting(false)
      return
    }

    const productDataToSend = {
      ...formData,
      creado_por: user.id
    }

    try {
      let success
      if (isEditing) {
        // EDICIÓN
        const updatedData = { id: editingId, ...productDataToSend }
        success = await updateProduct(updatedData)
        if (success) {
          alert(`Producto "${success.nombre}" actualizado con éxito! ✅`)
        }
      } else {
        // CREACIÓN
        success = await addProduct(productDataToSend)
        if (success) {
          alert(`Producto "${success.nombre}" añadido con éxito! 🎉`)
        }
      }

      if (success) {
        // Resetear el formulario y el modo de edición
        setFormData({ nombre: '', categoria_id: '', stock: 0, precio: 0, imagen_url: '', descripcion: '' })
        setIsEditing(false)
        setEditingId(null)
      } else {
        alert('Hubo un error al procesar el producto. Intente de nuevo.')
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      alert('Error inesperado al intentar procesar el producto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = (item) => {
    setEditingId(item.id)
    setIsEditing(true)
    setFormData({
      nombre: item.nombre,
      categoria_id: item.categoria_id,
      stock: item.stock,
      precio: item.precio,
      imagen_url: item.imagen_url,
      descripcion: item.descripcion
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteClick = async (id, nombre) => {
    if (window.confirm(`¿Está seguro de eliminar el producto "${nombre}"? Esta acción es irreversible.`)) {
      const success = await deleteProduct(id)
      if (success) {
        alert(`Producto "${nombre}" eliminado con éxito. 🗑️`)
      } else {
        alert(`Error al eliminar el producto "${nombre}".`)
      }
    }
  }

  // NUEVA FUNCIÓN PARA ABRIR EL MODAL
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl)
    setShowModal(true)
  }

  // Función para cerrar el Modal
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedImageUrl('')
  }

  useEffect(() => {
    if (!userLoading && (!user || user.rol !== 'admin')) {
      alert('Acceso denegado. Solo administradores pueden registrar productos.')
      navigate('/')
    }
  }, [user, userLoading, navigate])

  if (userLoading || !user || user.rol !== 'admin') {
    return <Container className='my-5 text-center'><p> Verificando permisos... </p></Container>
  }

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col md={10} lg={8}>

          <Card className='p-4 shadow-lg border-0 rounded-4 mb-5'>
            <h2 className='text-center fw-bold mb-4'> Formulario de Creación de Productos </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label> Nombre del producto: </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Ej: Zapatillas'
                  required
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label> Categoría: </Form.Label>
                    <Form.Select
                      required
                      name='categoria_id'
                      value={formData.categoria_id}
                      onChange={handleChange}
                      disabled={categoriasLoading}
                    >
                      <option value=''> {categoriasLoading ? 'Cargando categorías...' : 'Selecciona una categoría'} </option>
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label> Cantidad: </Form.Label>
                    <Form.Control
                      type='number'
                      min='0'
                      step='1'
                      required
                      name='stock'
                      value={String(formData.stock)}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label> Precio: </Form.Label>
                    <Form.Control
                      type='number'
                      min='0'
                      step='0.01'
                      required
                      name='precio'
                      value={String(formData.precio)}
                      onChange={handleChange}
                    />
                  </Form.Group>

                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label> Imagen (URL):</Form.Label>
                    <Form.Control
                      type='url'
                      placeholder='https://ejemplo.com/imagen.jpg'
                      required
                      name='imagen_url'
                      value={formData.imagen_url}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className='mb-4'>
                <Form.Label> Descripción del producto: </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Describe el producto aquí...'
                  required
                  name='descripcion'
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className='d-grid gap-2'>
                <Button variant='primary' type='submit' size='lg' disabled={isSubmitting}>
                  {isSubmitting
                    ? (isEditing ? 'Guardando...' : 'Añadiendo...')
                    : isEditing
                      ? <><i className='bi bi-save me-2' /> Guardar Cambios </>
                      : <><i className='bi bi-plus-circle me-2' /> Añadir Producto </>}
                </Button>
                {isEditing && (
                  <Button
                    variant='secondary' size='lg' onClick={() => {
                      setIsEditing(false)
                      setEditingId(null)
                      setFormData({ nombre: '', categoria_id: '', stock: 0, precio: 0, imagen_url: '', descripcion: '' })
                    }}
                  >
                    Cancelar Edición
                  </Button>
                )}
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* INICIO DE LA FILA DE LA LISTA DE PRODUCTOS */}
      <Row className='justify-content-center'>
        {/* Ocupamos todo el ancho de la pantalla */}
        <Col xs={12}>

          <Card className='p-4 shadow-lg border-0 rounded-4'>
            <h3 className='card-title text-center mb-4'> Lista de Productos </h3>
            <div className='table-responsive'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th> ID </th>
                    <th> Nombre </th>
                    <th> Categoría </th>
                    <th> Imagen </th>
                    <th> Stock </th>
                    <th> Precio </th>
                    <th> Descripción </th>
                    <th> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length > 0
                    ? productos.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{getCategoryName(item.categoria_id)}</td>
                        <td>
                          {/* Mostramos una imagen pequeña si la URL existe */}
                          {item.imagen_url && (
                            <img
                              src={item.imagen_url}
                              alt={`Imagen de ${item.nombre}`}
                              onClick={() => handleImageClick(item.imagen_url)}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
                            />
                          )}
                        </td>
                        <td>
                          {item.stock}
                        </td>
                        <td>${item.precio ? item.precio.toLocaleString('es-CL') : 'N/A'}</td>
                        <td>{item.descripcion && item.descripcion.length > 50 ? `${item.descripcion.substring(0, 50)}...` : item.descripcion}</td>
                        <td>

                          <div className='d-flex flex-row'>
                            <Button variant='warning' size='sm' className='me-2' onClick={() => handleEditClick(item)}><i className='bi bi-pencil-fill' /></Button>
                            <Button variant='danger' size='sm' onClick={() => handleDeleteClick(item.id, item.nombre)}><i className='bi bi-trash-fill' /></Button>
                          </div>
                        </td>
                      </tr>
                    ))
                    : (
                      <tr key='no-products'>
                        <td colSpan='7' className='text-center text-muted'> No hay productos registrados. </td>
                      </tr>
                      )}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size='xl' centered>
        <Modal.Header closeButton>
          <Modal.Title> Vista Previa de la Imagen </Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-0 text-center'>
          <img
            src={selectedImageUrl}
            alt='Imagen ampliada del producto'
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: 'auto' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default ProductRegister
