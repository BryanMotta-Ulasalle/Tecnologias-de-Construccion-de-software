import {
    useState
} from "react"


const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async () => {
        try {
            setIsLoading(true)
            setError(null)

        } catch (error) {
            setError(error)
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