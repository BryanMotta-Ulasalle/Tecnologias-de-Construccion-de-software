import LogoPrivate from "./LogoPrivate"
import NavBarPrivate from './NavBarPrivate';

const SidebarPrivate = () => {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-black/93">
      <LogoPrivate />
      <NavBarPrivate/>
    </aside>
  )
}

export default SidebarPrivate
