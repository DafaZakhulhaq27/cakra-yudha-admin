import { Sidebar } from "flowbite-react";
import React, { ReactNode, useState } from "react";
import MainSidebar from "./sidebar";
import MainNavbar from "./navbar";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <>
      <MainNavbar handleSidebar={() => setOpenSidebar(!openSidebar)} />
      <MainSidebar openSidebar={openSidebar} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
