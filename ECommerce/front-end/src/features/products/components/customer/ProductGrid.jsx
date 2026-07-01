import ProductCard from "../shared/ProductCard"

const ProductGrid = ({products, onAddToCart,to}) => {

    if (products.length === 0){
        return <p>No hay productos disponibles</p>    
    }

  return (
    <div className="grid grid-cols-2 gap-5 px-5 py-10 items-center lg:flex flex-row lg:gap-10">
        {products.map((product)=>(
            <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            category={product.category.name}
            price={product.price}
            onAddToCart={onAddToCart}
            
            />
        )) }
    </div>
  )
}

export default ProductGrid