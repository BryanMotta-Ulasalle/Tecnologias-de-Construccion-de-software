import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layout/PublicLayout'
import AdminLayout from '../layout/AdminLayout'
import Home from '../features/home/pages/Home'
import Product from '../features/products/pages/Product'
import Cart from '../features/cart/pages/Cart'
import Auth from '../features/auth/pages/Auth'
import Dashboard from '../features/admin/pages/Dashboard'
import AdminProducts from '../features/admin/pages/Products'
import AdminOrders from '../features/admin/pages/Orders'
import AdminUsers from '../features/admin/pages/Users'
import RequireAuth from './RequireAuth'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Product />} />
        <Route
          path="/pedidos"
          element={(
            <RequireAuth>
              <Cart />
            </RequireAuth>
          )}
        />
        <Route path="/usuarios" element={<Auth />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/productos" element={<AdminProducts />} />
        <Route path="/dashboard/pedidos" element={<AdminOrders />} />
        <Route path="/dashboard/usuarios" element={<AdminUsers />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
