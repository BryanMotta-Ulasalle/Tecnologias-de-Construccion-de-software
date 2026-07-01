// STAFF COMPONENT 
import TablePrivate from "./TablePrivate"

const ProductTable = ({products, columns}) => {

    if (products.length === 0){
        return <p>No hay productos disponibles</p>    
    }

  return (
    <div>
        <TablePrivate data={products} columns={columns}/>
    </div>
  )
}

export default ProductTable