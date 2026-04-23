import React, { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../services/productServices'

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

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])


  return {
    products
  }
}

export default useProduct