import React, { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { getToken, setToken } from './api'

export default function App() {
  const [token, setTokenState] = useState(getToken())

  const handleLogin = (t) => {
    setToken(t)
    setTokenState(t)
  }

  return (
    <div className="app">
      <header>
        <h1>ECommerce - Vite React</h1>
      </header>
      <main>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <ProductList />
            <Cart />
            <Checkout />
          </>
        )}
      </main>
    </div>
  )
}
