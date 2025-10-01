import React, { createContext, useState } from 'react'
import Swal from 'sweetalert2'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const numericPrice = Number(product.price)

    // Buscamos si el producto ya existe en el carrito
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      // Si existe, aumentamos la cantidad
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      // Si no existe, lo agrega con cantidad 1
      setCart([...cart, { ...product, price: numericPrice, quantity: 1 }])
    }
  }

  // Función para aumentar la cantidad de un producto
  const aumentar = (productId) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  }

  // Función para disminuir la cantidad de un producto
  const disminuir = (productId) => {
    const existingItem = cart.find(item => item.id === productId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    } else {
      // Si la cantidad es 1, lo eliminamos
      eliminarDelCart(productId)
    }
  }

  // Función para eliminar un producto del carrito
  const eliminarDelCart = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter(item => item.id !== productId))
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado del carrito.', 'success')
      }
    })
  }

  // Función para calcular el total
  const calcularTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const vaciarCart = () => {
    setCart([])
  }

  const stateGlobal = {
    cart,
    addToCart,
    aumentar,
    disminuir,
    eliminarDelCart,
    calcularTotal,
    vaciarCart
  }

  return (
    <CartContext.Provider value={stateGlobal}>
      {children}
    </CartContext.Provider>
  )
}
