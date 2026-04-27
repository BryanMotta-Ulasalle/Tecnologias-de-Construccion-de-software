import CardCreate from "../../../shared/components/ui/CardCreate";
import Form from "../../../shared/components/ui/Form";
import Button from "../../../shared/components/ui/Button";
import LabelInput from "../../../shared/components/ui/LabelInput";
import LabelSelect from "../../../shared/components/ui/LabelSelect";
import { X } from 'lucide-react';
import { formProductName, formProductStock, formProductPrice } from "../data/data";
import React, { useState } from "react";

const FormCreateProduct = ({ onClose, onCreateProduct, handleClose }) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || price <= 0 || stock < 0) {
      alert("Por favor llena todos los espacios correctamente");
      return;
    }

    try {
      await onCreateProduct({ nombre: name.trim(), precio: price, stock: stock });

      setName("");
      setPrice(0);
      setStock(0);
      onClose();
    } catch (error) {
      alert("Error al crear el producto");
      console.error(error);
    }
  }
  return (
    <CardCreate>
      <div className="flex items-center justify-between border-b border-tableBorder p-5">
        <h1 className="text-text2 text-2xl">Agregar nuevo producto</h1>
        <Button onClick={handleClose} variant="none">
          <X className="w-6 h-6 text-text2 " />
        </Button>
      </div>
      <Form action={handleSubmit}>
        <div className="px-5 py-4 flex flex-col">
          <LabelInput label={formProductName.label} id={formProductName.name} type={formProductName.type} placeholder={formProductName.placeholder}
          value={name} onChange={(e) => {setName(e.target.value); console.log(e.target.value);}} />
          <LabelInput label={formProductPrice.label} id={formProductPrice.name} type={formProductPrice.type} placeholder={formProductPrice.placeholder}
          value={price} onChange={(e) => {setPrice (parseFloat(e.target.value)); console.log(e.target.value);}} />
          <LabelInput label={formProductStock.label} id={formProductStock.name} type={formProductStock.type} placeholder={formProductStock.placeholder}
          value={stock} onChange={(e) => {setStock(parseInt(e.target.value)); console.log(e.target.value);}} />
        </div>
        <div className="flex flex-row justify-end py-4 px-5 border-t border-tableBorder">
          <Button type="button" onClick={handleClose} className="" variant="cancel">Cancelar</Button>
          <Button type="submit">Crear Producto</Button>
        </div>
      </Form>
    </CardCreate>
  )
}

export default FormCreateProduct