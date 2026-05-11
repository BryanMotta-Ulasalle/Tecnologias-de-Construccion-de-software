import PropTypes from 'prop-types'
import Label from './Label'
import Select from './Select'

const LabelSelect = ({ selectOptions, htmlFor, children, type, value, onChange, disabled = false }) => {
  return (
    <div className="flex flex-col gap-2">
        <Label htmlFor={htmlFor} children={children} />
        <Select id={htmlFor} select={selectOptions} type={type} value={value} onChange={onChange} disabled={disabled} />
    </div>
  )
}

LabelSelect.propTypes = {
  selectOptions: PropTypes.array,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['normal', 'users', 'products']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export default LabelSelect