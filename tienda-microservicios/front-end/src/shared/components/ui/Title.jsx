import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div>
        <h1 className='text-4xl font-bold text-white'>{title}</h1>
        <p className='text-text1 text-lg'>{description}</p>
      
    </div>
  )
}

export default Title
