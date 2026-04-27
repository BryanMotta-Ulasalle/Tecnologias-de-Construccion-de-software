import React from 'react'
import Label from './Label'
import Select from './Select'

const LabelSelect = ({ selectOptions, htmlFor, children, type, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
        <Label htmlFor={htmlFor} children={children} />
        <Select select={selectOptions} type={type} value={value} onChange={onChange} />
    </div>
  )
}

export default LabelSelect