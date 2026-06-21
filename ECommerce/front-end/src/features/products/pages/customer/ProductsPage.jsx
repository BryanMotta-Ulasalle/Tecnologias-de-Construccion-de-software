import useProducts from "../../hooks/useProducts"
import ProductGrid from "../../components/customer/ProductGrid"
import HeaderPublic from "../../../../components/Navbar/public/HeaderPublic"


const ProductsPage = () => {

    const {products, isLoading, error} = useProducts()

    const handleAddToCart = (id) => {}

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>{error}</p>

  return (
    <main className="bg-bgLight">
        
        <ProductGrid products={products} onAddToCart={handleAddToCart}/>
    </main>    
  )
}

export default ProductsPage