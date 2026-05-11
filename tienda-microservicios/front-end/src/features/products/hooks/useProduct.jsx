/*
        Código anterior (fragmento estimado, recuperado como comentario):

        // import { useEffect, useState } from 'react'
        // import { getProducts, createProduct } from '../services/productServices'
        //
        // const useProduct = () => {
        //   const [products, setProducts] = useState([])
        //   const [isLoading, setIsLoading] = useState(true)
        //   const [error, setError] = useState(null)
        //
        //   useEffect(() => {
        //     let mounted = true
        //     getProducts().then(data => { if (mounted) setProducts(data) })
        //       .catch(e => { if (mounted) setError(e) })
        //       .finally(() => { if (mounted) setIsLoading(false) })
        //     return () => { mounted = false }
        //   }, [])
        //
        //   const createNewProduct = async (pd) => {
        //     const res = await createProduct(pd)
        //     setProducts(prev => [...prev, res])
        //     return res
        //   }
        //
        //   return { products, createNewProduct, isLoading, error }
        // }

        Ahora: reutiliza `useResource` para cargar y cachear `products`.
*/

import { useCallback, useMemo } from 'react'
import { getProducts, createProduct } from '../services/productServices'
import useResource from '../../../shared/hooks/useResource'

const useProduct = () => {
        const {
                data: products,
                setData: setProducts,
                isLoading,
                error,
                refetch,
        } = useResource({
                cacheKey: 'products',
                fetcher: getProducts,
                initialValue: [],
        })

        const createNewProduct = useCallback(async (productData) => {
                const response = await createProduct(productData)
                setProducts((prevProducts) => [...prevProducts, response])
                return response
        }, [setProducts])

        const refreshProducts = useCallback(() => refetch(), [refetch])

        const sortedProducts = useMemo(() => [...products], [products])


        return {
                products: sortedProducts,
                createNewProduct,
                isLoading,
                error,
                refreshProducts,
        }
}

export default useProduct