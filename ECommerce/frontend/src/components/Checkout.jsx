import React, { useState } from 'react'
import { createOrder } from '../api'

export default function Checkout() {
  const [address, setAddress] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createOrder(address)
      alert('Order created: ' + (res.id || JSON.stringify(res)))
    } catch (err) {
      alert('Error creating order')
      console.error(err)
    }
  }

  return (
    <section>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shipping address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <button type="submit">Place order</button>
      </form>
    </section>
  )
}
