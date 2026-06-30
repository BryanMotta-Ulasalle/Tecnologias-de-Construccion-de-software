

const LabelInput = ({label, type, value,onChange, placeholder, isProfile= false}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="subtitle" className="font-medium">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`${isProfile? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"} rounded-xl px-4 py-3 border  focus:outline-none focus:border-goldenHover focus:border-2`}/>
    </div>
  )
}

export default LabelInput
