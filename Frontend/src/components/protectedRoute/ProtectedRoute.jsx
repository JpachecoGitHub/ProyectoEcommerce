import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return <div>Cargando perfil...</div>
  }

  if (!user) {
    return <Navigate to='/Login' replace />
  }

  if (allowedRoles) {
    if (!user.rol || !allowedRoles.includes(user.rol)) {
      return <Navigate to='/' replace />
    }
  }

  // renderizar la ruta anidada
  return <Outlet />
}

export default ProtectedRoute
