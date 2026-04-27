import { useCallback, useEffect, useState } from 'react'
import { createUser, getUsers } from '../services/userServices'

const useUsers = () => {

    const [users, setUsers] = useState([])

    const fetchData = useCallback(async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        return error
      }
    }, []) 

    const createNewUser = useCallback(async (userData) => {
        const response = await createUser(userData)
        setUsers(prevUsers => [...prevUsers, userData])
        return response
    }, [])

    const usersList = users.map(user => ({
        id: user.id,
        nombre: user.nombre,
    }))

  useEffect(() => {
    
    fetchData()
  }, [fetchData])

  return {
    users,
    createNewUser,
    usersList
  }
}

export default useUsers
