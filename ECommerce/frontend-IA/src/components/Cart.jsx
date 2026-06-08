import React, { useEffect, useState } from 'react'
import { fetchCart } from '../api'

export default function Cart() {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const data = await fetchCart()
      // API returns list (possibly single cart) — pick first
      setCart(Array.isArray(data) ? data[0] || null : data)
    } catch (e) {
      console.error(e)
    }
  }

  if (!cart) return <section><h2>Cart</h2><div>Empty</div></section>

  return (
    <section>
      <h2>Cart</h2>
      <ul>
        {cart.items.map(it => (
          <li key={it.id}>{it.product.name} x {it.quantity} - ${it.product.price}</li>
        ))}
      </ul>
      <div><strong>Total:</strong> ${cart.total_price}</div>
    </section>
  )
}
