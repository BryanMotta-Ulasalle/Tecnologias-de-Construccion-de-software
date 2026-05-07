import { Table_style, tbody_style, td_style, th_Style, thead_style } from '../../../shared/data/styles'
import { useTranslation } from 'react-i18next'
const ProductTable = ({ data }) => {

    const {t} = useTranslation(['products'])

  return (
    <table className={Table_style}>
            <thead className={thead_style}>
                <tr>
                <th className="text-text2 py-5 text-xl border-b border-tableBorder px-10" colSpan={3}   >{t('products:table:title')}</th>
            </tr>
                <tr className=''>
                    
                         <th className={th_Style}>{t('products:table:name')}</th>
                            <th className={th_Style}>{t('products:table:price')}</th>
                            <th className={th_Style}>{t('products:table:stock')}</th>
                    
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