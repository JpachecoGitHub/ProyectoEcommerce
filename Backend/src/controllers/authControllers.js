import { createUser, findUserByEmail, updateLastLogin } from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password, direccion, telefono, rol } = req.body

    const fechaActual = new Date().toISOString()
    
    const user = await createUser(nombre, apellido, email, password, direccion, telefono, rol, fechaActual, fechaActual)
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
      return res.status(401).json({ error: 'Credenciales inválidas.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas.' })
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    await updateLastLogin(user.email)

    res.status(200).json({ token })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' })
  }
}
