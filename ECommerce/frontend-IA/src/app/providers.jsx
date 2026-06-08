import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { EcommerceStoreProvider } from './store'

const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      <EcommerceStoreProvider>{children}</EcommerceStoreProvider>
    </BrowserRouter>
  )
}

export default Providers
