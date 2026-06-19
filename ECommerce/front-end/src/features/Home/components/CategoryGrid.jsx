import CategoryCard from "./CategoryCard"


const CategoryGrid = ({categories}) => {

    if (categories.length === 0){
        return <p>No hay categorias disponibles</p>    
    }
  return (
    <div className="grid grid-cols-2 gap-7 lg:flex flex-row">
      {categories.map((category)=>(
        <CategoryCard key={category.id} category={category.name} count={category.total_products}/>
      ))}
    </div>
  )
}

export default CategoryGrid
