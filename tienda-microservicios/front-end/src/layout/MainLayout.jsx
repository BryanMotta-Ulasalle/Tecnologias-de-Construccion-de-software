import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../shared/components/navegation/Nav'

const MainLayout = () => {
  return (
      <div className="flex flex-row relative">
      <aside className="flex-2 h-screen p-4 bg-blue-700">
        <Nav />
      </aside>
      <main className="flex-13">
        <Outlet />
      </main>
    </div>
    
  )
}

export default MainLayout
