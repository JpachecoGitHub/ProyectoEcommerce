import { createOrder } from "../models/pedidosModel.js"
import { findUserByEmail } from "../models/usersModel.js" 
import { getPurchaseHistoryByEmail } from "../models/pedidosModel.js"

// Controlador para crear un nuevo pedido
export const createOrderController = async (req, res) => {
    try {
        const { items, shipping } = req.body
        const userEmail = req.userEmail // Viene del middleware verifyToken

        const validItems = items.filter(item => item.quantity > 0 && item.precio > 0 && item.id)

        if (!validItems || validItems.length === 0 || !shipping) {
            return res.status(400).json({ error: "Datos de pedido inválidos o carrito vacío." })
        }

        // Obtener el ID del usuario
        const user = await findUserByEmail(userEmail)
        if (!user || !user.id) {
            return res.status(404).json({ error: "Usuario no encontrado para registrar el pedido." })
        }
        const userId = user.id

        // Crear el pedido
        const orderResult = await createOrder(userId, items, shipping)

        res.status(201).json({ message: "Pedido registrado con éxito.", orderId: orderResult.id })

    } catch (error) {
        console.error("Error al registrar el pedido:", error)
        res.status(500).json({ error: "Error interno del servidor al procesar el pedido." })
    }
}

// Controlador para obtener el historial de compras
export const getPurchaseHistoryController = async (req, res) => {
    try {
        const userEmail = req.userEmail // Viene del middleware verifyToken

        // Usar la función existente en usersModel.js
        const historial = await getPurchaseHistoryByEmail(userEmail) 

       
        res.status(200).json({ historial: historial })
        
    } catch (error) {
        console.error("Error al obtener el historial de compras:", error)
        res.status(500).json({ error: "Error interno del servidor al obtener el historial." })
    }
}
