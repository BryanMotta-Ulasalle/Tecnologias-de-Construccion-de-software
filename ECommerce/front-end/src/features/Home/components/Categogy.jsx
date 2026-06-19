import useCategory from "../hooks/useCategory"
import CategoryGrid from "./CategoryGrid"
import H2 from "../../../components/H2"

const Categogy = () => {

  const {categories, isLoading, error} = useCategory()

  if (isLoading) return <p>Cargando...</p>
    if (error) return <p>{error}</p>

  return (
    <section className="px-5 py-10 flex flex-col gap-6">
      <H2>
        Compra por Categorias
      </H2>
      <CategoryGrid categories={categories}/>
    </section>
  )
}

export default Categogy