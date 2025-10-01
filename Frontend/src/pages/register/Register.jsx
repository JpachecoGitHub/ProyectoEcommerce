import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useContext, useRef, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

const Register = () => {
  const { registrarUsuario } = useContext(UserContext)
  const navigate = useNavigate()
  const nombreRef = useRef(null)

  useEffect(() => {
    if (nombreRef.current) {
      nombreRef.current.focus()
    }
  }, [])

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    email: Yup.string().email('El correo electrónico debe ser válido').required('El correo electrónico es obligatorio'),
    direccion: Yup.string().required('La dirección es obligatoria'),
    telefono: Yup.string().required('El número de teléfono es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La confirmación de la contraseña es obligatoria')
  })

  // Uso de useFormik para manejar el formulario y la validación
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      telefono: '',
      password: '',
      password2: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const exito = await registrarUsuario(
        values.nombre,
        values.apellido,
        values.email,
        values.password,
        values.direccion,
        values.telefono
      )
      // console.log('Valores del formulario:', values)

      if (exito) {
        navigate('/Login')
      }
    }
  })

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col md={10} lg={8}>
          <Card className='p-4 shadow-lg border-0 rounded-4'>
            <h2 className='text-center fw-bold mb-3'> Crear Cuenta </h2>
            <p className='text-center text-muted mb-4'>
              Ingresa tus datos para crear una nueva cuenta.
            </p>
            {/* Conectamos el formulario a Formik */}
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    ref={nombreRef}
                    type='text'
                    placeholder='Nombre'
                    name='nombre'
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.nombre && !!formik.errors.nombre}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label> Apellido </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Apellido'
                    name='apellido'
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.apellido && !!formik.errors.apellido}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.apellido}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className='mb-3'>
                <Form.Label> Correo electrónico </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Correo electrónico'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label> Dirección </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Dirección'
                  name='direccion'
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.direccion && !!formik.errors.direccion}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.direccion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label> Teléfono </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Teléfono'
                  name='telefono'
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.telefono && !!formik.errors.telefono}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.telefono}
                </Form.Control.Feedback>
              </Form.Group>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label> Contraseña </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Contraseña'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label> Confirmar contraseña </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirmar contraseña'
                    name='password2'
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password2 && !!formik.errors.password2}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.password2}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div className='d-grid gap-2'>
                <Button variant='primary' type='submit' size='lg' disabled={formik.isSubmitting}>
                  Registrarse
                </Button>
              </div>
              <div className='text-center mt-3'> ¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión aquí</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
