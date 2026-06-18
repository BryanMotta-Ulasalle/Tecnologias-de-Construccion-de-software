import imageHero from "../utils/image-hero.jpg"

const Hero = () => {
  return (
    <section>
        <div className="relative min-h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageHero})` }}>

        </div>

    </section>
  )
}

export default Hero