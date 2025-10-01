# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


-----------------------------------------------------------------------------
Home

{ /* import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; // Asegúrate de que la ruta sea correcta
import { Container, Row, Col } from 'react-bootstrap';

    const URL = 'http://localhost:5000/api/products'; // Reemplaza con la URL de tu API de productos

const Home = () => {
    // Aquí se gestionará la lista de productos y su estado de "me gusta"
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const getProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(URL);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            // Inicializa cada producto con el estado 'isLiked'
            const productsWithLikes = data.map(product => ({
                ...product,
                isLiked: false // O inicialízalo basándote en los datos del usuario
            }));
            setProducts(productsWithLikes);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Función para manejar el "me gusta"
    const handleToggleLike = (productId) => {
        setProducts(currentProducts =>
            currentProducts.map(product =>
                product.id === productId ? { ...product, isLiked: !product.isLiked } : product
            )
        );
    };

    // Función para añadir al carrito (debes integrarla con tu lógica de carrito)
    const addToCart = (product) => {
        // Lógica de carrito, por ejemplo:
        // const { agregarAlCarrito } = useContext(CartContext);
        // agregarAlCarrito(product);
        console.log(`Adding ${product.name} to cart`);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-danger my-5">Error: {error.message}</div>;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Nuestros Productos</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <ProductCard
                            product={product}
                            isLiked={product.isLiked}
                            onToggleLike={handleToggleLike}
                            addToCart={addToCart}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
        <Categorias />
    );
};

export default Home */ }


Productos

{ /* import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Productos = ({ cant, mostrarVerMas = false, categoriaSeleccionada, nombreCategoriaSeleccionada }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = `${URL_BASE}/products`;

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setProductos(data.product);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(prod => prod.categoria_id === categoriaSeleccionada)
        : productos;

    return (
        <section className="productos-section my-5">
            <Container>
                <h2 className="text-center mb-4 fw-bold">
                    {categoriaSeleccionada
                        ? `Productos de ${nombreCategoriaSeleccionada}`
                        : "Productos Destacados"}
                </h2>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Row xs={1} md={2} lg={4} className="g-4">
                            {productosFiltrados.slice(0, cant).map((prod, idx) => (
                                <Col key={idx}>
                                    <Card className="h-100 shadow-sm border-0 rounded-4">
                                        <Card.Img variant="top" src={prod.imagen_url} alt={prod.nombre} className="rounded-top" />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-bold">{prod.nombre}</Card.Title>
                                            <Card.Text className="text-muted">{prod.descripcion}</Card.Text>
                                            <div className="mt-auto">
                                                <div className="fw-bold fs-4 mb-3 text-center text-primary">${parseFloat(prod.precio).toLocaleString('es-CL')}</div>
                                                <Button variant="primary" className="w-100">
                                                    <i className="bi bi-cart-plus-fill me-2"></i>
                                                    Añadir al Carrito
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {mostrarVerMas && (
                            <div className="text-center mt-5">
                                <Link className="btn btn-outline-secondary btn-lg" to="/products">
                                    Ver todos los productos
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
};

export default Productos */ }

productCard
{ /* import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductCard = ({ product, isLiked, onToggleLike, addToCart }) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card className="product-card h-100 shadow-sm border-0 rounded-4">
            <Card.Img variant="top" src={product.image} alt={product.name} className="rounded-top" />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="product-title fw-bold">{product.name}</Card.Title>
                    <Button
                        variant="link"
                        className="p-0 text-danger"
                        onClick={() => onToggleLike(product.id)}
                    >
                        {isLiked ? (
                            <i className="bi bi-heart-fill" style={{ fontSize: '1.5rem' }}></i>
                        ) : (
                            <i className="bi bi-heart" style={{ fontSize: '1.5rem' }}></i>
                        )}
                    </Button>
                </div>
                <Card.Text className="product-description text-muted">
                    {product.description}
                </Card.Text>
                {product.ingredients && (
                    <ul className="list-unstyled mb-2">
                        <small className="text-dark fw-bold">Ingredientes:</small>
                        {product.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-muted"><small>{ingredient}</small></li>
                        ))}
                    </ul>
                )}
                <div className="mt-auto">
                    <div className="product-price fw-bold fs-4 mb-3 text-center text-primary">${product.price.toLocaleString('es-CL')}</div>
                    <div className="d-flex justify-content-between gap-2">
                        <Button
                            variant="outline-secondary"
                            className="w-50"
                            onClick={handleViewMore}
                        >
                            <i className="bi bi-eye-fill me-1"></i>Ver más
                        </Button>
                        <Button
                            variant="primary"
                            className="w-50"
                            onClick={handleAddToCart}
                        >
                            <i className="bi bi-cart-plus-fill me-1"></i>Añadir
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard */ }


