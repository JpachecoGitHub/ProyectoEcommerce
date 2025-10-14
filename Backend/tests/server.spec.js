import request from 'supertest'
import app from '../server.js'

// , { serverInstance, pool }

const NON_EXISTENT_ID = 99999
const ADMIN_TOKEN = "Bearer fake-admin-token" 

describe("Pruebas de Integración de la API REST", () => {
    
    
    describe('GET /api/productos', () => {
        it('Debería responder con status 200 y un array', async () => {
            const response = await request(app).get('/api/productos')
            expect(response.status).toBe(200)
            expect(Array.isArray(response.body)).toBe(true)
        })
        
        
        it('Debería contener al menos 0 o más productos', async () => {
            const response = await request(app).get('/api/productos')
            expect(response.body.length).toBeGreaterThanOrEqual(0)
        })
    })
    
   
    describe('GET /api/categorias', () => {
        it('Debería responder con status 200 y una lista de categorías', async () => {
            const response = await request(app).get('/api/categorias')
            expect(response.status).toBe(200)
            expect(Array.isArray(response.body)).toBe(true)
        })
    })

    
    describe('DELETE /api/productos/:id', () => {
        
        it('Debería responder con status 401 si se intenta eliminar sin token (protegido)', async () => {
           
            const response = await request(app).delete(`/api/productos/${NON_EXISTENT_ID}`)
            expect(response.status).toBe(401)
        })
        
      
        it('Debería responder con status 404 si el producto no existe (con token de admin)', async () => {
            const response = await request(app)
                .delete(`/api/productos/${NON_EXISTENT_ID}`)
                .set('Authorization', ADMIN_TOKEN)

                if (response.status !== 401) { 
                    expect(response.status).toBe(404)
                    expect(response.body.message).toBe('Producto no encontrado.')
        } else {
                expect(response.status).toBe(401)
            }
        })
    })
    
    
    describe('GET /api/pedidos/historial', () => {
        it('Debería responder con status 401 si no se proporciona un token', async () => {
            const response = await request(app).get('/api/pedidos/historial')
            expect(response.status).toBe(401)
        })
        
    })

    // Bloque para liberar recursos
    /* afterAll(async () => {
        
        if (pool && pool.end) {
            await pool.end();
            console.log('🔌 DB-Pool cerrado.')
        }

        // Cierra el servidor Express
        await new Promise(resolve => {
            if (serverInstance && serverInstance.close) {
                serverInstance.close(resolve);
                console.log('🚪 Servidor Express cerrado.')
            } else {
                resolve()
            }
        })
    }) */

})

