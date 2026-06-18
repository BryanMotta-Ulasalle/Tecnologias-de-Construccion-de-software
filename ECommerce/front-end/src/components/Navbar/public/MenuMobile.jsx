import Button from "../../Button"
import H2 from "../../H2"
import NavBarPublic from "./NavBarPublic"

const MenuMobile = ({setIsMobileOpen}) => {
    return (
        <div className="fixed inset-0 bg-black/30 w-screen h-screen z-10">
            <div className="w-60 h-full bg-black absolute top-0 right-0 z-50">
                <div className="p-5 flex flex-row justify-between ">
                    <H2 children="Menu" color="white"/>
                    <Button children="X" color="white" onClick={() => setIsMobileOpen((current) => !current)} />
                </div>
                <div>
                    <NavBarPublic isMobile={true}/> 
                </div>
            </div>
        </div>
    )
}

export default MenuMobile