import React, { Children } from 'react'

const Form = ({ action, children }) => {
  return (
    <form onSubmit={action} className='flex flex-col'>
        {children}
      </form>
  )
}

export default Form