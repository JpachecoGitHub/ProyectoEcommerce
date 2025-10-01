import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useContext, useRef, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const emailRef = useRef(null)

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
  }, [])

  // Esquema de validación con Yup para el login
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('El correo electrónico debe ser válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
  })

  // Uso de useFormik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const exito = await login(values.email, values.password)
      // console.log('Valores del formulario:', values)

      if (exito) {
        navigate('/Cart')
      }
    }
  })

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col md={8} lg={6}>
          <Card className='p-4 shadow-lg border-0 rounded-4'>
            <h2 className='text-center fw-bold mb-3'> Iniciar Sesión </h2>
            <p className='text-center text-muted mb-4'>
              ¡Bienvenido! Ingresa tus datos para continuar.
            </p>

            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label className='fw-semibold'> Correo electrónico </Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className='bi bi-person' /></InputGroup.Text>
                  <Form.Control
                    ref={emailRef}
                    type='email'
                    placeholder='Ingresa tu correo electrónico'
                    autoComplete='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-4' controlId='formPassword'>
                <Form.Label className='fw-semibold'> Contraseña </Form.Label>
                <InputGroup>
                  <InputGroup.Text><i className='bi bi-lock-fill' /></InputGroup.Text>
                  <Form.Control
                    type='password'
                    placeholder='Ingresa tu contraseña'
                    autoComplete='current-password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Button variant='outline-secondary'>
                    <i className='bi bi-eye-fill' />
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className='d-grid gap-2'>
                <Button variant='primary' type='submit' size='lg' disabled={formik.isSubmitting}>
                  Ingresar
                </Button>
              </div>

              <p className='text-center mt-3 mb-0 text-muted'> ¿No tienes una cuenta? <Link to='/register'> Regístrate aquí </Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
