import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Categorias from '../../components/categoria/Categorias'
import CarruselDeImagenes from '../../components/carrusel/Carrusel'
import { ProductosContext } from '../../context/ProductContext'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/productCard/ProductCard'
import { CartContext } from '../../context/CartContext'

// Función para aleatorizar un array
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const Home = () => {
  const { productos, loading } = useContext(ProductosContext)
  const { addToCart } = useContext(CartContext)

  // Si los datos se están cargando, mostramos un mensaje o componente de carga
  if (loading) {
    return (
      <Container className='my-5 text-center'>
        <p> Cargando productos... </p>
      </Container>
    )
  }

  const productosAleatorios = shuffleArray(productos).slice(0, 9)

  return (
    <>
      <CarruselDeImagenes />
      <Categorias />
      <Container className='my-5'>
        <h1 className='text-center mb-4'> Nuestros Productos </h1>
        <Row xs={1} md={2} lg={3} className='g-4'>
          {productosAleatorios.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Col>
          ))}
        </Row>
        <div className='text-center my-4'>
          <Link to='/productos' className='btn btn-primary btn-lg'> Ver productos </Link>
        </div>
      </Container>
    </>
  )
}

export default Home
