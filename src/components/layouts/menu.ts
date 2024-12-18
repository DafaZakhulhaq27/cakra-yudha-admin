import {
  HiDatabase,
  HiHome,
  HiOfficeBuilding,
  HiBriefcase,
  HiUserGroup,
  HiClock,
} from 'react-icons/hi'
import { SidebarItemProps } from './types'
import {
  ATTENDENCE_PAGE_TITLE,
  BARCODE_PATROLI_PAGE_TITLE,
  BARCODE_SCAN_MOBILE_PAGE_TITLE,
  CLIENT_PAGE_TITLE,
  COMPANY_PAGE_TITLE,
  COMPANY_TYPE_PAGE_TITLE,
  CURRENCY_PAGE_TITLE,
  DASHBOARD_PAGE_TITLE,
  GROUP_PAGE_TITLE,
  LOCATION_PAGE_TITLE,
  POSITION_LEVEL_PAGE_TITLE,
  PROJECT_PAGE_TITLE,
  QUALIFICATION_PAGE_TITLE,
  TIMEZONE_PAGE_TITLE,
} from '@/constant/page'

const menu: SidebarItemProps[] = [
  {
    icon: HiHome,
    title: DASHBOARD_PAGE_TITLE,
    link: '/home',
    access: ['*'],
  },
  {
    icon: HiUserGroup,
    title: 'Employee',
    link: '/employee',
    access: ['superadmin', 'client'],
  },
  {
    icon: HiClock,
    title: 'Timesheet',
    link: '/timesheet',
    items: [
      {
        title: ATTENDENCE_PAGE_TITLE,
        link: '/attendence',
        access: ['superadmin', 'client'],
      },
      {
        title: BARCODE_SCAN_MOBILE_PAGE_TITLE,
        link: '/barcode_scan_mobile',
        access: ['superadmin', 'client'],
      },
    ],
  },
  {
    icon: HiOfficeBuilding,
    title: 'Organization',
    link: '/organization',
    items: [
      {
        title: COMPANY_PAGE_TITLE,
        link: '/companies',
        access: ['superadmin'],
      },
      {
        title: LOCATION_PAGE_TITLE,
        link: '/locations',
        access: ['superadmin'],
      },
    ],
  },
  {
    icon: HiBriefcase,
    title: 'Security Master',
    link: '/security_master',
    items: [
      {
        title: CLIENT_PAGE_TITLE,
        link: '/client',
        access: ['superadmin'],
      },
      {
        title: PROJECT_PAGE_TITLE,
        link: '/projects',
        access: ['superadmin', 'client'],
      },
      {
        title: GROUP_PAGE_TITLE,
        link: '/groups',
        access: ['superadmin'],
      },
      {
        title: BARCODE_PATROLI_PAGE_TITLE,
        link: '/barcode-patroli',
        access: ['superadmin'],
      },
    ],
  },
  {
    icon: HiDatabase,
    title: 'Master',
    link: '/master',
    items: [
      {
        title: COMPANY_TYPE_PAGE_TITLE,
        link: '/company_type',
        access: ['superadmin'],
      },
      {
        title: CURRENCY_PAGE_TITLE,
        link: '/currency',
        access: ['superadmin'],
      },
      {
        title: TIMEZONE_PAGE_TITLE,
        link: '/timezone',
        access: ['superadmin'],
      },
      {
        title: QUALIFICATION_PAGE_TITLE,
        link: '/qualification',
        access: ['superadmin'],
      },
      {
        title: POSITION_LEVEL_PAGE_TITLE,
        link: '/position_level',
        access: ['superadmin'],
      },
    ],
  },
]

export default menu
