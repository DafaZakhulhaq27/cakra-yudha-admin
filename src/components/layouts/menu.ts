import { HiDatabase, HiHome } from 'react-icons/hi'
import { SidebarItemProps } from './types'

const menu: SidebarItemProps[] = [
  {
    icon: HiHome,
    title: 'Dashboard',
    link: '/home',
    access: ['Admin', 'Master'],
  },
  {
    icon: HiDatabase,
    title: 'Master',
    link: '/master',
    access: ['Admin', 'Master'],
    items: [
      {
        title: 'Company Type',
        link: '/company_type',
      },
      {
        title: 'Currency',
        link: '/currency',
      },
      {
        title: 'TimeZone',
        link: '/timezone',
      },
      {
        title: 'Employee',
        link: '/employee',
      },
    ],
  },
]

export default menu
