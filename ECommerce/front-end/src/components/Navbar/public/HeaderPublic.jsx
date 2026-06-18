import NavBarPublic from "./NavBarPublic"
import Button from "../../Button"
import { useState } from "react"
import MenuMobile from "./MenuMobile"

const HeaderPublic = () => {

    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <header className="w-full bg-black h-15">
            <NavBarPublic/>
            <Button children="W" color="white" onClick={() => setIsMobileOpen((current) => !current)} className="lg:hidden"/>
            {isMobileOpen ? (
                <div>
                    <MenuMobile setIsMobileOpen={setIsMobileOpen}/>

                </div>
            ) : null}
        </header>
    )
}

export default HeaderPublic