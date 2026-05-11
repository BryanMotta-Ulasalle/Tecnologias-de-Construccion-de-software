import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import User from "../features/users/pages/User";
import Product from "../features/products/pages/Product";
import Pedidos from "../features/pedidos/pages/Pedidos";
import Title from "../shared/components/ui/Title";


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Title title="Home" description="Selecciona una sección del panel" />} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/productos" element={<Product />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
