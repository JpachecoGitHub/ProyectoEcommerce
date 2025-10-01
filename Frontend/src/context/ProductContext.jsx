import React, { createContext, useState, useEffect } from 'react'

export const ProductosContext = createContext()

const API_HOST = 'https://68c1cb0c98c818a694030cb0.mockapi.io/api/v1/items'

// Crea el proveedor del contexto.
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  const addProduct = async (newProductData) => {
    try {
      const API_URL = API_HOST

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData)
      })

      if (!response.ok) throw new Error('Error al añadir el producto.')

      const addedProduct = await response.json()

      setProductos(prevProductos => [...prevProductos, addedProduct])

      return addedProduct
    } catch (error) {
      console.error('Error al añadir producto:', error)
      return null
    }
  }

  // Cargamos los productos desde la API.
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

  const stateGlobal = {
    productos,
    loading,
    addProduct
  }

  return (
    <ProductosContext.Provider value={stateGlobal}>
      {children}
    </ProductosContext.Provider>
  )
}
