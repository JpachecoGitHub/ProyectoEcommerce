import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ProductosContext } from '../../context/ProductContext'
import { CartContext } from '../../context/CartContext'
import { useParams } from 'react-router-dom'
import ProductCard from '../productCard/ProductCard'

const Productos = () => {
  const { productos, loading } = useContext(ProductosContext)
  const { addToCart } = useContext(CartContext)
  const { categoria } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [categoria])

  // Filtro los productos por categoría seleccionada
  const productosFiltrados = categoria
    ? productos.filter(prod => prod.category === decodeURIComponent(categoria))
    : productos

  const tituloPagina = categoria
    ? `Productos de la categoría ${decodeURIComponent(categoria)}`
    : 'Todos nuestros productos'

  return (
    <section className='productos-section my-5'>
      <Container>
        <h2 className='text-center mb-4 fw-bold'>
          {tituloPagina}
        </h2>

        {loading
          ? (
            <p> Cargando productos...</p>
            )
          : (
            <Row xs={1} md={2} lg={4} className='g-4'>
              {productosFiltrados.length > 0
                ? (
                    productosFiltrados.map((product) => (
                      <Col key={product.id}>
                        <ProductCard product={product} addToCart={addToCart} />
                      </Col>
                    ))
                  )
                : (
                  <Col>
                    <p> No se encontraron productos en esta categoría. </p>
                  </Col>
                  )}
            </Row>
            )}
      </Container>
    </section>
  )
}

export default Productos