profile

{ /* import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar/Navbar';

const Profile = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect to login if the user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/login');
            }
        });
    };

    return (
        <div className="container-fluid bg-light vh-100 p-0">
            <Navbar />
            <main className="container my-5">

                <section className="bg-white p-4 rounded shadow-sm mb-5">
                    <h2 className="mb-4">My Profile</h2>
                    <hr />
                    <div className="row g-4 align-items-start">
                        <div className="col-md-3 text-center">
                            <div className="bg-light border border-secondary d-flex justify-content-center align-items-center mb-3" style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                                <span className="text-secondary">Image</span>
                            </div>
                            <button className="btn btn-dark w-75 mb-3">Add Image</button>
                        </div>
                        <div className="col-md-6">
                            <div className="row mb-2">
                                <div className="col">
                                    <strong>Name:</strong>
                                    <p className="mb-0">{user.nombre || 'N/A'}</p>
                                </div>
                                <div className="col">
                                    <strong>Last Name:</strong>
                                    <p className="mb-0">{user.apellido || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <strong>Email:</strong>
                                    <p className="mb-0">{user.email || 'N/A'}</p>
                                </div>
                                <div className="col">
                                    <strong>Phone:</strong>
                                    <p className="mb-0">{user.telefono || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <strong>Address:</strong>
                                <p className="mb-0">{user.direccion || 'N/A'}</p>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-dark me-2">Edit</button>
                                <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-4 rounded shadow-sm">
                    <h2 className="mb-4">Purchase History</h2>
                    <hr />
                    {purchaseHistory.map(item => (
                        <div key={item.id} className="d-flex align-items-center border-bottom py-3">
                            <div className="me-4 bg-light border" style={{ width: '80px', height: '80px' }}>
                                <img src={item.imageUrl} alt={item.productName} className="img-fluid" />
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="mb-1">{item.productName}</h5>
                                <p className="text-muted mb-0">{item.description}</p>
                            </div>
                            <div className="text-center me-4">
                                <strong className="d-block">${item.price}</strong>
                            </div>
                            <div className="text-center me-4">
                                <small>x{item.quantity}</small>
                            </div>
                            <button className="btn btn-dark">Buy Again</button>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Profile */ }

carrito

