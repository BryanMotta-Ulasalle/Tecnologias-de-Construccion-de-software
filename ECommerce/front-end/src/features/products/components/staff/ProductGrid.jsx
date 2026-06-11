// STAFF COMPONENT 
import ProductCard from "../shared/ProductCard0"

const ProductGrid = ({products}) => {

    if (products.length === 0){
        return <p>No hay productos disponibles</p>    
    }

  return (
    <div>
        {products.map((product)=>(
            <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            category={product.category.name}
            price={product.price}
            actions={
                <>
                
                </>
            }
            />
        )) }
    </div>
  )
}

export default ProductGrid