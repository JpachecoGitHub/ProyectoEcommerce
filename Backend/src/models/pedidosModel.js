import pool from '../../db/config.js'

export const createOrder = async (userId, items, shippingDetails) => {
    
    if (!userId) {
        throw new Error("User ID is missing or invalid.");
    }

    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        // Calculate Total
        const total = items.reduce((sum, item) => sum + (item.quantity * item.precio), 0);
        const finalDireccion = shippingDetails.direccion || 'Sin dirección especificada';
        const finalMetodoPago = shippingDetails.metodo_pago || 'Tarjeta de Crédito';
        const finalTransaccion = shippingDetails.id_transaccion_pago || 'TRANS-' + Date.now().toString();

        // Insert Order Header (pedidos)
        const orderQuery = {
            text: `
                INSERT INTO pedidos (usuario_id, fecha_pedido, estado_pedido, total, direccion_envio, metodo_pago, id_transaccion_pago)
                VALUES ($1, NOW(), 'pendiente', $2, $3, $4, $5)
                RETURNING id
            `,
            values: [
                userId, 
                total, 
                finalDireccion, 
                finalMetodoPago, 
                finalTransaccion
            ]
        }
        const orderResult = await client.query(orderQuery)
        const pedidoId = orderResult.rows[0].id

        // Insert Order Details (detalle_pedido)
        for (const item of items) {
            // Check constraint: cantidad > 0 and subtotal >= 0
            if (item.quantity <= 0 || item.precio < 0) {
                throw new Error(`Invalid quantity or price for item ${item.id}`);
            }
            
            const subtotal = item.quantity * item.precio;
            
            const detailQuery = {
                text: `
                    INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
                    VALUES ($1, $2, $3, $4, $5)
                `,
                values: [pedidoId, item.id, item.quantity, item.precio, subtotal]
            }
            await client.query(detailQuery)
        }
        
        // Commit Transaction
        await client.query('COMMIT')
        
        return { id: pedidoId, success: true }

    } catch (error) {
        
        await client.query('ROLLBACK')
        console.error("❌ --- ERROR CRÍTICO DE POSTGRESQL DETALLADO --- ❌");
        console.error("Código SQL:", error.code); // Look for 23502 (NOT NULL) or 23514 (CHECK)
        console.error("Mensaje de BD:", error.detail || error.message); 
        
        
        throw error 
    } finally {
        client.release()
    }
}


export const getPurchaseHistoryByEmail = async (email) => {
    // Necesitas el ID del usuario para filtrar los pedidos
    const userResult = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (userResult.rowCount === 0) return [];
    // const userId = userResult.rows[0].id;

    // Consulta para unir pedidos, detalle_pedido y productos
    const SQLquery = {
        text: `
            SELECT
                p.id,                  
                p.nombre,              
                p.descripcion,        
                dp.precio_unitario AS precio, 
                dp.cantidad AS quantity, 
                p.imagen_url           
            FROM
                detalle_pedido dp
            JOIN 
                pedidos pe ON dp.pedido_id = pe.id
            JOIN 
                productos p ON dp.producto_id = p.id
            JOIN
                usuarios u ON pe.usuario_id = u.id
            WHERE 
                u.email = $1; 
        `,
        values: [email]
    }
    const response = await pool.query(SQLquery)
    return response.rows
}
