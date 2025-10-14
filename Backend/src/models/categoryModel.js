import pool from '../../db/config.js'

export const getAllCategories = async () => {
    const query = 'SELECT id, nombre, descripcion, imagen_url FROM categorias ORDER BY nombre'
    try {
        const response = await pool.query(query)
        return response.rows
    } catch (error) {
        console.error('Error en CategoryModel.getAllCategories:', error)
        throw error
    }
}
