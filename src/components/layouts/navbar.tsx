import { useUserContext } from '@/hooks/context'
import { Dropdown } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { HiMenuAlt2 } from 'react-icons/hi'

type Props = {
  toggleSidebar: () => void
}

const MainNavbar = ({ toggleSidebar }: Props) => {
  const { currentUser } = useUserContext()

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenuAlt2 size={24} />
            </button>
            <Link href="/" className="flex ml-2 md:mr-24">
              <Image
                width={40}
                height={40}
                src="/logo.png"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Hijrah Bersama
              </span>
            </Link>
          </div>
          <Dropdown
            inline
            label={
              !!currentUser?.image && (
                <Image
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full"
                  src={currentUser?.image}
                  alt="user photo"
                />
              )
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser?.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/logout">Sign out</Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </nav>
  )
}

export default MainNavbar
