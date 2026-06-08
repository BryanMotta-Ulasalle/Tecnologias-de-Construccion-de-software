import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="flex backdrop-blur-lg text-white text-xl font-bold gap-10 z-10 justify-center items-center py-6 bg-black/10 border border-white/20">
        <NavLink to="/" className="flex items-center gap-2">
            <IoHome />
            <span>Inicio</span>
        </NavLink>
        <NavLink to="/with-workers" className={({ isActive }) => isActive ? " border-b-4 border-cyan-400 text-cyan-400 p-2" : " p-2 hover:text-blue-100"}>Prueba con Workers</NavLink>
        <NavLink to="/without-workers" className={({ isActive }) => isActive ? " border-b-4 border-cyan-400 text-cyan-400 p-2" : " p-2 hover:text-blue-100"}>Prueba sin Workers</NavLink>
    </nav>
  )
}

export default Navbar