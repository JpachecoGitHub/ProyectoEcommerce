import React from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: Yup.string()
    .email('El email debe ser válido')
    .required('El email es obligatorio'),
  mensaje: Yup.string()
    .required('El mensaje es obligatorio')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
})

const Contactanos = () => {
  return (
    <Container className='my-5'>
      <h1 className='text-center mb-4'>Contáctanos</h1>
      <Row className='justify-content-center'>
        <Col md={8} lg={6}>
          <Card className='p-4 shadow-sm mb-4'>
            <h4 className='mb-3'>Envíanos un Mensaje</h4>
            <Formik
              initialValues={{ nombre: '', email: '', mensaje: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                // Enviamos el formulario al backend
                console.log('Formulario enviado:', values)
                // Simulación de envío
                setTimeout(() => {
                  alert('¡Mensaje enviado con éxito!')
                  resetForm()
                  setSubmitting(false)
                }, 400)
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formNombre'>
                    <Form.Label> Nombre </Form.Label>
                    <Form.Control
                      type='text'
                      name='nombre'
                      value={values.nombre}
                      onChange={handleChange}
                      isInvalid={touched.nombre && !!errors.nombre}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formEmail'>
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formMensaje'>
                    <Form.Label> Mensaje </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={4}
                      name='mensaje'
                      value={values.mensaje}
                      onChange={handleChange}
                      isInvalid={touched.mensaje && !!errors.mensaje}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.mensaje}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant='primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>

      <Row className='mt-5 justify-content-center'>
        <Col md={10}>
          <Card className='p-4 shadow-sm'>
            <h4 className='mb-3'> Nuestra Ubicación y Contacto </h4>
            <Row>
              <Col md={6}>
                <p><strong> Dirección: </strong> Av. Walker martinez 1100, Santiago, Chile</p>
                <p><strong> Teléfono: </strong> +56 2 2555 1234 </p>
                <p><strong> Email: </strong> contacto@micarro.cl</p>
                <p><strong> Horario: </strong> Lunes a Viernes, 9:00 - 18:00 hrs.</p>
              </Col>
              <Col md={6} className='mt-4 mt-md-0'>
                <div style={{ height: '300px', width: '100%' }} className='rounded-3 overflow-hidden'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.657572714421!2d-70.57467662491143!3d-33.51528629082352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d04a62174d15%3A0x673c431d1d8a1f82!2sAv.%20Walker%20Mart%C3%ADnez%201100%2C%20La%20Florida%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2scl!4v1717320491851!5m2!1ses-419!2scl'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen=''
                    loading='lazy'
                    title='Ubicación de nuestra tienda'
                    referrerPolicy='no-referrer-when-downgrade'
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Contactanos
