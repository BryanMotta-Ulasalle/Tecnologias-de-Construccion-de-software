import Label from "../../../shared/components/ui/Label";
import Input from "../../../shared/components/ui/Input";

const LabelInput = ({ label, id, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} children={label} />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default LabelInput