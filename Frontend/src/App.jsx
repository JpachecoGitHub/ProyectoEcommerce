import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Profile, Productos, Footer, FormularioPago, AgradecimientoCompra, Navigation } from './components/index'
import { Cart, Contactanos, Home, Login, NotFound, ProductRegister, Register } from './pages/index'

import { UserProvider } from './context/UserContext'
import { ProductosProvider } from './context/ProductContext'
import { CategoriasProvider } from './context/CategoriasContext'
import ProductDetail from './components/productDetalle/ProductDetalle'
import { CartProvider } from './context/CartContext'

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
                    <Route path='/Cart' element={<Cart />} />
                    <Route path='/contacto' element={<Contactanos />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/checkout' element={<FormularioPago />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/producto/:id' element={<ProductDetail />} />
                    <Route path='/productos/:categoria?' element={<Productos />} />
                    <Route path='/productRegister' element={<ProductRegister />} />
                    <Route path='/FormularioPago' element={<FormularioPago />} />
                    <Route path='/AgradecimientoCompra' element={<AgradecimientoCompra />} />
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
