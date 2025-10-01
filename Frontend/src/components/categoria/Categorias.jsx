import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading'
import { CategoriasContext } from '../../context/CategoriasContext'
import './Categorias.css'

const Categorias = () => {
  // useContext para obtener los datos y el estado de carga
  const { categorias, loading } = useContext(CategoriasContext)
  const navigate = useNavigate()

  // función para redirección
  const handleCategoryClick = (nombreCategoria) => {
    navigate(`/productos/${encodeURIComponent(nombreCategoria)}`)
  }

  return (
    <section className='categorias-section'>
      <h2 className='categorias-title'> Categorías </h2>
      {loading
        ? (
          <Loading />
          )
        : (
          <div className='categorias-list'>
            {categorias.map((cat, idx) => (
              <button
                className='categoria-item'
                key={idx}
                onClick={() => handleCategoryClick(cat.nombre)}
              >
                <img src={cat.img} alt={cat.nombre} className='categoria-img' />
                <span className='categoria-nombre'>{cat.nombre}</span>
              </button>
            ))}
          </div>
          )}
    </section>
  )
}

export default Categorias
