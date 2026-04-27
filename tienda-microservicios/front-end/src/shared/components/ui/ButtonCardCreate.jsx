import React, { useState } from 'react'
import CardCreate from './CardCreate'

const ButtonCardCreate = ({  children,  handleOpen, isOpen, name, Icon}) => {
    

  return (
    <div>

        <button onClick={handleOpen} className='bg-button text-white px-6 py-4 text-lg rounded-lg flex flex-row items-center gap-2 hover:bg-buttonHover cursor-pointer'>
          {Icon && <Icon className="w-7 h-7"/>}{name}</button>

        <div 
        className={`${isOpen? 'flex' : 'hidden'} fixed inset-0 z-10 bg-background/80 transition-opacity w-full h-full items-center justify-center`}>
            {children}
        </div>
      
    </div>
  )
}

export default ButtonCardCreate
