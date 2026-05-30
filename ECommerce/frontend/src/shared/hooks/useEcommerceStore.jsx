import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthFeature } from '../../features/auth/hooks/useAuthFeature'
import { useDashboardFeature } from '../../features/admin/hooks/useDashboardFeature'
import { useCartFeature } from '../../features/cart/hooks/useCartFeature'
import { useHomeViewModel } from '../../features/home/hooks/useHomeViewModel'
import { useCatalogFeature } from '../../features/products/hooks/useCatalogFeature'

const STORAGE_KEY = 'ecommerce-atelier-session'

const EcommerceStoreContext = createContext(null)

const viewToPath = {
  landing: '/',
  shop: '/productos',
  cart: '/pedidos',
  auth: '/usuarios',
  dashboard: '/dashboard',
  'dashboard-products': '/dashboard/productos',
  'dashboard-orders': '/dashboard/pedidos',
  'dashboard-users': '/dashboard/usuarios',
}

const pathToView = (pathname) => {
  if (pathname.startsWith('/dashboard/productos')) return 'dashboard-products'
  if (pathname.startsWith('/dashboard/pedidos')) return 'dashboard-orders'
  if (pathname.startsWith('/dashboard/usuarios')) return 'dashboard-users'
  if (pathname.startsWith('/dashboard')) return 'dashboard'
  if (pathname.startsWith('/productos')) return 'shop'
  if (pathname.startsWith('/pedidos')) return 'cart'
  if (pathname.startsWith('/usuarios')) return 'auth'
  return 'landing'
}

export function EcommerceStoreProvider({ children }) {
  const navigateRouter = useNavigate()
  const location = useLocation()
  const auth = useAuthFeature()
  const catalog = useCatalogFeature()
  const cart = useCartFeature({ session: auth.session })
  const dashboard = useDashboardFeature({ session: auth.session, products: catalog.products })
  const home = useHomeViewModel({ products: catalog.products, categories: catalog.categories, session: auth.session })
  const [activeView, setActiveView] = useState(() => pathToView(location.pathname))

  useEffect(() => {
    setActiveView(pathToView(location.pathname))
  }, [location.pathname])

  const navigate = (view) => {
    catalog.setSelectedProductId(null)
    setActiveView(view)
    navigateRouter(viewToPath[view] ?? '/')
  }

  const isLoading = auth.isAuthLoading || cart.isCartLoading || dashboard.isDashboardLoading || catalog.isCatalogLoading
  const apiError = auth.authError || cart.cartError || dashboard.dashboardError || catalog.catalogError

  const value = {
    activeView,
    navigate,
    products: catalog.products,
    categories: catalog.categories,
    categorySummary: home.categorySummary,
    currentProduct: catalog.currentProduct,
    selectedProduct: catalog.selectedProduct,
    selectedProductId: catalog.selectedProductId,
    setSelectedProductId: catalog.setSelectedProductId,
    cartItems: cart.cartItems,
    cartId: cart.cartId,
    subtotal: cart.subtotal,
    addToCart: cart.addToCart,
    removeFromCart: cart.removeFromCart,
    orders: dashboard.orders,
    homeStats: home.homeStats,
    dashboardMetrics: dashboard.dashboardMetrics,
    orderRows: dashboard.orderRows,
    signIn: auth.signIn,
    register: auth.register,
    signOut: auth.signOut,
    createOrder: cart.createOrder,
    loadCatalog: catalog.loadCatalog,
    hasCatalogLoaded: catalog.hasCatalogLoaded,
    isCatalogLoading: catalog.isCatalogLoading,
    isLoading,
    apiError,
    session: auth.session,
    setSession: auth.setSession,
  }

  return <EcommerceStoreContext.Provider value={value}>{children}</EcommerceStoreContext.Provider>
}

export function useEcommerceStore() {
  const context = useContext(EcommerceStoreContext)

  if (!context) {
    throw new Error('useEcommerceStore must be used within EcommerceStoreProvider')
  }

  return context
}
