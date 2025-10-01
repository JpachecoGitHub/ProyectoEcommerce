import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap'
import { ProductosContext } from '../../context/ProductContext'
import './ProductDetalle.css'

const ProductDetail = () => {
  const { productos, loading } = useContext(ProductosContext)
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    if (productos.length > 0) {
      const productoEncontrado = productos.find(p => p.id === id)
      setProducto(productoEncontrado)
    }
  }, [id, productos])

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
              <Image src={producto.img} alt={producto.name} fluid rounded className='shadow-sm' />
            </div>
            <div className='product-detail-info text-center text-md-start'>
              <h1 className='product-detail-title fw-bold'>{producto.name}</h1>
              <p className='product-detail-price fs-3 fw-bold text-primary'>${parseFloat(producto.price).toLocaleString('es-CL')}</p>
              <p className='product-detail-description text-muted'>{producto.description}</p>
              <Button variant='primary' size='lg' className='w-100'>
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
