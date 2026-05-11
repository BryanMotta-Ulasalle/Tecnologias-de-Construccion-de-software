/*
  Código anterior (mejor esfuerzo, recuperado como comentario):

  // Ejemplo de patrón repetido que existía antes:
  // import axios from 'axios'
  // const API_URL = 'http://127.0.0.1:5001'
  // const client = axios.create({ baseURL: API_URL })
  // client.interceptors.request.use((config) => {
  //   console.log('users: request', config.method, config.url)
  //   return config
  // })
  //
  // export const getUsers = async () => {
  //   const res = await client.get('/usuarios/')
  //   return res.data
  // }

  Ahora `createApiClient` centraliza la creación de clientes `axios`.
*/

import axios from 'axios'
import { logger } from '../shared/utils/logger'

export const createApiClient = ({ baseURL, serviceName }) => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  client.interceptors.request.use((config) => {
    logger.debug(`${serviceName}: request`, {
      method: config.method,
      url: config.url,
    })

    return config
  })

  client.interceptors.response.use(
    (response) => {
      logger.debug(`${serviceName}: response`, response.status)
      return response
    },
    (error) => {
      logger.error(`${serviceName}: error`, error?.message ?? 'Unknown error')
      return Promise.reject(error)
    },
  )

  return client
}
