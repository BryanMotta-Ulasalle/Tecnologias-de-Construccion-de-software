import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { ShopView } from '../../../components/views/ShopView'
import { useEffect } from 'react'

const Product = () => {
  const { products, navigate, addToCart, setSelectedProductId, loadCatalog, hasCatalogLoaded, isCatalogLoading } = useEcommerceStore()

  useEffect(() => {
    if (!hasCatalogLoaded) {
      loadCatalog()
    }
  }, [hasCatalogLoaded, loadCatalog])

  return (
    <ShopView
      products={products}
      isCatalogLoading={isCatalogLoading}
      onNavigate={navigate}
      onAddToCart={addToCart}
      onSelectProduct={setSelectedProductId}
    />
  )
}

export default Product
