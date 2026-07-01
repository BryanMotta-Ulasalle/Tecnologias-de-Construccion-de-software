// STAFF PAGE
import ProductTable from "../../components/staff/ProductTable"
import { PRIVATE_HEADERS_PRODUCTS_TABLE } from "../../../../constants/products"
import useProducts from "../../hooks/useProducts"
import H2 from "../../../../components/H2"

const ProductsPage = () => {

  const { products, isLoading } = useProducts()

  if (isLoading) {
    return <p>Cargando tabla de productos...</p>
  }

  return (
    <div className=" flex justify-center h-full">
      <div className=" w-300 pt-10 flex flex-col gap-10">
        <H2>Productos</H2>
        <ProductTable columns={PRIVATE_HEADERS_PRODUCTS_TABLE} products={products} />
      </div>
    </div>
  )
}

export default ProductsPage