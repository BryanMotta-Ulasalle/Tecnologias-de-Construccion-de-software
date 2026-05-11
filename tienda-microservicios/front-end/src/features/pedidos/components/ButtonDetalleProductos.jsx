import PropTypes from 'prop-types'

const ButtonDetalleProductos = ({ isOpen, children }) => {
    return (
        <div>
            <div className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-10 bg-background/80 transition-opacity w-full h-full items-center justify-center`} role="dialog" aria-modal="true">
                {children}
            </div>

        </div>
    )
}

ButtonDetalleProductos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default ButtonDetalleProductos