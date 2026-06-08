import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './app/providers'
import Router from './app/router'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>
)
