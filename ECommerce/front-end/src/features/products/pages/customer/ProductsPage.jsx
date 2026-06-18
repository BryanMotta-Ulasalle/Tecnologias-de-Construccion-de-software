import useProducts from "../../hooks/useProducts"
import ProductGrid from "../../components/customer/ProductGrid"


const ProductsPage = () => {

    const {products, isLoading, error} = useProducts()

    const handleAddToCart = (id) => {}

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>{error}</p>

  return (
    <main>
        <h1>Catalogo</h1>
        <ProductGrid products={products} onAddToCart={handleAddToCart}/>
    </main>    
  )
}

export default ProductsPage