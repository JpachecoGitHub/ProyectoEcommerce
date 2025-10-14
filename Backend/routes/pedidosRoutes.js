import { Router } from 'express'
import { createOrderController, getPurchaseHistoryController } from '../src/controllers/pedidosController.js'
import { verifyToken } from '../middleware/authMiddleware.js' 


const router = Router()

router.post('/', verifyToken, createOrderController)


router.get('/historial', verifyToken, getPurchaseHistoryController)

export default router