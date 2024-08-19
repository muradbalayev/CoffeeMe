import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChartLine,
  Handshake,
  LogOut,
  Menu,
  MessageSquareWarning,
  User,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const SIDEBAR_ITEMS = [
  {
    id: 1,
    title: "Sales Report",
    icon: <ChartLine size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Users",
    icon: <Users size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/users",
  },
  {
    id: 3,
    title: "Partners",
    icon: <Handshake size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/partner",
  },
  {
    id: 4,
    title: "Support Chat",
    icon: <MessageSquareWarning size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/support",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async (e) => {
    e.preventDefault();
    toast.success("Murad Balayev Coffeeshop'dan çıxış etdi.");
    navigate("/");
  };

  return (
    <div
      className={`sidebar h-screen flex flex-col items-center gap-4 pb-10 pt-3 text-white ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-full hover:bg-gray-500 transition-colors max-w-fit"
      >
        <Menu size={24} />
      </motion.button>
      <div className="w-full flex flex-col gap-3 items-center justify-center h-32">

      <div className="profile-img bg-gray-300 rounded-full transition duration-300 md:p-5 p-3">
      <User size={isSidebarOpen ? 40 : 25} />
      </div>
      <AnimatePresence>
          {isSidebarOpen && (
            <motion.span
              className="whitespace-nowrap font-medium text-md"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
              Coffee Shop Name
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <nav className="links w-full mt-8 flex flex-col">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className="lg:text-sm text-xs px-8 py-3"
            end
          >
            {item.icon}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  className="whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.1, delay: 0.2 }}
                >
                  {item.title}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>
      <Link
        className="logout px-4 py-2 mt-auto flex md:flex-row flex-col gap-2 justify-center items-center md:text-base text-sm"
        onClick={handleLogout}
      >
        <LogOut size={20} style={{ minWidth: "20px" }} />
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.span
              className="whitespace-nowrap"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
              Log Out
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
}

export default Sidebar;
