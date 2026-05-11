import PropTypes from 'prop-types'
import Label from "../../../shared/components/ui/Label";
import Input from "../../../shared/components/ui/Input";

const LabelInput = ({ label, id, type, placeholder, value, onChange, required = false, min, max, step, disabled = false, name }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} children={label} />
      <Input
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </div>
  )
}

LabelInput.propTypes = {
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  name: PropTypes.string,
}

export default LabelInput