import * as productModel from '../models/productModel.js'

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.findAllProducts()
        res.json(products)
    } catch (error) {
        console.error('Error al obtener productos:', error.stack)
        res.status(500).json({ message: 'Error interno del servidor al obtener productos.' })
    }
}


export const createProduct = async (req, res) => {
    try {
        const { nombre, categoria_id, stock, precio, imagen_url, descripcion, creado_por } = req.body

        const savedProduct = await productModel.createProduct({ nombre, categoria_id, stock, precio, imagen_url, descripcion, creado_por })
        res.status(201).json(savedProduct)
    } catch (error) {
        console.error('Error al crear producto:', error.stack)
        res.status(400).json({ message: 'Error al crear producto.', details: error.message })
    }
}


export const updateProduct = async (req, res) => {
    const id = req.params.id
    try {
        const { nombre, categoria_id, stock, precio, imagen_url, descripcion } = req.body

        const updatedProduct = await productModel.updateProduct({ id, nombre, categoria_id, stock, precio, imagen_url, descripcion })
        
        if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado.' })
        
        res.json(updatedProduct)
    } catch (error) {
        console.error('Error al actualizar producto:', error.stack)
        res.status(400).json({ message: 'Error al actualizar producto.', details: error.message })
    }
}


export const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const success = await productModel.deleteProductById(id)

        if (!success) return res.status(404).json({ message: 'Producto no encontrado.' })
        
        res.status(204).send() 
    } catch (error) {
        console.error('Error al eliminar producto:', error.stack)
        res.status(500).json({ message: 'Error al eliminar producto.' })
    }
}
