import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'

import imagen1 from '../../assets/imgs/imagen1.jpg'
import imagen2 from '../../assets/imgs/imagen2.jpg'
import imagen3 from '../../assets/imgs/imagen3.jpg'

const CarruselDeImagenes = () => {
  return (
    <Container fluid className='p-0'>
      <Row className='g-0'>
        <Col>
          <Carousel indicators controls fade>
            {/* Primer Slide */}
            <Carousel.Item interval={4000} className='carousel-item-custom'>
              <div className='carousel-overlay' />
              <img
                className='d-block w-100 carousel-image-custom'
                src={imagen1}
                alt='Café de grano premium'
              />

              {/* <Carousel.Caption className='text-center d-flex flex-column align-items-center justify-content-center h-100'>
                <p className='fw-bold fs-5 text-uppercase mb-2 animate__animated animate__fadeInUp'> ¡Aroma y Sabor! </p>
                <h1 className='display-3 fw-bolder animate__animated animate__fadeInUp animate__delay-1s'> Descubre la Magia del Café </h1>
                <p className='lead mt-3 w-75 animate__animated animate__fadeInUp animate__delay-2s'>
                  Granos seleccionados para despertar tus sentidos y ofrecerte una experiencia inigualable.
                </p>

                 <a href='#productos' className='btn btn-light btn-lg mt-4 animate__animated animate__fadeInUp animate__delay-3s'>
                  Ver productos
                </a>

              </Carousel.Caption> */}

            </Carousel.Item>

            {/* Segundo Slide */}
            <Carousel.Item interval={4000} className='carousel-item-custom'>
              <div className='carousel-overlay' />
              <img
                className='d-block w-100 carousel-image-custom'
                src={imagen2}
                alt='Ambiente acogedor'
              />

              {/* <Carousel.Caption className='text-center d-flex flex-column align-items-center justify-content-center h-100'>
                <h1 className='display-3 fw-bolder animate__animated animate__fadeInUp'>El Rincón Perfecto</h1>
                <p className='lead mt-3 w-75 animate__animated animate__fadeInUp animate__delay-1s'>
                  Sumérgete en un mundo de tranquilidad con el mejor café.
                </p>
                <a href='#about' className='btn btn-light btn-lg mt-4 animate__animated animate__fadeInUp animate__delay-2s'>
                  Conoce nuestra historia
                </a>
              </Carousel.Caption> */}

            </Carousel.Item>

            {/* Tercer Slide */}
            <Carousel.Item interval={4000} className='carousel-item-custom'>
              <div className='carousel-overlay' />
              <img
                className='d-block w-100 carousel-image-custom'
                src={imagen3}
                alt='Postres y repostería'
              />

              {/* <Carousel.Caption className='text-center d-flex flex-column align-items-center justify-content-center h-100'>
                <h1 className='display-3 fw-bolder animate__animated animate__fadeInUp'>Más que Café</h1>
                <p className='lead mt-3 w-75 animate__animated animate__fadeInUp animate__delay-1s'>
                  Acompaña tu bebida favorita con nuestra exquisita repostería artesanal.
                </p>
                <a href='#pasteleria' className='btn btn-light btn-lg mt-4 animate__animated animate__fadeInUp animate__delay-2s'>
                  Ver menú completo
                </a>
              </Carousel.Caption> */}

            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default CarruselDeImagenes
