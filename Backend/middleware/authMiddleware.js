import jwt from 'jsonwebtoken'
import * as userModel from '../src/models/usersModel.js'

export const reportQuery = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] Solicitud entrante: ${req.method} ${req.originalUrl}`)
  next()
}

export const credentials = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos.' })
  }
  next()
}

export const verifyToken = (req, res, next) => {
  try {
    const tokenHeader = req.header('Authorization')

    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado o formato incorrecto (debe ser Bearer <token>).' })
    }

    const token = tokenHeader.replace('Bearer ', '')

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userEmail = decoded.email
    next()
  } catch (error) {
    // console.error('Error al verificar token:', error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' })
    }
    return res.status(401).json({ error: 'Token inválido o mal formado.' })
  }
}


// Verifica si el usuario autenticado tiene el rol 'admin'
export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next()
    } else {
        return res.status(403).json({ message: 'Permiso denegado. Se requiere rol de administrador.' })
    }
}

export const getUserDetails = async (req, res, next) => {
    try {
        if (!req.userEmail) {
            return res.status(401).json({ error: 'Usuario no autenticado.' });
        }
        
        const user = await userModel.findUserByEmail(req.userEmail);
        
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }

        
        req.user = user; 
        next();


    } catch (error) {
        console.error('Error al obtener detalles de usuario:', error);
        res.status(500).json({ error: 'Error interno de autenticación.' });
    }
}