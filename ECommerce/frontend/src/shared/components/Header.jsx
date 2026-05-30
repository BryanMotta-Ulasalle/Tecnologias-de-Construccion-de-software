import { useMemo, useState } from 'react'
import { Menu, Search, ShoppingCart, Store, X } from 'lucide-react'
import { useEcommerceStore } from '../hooks/useEcommerceStore'

const PUBLIC_NAV = [
  { key: 'landing', label: 'Inicio' },
  { key: 'shop', label: 'Tienda' },

]

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { activeView, cartItems, session, navigate } = useEcommerceStore()

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const goTo = (view) => {
    setSearchOpen(false)
    setMobileMenuOpen(false)
    navigate(view)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#F7F3EC]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3" onClick={() => goTo('landing')} type="button">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#11110F] text-[#E8B87E] shadow-lg shadow-black/10">
            <Store className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8B7F73]">ECommerce</p>
            <p className="text-sm font-semibold text-[#11110F]">Atelier Commerce</p>
          </div>
        </button>

        <nav className="ml-6 hidden items-center gap-2 lg:flex">
          {PUBLIC_NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => goTo(item.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeView === item.key ? 'bg-[#11110F] text-white' : 'text-[#5F564E] hover:bg-black/5 hover:text-[#11110F]'}`}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* <button
            onClick={() => setSearchOpen((current) => !current)}
            className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-[#11110F] transition hover:border-black/20 md:inline-flex"
            type="button"
          >
            <Search className="h-4 w-4" />
            Search
          </button> */}
          {/* <button
            onClick={() => goTo('cart')}
            className="relative inline-flex items-center gap-2 rounded-full bg-[#11110F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0B0B0A]"
            type="button"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            <span className="ml-1 rounded-full bg-[#E8B87E] px-2 py-0.5 text-[11px] font-bold text-[#11110F]">{cartCount}</span>
          </button> */}
          <button
            onClick={() => goTo('auth')}
            className="hidden rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#11110F] transition hover:bg-black/5 lg:inline-flex"
            type="button"
          >
            {session.signedIn ? 'Cuenta' : 'Sign in'}
          </button>
          {/* <div className="hidden rounded-full border border-black/10 bg-white/80 px-3 py-2 text-xs font-medium text-[#5F564E] lg:inline-flex">
            {session.signedIn ? session.role : 'Guest'}
          </div> */}
          <button
            className="inline-flex items-center justify-center rounded-full border border-black/10 p-3 lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            type="button"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-black/5 px-4 pb-4 pt-2 lg:hidden sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-2">
            {PUBLIC_NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => goTo(item.key)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium shadow-sm shadow-black/5 ${activeView === item.key ? 'bg-[#11110F] text-white' : 'bg-white/80 text-[#11110F]'}`}
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => goTo('auth')}
              className="rounded-2xl bg-white/80 px-4 py-3 text-left text-sm font-medium shadow-sm shadow-black/5"
              type="button"
            >
              {session.signedIn ? 'Cuenta' : 'Sign in'}
            </button>
          </div>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="border-t border-black/5 bg-white/75 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-[#8B7F73]" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#8B7F73]"
              placeholder="Search products, categories and offers"
              type="search"
            />
            <button className="rounded-full p-1 text-[#8B7F73]" onClick={() => setSearchOpen(false)} type="button">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header