import {getPedidos, createPedido} from '../services/pedidosServices';
import { useState, useCallback , useEffect} from 'react';

const usePedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);

    const createNewPedido = useCallback(async (pedidoData) => {
        try {
            const newPedido = await createPedido(pedidoData);
            setPedidos((prevPedidos) => [...prevPedidos, newPedido]);
            return newPedido;
        } catch (error) {
            console.error('Error creating pedido:', error);
            throw error;
        }
    }, []);

    useEffect(() => {
        const loadPedidos = async () => {
            try {
                const data = await getPedidos();
                setPedidos(data);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        loadPedidos();
    }, []);

    const handleDetail = (pedidoId) => {
        console.log('Detalle del pedido con ID:', pedidoId);
        const pedido = pedidos.find((p) => p.id === pedidoId);
        if (pedido) {
            setSelectedPedido(pedido);
            console.log('Pedido seleccionado:', pedido);
        } else {
            console.error('Pedido no encontrado');
        }
    }
    
    const handleCloseDetail2 = () => {
        setSelectedPedido(null);
    }

  return {
    pedidos,
    createNewPedido,
    handleDetail,
    selectedPedido,
    handleCloseDetail2
  }
}

export default usePedidos