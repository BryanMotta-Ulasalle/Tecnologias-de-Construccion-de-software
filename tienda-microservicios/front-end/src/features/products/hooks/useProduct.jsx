import React, { useCallback, useEffect, useState } from 'react'
import { getProducts,createProduct } from '../services/productServices'

const useProduct = () => {

    const [products, setProducts] = useState([])

    const fetchProducts = useCallback( async () => {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }, [])  

    const createNewProduct = useCallback(async (productData) => {
        const response = await createProduct(productData)
        setProducts(prevProducts => [...prevProducts, productData])
        return response
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])


  return {
    products,
    createNewProduct
  }
}

export default useProduct