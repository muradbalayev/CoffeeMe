import { Link, NavLink } from "react-router-dom"
import { ChartLine, Handshake, LogOut, MessageSquareWarning, User, Users } from "lucide-react"

function Sidebar() {
    return (
        <div className='sidebar h-screen flex flex-col items-center gap-2 py-10 text-white'>
            <div className="profile-img bg-gray-300 rounded-full p-5">
            <User size={60} />
            </div>
            <span className="text-xs font-semibold text-center">Coffee shop name</span>
            <nav className="links w-full mt-10 flex flex-col">
                <NavLink to={"/dashboard"} className="lg:text-base text-sm md:py-3 md:px-8 py-3 px-3" end >
                <ChartLine size={20} />
                    Sales Report
                </NavLink>
                <NavLink activeclassname="active" to={"/dashboard/users"} className='lg:text-base text-sm md:py-3 md:px-8 py-3 px-3'>
                <Users size={20} />
                    Users
                </NavLink>
                <NavLink activeclassname="active" to={"/dashboard/partner"} className="lg:text-base text-sm md:py-3 md:px-8 py-3 px-3">
                <Handshake size={20} />
                    Partners
                </NavLink>
                <NavLink activeclassname="active" to={"/dashboard/support"} className="lg:text-base text-sm md:py-3 md:px-8 py-3 px-3" >
                <MessageSquareWarning size={20} />
                    Support Chat
                </NavLink>

            </nav>
            <Link className="logout mt-auto flex gap-2 justify-center items-center lg:text-base text-sm" to={'/'}>
            <LogOut size={25} />
                Log Out
            </Link>
        </div>
    )
}

export default Sidebar