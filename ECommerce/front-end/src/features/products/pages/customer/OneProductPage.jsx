import useProductById from "../../hooks/useProductById"
import OneProductCard from "../../components/customer/OneProductCard"
import { useParams } from "react-router-dom"

const OneProductPage = () => {
    const {id} = useParams()
    const {product, isLoading, error} = useProductById(id)
     if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
    console.log(product)
  return (
    <section>
       <OneProductCard category={product.category.name} status={product.status} name={product.name}
       price={product.price} description={product.description}/> 
    </section>
  )
}

export default OneProductPage