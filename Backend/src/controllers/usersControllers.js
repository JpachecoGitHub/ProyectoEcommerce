import { findUserByEmail, updateUserByEmail } from "../models/usersModel.js"
import { getPurchaseHistoryByEmail } from "../models/pedidosModel.js"


export const getUserData = async (req, res) => {
  try {
    const user = await findUserByEmail(req.userEmail)
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }

    const historial = await getPurchaseHistoryByEmail(req.userEmail)

    const { password, ...userData } = user;

    res.status(200).json({ ...userData, historial: historial })
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error)
    res
      .status(500)
      .json({
        error: "Error interno del servidor al obtener datos del usuario."
      })
  }
}

export const updateUserController = async (req, res) => {
  try {
    const email = req.userEmail
    const rawUpdateData = req.body

    const allowedFields = [
      "nombre",
      "apellido",
      "direccion",
      "telefono",
      "imagen_url",
      "password",
    ];

    // Inicializamos el objeto que sí usaremos en el modelo
    const updateData = {}

    allowedFields.forEach((field) => {
      // Usamos rawUpdateData, que es req.body
      if (rawUpdateData[field] !== undefined && rawUpdateData[field] !== null) {
        // Solo incluimos la contraseña si se está intentando cambiar 
        if (field === "password" && rawUpdateData[field].trim() === "") {
          return 
        }

        updateData[field] = rawUpdateData[field]
      }
    })
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No se proporcionaron datos válidos para actualizar." })
    }

    const updatedUser = await updateUserByEmail(email, updateData)

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado después de la actualización." })
    }

    const { password, ...userData } = updatedUser

    res.status(200).json(userData)
  } catch (error) {
    console.error("Error al actualizar perfil:", error)
 
    if (error.code && error.code === "23505") {
      return res.status(409).json({ error: "El correo electrónico ya está registrado." })
    }
    res.status(500).json({ error: "Error interno del servidor al actualizar perfil." })
  }
}
