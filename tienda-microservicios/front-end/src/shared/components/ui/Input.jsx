import React from 'react'

const Input = ({ type = "text", id, placeholder, className, value, onChange }) => {
  return (
    <input 
          type={type}
          id={id}
          placeholder={placeholder}
          className={`border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 ${className}`}
          value={value}
          onChange={onChange}
        />
  )
}


export default Input