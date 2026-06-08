import React from 'react'

export default function Collections({ categories, onNavigate }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.length ? categories.map((category) => (
        <div key={category.name} className="rounded-[1.75rem] border border-black/5 bg-white/80 p-5 shadow-sm shadow-black/5 transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-3xl">{category.emoji}</span>
            <span className="rounded-full bg-[#11110F] px-3 py-1 text-xs font-semibold text-white">{category.count}</span>
          </div>
          <h3 className="mt-8 text-lg font-semibold">{category.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[#62574D]">{category.description}</p>
        </div>
      )) : (
        <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6 text-sm text-[#62574D] sm:col-span-2 lg:col-span-4">
          Visita la tienda para cargar categorias reales.
        </div>
      )}
    </div>
  )
}
