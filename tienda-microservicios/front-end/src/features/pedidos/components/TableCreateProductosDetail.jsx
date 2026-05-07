import React from 'react'
import {Table_style, thead_style, tbody_style, td_style, th_Style} from '../../../shared/data/styles'
import { useTranslation } from "react-i18next";
const TableCreateProductosDetail = ({data}) => {

    const {t}= useTranslation(["orders"])
    

  return (
    <table className={Table_style}>
        <thead className={thead_style}>
            <tr>
                <th className={th_Style}>{t("orders:form.product.label")}</th>
                <th className={th_Style}>{t("orders:form.quantity.label")}</th>
                <th className={th_Style}>{t("orders:form.price")}</th>
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