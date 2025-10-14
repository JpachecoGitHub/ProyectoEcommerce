import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import './ProductCard.css'

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className='product-card h-100'>

      <Link to={`/producto/${product.id}`} className='text-decoration-none text-dark'>

        <div className='ratio ratio-1x1'>
          <Card.Img
            variant='top'
            src={product.imagen_url}
            alt={product.nombre}
            className='object-fit-cover'
          />
        </div>
        <Card.Body className='d-flex flex-column'>
          <Card.Title className='product-title'>{product.nombre}</Card.Title>
          <Card.Text className='product-description'>{product.descripcion}</Card.Text>
        </Card.Body>

      </Link>

      <div className='mt-auto'>
        <div className='product-price'>${parseFloat(product.precio).toFixed(2)}</div>
        <Button
          className='btn-coffee w-100'
          onClick={() => addToCart(product)}
        >
          Agregar al Carrito
        </Button>
      </div>

    </Card>
  )
}

export default ProductCard
