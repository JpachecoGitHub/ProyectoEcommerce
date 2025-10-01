import React, { useContext } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'
// Si tienes un logo, descomenta la importación aquí:
// import logo from './logo.png'

const Navigation = () => {
  const { cart } = useContext(CartContext)
  const { token, logout, user } = useContext(UserContext)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  const validateRoot = ({ isActive }) =>
    isActive ? 'nav-link fw-bold text-info' : 'nav-link text-white'

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0d6efd',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
      }
    })
  }

  return (
    <Navbar expand='lg' bg='dark' variant='dark' className='shadow sticky-top py-3'>
      <Container>

        <Navbar.Brand as={Link} to='/' className='fs-4 fw-bolder text-info'>
          {/* {<img src={logo} width="30" height="30" className="d-inline-block align-top me-2" alt="Logo"/>} */}
          Tu Tienda Online
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mx-auto'>
            <NavLink to='/' className={validateRoot}>
              Home
            </NavLink>
            <NavLink to='/productos' className={validateRoot}>
              Nuestros Productos
            </NavLink>
            <NavLink to='/contacto' className={validateRoot}>
              Contáctanos
            </NavLink>

            {/* EL ENLACE DEL ADMINISTRADOR: visible solo si el rol es 'admin' */}
            {token && user && user.roll === 'admin' && (
              <NavLink to='/productRegister' className={validateRoot}>
                {/* Ícono de engranaje de Bootstrap */}
                <i className='bi bi-gear-fill me-1' /> Admin Productos
              </NavLink>
            )}
          </Nav>

          <Nav>
            {token
              ? (
                <>
                  <NavLink to='/profile' className={validateRoot}>
                    Perfil
                  </NavLink>
                  <Nav.Link onClick={handleLogout} className='text-white'>
                    Cerrar Sesión
                  </Nav.Link>
                </>
                )
              : (
                <>
                  <NavLink to='/login' className={validateRoot}>
                    Login
                  </NavLink>
                  <NavLink to='/register' className={validateRoot}>
                    Registrarse
                  </NavLink>
                </>
                )}

            <Link to='/cart' className='nav-link ms-3 position-relative'>

              <i
                className='bi bi-cart4'
                style={{ fontSize: '1.5rem', color: '#0dcaf0' }}
              />

              {totalItems > 0 && (
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  {totalItems}
                </span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
