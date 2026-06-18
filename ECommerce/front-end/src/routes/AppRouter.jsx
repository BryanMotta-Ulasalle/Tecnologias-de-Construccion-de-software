import { Route, Routes } from "react-router-dom";
import ProductsCustomers from "../features/products/pages/customer/ProductsPage"
import Inicio from "../features/Home/page/HomePage"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/tienda/productos" element={<ProductsCustomers/>}/>
    </Routes>
  )
}

export default AppRouter