import React from 'react'
import { Table_style, tbody_style, td_style, th_Style, thead_style } from '../../../shared/data/styles'
import { useTranslation } from 'react-i18next'

const UserTable = ({ data }) => {

    const {t } = useTranslation(['users'])

  return (
    <table className={Table_style}>
        <thead className={thead_style}>
            <tr>
                <th className="text-text2 py-5 text-xl border-b border-tableBorder px-10" colSpan={4}>{t('users:table.title')}</th>
            </tr>
            <tr className=''>
                <th className={th_Style}>{t('users:table.name')}</th>
                <th className={th_Style}>{t('users:table.email')}</th>
                <th className={th_Style}>{t('users:table.role')}</th>
                <th className={th_Style}>{t('users:table.status')}</th>
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
