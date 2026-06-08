import React from 'react'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import StatsGrid from './StatsGrid'
import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'

export default function Hero({ heroProduct, onNavigate }) {

    const { homeStats } = useEcommerceStore()
    return (
        <section className="relative z-10 mx-auto flex flex-col max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16 ">
            <div className="flex flex-col justify-center">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#11110F]/10 bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-[#C98C4B]" />
                    New interface for your store
                </div>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
                    A cleaner storefront for your
                    <span className="block text-[#C98C4B]">ECommerce backend.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#62574D] sm:text-lg">
                    This front was adapted from the template into a JS-only experience with Tailwind styling, a more editorial layout and sections ready to hook into your backend.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        onClick={() => onNavigate('shop')}
                        className="inline-flex items-center w-80 justify-center gap-2 rounded-xl bg-[#C98C4B] px-6 py-5 text-xl  text-white transition hover:-translate-y-0.5 hover:bg-[#0B0B0A]"
                        type="button"
                    >
                        Ver catálogo completo
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <section className=" max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                <StatsGrid stats={homeStats} />
            </section>
            {/* <div className="relative">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#11110F] via-[#201A17] to-[#C98C4B] shadow-2xl shadow-black/20" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-5 text-white sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Featured drop</p>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">Live</span>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] bg-white/5">
            <img src={heroProduct.image} alt={heroProduct.name} className="h-[360px] w-full object-cover sm:h-[460px]" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">{heroProduct.category}</p>
              <h2 className="mt-2 text-2xl font-semibold">{heroProduct.name}</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">{heroProduct.description}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-[#E8B87E]">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold">{heroProduct.rating}</span>
                <span className="text-xs text-white/55">({heroProduct.reviews} reviews)</span>
              </div>
              <p className="mt-4 text-3xl font-semibold">${heroProduct.price.toFixed(2)}</p>
              <button
                onClick={() => onNavigate('shop')}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E8B87E] px-4 py-2.5 text-sm font-semibold text-[#11110F] transition hover:bg-[#F1C998]"
                type="button"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
        </section>
    )
}
