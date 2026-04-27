import React from 'react'
import {Table_style, thead_style, tbody_style, td_style, th_Style} from '../../../shared/data/styles'

const TableCreateProductosDetail = ({data}) => {

    

  return (
    <table className={Table_style}>
        <thead className={thead_style}>
            <tr>
                <th className={th_Style}>Producto</th>
                <th className={th_Style}>Cantidad</th>
                <th className={th_Style}>Precio</th>
            </tr>
        </thead>
        <tbody className={tbody_style}>
            {data.map((item, index) => (
                <tr key={index}>
                    <td className={td_style}>{item.nombre}</td>
                    <td className={td_style}>{item.cantidad}</td>
                    <td className={td_style}>{item.precio}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TableCreateProductosDetail