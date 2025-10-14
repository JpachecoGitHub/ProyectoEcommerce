import { getAllCategories } from '../models/categoryModel.js'

export const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories()
        
        res.status(200).json(categories)

    } catch (error) {
        console.error('Error en CategoryController.getCategories:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor al cargar categorías.',
            error: error.message 
        })
    }
}
