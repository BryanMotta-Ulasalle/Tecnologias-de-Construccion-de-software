import { Outlet } from "react-router-dom"
import HeaderPublic from "../src/components/Navbar/public/HeaderPublic"

const PublicLayout = () => {
  return (
    <>
        <HeaderPublic/>
        <main className="pt-15 bg-bgLight">
            <div className="w-full lg:max-w-360 mx-auto">
              <Outlet/>
            </div>
        </main>
    </>
  )
}

export default PublicLayout