import {useState} from 'react'
import {register} from "../api/AuthApi"

const useRegister = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (credentials) => {
        try {
            setIsLoading(true)
            setError(null)

            const data = await register(credentials)
            
            return data

        } catch (error) {
            setError(error.response?.data?.detail ||
                "Error al iniciar sesión")
        }finally {
            setIsLoading(false);
        }
    }


  return {
    registerUser,
    isLoading,
    error
  }
}

export default useRegister
