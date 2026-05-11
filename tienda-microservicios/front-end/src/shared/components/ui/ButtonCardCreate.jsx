import PropTypes from 'prop-types'

const ButtonCardCreate = ({ children, handleOpen, isOpen, name, Icon, modalTitle }) => {
  const safeModalId = modalTitle ?? name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>

        <button type="button" aria-expanded={isOpen} aria-controls={safeModalId} onClick={handleOpen} className='bg-button text-white px-6 py-4 text-lg rounded-lg flex flex-row items-center gap-2 hover:bg-buttonHover cursor-pointer'>
          {Icon && <Icon className="w-7 h-7"/>}{name}</button>

        <div 
        id={safeModalId}
        className={`${isOpen? 'flex' : 'hidden'} fixed inset-0 z-10 bg-background/80 transition-opacity w-full h-full items-center justify-center`}
        role="presentation">
            {children}
        </div>
      
    </div>
  )
}

ButtonCardCreate.propTypes = {
  children: PropTypes.node.isRequired,
  handleOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  modalTitle: PropTypes.string,
}

export default ButtonCardCreate
