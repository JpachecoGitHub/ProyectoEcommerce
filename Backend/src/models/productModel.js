import pool from '../../db/config.js'


//  OBTENER TODOS LOS PRODUCTOS
const findAllProducts = async () => {
    const query = `
        SELECT 
            p.id, p.nombre, p.descripcion, p.precio, p.stock, 
            p.imagen_url, p.categoria_id,
            c.nombre AS nombre_categoria
        FROM productos AS p
        JOIN categorias AS c ON p.categoria_id = c.id
        ORDER BY p.id ASC;
    `;
    const { rows } = await pool.query(query)
    return rows
}

// CREAR PRODUCTO
const createProduct = async ({ nombre, categoria_id, stock, precio, imagen_url, descripcion, creado_por }) => {
    const query = `
        INSERT INTO productos (nombre, categoria_id, stock, precio, imagen_url, descripcion, creado_por)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `
    
    const values = [nombre, categoria_id, stock, precio, imagen_url, descripcion, creado_por]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

// ACTUALIZAR PRODUCTO
const updateProduct = async ({ id, nombre, categoria_id, stock, precio, imagen_url, descripcion }) => {
    const query = `
        UPDATE productos 
        SET nombre = $2, categoria_id = $3, stock = $4, precio = $5, imagen_url = $6, descripcion = $7
        WHERE id = $1
        RETURNING *
    `
    const values = [id, nombre, categoria_id, stock, precio, imagen_url, descripcion]
    const { rows } = await pool.query(query, values)
    return rows[0]
}

// ELIMINAR PRODUCTO
const deleteProductById = async (id) => {
    const query = 'DELETE FROM productos WHERE id = $1 RETURNING *'
    const { rows } = await pool.query(query, [id])
    return rows.length > 0
}


export {
    findAllProducts,
    createProduct,
    updateProduct,
    deleteProductById
}