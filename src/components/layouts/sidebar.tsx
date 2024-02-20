import { useUserContext } from '@/hooks/context'
import menu from './menu'
import SidebarItem from './sidebarItem'
import SidebarItemDropdown from './sidebarItemDropdown'

type Props = {
  hideSidebar: boolean
}

const Sidebar = ({ hideSidebar }: Props) => {
  const { currentUser } = useUserContext()

  const currentUserRole = currentUser?.role
    ? currentUser.role.toLowerCase().replace(/\s/g, '')
    : ''

  const filteredMenu = menu
    .map(item => {
      const filteredSubItems = item.items?.filter(subItem => {
        const subItemAccess = subItem.access || ['superadmin'] // Default to 'superadmin' if no access property is defined
        return (
          subItemAccess.includes(currentUserRole) || subItemAccess.includes('*')
        )
      })

      const mainItemAccess = item.access || ['superadmin'] // Default to 'superadmin' if no access property is defined
      const hasAccess =
        mainItemAccess.includes(currentUserRole) ||
        mainItemAccess.includes('*') ||
        (filteredSubItems && filteredSubItems.length > 0)

      return {
        ...item,
        items: filteredSubItems,
        // Include the main item only if it has access or if it has sub-menu items
        ...(hasAccess ? { hasAccess: true } : {}),
      }
    })
    .filter(item => item.hasAccess) // Filter out items without access

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        hideSidebar && '-translate-x-full'
      } bg-white border-r border-gray-200 sm:translate-x-0 `}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {filteredMenu.map((item, index) =>
            item.items ? (
              <SidebarItemDropdown key={index} {...item} />
            ) : (
              <SidebarItem key={index} {...item} />
            ),
          )}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
