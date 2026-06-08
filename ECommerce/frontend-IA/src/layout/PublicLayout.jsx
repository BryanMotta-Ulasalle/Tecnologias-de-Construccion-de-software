import { Outlet } from 'react-router-dom'
import Header from '../shared/components/Header'

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background text-[#11110F]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout