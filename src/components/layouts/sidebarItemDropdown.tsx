import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { SidebarItemProps } from './types'

type Props = Omit<SidebarItemProps, 'prefix'>

const SidebarItemDropdown = ({ title, icon, items, link }: Props) => {
  const [hidden, setHidden] = useState(true)
  const route = usePathname()
  const parentRoute = useSelectedLayoutSegment()
  const childRoute = route.split('/').pop()

  const Icon = icon

  const isActive = `/${parentRoute}` === link

  useEffect(() => {
    setHidden(!isActive)
  }, [isActive])

  return (
    <li>
      <button
        onClick={() => setHidden(!hidden)}
        type="button"
        className={`flex items-center w-full p-2 transition duration-75 rounded-lg group text-gray-900 hover:bg-gray-100`}
      >
        {<Icon />}
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
        {hidden ? <HiChevronDown size={23} /> : <HiChevronUp size={23} />}
      </button>
      <ul className={`${hidden && 'hidden'} py-2 space-y-2`}>
        {items?.map((item, index) => (
          <li key={index}>
            <Link
              href={link + item.link}
              className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group  ${
                `/${childRoute}` === item.link
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default SidebarItemDropdown
