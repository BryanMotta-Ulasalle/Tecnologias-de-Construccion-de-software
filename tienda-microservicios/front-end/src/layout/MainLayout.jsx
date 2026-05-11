import { Outlet } from 'react-router-dom'
import Nav from '../shared/components/navegation/Nav'
import TitleMain from '../shared/components/ui/TitleMain'
import { LayoutDashboard } from 'lucide-react'
import { LanguageSwitcher } from '../shared/components/Languaje/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const MainLayout = () => {

  const { t } = useTranslation(['common'])

  return (
    <div className="flex min-h-screen flex-row relative bg-background">
      <aside className="w-72 shrink-0 h-screen px-1 bg-sidebar text-white">
        <TitleMain h1={t('common:title')} p={t('common:subtitle')} icon={LayoutDashboard} />
        <Nav />

        <div className="absolute bottom-0 flex justify-center items-center w-80 h-30">
          <LanguageSwitcher />
        </div>
      </aside>
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
