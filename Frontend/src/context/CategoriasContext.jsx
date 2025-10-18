import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const CategoriasContext = createContext()

const API_CATEGORIAS_URL = 'https://proyectoecommerce-65uo.onrender.com/api/categorias'

// const API_CATEGORIAS_URL = 'http://localhost:5000/api/categorias'

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(API_CATEGORIAS_URL)
      setCategorias(response.data)
    } catch (error) {
      console.error('Error al cargar las categorías:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const stateGlobal = {
    categorias,
    loading
  }

  return (
    <CategoriasContext.Provider value={stateGlobal}>
      {children}
    </CategoriasContext.Provider>
  )
}
