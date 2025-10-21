import { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const HOST = 'https://proyectoecommerce-1.onrender.com/api/auth'
const ORDERS_HOST = 'https://proyectoecommerce-1.onrender.com/api/pedidos'

// const HOST = 'http://localhost:5000/api/auth'
// const ORDERS_HOST = 'http://localhost:5000/api/pedidos'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [historialCompra, setHistorialCompra] = useState([])

  const getAuthToken = () => token || localStorage.getItem('token')

  const fetchHistorialCompra = useCallback(async (tokenOverride) => {
    const finalToken = tokenOverride || getAuthToken()

    if (!finalToken) return setHistorialCompra([])

    try {
      const response = await axios.get(`${ORDERS_HOST}/historial`, {
        headers: {
          Authorization: `Bearer ${finalToken}`
        }
      })
      setHistorialCompra(response.data.historial || [])
    } catch (error) {
      console.error('Error al obtener el historial de compras:', error)
      setHistorialCompra([])
    }
  }, [token])

  const recordCompra = async (cartItems, shippingDetails) => {
    const currentToken = getAuthToken()
    if (!currentToken) {
      Swal.fire('Error', 'Debes iniciar sesión para registrar una compra.', 'error')
      return false
    }

    try {
      Swal.fire({
        title: 'Registrando Pedido...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      })

      // Para enviar los ítems del carrito y detalles a la API
      await axios.post(ORDERS_HOST, {
        items: cartItems,
        shipping: shippingDetails
      }, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })

      await fetchHistorialCompra(currentToken)
      Swal.close()
      return true
    } catch (error) {
      console.error('Error al registrar la compra:', error.response?.data || error.message)
      Swal.close()
      Swal.fire('Error', 'Hubo un error al procesar el pedido en el servidor.', 'error')
      return false
    }
  }

  const getProfile = useCallback(async (tokenOverride) => {
    const finalToken = tokenOverride || getAuthToken()

    if (!finalToken) {
      console.warn('Advertencia: No se encontró un token válido. Se omite la solicitud de perfil.')
      setUser(null)
      setLoading(false)
      return null
    }

    setLoading(true)

    try {
      const response = await axios.get(`${HOST}/perfil`, {
        headers: {
          Authorization: `Bearer ${finalToken}`
        }
      })

      const userdata = response.data
      setUser(userdata)

      await fetchHistorialCompra(finalToken)

      return userdata
    } catch (error) {
      console.error('Error al obtener el perfil. Se cerrará la sesión:', error.response?.data || error.message)
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      setHistorialCompra([])
      return null
    } finally {
      setLoading(false)
    }
  }, [token, fetchHistorialCompra])

  const login = async (email, password) => {
    try {
    // Buscamos el usuario con email y contraseña
      const response = await axios.post(`${HOST}/login`, { email, password })
      const newToken = response.data.token

      if (newToken) {
        setToken(newToken)
        localStorage.setItem('token', newToken)
        await getProfile(newToken)
        Swal.fire('Éxito', 'Usuario identificado con éxito 😀.', 'success')
        return true
      }

      Swal.fire('Error', 'Usuario o Contraseña incorrectos 🙁.', 'error')
      return false
    } catch (error) {
      console.error('Error en el login:', error.response?.data || error.message)
      Swal.fire('Error', 'Usuario o Contraseña incorrectos 🙁.', 'error')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setHistorialCompra([])
    localStorage.removeItem('token')
    Swal.fire('Sesión cerrada', 'Has cerrado tu sesión exitosamente.', 'info')
  }

  const registrarUsuario = async (nombre, apellido, email, password, direccion, telefono) => {
    try {
      const datos = { nombre, apellido, email, password, direccion, telefono, rol: 'cliente' }
      await axios.post(`${HOST}/register`, datos)
      Swal.fire('Éxito', 'Usuario registrado exitosamente 😀.', 'success')
      return true
    } catch (error) {
      console.error('Error al registrar al usuario:', error.response?.data || error.message)
      Swal.fire('Error', `Error al registrar al usuario: ${error.response?.data.message || 'Intente de nuevo.'} 🙁.`, 'error')
      return false
    }
  }

  const updateProfile = async (newUserData) => {
    const currentToken = getAuthToken()
    if (!user || !currentToken) {
      Swal.fire('Error', 'Debes iniciar sesión para editar tu perfil.', 'error')
      return false
    }

    try {
      const response = await axios.put(`${HOST}/perfil`, newUserData, {
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      })

      setUser(response.data)
      Swal.fire('Éxito', 'Perfil actualizado correctamente.', 'success')
      return true
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.response?.data || error.message)
      Swal.fire('Error', 'Hubo un error al actualizar el perfil.', 'error')
      return false
    }
  }

  // imagen
  const uploadProfileImage = async (file) => {
    if (!user || !token) {
      Swal.fire('Error', 'Debes iniciar sesión para subir una imagen.', 'error')
      return false
    }

    if (!file) {
      Swal.fire('Error', 'No se seleccionó ningún archivo.', 'error')
      return false
    }

    Swal.fire({
      title: 'Procesando Imagen...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })

    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = async (event) => {
        const base64Image = event.target.result // Esto es la URL en formato base64

        try {
          const response = await axios.put(`${HOST}/perfil`, { imagen_url: base64Image }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          setUser(response.data) // Actualizamos el usuario con la nueva URL de imagen
          Swal.close()
          Swal.fire('Éxito', 'Foto de perfil actualizada.', 'success')
          resolve(true)
        } catch (error) {
          console.error('Error al subir imagen de perfil (Base64):', error.response?.data || error.message)
          Swal.close()
          Swal.fire('Error', 'Hubo un error al actualizar la imagen.', 'error')
          resolve(false)
        }
      }

      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error)
        Swal.close()
        Swal.fire('Error', 'No se pudo leer el archivo de imagen.', 'error')
        resolve(false)
      }

      reader.readAsDataURL(file) // Convierte el archivo a Base64 URL
    })

    // Swal.fire('Atención', 'La función de subida de imagen está en desarrollo. No se realizará la subida al servidor.', 'info')
    // return true
  }

  useEffect(() => {
    if (getAuthToken()) {
      getProfile()
    } else {
      setLoading(false)
    }
  }, [getProfile])

  const stateGlobal = {
    user,
    loading,
    token,
    historialCompra,
    setHistorialCompra,
    login,
    logout,
    registrarUsuario,
    getProfile,
    updateProfile,
    uploadProfileImage,
    recordCompra,
    fetchHistorialCompra
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}
