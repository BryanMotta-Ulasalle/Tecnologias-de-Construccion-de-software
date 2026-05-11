import { useCallback, useMemo, useState } from 'react'
import useProduct from '../../products/hooks/useProduct'

const useProductosSeleccionados = () => {

    const { products } = useProduct()

    const [productosAgregados, setProductosAgregados] = useState([])
    const [productoId, setProductoId] = useState("")
    const [cantidad, setCantidad] = useState("")

    const selectedProduct = useMemo(() => products.find((product) => String(product.id) === String(productoId)), [products, productoId])

    const handleAddProduct = useCallback(() => {

        if (!selectedProduct) {
          return
        }

        const cantidadNumerica = Number(cantidad)

        if (!Number.isFinite(cantidadNumerica) || cantidadNumerica <= 0) {
          return
        }

        const nuevoProducto = {
          productoId: selectedProduct.id,
          nombre: selectedProduct.nombre,
          cantidad: cantidadNumerica,
          precio: selectedProduct.precio * cantidadNumerica,
        }

        // Antes dependíamos del estado capturado por cierre; ahora usamos el estado previo real.
        setProductosAgregados((prevProductos) => [...prevProductos, nuevoProducto])
        setProductoId("")
        setCantidad("")
    }, [cantidad, selectedProduct])

    const prepararDatosPedido = useCallback((productos) => {
        return productos.flatMap((producto) => {
            const cantidadNumerica = Number(producto.cantidad)
            const idNumerico = Number(producto.productoId)

            return Array.from({ length: cantidadNumerica }, () => idNumerico)
        })
    }, [])

    const handleCloseCreatePedido = useCallback(() => {
        setProductosAgregados([])
        setProductoId("")
        setCantidad("")
    }, [])


    return {
        productosAgregados,
        setProductosAgregados,
        productoId,
        setProductoId,
        cantidad,
        setCantidad,
        handleAddProduct,
        prepararDatosPedido,
        handleCloseCreatePedido,
        selectedProduct,
    }
}

export default useProductosSeleccionados