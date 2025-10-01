import { getUserProfile } from '../models/usersModel.js'

export const getUserData = async (req, res) => {
  try {
    const user = await getUserProfile(req.userEmail)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' })
    }
    const { password, ...userData } = user
    res.status(200).json({ user: userData })
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor al obtener datos del usuario.' })
  }
}
