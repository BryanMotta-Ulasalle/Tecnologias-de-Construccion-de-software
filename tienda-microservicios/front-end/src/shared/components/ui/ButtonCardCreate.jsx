import React, { useState } from 'react'
import CardCreate from './CardCreate'

const ButtonCardCreate = ({ onCreateUser }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        console.log("click")
        setIsOpen(true)

        
    }

    const handleClose = () => {
        setIsOpen(false)
    }


  return (
    <div>

        <button onClick={handleClick} className='border border-blue-700 p-2'>Create Card</button>

        <div 
        className={`${isOpen? 'flex' : 'hidden'} fixed inset-0 z-10 bg-black/30 transition-opacity w-full h-full items-center justify-center`}>
            <CardCreate onClose={handleClose} onCreateUser={onCreateUser} />
        </div>
      
    </div>
  )
}

export default ButtonCardCreate
