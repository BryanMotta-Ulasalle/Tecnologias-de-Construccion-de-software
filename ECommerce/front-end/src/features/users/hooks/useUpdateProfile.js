import {
    updateProfile
} from "../api/userApi"
import {
    useState
} from "react"
import useAuth from "../../../hooks/useAuth"


const useUpdateProfile = () => {

    const {
        setUser
    } = useAuth()
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)


    const update = async (params) => {
        try {

            setIsLoading(true)
            setError(null)
            const result = await updateProfile(params)

            setUser(result)
            return result
        } catch (error) {
            setError(error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return {

        isLoading,
        update,
        error
    }
}

export default useUpdateProfile