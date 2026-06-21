import {useState, useEffect} from "react"
import {  fetchProductById } from "../api/productsApi"


const useProductById = (id) => {

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        console.log("ID recibido:", id);
        if (!id) return;
        let isMounted = true

        const loadProduct = async () =>{
            try {
                setIsLoading(true)
                setError(null)

                const data = await fetchProductById(id)

                if (isMounted) setProduct(data)
            } catch (error) {
                if (isMounted) setError(error.message)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        };

        loadProduct();

        return ()=> {isMounted = false}

    },[id])

  return {
    product, isLoading, error
  }
}

export default useProductById