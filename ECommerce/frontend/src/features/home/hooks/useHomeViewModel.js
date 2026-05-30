import { useMemo } from 'react'

export function useHomeViewModel({ products, categories, session }) {
  const homeStats = useMemo(
    () => [
      { value: `${products.length}`, label: 'products' },
      { value: `${categories.length}`, label: 'categories' },
      { value: session.signedIn ? 'online' : 'guest', label: 'session' },
    ],
    [categories.length, products.length, session.signedIn],
  )

  const categorySummary = useMemo(
    () =>
      categories.map((category) => {
        const productCount = products.filter((product) => product.category === category.name).length
        return {
          name: category.name,
          description: category.description ?? 'Sin descripción',
          count: `${productCount} items`,
          emoji: '🛍️',
        }
      }),
    [categories, products],
  )

  const featuredProducts = useMemo(() => products.slice(0, 4), [products])
  const trendingProducts = useMemo(() => products.slice(0, 2), [products])

  return {
    homeStats,
    categorySummary,
    featuredProducts,
    trendingProducts,
  }
}