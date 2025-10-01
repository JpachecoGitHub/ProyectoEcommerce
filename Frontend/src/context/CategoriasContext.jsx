import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const CategoriasContext = createContext()

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = 'https://68c1cb0c98c818a694030cb0.mockapi.io/api/v1/items'

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(API_URL)
      const data = response.data

      const uniqueCategories = [...new Set(data.map(item => item.category))]

      const formattedCategories = uniqueCategories.map((cat, index) => ({
        id: index + 1,
        nombre: cat,
        img: data.find(item => item.category === cat).img
      }))

      setCategorias(formattedCategories)
    } catch (error) {
      console.error('Error al cargar las categorías:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const onSelectCategoria = (id) => {
    setCategoriaSeleccionada(id)
  }

  const stateGlobal = {
    categorias,
    categoriaSeleccionada,
    onSelectCategoria,
    loading
  }

  return (
    <CategoriasContext.Provider value={stateGlobal}>
      {children}
    </CategoriasContext.Provider>
  )
}
