
import PropTypes from 'prop-types'

const CardCreate = ({children, variant = "normal", className = ""}) => {

  const variants = {
    normal:"w-100 ",
    big: "w-150 h-170 "
  }


  return (
    <div className={`border z-9 bg-chart1 border-tableBorder rounded-2xl ${variants[variant]} ${className}`} role="dialog" aria-modal="true" >
      {children}  
    </div>
  )
}

CardCreate.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['normal', 'big']),
  className: PropTypes.string,
}

export default CardCreate
