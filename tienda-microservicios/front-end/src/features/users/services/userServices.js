/*
  Código anterior (mejor esfuerzo, recuperado como comentario):

  // import axios from 'axios'
  // const API_URL = 'http://127.0.0.1:5001'
  // const userApi = axios.create({ baseURL: API_URL })
  //
  // export const getUsers = async () => {
  //   const response = await userApi.get('/usuarios/')
  //   return response.data
  // }
  //
  // export const createUser = async (userData) => {
  //   const response = await userApi.post('/usuarios/', userData)
  //   return response.data
  // }

  Ahora: se usa `createApiClient` centralizado (src/services/apiClient.js) y `VITE_API_USERS_URL`.
*/

import { createApiClient } from '../../../services/apiClient'

const API_URL = import.meta.env.VITE_API_USERS_URL ?? 'http://127.0.0.1:5001'

export const userApi = createApiClient({
  baseURL: API_URL,
  serviceName: 'users',
})

export const getUsers = async () => {
  const response = await userApi.get('/usuarios/')
  return response.data
};

export const createUser = async (userData ) => {
  const response = await userApi.post('/usuarios/', userData)
  return response.data
};

