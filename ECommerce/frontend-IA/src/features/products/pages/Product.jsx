import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { useEffect } from 'react'
import { SectionHeading } from '../../../components/SectionHeading'
import { ProductCard } from '../../../components/ProductCard'

const Product = () => {
  const { products, navigate, addToCart, setSelectedProductId, loadCatalog, hasCatalogLoaded, isCatalogLoading } = useEcommerceStore()

  useEffect(() => {
    if (!hasCatalogLoaded) {
      loadCatalog()
    }
  }, [hasCatalogLoaded, loadCatalog])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Catalog"
        title="Shop the collection"
        action={
          <button onClick={() => navigate('landing')} className="text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
            Back to home
          </button>
        }
      />
      {isCatalogLoading ? (
        <div className="mt-6 rounded-[1.75rem] border border-black/5 bg-white/80 p-6 text-sm text-[#62574D]">
          Cargando catalogo...
        </div>
      ) : null}

      {!isCatalogLoading && !products.length ? (
        <div className="mt-6 rounded-[1.75rem] border border-black/5 bg-white/80 p-6 text-sm text-[#62574D]">
          No hay productos disponibles por ahora.
        </div>
      ) : null}

      {!isCatalogLoading && products.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} onOpen={setSelectedProductId} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default Product
