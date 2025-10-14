import pool from '../../db/config.js'
import bcrypt from 'bcryptjs'

export const createUser = async (nombre, apellido, email, password, direccion, telefono, rol, fechaCreacion, ultimaConexion) => {
  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)

  const SQLquery = {
    text: 'INSERT INTO usuarios (nombre, apellido, email, password, direccion, telefono, rol, fecha_creacion, ultima_conexion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING nombre, apellido, email, direccion, telefono, rol, fecha_creacion, ultima_conexion',
    values: [nombre, apellido, email, hashedPassword, direccion, telefono, rol, fechaCreacion, ultimaConexion]
  }

  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const findUserByEmail = async (email) => {
  const SQLquery = {
    text: 'SELECT id, nombre, apellido, email, password, direccion, telefono, imagen_url, rol, fecha_creacion, ultima_conexion FROM usuarios WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}


// src/models/usersModel.js (AGREGAR O VERIFICAR ESTA FUNCIÓN)

export const updateUserByEmail = async (email, updateData) => {
    // 1. Filtrar solo los campos que tienen valor
    if (updateData.password) {
        const saltRounds = 10;
        updateData.password = bcrypt.hashSync(updateData.password, saltRounds); // Hashear la nueva contraseña
    } else {
        // 🚨 CORRECCIÓN CLAVE: Asegurarse de que el campo 'password' no se incluya en el UPDATE si no se cambia.
        delete updateData.password; 
    }
    
    const fields = Object.keys(updateData).filter(key => updateData[key] !== undefined);

    
    if (fields.length === 0) {
      return null; // Nada que actualizar
    }

    // 2. Construir la parte SET de la consulta
    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    // 3. Crear el array de valores para la consulta
    const values = fields.map(field => updateData[field]);
    
    // 4. El email es el último valor ($[fields.length + 1])
    values.push(email)

    const SQLquery = {
        text: `UPDATE usuarios SET ${setClauses} WHERE email = $${values.length} RETURNING *`,
        values: values
    };

    const response = await pool.query(SQLquery)
    return response.rows[0]
}


export const updateLastLogin = async (email) => {
  const SQLquery = {
 // Actualiza 'ultima_conexion' a la hora actual de la base de datos
    text: 'UPDATE usuarios SET ultima_conexion = NOW() WHERE email = $1',
    values: [email]
  }
  await pool.query(SQLquery)
}
