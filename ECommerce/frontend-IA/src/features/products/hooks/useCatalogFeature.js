import { useCallback, useMemo, useState } from 'react'
import { ecommerceApi } from '../../../services/ecommerceApi'

export function useCatalogFeature() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [hasCatalogLoaded, setHasCatalogLoaded] = useState(false)
  const [isCatalogLoading, setIsCatalogLoading] = useState(false)
  const [catalogError, setCatalogError] = useState('')

  const loadCatalog = useCallback(async () => {
    if (hasCatalogLoaded) {
      return
    }

    try {
      setIsCatalogLoading(true)
      setCatalogError('')
      const [productsData, categoriesData] = await Promise.all([ecommerceApi.getProducts(), ecommerceApi.getCategories()])
      setProducts(productsData)
      setCategories(categoriesData)
      setHasCatalogLoaded(true)
    } catch (error) {
      setCatalogError(error?.response?.data?.detail ?? 'No se pudo cargar el catálogo.')
    } finally {
      setIsCatalogLoading(false)
    }
  }, [hasCatalogLoaded])

  const selectedProduct = useMemo(() => products.find((product) => product.id === selectedProductId) ?? null, [products, selectedProductId])
  const currentProduct = selectedProduct ?? products[0] ?? null

  return {
    products,
    categories,
    selectedProductId,
    setSelectedProductId,
    hasCatalogLoaded,
    isCatalogLoading,
    catalogError,
    loadCatalog,
    selectedProduct,
    currentProduct,
  }
}