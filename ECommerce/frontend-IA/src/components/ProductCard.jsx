import { Eye, ShoppingBag, Star } from 'lucide-react'

export function ProductCard({ product, index = 0, onAdd, onOpen, canAdd = true }) {
  return (
    <article
      className="group overflow-hidden rounded-[1.75rem] border border-black/5 bg-white/85 shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#F7F3EC]">
        <button
          className="absolute inset-0 z-10 block h-full w-full text-left"
          onClick={() => onOpen(product.id)}
          type="button"
        >
          <span className="sr-only">Open {product.name}</span>
        </button>
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#11110F]">{product.category}</div>
        <button
          onClick={() => onOpen(product.id)}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#11110F] shadow-sm shadow-black/10 transition hover:bg-white"
          type="button"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-[#C98C4B]">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold text-[#11110F]">{product.rating}</span>
          <span className="text-xs text-[#8B7F73]">({product.reviews})</span>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-7 text-[#11110F]">{product.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#62574D]">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xl font-semibold text-[#11110F]">${product.price.toFixed(2)}</p>
          {canAdd ? (
            <button
              onClick={() => onAdd(product.id)}
              className="inline-flex items-center gap-2 rounded-full bg-[#11110F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B0B0A]"
              type="button"
            >
              Add
              <ShoppingBag className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
