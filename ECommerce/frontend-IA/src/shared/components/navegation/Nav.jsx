import { House, Package, ShoppingBag, Users } from 'lucide-react'
import { useMemo } from 'react'
import NavItem from './NavItem'

const Nav = () => {
  const items = useMemo(
    () => [
      { to: '/dashboard', name: 'Dashboard', icon: House },
      { to: '/dashboard/productos', name: 'Productos', icon: Package },
      { to: '/dashboard/pedidos', name: 'Pedidos', icon: ShoppingBag },
      { to: '/dashboard/usuarios', name: 'Usuarios', icon: Users },
    ],
    [],
  )

  return (
    <div className="flex flex-col gap-2 py-10 text-2xl">
      {items.map((item) => (
        <NavItem key={item.to} to={item.to} name={item.name} icon={item.icon} />
      ))}
    </div>
  )
}

export default Nav
