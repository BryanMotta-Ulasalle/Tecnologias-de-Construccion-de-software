import React from 'react'
import { ArrowRight, LogIn } from 'lucide-react'

export default function Conversion({ products, onNavigate }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="">
        <div className="rounded-3xl bg-[#11110F] lg:p-12 text-white shadow-2xl shadow-black/10 sm:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Conversion</p>
          <h2 className="mt-3 text-3xl font-semibold">Create account and unlock customer tools.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
            Para agregar productos al carrito y comenzar tu pedido necesitas iniciar sesión.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onNavigate('auth')} className="inline-flex items-center gap-2 rounded-full bg-[#E8B87E] px-5 py-3 text-sm font-semibold text-[#11110F]" type="button">
              Login / Register
              <LogIn className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate('shop')} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/85" type="button">
              Ir al catálogo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
