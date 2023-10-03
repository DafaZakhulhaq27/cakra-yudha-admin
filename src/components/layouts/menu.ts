import {
  HiDatabase,
  HiHome,
  HiOfficeBuilding,
  HiBriefcase,
} from 'react-icons/hi'
import { SidebarItemProps } from './types'
import {
  CLIENT_PAGE_TITLE,
  COMPANY_PAGE_TITLE,
  COMPANY_TYPE_PAGE_TITLE,
  CURRENCY_PAGE_TITLE,
  DASHBOARD_PAGE_TITLE,
  LOCATION_PAGE_TITLE,
  PROJECT_PAGE_TITLE,
  TIMEZONE_PAGE_TITLE,
} from '@/constant/page'

const menu: SidebarItemProps[] = [
  {
    icon: HiHome,
    title: DASHBOARD_PAGE_TITLE,
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
        title: COMPANY_TYPE_PAGE_TITLE,
        link: '/company_type',
      },
      {
        title: CURRENCY_PAGE_TITLE,
        link: '/currency',
      },
      {
        title: TIMEZONE_PAGE_TITLE,
        link: '/timezone',
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
        title: COMPANY_PAGE_TITLE,
        link: '/companies',
      },
      {
        title: LOCATION_PAGE_TITLE,
        link: '/locations',
      },
    ],
  },
  {
    icon: HiBriefcase,
    title: 'Security Master',
    link: '/security_master',
    access: ['superadmin'],
    items: [
      {
        title: CLIENT_PAGE_TITLE,
        link: '/client',
      },
      {
        title: PROJECT_PAGE_TITLE,
        link: '/projects',
      },
    ],
  },
]

export default menu
