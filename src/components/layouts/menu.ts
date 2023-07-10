import { HiDatabase, HiTag, HiUser } from 'react-icons/hi'
import { SidebarItemProps } from './types'

const menu: SidebarItemProps[] = [
  {
    icon: HiUser,
    title: 'User',
    link: '/user',
  },
  {
    icon: HiDatabase,
    title: 'Categories',
    link: '/categories',
  },
  {
    icon: HiTag,
    title: 'Products',
    link: '/products',
  },
]

export default menu
