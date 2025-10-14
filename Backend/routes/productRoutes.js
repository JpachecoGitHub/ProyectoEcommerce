import express from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../src/controllers/productController.js'
import { verifyToken, getUserDetails, verifyAdmin } from '../middleware/authMiddleware.js' 

const router = express.Router()

// RUTAS PÚBLICAS
router.get('/', getProducts) 

// RUTAS PROTEGIDAS POR ADMIN
router.post('/', verifyToken, getUserDetails, verifyAdmin, createProduct)
router.put('/:id', verifyToken, getUserDetails, verifyAdmin, updateProduct)
router.delete('/:id', verifyToken, getUserDetails, verifyAdmin, deleteProduct)


export default router