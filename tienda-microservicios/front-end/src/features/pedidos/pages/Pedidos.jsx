
import usePedidos from "../hooks/usePedidos";
import TablePedidos from "../components/TablePedidos";
import { header } from "../data/data";
import ButtonDetalleProductos from "../components/ButtonDetalleProductos";
import useClose from "../../../shared/components/hooks/useClose";
import CardDetalleProductos from "../components/cardDetalleProductos";
import Title from "../../../shared/components/ui/Title";
import ButtonCardCreate from "../../../shared/components/ui/ButtonCardCreate";
import FormCreatePedido from "../components/FormCreatePedido";
import { Plus } from "lucide-react";
import useOpenCloseDetailProduct from "../hooks/useOpenCloseDetailProduct";
import useUsers from "../../users/hooks/useUsers";
import useProtuct from "../../products/hooks/useProduct";
import { useTranslation } from "react-i18next";

const Pedidos = () => {
  const {
    pedidos,
    createNewPedido,
    handleDetail,
    selectedPedido,
  } = usePedidos();
  const { isOpen, handleOpen, handleClose } = useClose();
  const { isOpenDetail, handleOpenDetail, handleCloseDetail } =
    useOpenCloseDetailProduct();
  const { usersList } = useUsers();
  const { products } = useProtuct();

  const { t } = useTranslation(["orders"]);

  return (
    <main>
      <div className="py-10 flex items-center justify-between px-10">
        <Title title={t("orders:title")} description={t("orders:subtitle")} />
        <ButtonCardCreate
          handleOpen={handleOpen}
          isOpen={isOpen}
          name={t("orders:addOrder")}
          Icon={Plus}
        >
          <FormCreatePedido
            onCreatePedido={createNewPedido}
            handleClose={handleClose}
            selectOptionsUsers={usersList}
            selectOptionsProducts={products}
          />
        </ButtonCardCreate>
      </div>
      <div className="p-10">
        <TablePedidos
          header={header}
          data={pedidos}
          handleDetail={handleDetail}
          open={handleOpenDetail}
        />
      </div>
      <ButtonDetalleProductos isOpen={isOpenDetail}>
        <CardDetalleProductos
          data={selectedPedido}
          handleClose={() => {
            handleCloseDetail();
          }}
        />
      </ButtonDetalleProductos>
    </main>
  );
};

export default Pedidos;
