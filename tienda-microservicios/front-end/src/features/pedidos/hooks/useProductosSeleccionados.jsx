import { useState } from 'react'
import useProtuct from '../../products/hooks/useProduct';

const useProductosSeleccionados = () => {

    const { products } = useProtuct()

    const [productosAgregados, setProductosAgregados] = useState([])
    const [productoId, setProductoId] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleAddProduct = () => {

        const selected = products.find(opt => opt.id == productoId);
        console.log("Producto seleccionado:", selected);
        // Lógica para agregar el producto seleccionado a la lista de productos del pedido
        // Aquí podrías actualizar un estado local que mantenga la lista de productos agregados al pedido
        setProductosAgregados([...productosAgregados, { productoId, nombre: selected.nombre, cantidad, precio: (selected.precio * cantidad) }]);
        console.log("Productos agregados al pedido:", productosAgregados);
    }

    const prepararDatosPedido = (productos) => {
        return productos.flatMap((producto) => {
            const cantidadNumerica = Number(producto.cantidad);
            const idNumerico = Number(producto.productoId);

            return Array.from({ length: cantidadNumerica }, () => idNumerico);
        });
    }

    const handleCloseCreatePedido = () => {
        setProductosAgregados([]);
        setProductoId("");
        setCantidad("");
    }


    return {
        productosAgregados,
        setProductosAgregados,
        productoId,
        setProductoId,
        cantidad,
        setCantidad,
        handleAddProduct,
        prepararDatosPedido,
        handleCloseCreatePedido
    }
}

export default useProductosSeleccionados