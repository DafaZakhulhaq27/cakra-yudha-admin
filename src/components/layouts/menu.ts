import { HiUser } from 'react-icons/hi'
import { SidebarItemProps } from './types'

const menu: SidebarItemProps[] = [
  {
    icon: HiUser,
    title: 'User',
    link: '/user',
    access: ['Admin', 'Master'],
  },
]

export default menu
