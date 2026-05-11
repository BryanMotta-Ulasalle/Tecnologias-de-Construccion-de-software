/*
  Código anterior (fragmento estimado, recuperado como comentario):

  // import { useEffect, useState } from 'react'
  // import { getUsers } from '../services/userServices'
  //
  // const useUsersOld = () => {
  //   const [users, setUsers] = useState([])
  //   const [isLoading, setIsLoading] = useState(true)
  //   const [error, setError] = useState(null)
  //
  //   useEffect(() => {
  //     let mounted = true
  //     getUsers().then((data) => {
  //       if (mounted) setUsers(data)
  //     }).catch((e) => {
  //       if (mounted) setError(e)
  //     }).finally(() => {
  //       if (mounted) setIsLoading(false)
  //     })
  //     return () => { mounted = false }
  //   }, [])
  //
  //   return { users, setUsers, isLoading, error }
  // }

  Ahora: `useResource` centraliza la lógica común de obtención de recursos.
*/

import { useCallback, useEffect, useRef, useState } from 'react'

const resourceCache = new Map()

const resolveNextValue = (valueOrUpdater, previousValue) => {
  if (typeof valueOrUpdater === 'function') {
    return valueOrUpdater(previousValue)
  }

  return valueOrUpdater
}

const useResource = ({ cacheKey, fetcher, initialValue = [] }) => {
  const isMountedRef = useRef(true)
  const [data, setDataState] = useState(() => resourceCache.get(cacheKey) ?? initialValue)
  const [isLoading, setIsLoading] = useState(!resourceCache.has(cacheKey))
  const [error, setError] = useState(null)

  const setData = useCallback((valueOrUpdater) => {
    setDataState((previousValue) => {
      const nextValue = resolveNextValue(valueOrUpdater, previousValue)
      resourceCache.set(cacheKey, nextValue)
      return nextValue
    })
  }, [cacheKey])

  const load = useCallback(async ({ force = false } = {}) => {
    if (!force && resourceCache.has(cacheKey)) {
      const cachedValue = resourceCache.get(cacheKey)
      setDataState(cachedValue)
      return cachedValue
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetcher()

      if (isMountedRef.current) {
        resourceCache.set(cacheKey, response)
        setDataState(response)
      }

      return response
    } catch (caughtError) {
      if (isMountedRef.current) {
        setError(caughtError)
      }

      throw caughtError
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [cacheKey, fetcher])

  useEffect(() => {
    isMountedRef.current = true
    Promise.resolve().then(() => load().catch(() => {}))

    return () => {
      isMountedRef.current = false
    }
  }, [load])

  const refetch = useCallback(() => load({ force: true }), [load])

  return {
    data,
    setData,
    isLoading,
    error,
    refetch,
  }
}

export default useResource
