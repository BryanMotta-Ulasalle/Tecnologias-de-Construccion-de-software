import { NavLink } from 'react-router-dom'

const NavPublic = ({ children, to, isMobile }) => {

  const styles = {
    mobile: {
      base: 'block w-full rounded-lg px-4 py-3',
      active: 'bg-slate-700 text-white',
      inactive: 'text-slate-300'
    },
    desktop: {
      base: 'inline-flex items-center px-4 py-2',
      active: 'border-b-2 border-white text-white',
      inactive: 'text-textGray hover:text-white'
    }
  };
  const currentStyles = isMobile
    ? styles.mobile
    : styles.desktop;

  return (
    <NavLink to={to} className={({ isActive }) => `${currentStyles.base} ${isActive
      ? currentStyles.active
      : currentStyles.inactive
      }`}>
      {children}
    </NavLink>
  )
}

export default NavPublic