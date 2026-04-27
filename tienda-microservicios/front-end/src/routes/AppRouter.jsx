import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import User from "../features/users/pages/User";
import Product from "../features/products/pages/Product";
import Pedidos from "../features/pedidos/pages/Pedidos";


const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />} >
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/productos" element={<Product />} />
        <Route path="/pedidos" element={<Pedidos />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRouter
