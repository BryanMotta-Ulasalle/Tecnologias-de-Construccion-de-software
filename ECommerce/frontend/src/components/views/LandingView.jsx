import { ArrowRight, LogIn, RefreshCw, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { ProductCard } from '../ProductCard'
import { SectionHeading } from '../SectionHeading'

export function LandingView({ currentProduct, homeStats, categorySummary, featuredProducts, trendingProducts, onNavigate, onSelectProduct }) {
  const heroProduct = currentProduct ?? {
    id: 'hero-fallback',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&h=1200&fit=crop&auto=format',
    category: 'Catalogo',
    name: 'Explora nuestro catalogo',
    description: 'Entra a Tienda para cargar productos reales desde el backend.',
    rating: 0,
    reviews: 0,
    price: 0,
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#11110F]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7F73]">
            <Sparkles className="h-3.5 w-3.5 text-[#C98C4B]" />
            New interface for your store
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#11110F] sm:text-5xl lg:text-7xl">
            A cleaner storefront for your
            <span className="block text-[#C98C4B]">ECommerce backend.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#62574D] sm:text-lg">
            This front was adapted from the template into a JS-only experience with Tailwind styling, a more editorial layout and sections ready to hook into your backend.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#11110F] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0B0B0A]"
              type="button"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
            {homeStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-black/5 bg-white/75 p-4 shadow-sm shadow-black/5">
                <p className="text-2xl font-semibold text-[#11110F]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#8B7F73]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-black/5 bg-white/70 p-4 shadow-sm shadow-black/5 sm:grid-cols-3 sm:p-5">
          {[
            { icon: Truck, text: 'Free shipping over $80' },
            { icon: RefreshCw, text: '60-day returns' },
            { icon: ShieldCheck, text: 'Secure checkout' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-2xl bg-[#F7F3EC] px-4 py-4">
              <Icon className="h-5 w-5 text-[#C98C4B]" />
              <p className="text-sm font-medium text-[#62574D]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Collections"
          title="Browse by category"
          action={
            <button onClick={() => onNavigate('shop')} className="inline-flex items-center gap-1 text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
              View shop
              <ArrowRight className="h-4 w-4" />
            </button>
          }
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorySummary.length ? categorySummary.map((category) => (
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title="Best sellers"
          action={
            <button onClick={() => onNavigate('shop')} className="inline-flex items-center gap-1 text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
              Ver catálogo completo
              <ArrowRight className="h-4 w-4" />
            </button>
          }
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.length ? featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onOpen={onSelectProduct} canAdd={false} />
          )) : (
            <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6 text-sm text-[#62574D] md:col-span-2 xl:col-span-4">
              El catalogo se carga al entrar a Tienda.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-[#11110F] p-6 text-white shadow-2xl shadow-black/10 sm:p-8">
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

          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm shadow-black/5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {trendingProducts.length ? trendingProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className="flex items-center gap-4 rounded-3xl border border-black/5 bg-[#F7F3EC] p-3 text-left transition hover:border-black/10"
                  type="button"
                >
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8B7F73]">{product.category}</p>
                    <h3 className="mt-1 text-sm font-semibold text-[#11110F]">{product.name}</h3>
                    <p className="mt-1 text-sm text-[#C98C4B]">${product.price.toFixed(2)}</p>
                  </div>
                </button>
              )) : (
                <div className="rounded-3xl border border-black/5 bg-[#F7F3EC] p-4 text-sm text-[#62574D] sm:col-span-2">
                  Abre Tienda para ver productos destacados en tiempo real.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
