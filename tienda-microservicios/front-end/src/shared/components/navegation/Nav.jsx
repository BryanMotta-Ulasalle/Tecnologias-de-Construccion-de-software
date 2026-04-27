import React from 'react'
import NavItem from './NavItem'
import { House } from 'lucide-react';
import { Users } from 'lucide-react';
import { Package } from 'lucide-react';

const Nav = () => {
  return (
    <div className='flex flex-col text-2xl py-10'>
      
      <NavItem to="/" name="Home" icon={House} />
      <NavItem to="/usuarios" name="Usuarios" icon={Users} />
      <NavItem to="/productos" name="Productos" icon={Package} />
      <NavItem to="/pedidos" name="Pedidos" icon={Package} />
    </div>
  )
}

export default Nav
