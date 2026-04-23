import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-gray-600'>{description}</p>
      
    </div>
  )
}

export default Title
