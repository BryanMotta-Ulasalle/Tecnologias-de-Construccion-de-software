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
        const createdUser = await createUser(userData)
        setUsers((prevUsers) => [...prevUsers, createdUser])
        return createdUser
    }, [])

  useEffect(() => {
    
    fetchData()
  }, [fetchData])

  return {
    users,
    createNewUser
  }
}

export default useUsers
