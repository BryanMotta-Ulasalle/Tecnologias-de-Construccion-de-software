

const LabelInput = ({label, type, value,onChange, placeholder}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="subtitle" className="font-medium">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className=" rounded-lg px-4 py-2 bg-white border border-textGray focus:outline-none focus:border-goldenHover focus:border-2"/>
    </div>
  )
}

export default LabelInput
