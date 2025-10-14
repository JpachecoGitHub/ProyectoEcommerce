import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap'
import { ProductosContext } from '../../context/ProductContext'
import { CartContext } from '../../context/CartContext'
import Swal from 'sweetalert2'
import './ProductDetalle.css'

const ProductDetail = () => {
  const { productos, loading } = useContext(ProductosContext)
  const { addToCart } = useContext(CartContext)
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    if (productos.length > 0) {
      const productoEncontrado = productos.find(p => p.id === id)
      setProducto(productoEncontrado)
    }
  }, [id, productos])

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto)
      Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: `${producto.nombre} se añadió al carrito.`,
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  if (loading) {
    return <Container className='text-center my-5'><Spinner animation='border' /></Container>
  }

  if (!producto) {
    return <Container className='text-center my-5'><p> Producto no encontrado. </p></Container>
  }

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col md={10} lg={8}>
          <div className='d-flex flex-column flex-md-row align-items-center justify-content-center'>
            <div className='product-detail-image-container me-md-4 mb-4 mb-md-0'>
              <Image src={producto.imagen_url} alt={producto.nombre} fluid rounded className='shadow-sm' />
            </div>
            <div className='product-detail-info text-center text-md-start'>
              <h1 className='product-detail-title fw-bold'>{producto.nombre}</h1>
              <p className='product-detail-price fs-3 fw-bold text-primary'>${parseFloat(producto.precio).toLocaleString('es-CL')}</p>
              <p className='product-detail-description text-muted'>{producto.descripcion}</p>
              <Button variant='primary' size='lg' className='w-100' onClick={handleAddToCart}>
                <i className='bi bi-cart-plus-fill me-2' />
                Añadir al Carrito
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
