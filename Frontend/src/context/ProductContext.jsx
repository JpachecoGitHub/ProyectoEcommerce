import React, { createContext, useState, useEffect } from 'react'

export const ProductosContext = createContext()

const API_HOST = 'https://proyectoecommerce-65uo.onrender.com/api/productos'

// const API_HOST = 'http://localhost:5000/api/productos'

// Creo el proveedor del contexto.
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  const addProduct = async (newProductData) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) throw new Error('Usuario no autenticado. Inicie sesión.')

      const response = await fetch(API_HOST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProductData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido.' }))
        throw new Error(errorData.message || `Error al añadir el producto. Código: ${response.status}`)
      }

      const addedProduct = await response.json()
      setProductos(prevProductos => [...prevProductos, addedProduct])
      return addedProduct
    } catch (error) {
      console.error('Error al añadir producto:', error)
      alert(`Fallo al añadir producto: ${error.message}`)
      return null
    }
  }

  // Cargo los productos desde la API.
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(API_HOST)
        if (!response.ok) {
          throw new Error('Error al cargar los productos')
        }
        const data = await response.json()
        setProductos(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  // FUNCIÓN ELIMINAR
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Usuario no autenticado para esta operación.')

      const response = await fetch(`${API_HOST}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido.' }))
        throw new Error(errorData.message || `Error al eliminar el producto. Código: ${response.status}`)
      }

      setProductos(prevProductos => prevProductos.filter(p => p.id !== id))
      return true
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      alert(`Fallo al eliminar producto: ${error.message}`)
      return false
    }
  }

  // EDITAR
  const updateProduct = async (updatedProductData) => {
    const { id, ...dataToUpdate } = updatedProductData
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Usuario no autenticado para esta operación.')

      const response = await fetch(`${API_HOST}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToUpdate)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido.' }))
        throw new Error(errorData.message || `Error al editar el producto. Código: ${response.status}`)
      }

      const editedProduct = await response.json()

      // Actualiza el estado local mapeando y reemplazando el producto
      setProductos(prevProductos => prevProductos.map(p =>
        p.id === id ? editedProduct : p
      ))
      return editedProduct
    } catch (error) {
      console.error('Error al editar producto:', error)
      alert(`Fallo al editar producto: ${error.message}`)
      return null
    }
  }

  const stateGlobal = {
    productos,
    loading,
    addProduct,
    deleteProduct,
    updateProduct
  }

  return (
    <ProductosContext.Provider value={stateGlobal}>
      {children}
    </ProductosContext.Provider>
  )
}
