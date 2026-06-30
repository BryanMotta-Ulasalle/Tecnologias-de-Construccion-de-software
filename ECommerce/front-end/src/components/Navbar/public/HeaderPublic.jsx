import NavBarPublic from "./NavBarPublic"
import Button from "../../Button"
import { useState } from "react"
import MenuMobile from "./MenuMobile"
import Logo from "./Logo"
import { Menu } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom"
import ButtonLink from "../../ButtonLink"
import useAuth from './../../../hooks/useAuth';
import AccountList from "../private/AccountList"
import { ChevronDown } from 'lucide-react';

const HeaderPublic = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isAccountOpen, setIsAccountOpen] = useState(false)

    const isHome = location.pathname === "/";

    const { isAuthenticated, isAdmin, logout, user } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <header className={`z-100 fixed w-full 
             ${isHome ? "backdrop-blur-xl bg-black/50 h-15  border-b border-white/30"
                : "bg-white"
            }
        `}  >
            <div className="lg:max-w-360 w-full m-auto flex h-15 lg:px-10 justify-between px-5">
                <Logo isHome={isHome}/>
                <NavBarPublic isHome={isHome} />
                <div className="flex items-center">
                    {
                        !isAuthenticated ? (
                            <>
                            {isHome? <ButtonLink to="/login" color="golden" size="md">Iniciar Sesion</ButtonLink> 
                            : <ButtonLink to="/login" color="bgBlack" size="md">Iniciar Sesion</ButtonLink>}
                            </>
                        ) : (
                            <>
                            <button onClick={() => setIsAccountOpen((current)=> !current)}
                                className={`flex flex-row items-center gap-2 ${isHome ? "text-white bg-golden px-4 py-2 rounded-lg" : ""}`}
                                >  {user?.name.split(" ")[0]} <ChevronDown className="w-4 h-4"/></button>
                            {
                                isAccountOpen
                                ?  <AccountList name={user?.name} email={user?.email} role={user?.role?.name} handleLogout={handleLogout} isAdmin={isAdmin}/>
                                : null
                            }
                            </>
                        )
                    }
                </div>
                <Button children={<Menu />} color={isHome ? "white" : ""} onClick={() => setIsMobileOpen((current) => !current)} className="lg:hidden" />
                {isMobileOpen ? (
                    <div>
                        <MenuMobile setIsMobileOpen={setIsMobileOpen} />

                    </div>
                ) : null}
            </div>
        </header>
    )
}

export default HeaderPublic