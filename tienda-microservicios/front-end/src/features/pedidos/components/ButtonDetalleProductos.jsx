import React from 'react'

const ButtonDetalleProductos = ({ isOpen, children }) => {
    return (
        <div>
            <div className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-10 bg-background/80 transition-opacity w-full h-full items-center justify-center`}>
                {children}
            </div>

        </div>
    )
}

export default ButtonDetalleProductos