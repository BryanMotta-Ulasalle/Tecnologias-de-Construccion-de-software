import React from 'react'
import { Table_style, tbody_style, td_style, th_Style, thead_style } from '../../../shared/data/styles'

const UserTable = ({ header, data }) => {

    

  return (
    <table className={Table_style}>
        <thead className={thead_style}>
            <tr>
                <th className="text-text2 py-5 text-xl border-b border-tableBorder px-10" colSpan={header.length}>Listado de usuarios</th>
            </tr>
            <tr className=''>
                {
                    header.map((item, index) => <th className={th_Style}
                    key={index}>{item}</th>)
                }
            </tr>
        </thead>
        <tbody className={tbody_style}>
            {
                data.map((item ) => (
                    <tr key={item.id}>
                        <td className={td_style}>{item.nombre}</td>
                        <td className={td_style}>{item.email}</td>
                        <td className={td_style}>{item.nombre}</td>
                        <td className={td_style}>{item.nombre}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
  ) 
}

export default UserTable
