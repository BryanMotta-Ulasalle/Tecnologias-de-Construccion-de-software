import React, { useState } from 'react'

const useClose = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        console.log("click para abrir")
        setIsOpen(true)

        
    }

    const handleClose = () => {
        setIsOpen(false)
        console.log("se hixo click en un boton de cerrar")
    }


  return {
    isOpen,
    handleOpen,
    handleClose
  }
}

export default useClose
