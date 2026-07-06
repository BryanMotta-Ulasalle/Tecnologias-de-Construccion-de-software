// STAFF COMPONENT 
import TablePrivate from "./TablePrivate"
import EmptyState from "../../../../components/EmptyState"

const ProductTable = ({products, columns}) => {

    if (products.length === 0){
        return <EmptyState title="No hay productos registrados" description="Los productos creados apareceran aqui." />
    }

  return (
    <div>
        <TablePrivate data={products} columns={columns}/>
    </div>
  )
}

export default ProductTable
