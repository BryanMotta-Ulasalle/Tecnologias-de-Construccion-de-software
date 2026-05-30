import { SectionHeading } from '../SectionHeading'
import { ProductCard } from '../ProductCard'

export function ShopView({ products, isCatalogLoading, onNavigate, onAddToCart, onSelectProduct }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Catalog"
        title="Shop the collection"
        action={
          <button onClick={() => onNavigate('landing')} className="text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
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
            <ProductCard key={product.id} product={product} index={index} onAdd={onAddToCart} onOpen={onSelectProduct} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
