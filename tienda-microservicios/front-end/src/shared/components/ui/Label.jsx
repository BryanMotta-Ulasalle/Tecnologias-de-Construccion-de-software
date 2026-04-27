import React from 'react'

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className='text-text1 font-medium'>
      {children}
    </label>
  )
}

export default Label