import { Link, NavLink } from "react-router-dom";
import { BellElectricIcon, BellRing, BookOpen, ChartBarIncreasing, ChevronDown, ChevronUp, Crown, NotebookText, ShoppingCart, Wallet as WalletIcon } from "lucide-react";

import {
  ChartLine,
  Handshake,
  LogOut,
  Menu,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

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
    title: "Shops",
    icon: <ShoppingCart size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/shops",
  },
  {
    id: 4,
    title: "Menu",
    icon: <BookOpen size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/menu",
  },
  {
    id: 5,
    title: "Wallet",
    icon: <WalletIcon size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/wallet",
  },
  {
    id: 6,
    title: "Sales",
    icon: <ChartBarIncreasing size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/sales",
  },
  {
    id: 7,
    title: "Withdraw",
    icon: <NotebookText size={20} style={{ minWidth: "20px" }} />,
    path: "/dashboard/withdraw",
  },
];

function Sidebar() {
  const logout = useLogout();


  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);


  const [notificationDropdown, setNotificationDropDown] = useState(false);
  const notificationDropdownRef = useRef(null);

  const username = useSelector(state => state.user.username);


  const dropdownToggle = () => {
    setDropDown(!dropdown);
  };

  const notificationDropdownToggle = () => {
    setNotificationDropDown(!notificationDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
      setNotificationDropDown(false);
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

  const isNotificationActive =
    location.pathname.startsWith("/dashboard/send-notification") ||
    location.pathname.startsWith("/dashboard/partner-messages") ||
    location.pathname.startsWith("/dashboard/messages");

  return (
    <div
      className={`sidebar relative z-10 h-screen flex flex-col items-center gap-4 pb-5 pt-3 text-white ${isSidebarOpen ? `w-56` : "w-16"}`}
    >
      <div className='w-full relative flex items-center px-3'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-500 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>
      </div>
      <div className="w-full flex flex-col gap-3 items-center justify-start h-28">
        <div className={`profile-img bg-gray-300 rounded-full transition duration-300 md:p-6 p-3 ${isSidebarOpen ? 'scale-100' : 'scale-50'}`}>
          <User size={45} />
        </div>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.span
              className="whitespace-nowrap font-medium md:text-md text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {username}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <nav className="links w-full flex flex-col mt-2">
        <div ref={dropdownRef} onClick={dropdownToggle} end='true'
          className={`lg:text-sm user-link text-xs px-6 py-2 relative group ${isUsersActive ? "active" : ""}`}>
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
                className="absolute w-full left-0 top-9 border-b  rounded-b-xl border-slate-900 backdrop-blur-lg">
                <Link
                  to="/dashboard/users"
                  // style={{ backgroundColor: "gray" }}
                  className="px-6 py-2 text-xs dropdown-link"
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
                  className=" px-6 py-2 text-xs rounded-b-lg dropdown-link"
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
        </div>
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className="lg:text-sm text-xs px-6 py-2"
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

        {/* Notification */}

        <div ref={notificationDropdownRef} onClick={notificationDropdownToggle} end='true'
          className={`user-link lg:text-sm text-xs px-6 py-2 relative group ${isNotificationActive ? "active" : ""}`}>
          <BellRing size={20} style={{ minWidth: "20px" }} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className='whitespace-nowrap flex items-center justify-between'
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.1, delay: 0.1 }}
              >
                Notifications
                {notificationDropdown ?
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
            {notificationDropdown && (
              // DropDown links
              <motion.div
                initial={{ opacity: 0, translateY: 10 }} // Start slightly below
                animate={{ opacity: 1, translateY: 0 }}  // Animate upwards
                exit={{ opacity: 0, translateY: 10 }}    // Exit downwards
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute w-full left-0 bottom-9 border-t  rounded-t-xl border-slate-900 backdrop-blur-lg">
                <Link
                  to="/dashboard/send-notification"
                  className=" px-6 py-2 text-xs dropdown-link"
                >
                  <BellRing size={15} style={{ minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="md:whitespace-nowrap whitespace-normal text-center"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                      >
                        Send Notification
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                <Link
                  to="/dashboard/partner-messages"
                  className=" px-6 py-2 text-xs dropdown-link"
                >
                  <Crown size={15} style={{ minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="md:whitespace-nowrap whitespace-normal text-center"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                      >
                        Partner Messages
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                <Link
                  to="/dashboard/auto-notifications"
                  className=" px-6 py-2 text-xs dropdown-link"
                >
                  <BellElectricIcon size={15} style={{ minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="md:whitespace-nowrap whitespace-normal text-center"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                      >
                        Auto Notifications
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <Link
        className="logout w-full px-6 min-h-10 py-2 mt-auto flex md:flex-row flex-col gap-2 items-center md:text-sm text-xs"
        onClick={logout}
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
