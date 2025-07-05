import {
  ChartBar,
  MessageCircle,
  MessageCircleCode,
  Palette,
  Ticket,
  Users,
  Weight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ onHover, isHovered }) => {
  const { pathname } = useLocation();

  const role = localStorage.getItem("role") || "manager";

  const links = [
    {
      name: "Dashboard",
      path: "/",
      allowedRoles: ["manager", "verificationTeam"],
      active: pathname === "/",
      icon: <Palette size={20} />,
    },
    {
      name: "Partner’s List",
      path: "/partner-list",
      allowedRoles: ["manager", "verificationTeam"],
      active: pathname === "/partner-list",
      icon: <Users size={20} />,
    },
    {
      name: "Employee List",
      path: "/employe-list",
      allowedRoles: ["manager"],
      active: pathname === "/employe-list",
      icon: <Users size={20} />,
    },
    {
      name: "Widthdraws List",
      path: "/withdraws",
      allowedRoles: ["manager"],
      active: pathname === "/withdraws",
      icon: <Weight size={20} />,
    },

    // verification
    {
      name: "Payment issues",
      path: "/payment-issuse",
      allowedRoles: ["verificationTeam"],
      active: pathname === "/payment-issuse",
      icon: <Users size={20} />,
    },
    // monitor team

    {
      name: "Dashboard",
      path: "/tracking-employee",
      allowedRoles: ["monitoring"],
      active: pathname === "/tracking-employee",
      icon: <Palette size={20} />,
    },

    {
      name: "Ride Tracking",
      path: "/ride-tracking",
      allowedRoles: ["monitoring"],
      active: pathname === "/ride-tracking",
      icon: <MessageCircle size={20} />,
    },
    // support

    {
      name: "Dashboard",
      path: "/call-employee",
      allowedRoles: ["support"],
      active: pathname === "/call-employee",
      icon: <Palette size={20} />,
    },

    {
      name: "Tickets",
      path: "/tickets",
      allowedRoles: ["support"],
      active: pathname === "/tickets",
      icon: <Ticket size={20} />,
    },
    {
      name: "Live chat",
      path: "/live-chat",
      allowedRoles: ["support"],
      active: pathname === "/live-chat",
      icon: <MessageCircleCode size={20} />,
    },
    {
      name: "Attendance",
      path: "/attendace",
      allowedRoles: ["admin", "verificationTeam", "monitoring", "support"],
      active: pathname === "/attendace",
      icon: <Weight size={20} />,
    },
  ];

  const filteredLinks = links.filter((link) =>
    link.allowedRoles.includes(role)
  );

  return (
    <div
      className="bg-white shadow flex flex-col gap-4 transition-all duration-300"
      style={{ width: isHovered ? "200px" : "60px" }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <img
        src="/logo.png"
        className={`transition-all duration-300 object-cover mx-auto ${
          isHovered ? "w-[150px] h-[100px]" : "w-[40px] h-[40px]"
        }`}
        alt="Logo"
      />

      <ul className="w-full gap-2 flex flex-col mt-2 px-2">
        {filteredLinks?.map((e, index) => (
          <li key={index}>
            <Link
              className={`w-full gap-2 flex items-center px-2 py-1 rounded ${
                e.active ? "bg-[#FDF2F8]" : "bg-white"
              }`}
              to={e.path}
            >
              {e.icon}
              {isHovered && <span className="ml-2">{e.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
