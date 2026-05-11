/*
  Código anterior (mejor esfuerzo, recuperado como comentario):

  // import axios from 'axios'
  // const API_URL = 'http://127.0.0.1:5002'
  // const productApi = axios.create({ baseURL: API_URL })
  //
  // export const getProducts = async () => {
  //   const response = await productApi.get('/productos')
  //   return response.data
  // }
  //
  // export const createProduct = async (productData) => {
  //   const response = await productApi.post('/productos', productData)
  //   return response.data
  // }

  Ahora: usa `createApiClient` centralizado y `VITE_API_PRODUCTS_URL`.
*/

import { createApiClient } from '../../../services/apiClient'

const API_URL = import.meta.env.VITE_API_PRODUCTS_URL ?? 'http://127.0.0.1:5002'

export const productApi = createApiClient({
    baseURL: API_URL,
    serviceName: 'products',
})

export const getProducts = async () => {
    const response = await productApi.get('/productos')
    return response.data
}

export const createProduct = async (productData) => {
    const response = await productApi.post('/productos', productData)
    return response.data
}
