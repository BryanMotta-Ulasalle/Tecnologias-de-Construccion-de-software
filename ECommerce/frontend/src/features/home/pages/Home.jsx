import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import Hero from '../components/Hero'
import Collections from '../components/Collections'
import FeaturedProducts from '../components/FeaturedProducts'
import Conversion from '../components/Conversion'
import imageHero from '../image-hero.jpg'

const Home = () => {
  const { currentProduct, homeStats, categorySummary, products, navigate } = useEcommerceStore()

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
      <div className="relative min-h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageHero})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/60" />
        <Hero heroProduct={heroProduct} onNavigate={navigate} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Collections categories={categorySummary} onNavigate={navigate} />
      </section>
      <FeaturedProducts products={products.slice(0, 4)} onNavigate={navigate} />
      <Conversion products={products.slice(0, 2)} onNavigate={navigate} />
    </>
  )
}

export default Home
