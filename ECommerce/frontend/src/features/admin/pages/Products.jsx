import { Package } from 'lucide-react'
import Title from '../../../shared/components/ui/Title'

const Products = () => {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-start px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm shadow-black/5">
        <div className="flex items-center justify-between gap-4">
          <Title title="Admin products" description="Gestión de catálogo para el panel de administración." />
          <Package className="h-6 w-6 text-[#C98C4B]" />
        </div>
      </div>
    </section>
  )
}

export default Products
