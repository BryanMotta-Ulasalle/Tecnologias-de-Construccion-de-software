import { Route, Routes } from "react-router-dom";
import ProductsCustomers from "../features/products/pages/customer/ProductsPage"
import Inicio from "../features/Home/page/HomePage"
import PublicLayout from "../../layout/PublicLayout";
import OneProductPage from "../features/products/pages/customer/OneProductPage";
import Login from "../features/Autentication/pages/Login"
import Register from "../features/Autentication/pages/Register"
import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";
import StaffProductsPage from "../features/products/pages/staff/ProductsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route element={<PublicLayout />}>

        <Route path="/tienda/productos" element={<ProductsCustomers />} />
        <Route path="/tienda/productos/:id/" element={<OneProductPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/cuenta" element={
        <PrivateRoute>
          <div>cuenta</div>
        </PrivateRoute>
      }/>

      <Route path="/admin" element={
        <RoleRoute allow={["Admin"]}>
            <StaffProductsPage/>
        </RoleRoute>
      }/>
    </Routes>
  )
}

export default AppRouter