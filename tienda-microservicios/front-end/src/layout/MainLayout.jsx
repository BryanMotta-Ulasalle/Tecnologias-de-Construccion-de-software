import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../shared/components/navegation/Nav'
import TitleMain from '../shared/components/ui/TitleMain'
import { LayoutDashboard } from 'lucide-react';

const MainLayout = () => {
  return (
      <div className="flex flex-row relative">
      <aside className="flex-2 h-screen px-1 bg-sidebar text-white">
        <TitleMain h1="Panel administrativo" p="suite empresarial" icon={LayoutDashboard} />
        <Nav />
      </aside>
      <main className="flex-10 bg-background">
        <Outlet />
      </main>
    </div>
    
  )
}

export default MainLayout
