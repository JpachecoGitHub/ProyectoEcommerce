import { Router } from 'express'
import { registerUser, loginUser } from '../../../Proyecto-Final-mio/backend/src/controllers/authControllers.js'
import { getUserData } from '../../../Proyecto-Final-mio/backend/src/controllers/usersControllers.js'
import { credentials, verifyToken } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/usuarios', credentials, registerUser)
router.post('/login', credentials, loginUser)

router.get('/usuarios', verifyToken, getUserData)

export default router
