import React from 'react'

const Input = ({ type = "text", id, placeholder, className, value, onChange }) => {
  return (
    <input 
          type={type}
          id={id}
          placeholder={placeholder}
          className={`border border-gray-400 p-1 rounded-lg mb-1 ${className}`}
          value={value}
          onChange={onChange}
        />
  )
}


export default Input