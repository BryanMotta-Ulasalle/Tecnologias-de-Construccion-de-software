/*
  Código anterior (fragmento estimado, recuperado como comentario):

  // import { useEffect, useState } from 'react'
  // import { getUsers, createUser } from '../services/userServices'
  //
  // const useUsers = () => {
  //   const [users, setUsers] = useState([])
  //   const [isLoading, setIsLoading] = useState(true)
  //   const [error, setError] = useState(null)
  //
  //   useEffect(() => {
  //     let mounted = true
  //     getUsers().then((data) => { if (mounted) setUsers(data) })
  //       .catch((e) => { if (mounted) setError(e) })
  //       .finally(() => { if (mounted) setIsLoading(false) })
  //     return () => { mounted = false }
  //   }, [])
  //
  //   const createNewUser = async (userData) => {
  //     const res = await createUser(userData)
  //     setUsers(prev => [...prev, res])
  //     return res
  //   }
  //
  //   return { users, createNewUser, isLoading, error }
  // }

  Ahora: este hook usa `useResource` para compartir la lógica común.
*/

import { useCallback, useMemo } from 'react'
import { createUser, getUsers } from '../services/userServices'
import useResource from '../../../shared/hooks/useResource'
import { logger } from '../../../shared/utils/logger'

const useUsers = () => {
    const {
      data: users,
      setData: setUsers,
      isLoading,
      error,
      refetch,
    } = useResource({
      cacheKey: 'users',
      fetcher: getUsers,
      initialValue: [],
    })

    const createNewUser = useCallback(async (userData) => {
        const response = await createUser(userData)
        setUsers((prevUsers) => [...prevUsers, response])
        return response
    }, [setUsers])

    const usersList = useMemo(() => users.map((user) => ({
        id: user.id,
        nombre: user.nombre,
    })), [users])

    const reloadUsers = useCallback(() => {
      logger.info('Reloading users list')
      return refetch()
    }, [refetch])

  return {
    users,
    createNewUser,
    usersList,
    isLoading,
    error,
    reloadUsers,
  }
}

export default useUsers
