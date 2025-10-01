import React, { useContext } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'

const Cart = () => {
  const { cart, aumentar, disminuir, calcularTotal, eliminarDelCart } = useContext(CartContext)
  const { token } = useContext(UserContext)
  const navigate = useNavigate()

  const checkout = () => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión para proceder al pago.'
      })
    } else {
      navigate('/formularioPago')
    }
  }

  return (
    <Container className='my-5'>
      <h2 className='text-center mb-4'> Carrito de Compras </h2>

      <Row className='justify-content-center'>
        <Col md={8}>
          {cart.length === 0
            ? (
              <div className='text-center p-5'>
                <h3>El carrito está vacío 😢</h3>
              </div>
              )
            : (
              <>
                {cart.map((item) => (
                  <Card className='mb-3' key={item.id}>
                    <Row className='g-0 align-items-center'>
                      <Col md={4} className='d-flex justify-content-center p-3'>
                        <Card.Img
                          src={item.img}
                          alt={item.name}
                          style={{ height: '150px', width: '150px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <div className='d-flex justify-content-between align-items-center'>
                            <Card.Title className='text-capitalize'>{item.name}</Card.Title>
                            <Card.Text className='fw-bold'>${item.price.toFixed(2)}</Card.Text>
                          </div>
                          <div className='d-flex justify-content-between align-items-center mt-3'>
                            <div className='d-flex align-items-center gap-2'>
                              <Button
                                variant='outline-danger'
                                size='sm'
                                onClick={() => disminuir(item.id)}
                              >
                                -
                              </Button>
                              <span>{item.quantity}</span>
                              <Button
                                variant='outline-success'
                                size='sm'
                                onClick={() => aumentar(item.id)}
                              >
                                +
                              </Button>
                            </div>
                            <Button variant='danger' size='sm' onClick={() => eliminarDelCart(item.id)}>
                              Eliminar
                            </Button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <div className='text-center mt-4'>
                  <h3>Total: ${calcularTotal(cart).toFixed(2)}</h3>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                  <Button
                    variant='dark'
                    className='btn-block'
                    onClick={checkout}
                    disabled={cart.length === 0}
                  >
                    {token ? 'Pagar' : 'Inicia sesión para pagar'}
                  </Button>
                </div>
              </>
              )}
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
