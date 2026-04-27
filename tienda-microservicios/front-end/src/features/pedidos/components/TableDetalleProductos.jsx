import React from 'react'
import { Table_style, tbody_style, td_style, th_Style, thead_style } from '../../../shared/data/styles'


const TableDetalleProductos = ({data}) => {
  return (
    <table className={Table_style}>
        <thead className={thead_style}>
            <tr>
                <th className={th_Style}>Id Producto</th>
                <th className={th_Style}>Nombre</th>
                <th className={th_Style}>Precio</th>
            </tr>
        </thead>
        <tbody className={tbody_style}>
            {data && data.productos ? (
                data.productos.map((producto, index) => (
                    <tr key={index}>
                        <td className={td_style}>{producto.id}</td>
                        <td className={td_style}>{producto.nombre}</td>
                        <td className={td_style}>{producto.precio}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td className={td_style} colSpan="3">
                        No hay productos disponibles
                    </td>
                </tr>
            )}
        </tbody>
    </table>
  )
}

export default TableDetalleProductos