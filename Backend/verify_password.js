import bcrypt from 'bcrypt'

const PASSWORD_TO_HASH = '123456'; // <--- ¡Tu nueva contraseña conocida!
const saltRounds = 10; // Usualmente 10 o 12

async function generateHash() {
    try {
        const newHash = await bcrypt.hash(PASSWORD_TO_HASH, saltRounds)
        console.log(`✅ Contraseña: ${PASSWORD_TO_HASH}`)
        console.log(`✅ NUEVO HASH: ${newHash}`)
        console.log("-> Copia y usa este hash para la inserción en la base de datos.")
    } catch (error) {
        console.error("Error al generar el hash:", error)
    }
}

generateHash()

/* import bcrypt from 'bcrypt';
import 'dotenv/config'; // Para asegurar que las variables de entorno se carguen si son necesarias

// El hash de la base de datos (del usuario Jose Pacheco)
const DB_HASH = '$2b$10$dS4sULm6oAY9HtQVgH30RyOOZyYhk9s9fKjRAz.Hn3q/K6/Jahn33q';

// *** Reemplaza 'CONTRASEÑA_QUE_CREES_QUE_ES' con la contraseña real que usaste ***
const PASSWORD_TO_CHECK = 'CONTRASEÑA_QUE_CREES_QUE_ES'; 

async function verifyPassword() {
    try {
        const isMatch = await bcrypt.compare(PASSWORD_TO_CHECK, DB_HASH);

        if (isMatch) {
            console.log(`✅ EXITO: La contraseña '${PASSWORD_TO_CHECK}' es CORRECTA para el hash.`);
            console.log("-> Puedes usarla para el login.");
        } else {
            console.log(`❌ FALLO: La contraseña '${PASSWORD_TO_CHECK}' es INCORRECTA para el hash.`);
            console.log("-> Intenta con otra contraseña.");
        }
    } catch (error) {
        console.error("Error al verificar la contraseña:", error);
    }
}

verifyPassword(); */