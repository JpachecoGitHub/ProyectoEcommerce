import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Profile, Productos, Footer, FormularioPago, AgradecimientoCompra, Navigation } from './components/index'
import { Cart, Contactanos, Home, Login, NotFound, ProductRegister, Register } from './pages/index'

import { UserProvider } from './context/UserContext'
import { ProductosProvider } from './context/ProductContext'
import { CategoriasProvider } from './context/CategoriasContext'
import ProductDetail from './components/productDetalle/ProductDetalle'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductosProvider>
          <CategoriasProvider>
            <CartProvider>

              <div className='app-wrapper'>
                <Navigation />

                <main className='content-wrapper'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contacto' element={<Contactanos />} />
                    <Route path='/producto/:id' element={<ProductDetail />} />
                    <Route path='/productos/:categoria?' element={<Productos />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Register' element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path='/Cart' element={<Cart />} />
                      <Route path='/checkout' element={<FormularioPago />} />
                      <Route path='/profile' element={<Profile />} />
                      <Route path='/FormularioPago' element={<FormularioPago />} />
                      <Route path='/AgradecimientoCompra' element={<AgradecimientoCompra />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                      <Route path='/productRegister' element={<ProductRegister />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </main>

                <Footer className='app-footer' />

              </div>
            </CartProvider>
          </CategoriasProvider>
        </ProductosProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
