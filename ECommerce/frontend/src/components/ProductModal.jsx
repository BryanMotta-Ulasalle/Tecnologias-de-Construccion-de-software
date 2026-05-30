import { ShoppingBag, Star, X } from 'lucide-react'

export function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="grid w-full max-w-4xl gap-0 overflow-hidden rounded-[2rem] bg-[#F7F3EC] shadow-2xl shadow-black/25 lg:grid-cols-[0.95fr_1.05fr]">
        <img src={product.image} alt={product.name} className="h-72 w-full object-cover lg:h-full" />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8B7F73]">{product.category}</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#11110F]">{product.name}</h2>
            </div>
            <button onClick={onClose} className="rounded-full border border-black/10 p-2" type="button">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#62574D]">{product.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <Star className="h-4 w-4 fill-[#C98C4B] text-[#C98C4B]" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm text-[#8B7F73]">({product.reviews} reviews)</span>
          </div>
          <div className="mt-8 flex items-center justify-between rounded-3xl bg-white p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8B7F73]">Price</p>
              <p className="mt-2 text-3xl font-semibold text-[#11110F]">${product.price.toFixed(2)}</p>
            </div>
            <button onClick={() => onAddToCart(product.id)} className="inline-flex items-center gap-2 rounded-full bg-[#11110F] px-5 py-3 text-sm font-semibold text-white" type="button">
              Add to cart
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
