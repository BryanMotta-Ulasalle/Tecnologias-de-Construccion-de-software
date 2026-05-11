/*
  Código anterior (mejor esfuerzo, recuperado como comentario):

  // import axios from 'axios'
  // const API_URL = 'http://localhost:5003'
  // const pedidosApi = axios.create({ baseURL: API_URL })
  //
  // export const getPedidos = async () => {
  //   const response = await pedidosApi.get('/pedidos/')
  //   return response.data
  // }
  //
  // export const createPedido = async (pedidoData) => {
  //   const response = await pedidosApi.post('/pedidos/', pedidoData)
  //   return response.data
  // }

  Ahora: `createApiClient` centralizado y `VITE_API_PEDIDOS_URL`.
*/

import { createApiClient } from '../../../services/apiClient'

const API_URL = import.meta.env.VITE_API_PEDIDOS_URL ?? 'http://localhost:5003'

export const pedidosApi = createApiClient({
  baseURL: API_URL,
  serviceName: 'pedidos',
})

export const getPedidos = async () => {
  const response = await pedidosApi.get('/pedidos/')
  return response.data
};

export const createPedido = async (pedidoData) => {
  const response = await pedidosApi.post('/pedidos/', pedidoData)
  return response.data

}

