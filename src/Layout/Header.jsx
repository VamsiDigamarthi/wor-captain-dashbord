import { useState } from "react";
import { AlertOctagon, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { data } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleMouseEnter = () => setShowLogout(true);
  const handleMouseLeave = () => setShowLogout(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between items-center relative">
      <div>
        <h2 className="font-semibold text-2xl">Administrator </h2>
        <span className="text-sm">Welcome back, {data?.userName}</span>
      </div>

      <div className="flex items-center gap-3 relative">
        <AlertOctagon />
        <span className="w-[40px] h-[40px] bg-gray-100 rounded-full"></span>
        <span>{data?.userName}</span>

        {/* Hover Target */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ChevronDown className="cursor-pointer" />

          {/* Hover-based Logout */}
          {showLogout && (
            <button
              onClick={handleLogout}
              className="cursor-pointer w-[120px] p-2 rounded-md shadow absolute top-6 right-0 bg-red-500 flex gap-2 items-center justify-center z-10"
            >
              <LogOut className="text-white" size={18} />
              <span className="text-white text-sm font-semibold">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
