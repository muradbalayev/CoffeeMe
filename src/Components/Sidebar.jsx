import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChartLine, Handshake, LogOut, MessageSquareWarning, User, Users } from "lucide-react"
import toast from "react-hot-toast";

function Sidebar() {
const navigate = useNavigate();
   
    const handleLogout = async (e) => {
        e.preventDefault();
        toast.success("Murad Balayev Coffeeshop'dan çıxış etdi.")
        navigate('/')
    }

    return (
        <div className='sidebar h-screen flex flex-col items-center gap-4 py-10 text-white'>
            <div className="profile-img bg-gray-300 rounded-full md:p-5 p-3">
            <User size={50} />
            </div>
            <span className="text-xs font-semibold text-center">Coffee shop name</span>
            <nav className="links w-full mt-8 flex flex-col">
                <NavLink to={"/dashboard"} className="lg:text-sm text-xs md:py-3 md:px-8 py-3 px-2" end >
                <ChartLine size={20} />
                    Sales Report
                </NavLink>
                <NavLink activeclassname="active" to={"/dashboard/users"} className='lg:text-sm text-xs md:py-3 md:px-8 py-3 px-2'>
                <Users size={20} />
                    Users
                </NavLink>
                <NavLink activeclassname="active" to={"/dashboard/partner"} className="lg:text-sm text-xs md:py-3 md:px-8 py-3 px-2">
                <Handshake size={20} />
                    Partners
                </NavLink>
                <NavLink activeclassname="active" to={"/dashboard/support"} className="lg:text-sm text-xs md:py-3 md:px-8 py-3 px-2" >
                <MessageSquareWarning size={20} />
                    Support Chat
                </NavLink>

            </nav>
            <Link className="logout md:px-4 py-2 px-2 mt-auto flex gap-2 justify-center items-center md:text-base text-sm" onClick={handleLogout}>
            <LogOut size={20} />
                Log Out
            </Link>
        </div>
    )
}

export default Sidebar