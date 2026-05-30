import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { EcommerceStoreProvider } from './shared/hooks/useEcommerceStore'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EcommerceStoreProvider>
        <App />
      </EcommerceStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)
