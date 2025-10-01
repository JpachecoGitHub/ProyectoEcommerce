import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const HOST = 'https://68c1cb0c98c818a694030cb0.mockapi.io/api/v1/users'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [purchaseHistory] = useState([])

  const login = async (email, password) => {
    try {
    // Buscamos el usuario con email y contraseña
      const response = await axios.get(`${HOST}?email=${email}&password=${password}`)
      const foundUser = response.data[0]

      if (foundUser) {
        const newToken = foundUser.id
        setToken(newToken)
        localStorage.setItem('token', newToken)
        await getProfile(newToken)
        Swal.fire('Éxito', 'Usuario identificado con éxito 😀.', 'success')
        return true
      } else {
        Swal.fire('Error', 'Usuario o Contraseña incorrectos 🙁.', 'error')
        return false
      }
    } catch (error) {
      console.error('Error en el login:', error.response?.data || error.message)
      Swal.fire('Error', 'Usuario o Contraseña incorrectos 🙁.', 'error')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    Swal.fire('Sesión cerrada', 'Has cerrado tu sesión exitosamente.', 'info')
  }

  const getProfile = async (tokenToUse = token) => {
    setLoading(true)
    if (!tokenToUse) {
      console.error('No se encontró un token para obtener el perfil.')
      setLoading(false)
      return null
    }

    try {
      const response = await axios.get(`${HOST}/${tokenToUse}`)
      const userdata = response.data
      setUser(userdata)
      return userdata
    } catch (error) {
      console.error('Error al obtener el perfil:', error.response?.data || error.message)
      logout()
      return null
    } finally {
      setLoading(false)
    }
  }

  const registrarUsuario = async (nombre, apellido, email, password, direccion, telefono) => {
    try {
      const datos = { nombre, apellido, email, password, direccion, telefono }
      await axios.post(HOST, datos)
      Swal.fire('Éxito', 'Usuario registrado exitosamente 😀.', 'success')
      return true
    } catch (error) {
      console.error('Error al registrar al usuario:', error.response?.data || error.message)
      Swal.fire('Error', `Error al registrar al usuario: ${error.response?.data.message || 'Intente de nuevo.'} 🙁.`, 'error')
      return false
    }
  }

  const updateProfile = async (newUserData) => {
    if (!user || !token) {
      Swal.fire('Error', 'Debes iniciar sesión para editar tu perfil.', 'error')
      return false
    }

    try {
      const response = await axios.put(`${HOST}/${token}`, newUserData)
      setUser(response.data)
      Swal.fire('Éxito', 'Perfil actualizado correctamente.', 'success')
      return true
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.response?.data || error.message)
      Swal.fire('Error', 'Hubo un error al actualizar el perfil.', 'error')
      return false
    }
  }

  const uploadProfileImage = async (file) => {
    if (!user || !token) {
      Swal.fire('Error', 'Debes iniciar sesión para subir una imagen.', 'error')
      return false
    }

    // URL de prueba
    const mockImageUrl = `https://picsum.photos/150/150?random=${Date.now()}`

    try {
      const newUserData = { ...user, imageUrl: mockImageUrl }

      const response = await axios.put(`${HOST}/${token}`, newUserData)

      // Actualizamos el estado del usuario localmente
      setUser(response.data)
      Swal.fire('Éxito', 'Foto de perfil actualizada.', 'success')
      return true
    } catch (error) {
      console.error('Error al subir la imagen:', error.response?.data || error.message)
      Swal.fire('Error', 'Hubo un error al subir la foto.', 'error')
      return false
    }
  }

  useEffect(() => {
    getProfile()
  }, [token])

  const stateGlobal = {
    user,
    loading,
    token,
    purchaseHistory,
    login,
    logout,
    registrarUsuario,
    getProfile,
    updateProfile,
    uploadProfileImage
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}
