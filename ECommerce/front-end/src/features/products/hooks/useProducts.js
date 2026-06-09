import {useState, useEffect} from "react"
import { fetchProducts } from "../api/productsApi"


const useProducts = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{

        let isMounted = true

        const loadProducts = async () =>{
            try {
                setIsLoading(true)
                setError(null)

                const data = await fetchProducts()

                if (isMounted) setProducts(data)
            } catch (error) {
                if (isMounted) setError(error.message)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        };

        loadProducts();

        return ()=> {isMounted = false}

    },[])

  return {
    products, isLoading, error
  }
}

export default useProducts