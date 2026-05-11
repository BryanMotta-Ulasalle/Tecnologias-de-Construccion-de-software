import PropTypes from 'prop-types'

const Input = ({ type = "text", id, name, placeholder, className, value, onChange, required = false, min, max, step, disabled = false, ariaDescribedby }) => {
  return (
    <input 
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={`border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 ${className}`}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-describedby={ariaDescribedby}
        />
  )
}

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  ariaDescribedby: PropTypes.string,
}


export default Input