import React from 'react'

const Select = ({children,value,onChange,disabled}) => {
  return (
    <select value={value} onChange={onChange} disabled={disabled}
    className="border border-[#C2C6D6] py-2 px-3 w-60 bg-[#F2F4F6] rounded-lg disabled:bg-gray-200 disabled:text-gray-500"
    >{children}</select>
  )
}

export default Select