import { createUser, findUserByEmail } from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password, direccion, ciudad, pais, telefono, rol, fechaCreacion, ultimaConexion } = req.body
    const user = await createUser(nombre, apellido, email, password, direccion, ciudad, pais, telefono, rol, fechaCreacion, ultimaConexion)
    res.status(201).json({ message: 'Usuario creado correctamente', user })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(500).json({ error: 'Error interno del servidor al registrar usuario.' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas.' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Credenciales inválidas.' })
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30s' }
    )

    res.status(200).json({ token })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' })
  }
}
