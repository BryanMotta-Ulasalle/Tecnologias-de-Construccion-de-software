import React from 'react'

const Form = ({ action, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit ?? action} className='flex flex-col gap-2'>
        {children}
      </form>
  )
}

export default Form