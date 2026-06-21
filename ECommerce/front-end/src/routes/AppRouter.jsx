import { Route, Routes } from "react-router-dom";
import ProductsCustomers from "../features/products/pages/customer/ProductsPage"
import Inicio from "../features/Home/page/HomePage"
import PublicLayout from "../../layout/PublicLayout";
import OneProductPage from "../features/products/pages/customer/OneProductPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>}/>
        <Route element={<PublicLayout/>}>
          
        <Route path="/tienda/productos" element={<ProductsCustomers/>}/>
        <Route path="/tienda/productos/:id/" element={<OneProductPage/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter