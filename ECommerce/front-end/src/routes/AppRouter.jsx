import { Route, Routes } from "react-router-dom";
import ProductsCustomers from "../features/products/pages/customer/ProductsPage"

import React from 'react'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<p>Inicio</p>}/>
        <Route path="/catalogo/productos" element={<ProductsCustomers/>}/>
    </Routes>
  )
}

export default AppRouter