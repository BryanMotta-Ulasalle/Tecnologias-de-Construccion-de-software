import {
    useState
} from "react"
import {
    login
} from "../api/AuthApi"

const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (credentials) => {
        try {
            setIsLoading(true)
            setError(null)

            const data = await login(credentials)

            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)

            return data
        } catch (error) {
            setError(error.response?.data?.detail ||
                "Error al iniciar sesión")
        } finally {
            setIsLoading(false);
        }


    }


    return {
        loginUser,
        isLoading,
        error
    }
}

export default useLogin