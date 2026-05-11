import PropTypes from 'prop-types'

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className='text-text1 font-medium'>
      {children}
    </label>
  )
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Label