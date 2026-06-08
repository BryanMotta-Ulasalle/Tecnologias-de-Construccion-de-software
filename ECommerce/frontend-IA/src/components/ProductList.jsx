import React, { useEffect, useState } from 'react'
import { fetchProducts, addCartItem } from '../api'

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error)
  }, [])

  const handleAdd = async (id) => {
    try {
      await addCartItem(id, 1)
      alert('Added to cart')
    } catch (e) {
      alert('Error adding to cart')
    }
  }

  return (
    <section>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> - ${p.price}
            <div>{p.description}</div>
            <button onClick={() => handleAdd(p.id)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
