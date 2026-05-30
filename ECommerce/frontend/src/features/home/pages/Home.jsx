import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { LandingView } from '../../../components/views/LandingView'

const Home = () => {
  const { currentProduct, homeStats, categorySummary, products, navigate } = useEcommerceStore()

  return (
    <LandingView
      currentProduct={currentProduct}
      homeStats={homeStats}
      categorySummary={categorySummary}
      featuredProducts={products.slice(0, 4)}
      trendingProducts={products.slice(0, 2)}
      onNavigate={navigate}
      onSelectProduct={() => navigate('shop')}
    />
  )
}

export default Home
