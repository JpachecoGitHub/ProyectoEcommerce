import pool from '../../db/config.js'
import bcrypt from 'bcryptjs'

export const createUser = async (nombre, apellido, email, password, direccion, ciudad, pais, telefono, rol, fechaCreacion, ultimaConexion) => {
  const hashedPassword = bcrypt.hashSync(password)
  const SQLquery = {
    text: 'INSERT INTO usuarios (nombre, apellido, email, password, direccion, ciudad, pais, telefono, rol, fecha_creacion, ultima_conexion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING nombre, apellido, email, direccion, ciudad, pais, telefono, rol, fecha_creacion, ultima_conexion',
    values: [nombre, apellido, email, hashedPassword, direccion, ciudad, pais, telefono, rol, fechaCreacion, ultimaConexion]
  }

  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const findUserByEmail = async (email) => {
  const SQLquery = {
    text: 'SELECT id, nombre, apellido, email, hashedPassword, direccion, ciudad, pais, telefono, rol, fecha_creacion, ultima_conexion FROM usuarios WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const getUserProfile = async (email) => {
  const SQLquery = {
    text: 'SELECT id, nombre, apellido, email, hashedPassword, direccion, ciudad, pais, telefono, rol, fecha_creacion, ultima_conexion FROM usuarios WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}
