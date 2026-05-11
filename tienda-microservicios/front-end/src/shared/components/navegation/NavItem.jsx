import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom"

const NavItem = ({ to, name, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-row items-center gap-4 py-3 px-5 ${
          isActive
            ? "text-white bg-navActive border-l-6 border-button"
            : "text-text1  hover:bg-navHover hover:text-navHoverText border-l-6 border-sidebar"
        }`
      }
    >
      {Icon && <Icon className="w-8 h-8" />}
      {name}
    </NavLink>
  );
};

export default NavItem

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
}