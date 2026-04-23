import { Table_style, tbody_style, td_style, th_Style, thead_style } from '../../../shared/components/data/styles'

const ProductTable = ({ header, data }) => {
  return (
    <table className={Table_style}>
            <thead className={thead_style}>
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
                            <td className={td_style}>{item.precio}</td>
                            <td className={td_style}>{item.stock}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
  )
}

export default ProductTable