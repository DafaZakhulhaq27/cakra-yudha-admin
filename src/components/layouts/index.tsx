'use client'

import { ReactNode, useState } from 'react'
import MainNavbar from './navbar'
import MainSidebar from './sidebar'

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  const [hideSidebar, setHideSidebar] = useState(true)

  return (
    <>
      <MainNavbar toggleSidebar={() => setHideSidebar(!hideSidebar)} />
      <MainSidebar hideSidebar={hideSidebar} />
      <div className="p-4 sm:ml-64">
        <div className="p-5 rounded-l mt-14">{children}</div>
      </div>
    </>
  )
}

export default MainLayout
