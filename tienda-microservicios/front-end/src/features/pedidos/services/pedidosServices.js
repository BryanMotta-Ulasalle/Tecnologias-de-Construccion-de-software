import axios from 'axios';

const API_URL = 'http://localhost:5003';

export const pedidosApi = axios.create({ baseURL: API_URL });

export const getPedidos = async () => {
  try {
    const response = await pedidosApi.get('/pedidos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    throw error;
  }
};

export const createPedido = async (pedidoData) => {
  try {
    const response = await pedidosApi.post('/pedidos/', pedidoData);
    return response.data;
    } catch (error) {
    console.error('Error creating pedido:', error);
    throw error;
  }     

}

