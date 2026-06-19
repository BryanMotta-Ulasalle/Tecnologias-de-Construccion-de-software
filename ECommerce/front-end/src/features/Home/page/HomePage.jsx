import HeaderPublic from "../../../components/Navbar/public/HeaderPublic"
import Hero from "../components/Hero"
import Categogy from "../components/Categogy"

const HomePage = () => {
  return (
    <div className="relative">
        <HeaderPublic/>
        <Hero/>
        <div className="bg-bgLight w-full">
          <div className="w-full lg:max-w-360 mx-auto">
            <Categogy/>
          </div>
        </div>
    </div>
  )
}

export default HomePage