import { HiDatabase, HiTag, HiUser } from 'react-icons/hi'
import { SidebarItemProps } from './types'

const menu: SidebarItemProps[] = [
  {
    icon: HiUser,
    title: 'User',
    link: '/user',
    access: ['Admin', 'Master'],
  },
  {
    icon: HiDatabase,
    title: 'Categories',
    link: '/categories',
    access: ['Admin', 'Master'],
  },
  {
    icon: HiTag,
    title: 'Products',
    link: '/products',
    access: ['Admin', 'Master'],
  },
]

export default menu
