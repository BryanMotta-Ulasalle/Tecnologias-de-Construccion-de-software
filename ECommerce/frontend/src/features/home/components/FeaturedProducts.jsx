import { useState, useEffect } from 'react'
import { SectionHeading } from '../../../components/SectionHeading'
import { ProductCard } from '../../../components/ProductCard'
import {ecommerceApi} from '../../../services/ecommerceApi'

export default function FeaturedProducts({ products, onNavigate }) {
    const [localProducts, setLocalProducts] = useState(products)

    useEffect(() => {
        setLocalProducts(products)
    }, [products])

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Featured"
        title="Best sellers"
        action={
          <button onClick={() => onNavigate('shop')} className="inline-flex items-center gap-1 text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
            Ver catálogo completo
          </button>
        }
      />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {localProducts.length ? localProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} onOpen={() => onNavigate('shop')} canAdd={false} />
        )) : (
          <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6 text-sm text-[#62574D] md:col-span-2 xl:col-span-4">
            No se pudieron cargar los productos
          </div>
        )}
      </div>
    </section>
  )
}
