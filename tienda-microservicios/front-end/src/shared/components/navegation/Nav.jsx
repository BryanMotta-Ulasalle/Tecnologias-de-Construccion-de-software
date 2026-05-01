import React from 'react'
import NavItem from './NavItem'
import { House } from 'lucide-react';
import { Users } from 'lucide-react';
import { Package } from 'lucide-react';
import {useTranslation} from 'react-i18next'

const Nav = () => {

  const { t } = useTranslation(['common']);

  return (
    <div className='flex flex-col text-2xl py-10'>
      
      <NavItem to="/" name={t('common:nav.home')} icon={House} />
      <NavItem to="/usuarios" name={t('common:nav.users')} icon={Users} />
      <NavItem to="/productos" name={t('common:nav.products')} icon={Package} />
      <NavItem to="/pedidos" name={t('common:nav.orders')} icon={Package} />
    </div>
  )
}

export default Nav
