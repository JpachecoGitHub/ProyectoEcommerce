import { Router } from 'express'
import { registerUser, loginUser } from '../src/controllers/authControllers.js'
import { getUserData, updateUserController } from '../src/controllers/usersControllers.js'
import { credentials, verifyToken } from '../middleware/authMiddleware.js'


const router = Router()

router.post('/api/register', credentials, registerUser)
router.post('/api/login', credentials, loginUser)

router.get('/api/perfil', verifyToken, getUserData)

router.put('/api/perfil', verifyToken, updateUserController)


export default router
