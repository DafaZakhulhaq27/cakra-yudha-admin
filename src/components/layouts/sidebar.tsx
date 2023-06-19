import menu from './menu'
import SidebarItem from './sidebarItem'
import SidebarItemDropdown from './sidebarItemDropdown'

type Props = {
  openSidebar: boolean
}

const Sidebar = ({ openSidebar }: Props) => {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        openSidebar ? '-translate-x-full' : ''
      } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menu.map((item, index) =>
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
