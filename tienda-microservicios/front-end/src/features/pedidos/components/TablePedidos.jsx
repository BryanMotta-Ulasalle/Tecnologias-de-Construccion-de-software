import {
  Table_style,
  tbody_style,
  td_style,
  th_Style,
  thead_style,
} from "../../../shared/data/styles";
import { useTranslation } from "react-i18next";

const TablePedidos = ({ data, handleDetail, open }) => {
  const { t } = useTranslation(["orders"]);

  return (
    <table className={Table_style}>
      <thead className={thead_style}>
        <tr>
          <th
            className="text-text2 py-5 text-xl border-b border-tableBorder px-10"
            colSpan={5}
          >
            {t("orders:table.title")}
          </th>
        </tr>
        <tr className="">
          <th className={th_Style}>{t("orders:table.id")}</th>
          <th className={th_Style}>{t("orders:table.userId")}</th>
          <th className={th_Style}>{t("orders:table.total")}</th>
          <th className={th_Style}>{t("orders:table.status")}</th>
          <th className={th_Style}>{t("orders:table.product")}</th>
        </tr>
      </thead>
      <tbody className={tbody_style}>
        {data.map((item) => (
          <tr key={item.id}>
            <td className={td_style}>{item.id}</td>
            <td className={td_style}>{item.usuario_id}</td>
            <td className={td_style}>{item.total}</td>
            <td className={td_style}>{item.estado}</td>
            <td className={td_style}>
              <button
                onClick={() => {
                  handleDetail(item.id);
                  open();
                }}
              >
                Detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePedidos;
