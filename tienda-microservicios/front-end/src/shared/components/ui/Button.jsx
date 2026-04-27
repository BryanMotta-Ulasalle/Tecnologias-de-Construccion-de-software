import React from 'react'

const Button = ({ children, variant = "normal", onClick, type, className = "" }) => {

  const variants = {
    normal: "bg-button text-white  text-lg rounded-lg flex flex-row items-center gap-2 hover:bg-buttonHover disabled:bg-gray-400 disabled:cursor-not-allowed  disabled:hover:bg-gray-400",
    cancel: "text-text1 hover:text-text2",
    add: "bg-red-700 text-white text-lg rounded-lg flex flex-row items-center gap-2 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed  disabled:hover:bg-gray-400",
    none: ""
  }

  return (
     <button 
        className={`px-4 py-3 cursor-pointer ${className} ${variants[variant]}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  )
}

export default Button