{ /* import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, ListGroup, Stack } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de que esto esté en tu App.js o index.js

const Cart = () => {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const navigate = useNavigate();

    // Cargar carrito desde backend al montar
    useEffect(() => {
        fetch('http://localhost:3000/api/carrito')
            .then(res => res.json())
            .then(data => setProductosCarrito(data));
    }, []);

    // Aumentar cantidad
    const aumentarCantidad = (id) => {
        const prod = productosCarrito.find(p => p.id === id);
        if (prod) {
            fetch(`http://localhost:3000/api/carrito/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad: prod.cantidad + 1 })
            })
                .then(res => res.json())
                .then(data => setProductosCarrito(data));
        }
    };

    // Disminuir cantidad
    const disminuirCantidad = (id) => {
        const prod = productosCarrito.find(p => p.id === id);
        if (prod && prod.cantidad > 1) {
            fetch(`http://localhost:3000/api/carrito/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad: prod.cantidad - 1 })
            })
                .then(res => res.json())
                .then(data => setProductosCarrito(data));
        }
    };

    // Eliminar producto
    const eliminarProducto = (id) => {
        fetch(`http://localhost:3000/api/carrito/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => setProductosCarrito(data));
    };

     const productosCarrito = [
        {
            id: 1,
            nombre: 'Producto A',
            descripcion: 'El mejor producto de la tienda.',
            precio: 15000,
            cantidad: 2,
            imagen: 'https://via.placeholder.com/80'
        },
        {
            id: 2,
            nombre: 'Producto B',
            descripcion: 'Un producto B de alta calidad.',
            precio: 8000,
            cantidad: 1,
            imagen: 'https://via.placeholder.com/80'
        }
    ];

    const total = productosCarrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

    // Se eliminó la importación y el render de <Navbar /> ya que se renderiza globalmente en App.js
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4"><i className="bi bi-cart4"></i> Mi Carrito</h2>

            {productosCarrito.length > 0 ? (
                <>
                    <ListGroup className="mb-4">
                        {productosCarrito.map((prod) => (
                            <ListGroup.Item key={prod.id} className="p-3 d-flex justify-content-between align-items-center">
                                <Stack direction="horizontal" gap={3}>
                                    <img src={prod.imagen} alt={prod.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="rounded me-3" />
                                    <div>
                                        <h5 className="mb-0">{prod.nombre}</h5>
                                        <p className="text-muted mb-1">{prod.descripcion}</p>
                                        <Stack direction="horizontal" className="align-items-center" gap={2}>
                                            <Button variant="outline-secondary" size="sm" onClick={() => disminuirCantidad(prod.id)}>-</Button>
                                            <span className="fw-bold">{prod.cantidad}</span>
                                            <Button variant="outline-secondary" size="sm" onClick={() => aumentarCantidad(prod.id)}>+</Button>
                                        </Stack>
                                    </div>
                                </Stack>
                                <div className="text-end">
                                    <h5 className="mb-1">${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</h5>
                                    <Button variant="outline-danger" size="sm" onClick={() => eliminarProducto(prod.id)}>
                                        <i className="bi bi-x-lg"></i>
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Card className="p-4 shadow-sm">
                        <Stack direction="horizontal" className="justify-content-between">
                            <h4>Total:</h4>
                            <h4>${total.toLocaleString('es-CL')}</h4>
                        </Stack>
                        <Button variant="primary" size="lg" className="w-100 mt-3" onClick={() => navigate('/checkout')}>
                            Finalizar compra
                        </Button>
                    </Card>
                </>
            ) : (
                <div className="text-center p-5">
                    <h3>Tu carrito está vacío 😔</h3>
                    <p className="text-muted">¡Agrega algunos productos para continuar!</p>
                </div>
            )}
        </Container>
    );
};

export default Cart; */ }

login

{ /* import React, { useContext, useState } from "react"
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext"

import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('El email debe ser válido')
        .required('El email es obligatorio'),
    password: Yup.string()
        .required('La contraseña es obligatoria')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const Login = () => {
    // const { login } = useContext(UserContext);
    // const navigate = useNavigate();
    // const [showPass, setShowPass] = useState(false);

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="p-4 shadow-lg border-0 rounded-4">
                        <h2 className="text-center fw-bold mb-3">Iniciar Sesión</h2>
                        <p className="text-center text-muted mb-4">
                            ¡Bienvenido! Ingresa tus datos para continuar.
                        </p>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                const { email, password } = values;
                                try {
                                    // Esperamos la promesa de la función login
                                    const success = await login(email, password);
                                    if (success) {
                                        // Si el login fue exitoso, muestra la alerta de éxito
                                        Swal.fire({
                                            icon: 'success',
                                            title: '¡Acceso Concedido!',
                                            text: 'Has iniciado sesión correctamente.',
                                            timer: 2000,
                                            showConfirmButton: false
                                        }).then(() => {
                                            navigate('/'); // Redirige al home
                                        });
                                    } else {
                                        // Si el login falló (por ejemplo, credenciales incorrectas), muestra la alerta de error
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error de Autenticación',
                                            text: 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.',
                                        });
                                    }
                                } catch (error) {
                                    // Maneja cualquier error inesperado
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error Inesperado',
                                        text: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo más tarde.',
                                    });
                                } finally {
                                    setSubmitting(false); // Deshabilita el botón de envío
                                }
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Ingresa tu correo electrónico"
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={touched.email && !!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <Form.Label className="fw-semibold">Contraseña</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="bi bi-lock-fill"></i></InputGroup.Text>
                                            <Form.Control
                                                type={showPass ? "text" : "password"}
                                                name="password"
                                                placeholder="Ingresa tu contraseña"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && !!errors.password}
                                            />
                                            <Button variant="outline-secondary" onClick={() => setShowPass(!showPass)}>
                                                <i className={`bi ${showPass ? "bi-eye-slash-fill" : "bi-eye-fill"}`} />
                                            </Button>
                                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit" disabled={isSubmitting} size="lg">
                                            {isSubmitting ? 'Iniciando sesión...' : 'Ingresar'}
                                        </Button>
                                    </div>

                                    <p className="text-center mt-3 mb-0 text-muted">
                                        ¿No tienes una cuenta? <a href="/register" onClick={() => navigate('/register')}>Regístrate aquí</a>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login */ }

