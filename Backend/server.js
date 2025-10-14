import express from 'express'
import 'dotenv/config'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/auth.routes.js' 
import categoryRoutes from './routes/categoryRoutes.js'
import pedidosRouter from './routes/pedidosRoutes.js'
// import pool from './db/config.js'

import cors from 'cors'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())


app.use('/api/productos', productRoutes)

app.use('/api/auth', authRoutes) 

app.use('/api/categorias', categoryRoutes)

app.use('/api/pedidos', pedidosRouter)

const PORT = process.env.PORT || 3000


// const serverInstance = 

app.listen(PORT, () => {
        console.log(`🔥 Server on 🔥🏃http://localhost:${PORT}`)
})


export default app

// export { serverInstance, pool }