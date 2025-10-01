import jwt from 'jsonwebtoken'

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
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userEmail = decoded.email
    next()
  } catch (error) {
    console.error('Error al verificar token:', error)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' })
    }
    return res.status(401).json({ error: 'Token inválido.' })
  }
}