productRegister

{ /* import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

import '../styles/ProductRegister.css'

const ProductRegister = () => {

    const { token } = useContext(UserContext)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = product

        if (!nombre.trim() || !descripcion.trim() || !imagen_url.trim() || !categoria_id) {
            Swal.fire('Error', 'Todos los campos requeridos deben estar llenos.', 'error')
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:5000/api/products', product, config)

            console.log('Producto creado:', response.data)

            Swal.fire({
                icon: 'success',
                title: '¡Producto registrado!',
                text: 'El producto ha sido añadido.',
                timer: 2000,
                showConfirmButton: false
            })

            setProduct({
                nombre: '',
                categoria_id: '',
                stock: 0,
                precio: 0,
                imagen_url: '',
                descripcion: ''
            });

        } catch (error) {
            console.error(error)
            Swal.fire('Error', 'Error al registrar el producto. Inténtalo de nuevo.', 'error');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container my-5">

            <section className="card p-4 shadow-sm mb-5">
                <h2 className="card-title text-center mb-4">Formulario de Creación de Productos</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre del producto:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={product.nombre}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="categoria" className="form-label">Categoría:</label>
                            <select
                                name="categoria"
                                value={product.categoria}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="categoria1">Categoría 1</option>
                                <option value="categoria2">Categoría 2</option>
                                <option value="categoria3">Categoría 3</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                            <div className="input-group">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCantidadChange(-1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    name="cantidad"
                                    value={product.cantidad}
                                    onChange={handleChange}
                                    className="form-control text-center"
                                    min="1"
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCantidadChange(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio:</label>
                        <input
                            type="number"
                            name="precio"
                            value={product.precio}
                            onChange={handleChange}
                            className="form-control"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imagenUrl" className="form-label">Imagen (URL):</label>
                        <input
                            type="url"
                            name="imagenUrl"
                            value={product.imagenUrl}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="form-label">Descripción del producto:</label>
                        <textarea
                            name="descripcion"
                            value={product.descripcion}
                            onChange={handleChange}
                            className="form-control"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >
                            {loading ? 'Añadiendo...' : 'Añadir'}
                        </button>
                    </div>
                </form>
            </section>

            <section className="card p-4 shadow-sm">
                <h3 className="card-title text-center mb-4">Lista de Productos</h3>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre del Producto</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Imagen(URL)</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.length > 0 ? (
                                productsList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${item.precio.toFixed(2)}</td>
                                        <td><a href={item.imagenUrl} target="_blank" rel="noopener noreferrer">Ver Imagen</a></td>
                                        <td>{item.descripcion.length > 50 ? `${item.descripcion.substring(0, 50)}...` : item.descripcion}</td>
                                        <td className='d-flex flex-column'>
                                            <button className="btn btn-warning btn-sm me-2 mb-2">Editar</button>
                                            <button className="btn btn-danger btn-sm">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No hay productos registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default ProductRegister */ }
