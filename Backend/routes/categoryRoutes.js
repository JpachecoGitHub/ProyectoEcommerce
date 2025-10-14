import express from 'express'
import { getCategories } from '../src/controllers/categoryController.js'

const router = express.Router()

router.get('/', getCategories)

export default router