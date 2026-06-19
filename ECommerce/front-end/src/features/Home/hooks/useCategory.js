import {useState, useEffect} from "react"
import {fetchCategories} from "../api/categoryApi"

const useCategory = () => {

    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        let isMounted = true

        const loadCategories = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const data = await fetchCategories()

                if (isMounted) setCategories(data)
            } catch (error) {
                if (isMounted) setError(error.message)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }
        loadCategories();

        return ()=> {isMounted=false}
    },[])

  return {
    categories, isLoading, error
  }
}

export default useCategory
