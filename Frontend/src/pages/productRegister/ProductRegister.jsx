import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import { ProductosContext } from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom'

const ProductRegister = () => {
  const { user, loading: userLoading } = useContext(UserContext)
  const { productos, addProduct } = useContext(ProductosContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    cantidad: 0,
    precio: 0,
    imagenUrl: '',
    descripcion: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (formData.nombre.trim() === '' || formData.categoria === '') {
      alert('Por favor, complete todos los campos requeridos.')
      setIsSubmitting(false)
      return
    }

    try {
      const success = await addProduct(formData)

      if (success) {
        alert(`Producto "${success.nombre}" añadido con éxito! 🎉`)
        setFormData({
          nombre: '',
          categoria: '',
          cantidad: 0,
          precio: 0,
          imagenUrl: '',
          descripcion: ''
        })
      } else {
        alert('Hubo un error al añadir el producto. Intente de nuevo.')
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      alert('Error inesperado al intentar añadir el producto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!userLoading && (!user || user.roll !== 'admin')) {
      alert('Acceso denegado. Solo administradores pueden registrar productos.')
      navigate('/')
    }
  }, [user, userLoading, navigate])

  if (userLoading || !user || user.roll !== 'admin') {
    return <Container className='my-5 text-center'><p> Verificando permisos... </p></Container>
  }

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col md={10} lg={8}>

          <Card className='p-4 shadow-lg border-0 rounded-4 mb-5'>
            <h2 className='text-center fw-bold mb-4'>Formulario de Creación de Productos</h2>
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
                      name='categoria'
                      value={formData.categoria}
                      onChange={handleChange}
                    >

                      <option value=''> Selecciona una categoría </option>
                      <option value='categoria1'> Electrónica </option>
                      <option value='categoria2'> Ropa </option>
                      <option value='categoria3'> Hogar </option>
                    </Form.Select>
                  </Form.Group>

                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label> Cantidad: </Form.Label>
                    <Form.Control
                      type='number'
                      min='0'
                      required
                      name='cantidad'
                      value={formData.cantidad}
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
                      value={formData.precio}
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
                      name='imagenUrl'
                      value={formData.imagenUrl}
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
                  {isSubmitting ? 'Añadiendo...' : <><i className='bi bi-plus-circle me-2' /> Añadir Producto </>}
                </Button>
              </div>
            </Form>
          </Card>

          <Card className='p-4 shadow-lg border-0 rounded-4'>
            <h3 className='card-title text-center mb-4'> Lista de Productos </h3>
            <div className='table-responsive'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th> ID </th>
                    <th> Nombre </th>
                    <th> Categoría </th>
                    <th> Cantidad </th>
                    <th> Precio </th>
                    <th> Descripción </th>
                    <th> Acciones </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length > 0
                    ? (
                        productos.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.categoria}</td>
                            <td>{item.cantidad}</td>
                            <td>${item.precio ? item.precio.toLocaleString('es-CL') : 'N/A'}</td>
                            <td>{item.descripcion && item.descripcion.length > 50 ? `${item.descripcion.substring(0, 50)}...` : item.descripcion}</td>
                            <td>
                              <Button variant='warning' size='sm' className='me-2 mb-1'>
                                <i className='bi bi-pencil-fill' />
                              </Button>
                              <Button variant='danger' size='sm'>
                                <i className='bi bi-trash-fill' />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )
                    : (
                      <tr>
                        <td colSpan='7' className='text-center text-muted'> No hay productos registrados. </td>
                      </tr>
                      )}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductRegister
