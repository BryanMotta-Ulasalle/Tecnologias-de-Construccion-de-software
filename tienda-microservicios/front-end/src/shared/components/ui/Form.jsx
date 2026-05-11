import PropTypes from 'prop-types'

const Form = ({ action, onSubmit, children, className = '' }) => {
  return (
    <form onSubmit={onSubmit ?? action} className={`flex flex-col gap-2 ${className}`}>
        {children}
      </form>
  )
}

Form.propTypes = {
  action: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Form