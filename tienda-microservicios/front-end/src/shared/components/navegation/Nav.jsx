import React from 'react'
import NavItem from './NavItem'

const Nav = () => {
  return (
    <div className='flex flex-col gap-5'>
      <NavItem to="/" name="Home" />
      <NavItem to="/usuarios" name="Usuarios" />
      <NavItem to="/productos" name="Productos" />
    </div>
  )
}

export default Nav
