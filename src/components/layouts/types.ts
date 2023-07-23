import { ReactNode } from 'react'
import { IconType } from 'react-icons'

export type NavChildProps = {
  title: string
  link: string
}

export type SidebarItemProps = {
  title: string
  link: string
  prefix?: ReactNode
  icon: IconType
  items?: NavChildProps[]
  access?: string[]
}
