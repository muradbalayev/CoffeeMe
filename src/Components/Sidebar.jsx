import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Crown, NotebookText, Wallet as WalletIcon } from "lucide-react";

import {
  ChartLine,
  Handshake,
  LogOut,
  Menu,
  User,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SIDEBAR_ITEMS = [
  {
    id: 1,
    title: "Sales Report",
    icon: <ChartLine size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Partners",
    icon: <Handshake size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/partner",
  },
  {
    id: 3,
    title: "Wallet",
    icon: <WalletIcon size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/wallet",
  },
  {
    id: 4,
    title: "Withdraw",
    icon: <NotebookText size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/withdraw",
  }
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);


  const handleLogout = async (e) => {
    e.preventDefault();
    toast.success("Murad Balayev Coffeeshop'dan çıxış etdi.");
    navigate("/");
  };

  const dropdownToggle = () => {
    setDropDown(!dropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isUsersActive =
    location.pathname.startsWith("/dashboard/users") ||
    location.pathname.startsWith("/dashboard/premiumusers");

  return (
    <div
      className={`sidebar h-screen flex flex-col items-center gap-4 pb-10 pt-3 text-white ${isSidebarOpen ? "w-60" : "w-20"}`}
    >
      <div className='w-full relative flex items-center px-5'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-500 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>
      </div>
      <div className="w-full flex flex-col gap-3 items-center justify-start h-32">
        <div className={`profile-img bg-gray-300 rounded-full transition duration-300 md:p-6 p-3 ${isSidebarOpen ? 'scale-100' : 'scale-50'}`}>
          <User size={45} />
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
        <Link ref={dropdownRef} onClick={dropdownToggle} end
          className={`lg:text-sm text-xs px-8 py-3 relative group ${isUsersActive ? "active" : ""}`}>
          <User size={20} style={{ minWidth: "20px" }} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className='whitespace-nowrap flex items-center justify-between'
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.1, delay: 0.2 }}
              >
                Users
                {dropdown ?
                  <ChevronUp
                    className="dropdown group-hover:scale-110"
                    style={{ position: "absolute", right: "10px" }}
                  /> :
                  <ChevronDown
                    className="dropdown group-hover:scale-110"
                    style={{ position: "absolute", right: "10px" }}
                  />}

              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
          {dropdown && (
            //DropDown links
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute w-full left-0 top-11 border-b border-s border-e rounded-b-xl border-slate-900 backdrop-blur-lg">
              <Link
                to="/dashboard/users"
                // style={{ backgroundColor: "gray" }}
                className=" px-8 py-3 text-xs dropdown-link"
              >
                <Users size={15} style={{ minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1, delay: 0.2 }}
                    >
                      All Users
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <Link
                to="/dashboard/premiumusers"
                // style={{ backgroundColor: "gray" }}
                className=" px-8 py-3 text-xs rounded-b-lg dropdown-link"
              >
                <Crown size={15} style={{ minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1, delay: 0.2 }}
                    >
                      Premium Users
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          )}
          </AnimatePresence>
        </Link>
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
        className="logout w-full px-8 min-h-10 py-2 mt-auto flex md:flex-row flex-col gap-2 items-center md:text-base text-sm"
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
