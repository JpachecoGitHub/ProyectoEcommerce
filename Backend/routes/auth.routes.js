import { Router } from 'express'
import { registerUser, loginUser } from '../src/controllers/authControllers.js'
import { getUserData, updateUserController } from '../src/controllers/usersControllers.js'
import { credentials, verifyToken } from '../middleware/authMiddleware.js'


const router = Router()

router.post('/register', credentials, registerUser)
router.post('/login', credentials, loginUser)

router.get('/perfil', verifyToken, getUserData)

router.put('/perfil', verifyToken, updateUserController)


export default router
