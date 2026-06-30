import { Route, Routes } from "react-router-dom";
import ProductsCustomers from "../features/products/pages/customer/ProductsPage"
import Inicio from "../features/Home/page/HomePage"
import PublicLayout from "../layout/PublicLayout";
import OneProductPage from "../features/products/pages/customer/OneProductPage";
import Login from "../features/Autentication/pages/Login"
import Register from "../features/Autentication/pages/Register"
import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";
import StaffProductsPage from "../features/products/pages/staff/ProductsPage";
import PrivateLayout from "../layout/PrivateLayout";
import CategoriesPage from "../features/products/pages/staff/CategoriesPage";
import UsersPage from "../features/users/pages/staff/UsersPage";
import DashboardPage from './../features/dashboard/page/DashboardPage';
import OrdersPage from "../features/orders/pages/OrdersPage";
import RolesPage from './../features/users/pages/staff/RolesPage';
import ProfilePage from "../features/users/pages/shared/ProfilePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route element={<PublicLayout />}>

        <Route path="/tienda/productos" element={<ProductsCustomers />} />
        <Route path="/tienda/productos/:id/" element={<OneProductPage />} />

        <Route path="/cuenta" element={
        <PrivateRoute>
          <ProfilePage/>
        </PrivateRoute>
      } />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      

      <Route
        element={
          <PrivateRoute>
            <RoleRoute allow={["Admin"]}>
              <PrivateLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route path="/admin/productos" element={<StaffProductsPage />} />
        <Route path="/admin/categorias" element={<CategoriesPage />} />
        <Route path="/admin/usuarios" element={<UsersPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/roles" element={<RolesPage />} />
        <Route path="/admin/ordenes" element={<OrdersPage />} />
      </Route>


    </Routes>
  )
}

export default AppRouter
