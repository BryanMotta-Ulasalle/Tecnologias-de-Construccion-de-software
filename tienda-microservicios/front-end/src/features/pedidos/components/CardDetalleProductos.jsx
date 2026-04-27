import React from 'react'
import TableDetalleProductos from './TableDetalleProductos'
import { X } from 'lucide-react';

const cardDetalleProductos = ({data, handleClose}) => {
    return (
        <div className="w-200 h-150 bg-chart1 rounded-xl z-11 border border-tableBorder">
            <div className=" flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center border-b border-tableBorder p-7">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-text2">Detalle del Pedido</h1>
                        <div className="flex flex-row gap-5 text-text1">
                            <span>ID: 1</span>
                            <span>Pendiente</span>
                        </div>
                    </div>
                    <button onClick={handleClose} className="text-text1 hover:text-text2 ">
                        <X className="w-10 h-10" />
                    </button>
                </div>
                <TableDetalleProductos data={data}/>

                <div>
1
                </div>

            </div>
        </div>
    )
}

export default cardDetalleProductos