import NavBarPublic from "./NavBarPublic"
import Button from "../../Button"
import { useState } from "react"
import MenuMobile from "./MenuMobile"
import Logo from "./Logo"
import { Menu } from 'lucide-react';

const HeaderPublic = () => {

    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <header className="z-100 fixed w-full backdrop-blur-xl bg-black/50 h-15  border-b border-white/30">
            <div className="lg:max-w-360 w-full m-auto flex h-15 lg:px-10 justify-between px-5">
                <Logo/>
            <NavBarPublic/>
            <Button children={<Menu/>} color="white" onClick={() => setIsMobileOpen((current) => !current)} className="lg:hidden"/>
            {isMobileOpen ? (
                <div>
                    <MenuMobile setIsMobileOpen={setIsMobileOpen}/>

                </div>
            ) : null}
            </div>
        </header>
    )
}

export default HeaderPublic