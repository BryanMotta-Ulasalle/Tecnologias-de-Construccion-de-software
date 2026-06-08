import { Outlet } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import TitleMain from '../shared/components/ui/TitleMain'
import Nav from '../shared/components/navegation/Nav'

const AdminLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-row bg-background text-white">
      <aside className="h-screen w-72 shrink-0 bg-sidebar px-1 text-white">
        <TitleMain h1="ECommerce Front" p="Panel de admin y empleados" icon={LayoutDashboard} />
        <Nav />
      </aside>
      <main className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout