import axios from 'axios'
import { logger } from '../shared/utils/logger'

let accessToken = null

export const setApiAccessToken = (token) => {
  accessToken = token
}

export const createApiClient = ({ baseURL, serviceName }) => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  client.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

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
