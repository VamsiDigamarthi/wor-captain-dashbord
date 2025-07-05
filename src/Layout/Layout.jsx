import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = () => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const sidebarWidth = isSidebarHovered ? 200 : 60;

  return (
    <div className="w-full h-screen flex">
      <SideBar onHover={setIsSidebarHovered} isHovered={isSidebarHovered} />

      <main
        className="transition-all duration-300 flex flex-col gap-4 h-full p-4 overflow-y-scroll"
        style={{
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
