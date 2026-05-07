import Button from "../../../shared/components/ui/Button";
import LabelInput from "../../../shared/components/ui/LabelInput";
import { X } from "lucide-react";
import LabelSelect from "../../../shared/components/ui/LabelSelect";
import Form from "../../../shared/components/ui/Form";
import CardCreate from "../../../shared/components/ui/CardCreate";
import React, { useState } from "react";
import useProductosSeleccionados from "../hooks/useProductosSeleccionados";
import TableCreateProductosDetail from "./TableCreateProductosDetail";
import useLoading from "../../../shared/components/hooks/useLoading";
import { useTranslation } from "react-i18next";
const FormCreatePedido = ({
  onCreatePedido,
  handleClose,
  selectOptionsUsers,
  selectOptionsProducts,
}) => {
  const [userId, setUserId] = useState("");
  const {
    productosAgregados,
    setProductosAgregados,
    productoId,
    setProductoId,
    cantidad,
    setCantidad,
    handleAddProduct,
    prepararDatosPedido,
    handleCloseCreatePedido,
  } = useProductosSeleccionados();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { t } = useTranslation(["orders","common"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productos = prepararDatosPedido(productosAgregados);
    console.log("Productos preparados para el pedido:", productos);

    if (!userId) {
      alert(t("orders:validation"));
      return;
    }

    if (productos.length === 0) {
      alert(t("orders:validation2"));
      return;
    }

    startLoading(); // Start loading indicator

    try {
      await onCreatePedido({
        usuario_id: Number(userId),
        producto_ids: productos,
      });
      setProductosAgregados([]);
      setUserId("");
      setProductoId("");
      setCantidad("");
      handleClose();
    } catch (error) {
      console.error("Error al crear el pedido:", error);
    } finally {
      stopLoading(); // Stop loading indicator
    }
  };

  /* const handleSubmitTest = () => {
    const productos = prepararDatosPedido(productosAgregados);

    const datosDePrueba = {
      usuario_id: Number(userId),
      producto_ids: productos
    };

    console.log("Datos de prueba para crear el pedido:", datosDePrueba);

    setProductosAgregados([]);
    setUserId("");
    setProductoId("");
    setCantidad("");
    handleClose();

  } */

  return (
    <CardCreate variant="big">
      <div className="flex items-center justify-between border-b border-tableBorder p-5">
        <h1 className="text-text2 text-2xl">{t("orders:form:addOrder")}</h1>
        <Button
          onClick={() => {
            handleClose();
            handleCloseCreatePedido();
          }}
          variant="none"
        >
          <X className="w-6 h-6 text-text2 " />
        </Button>
      </div>
      <Form action={handleSubmit}>
        <div className="p-5">
          <LabelSelect
            htmlFor="UserId"
            children={t("orders:form.user.label")}
            selectOptions={selectOptionsUsers}
            type="users"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              console.log("Selected User ID:", e.target.value);
            }}
          />

          <div className="flex flex-col gap-3 border border-tableBorder rounded-lg p-3 mt-4">
            <div className="flex flex-row gap-4">
              <div className="flex-10">
                <LabelSelect
                  htmlFor="ProductoId"
                  children={t("orders:form.product.label")}
                  selectOptions={selectOptionsProducts}
                  type="products"
                  value={productoId}
                  onChange={(e) => {
                    setProductoId(e.target.value);
                    console.log("Selected Product ID:", e.target.value);
                  }}
                />
              </div>
              <div className="flex-1">
                <LabelInput
                  htmlFor="cantidad"
                  label={t("orders:form.quantity.label")}
                  children={t("orders:form.quantity.placeholder")}
                  type="number"
                  placeholder={t("orders:form.quantity.placeholder")}
                  value={cantidad}
                  onChange={(e) => {
                    setCantidad(e.target.value);
                    console.log("Selected Quantity:", e.target.value);
                  }}
                />
              </div>
              <div className="flex items-end p-2 flex-1">
                <Button
                  type="button"
                  variant="add"
                  className="h-10"
                  onClick={handleAddProduct}
                  disabled={!productoId || !cantidad}
                >
                  {t("orders:form.add")}
                </Button>
              </div>
            </div>
            <div className="h-55 border border-tableBorder rounded-lg p-3 mt-4">
              <TableCreateProductosDetail data={productosAgregados} />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end py-4 px-5 border-t border-tableBorder">
          <Button
            type="button"
            onClick={() => {
              handleClose();
              handleCloseCreatePedido();
            }}
            className=""
            variant="cancel"
          >
            {t("common:actions.cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t("orders:form.creating") : t("orders:addOrder") }
          </Button>
        </div>
      </Form>
    </CardCreate>
  );
};

export default FormCreatePedido;
