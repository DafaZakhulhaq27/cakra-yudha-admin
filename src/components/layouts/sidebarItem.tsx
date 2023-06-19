import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { SidebarItemProps } from './types'

type Props = Omit<SidebarItemProps, 'items'>

const SidebarItem = ({ title, link, prefix, icon }: Props) => {
  const segment = useSelectedLayoutSegment()

  const Icon = icon

  const isActive = `/${segment}` === link

  return (
    <li>
      <Link
        href={link}
        className={`flex items-center p-2  rounded-lg  ${
          isActive ? 'bg-primary text-white' : 'text-gray-900 hover:bg-gray-100'
        }`}
      >
        {<Icon />}
        <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
        {prefix}
      </Link>
    </li>
  )
}

export default SidebarItem
