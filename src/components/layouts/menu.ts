import { HiDatabase, HiHome, HiOfficeBuilding } from 'react-icons/hi'
import { SidebarItemProps } from './types'

const menu: SidebarItemProps[] = [
  {
    icon: HiHome,
    title: 'Dashboard',
    link: '/home',
    access: ['superadmin'],
  },
  {
    icon: HiDatabase,
    title: 'Master',
    link: '/master',
    access: ['superadmin'],
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
  {
    icon: HiOfficeBuilding,
    title: 'Organization',
    link: '/organization',
    access: ['superadmin'],
    items: [
      {
        title: 'Companies',
        link: '/companies',
      },
      {
        title: 'Locations',
        link: '/locations',
      },
    ],
  },
]

export default menu
