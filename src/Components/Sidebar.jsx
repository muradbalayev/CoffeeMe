import { Link, NavLink } from "react-router-dom"
import { user } from 'react-icons-kit/fa/user'
import { users } from 'react-icons-kit/fa/users'
import { coffee } from 'react-icons-kit/fa/coffee'
import { chat } from 'react-icons-kit/iconic/chat'
import { statsBars } from 'react-icons-kit/icomoon/statsBars'
import { ic_logout } from 'react-icons-kit/md/ic_logout'
import Icon from "react-icons-kit"

function Sidebar() {
    return (
        <div className='sidebar h-screen flex flex-col items-center gap-2 py-10 text-white'>
            <div className="profile-img bg-slate-400 rounded-full p-3">
                <Icon icon={user} size={60} />
            </div>
            <span className="text-xs font-semibold text-center">Coffee shop name</span>
            <nav className="links w-full mt-10 flex flex-col">
                <NavLink to={"/dashboard"} className="lg:text-base text-sm md:py-3 md:px-8 py-3 px-3" >
                    <Icon icon={statsBars} size={20} />
                    Sales Report
                </NavLink>
                <NavLink to={"/dashboard/users"} className='lg:text-base text-sm md:py-3 md:px-8 py-3 px-3'>
                    <Icon icon={users} size={20} />
                    Users
                </NavLink>
                <NavLink to={"/dashboard/partner"} className="lg:text-base text-sm md:py-3 md:px-8 py-3 px-3">
                    <Icon icon={coffee} size={20} />
                    Partners
                </NavLink>
                <NavLink to={"/dashboard/support"} className="lg:text-base text-sm md:py-3 md:px-8 py-3 px-3" >
                    <Icon icon={chat} size={20} />
                    Support Chat
                </NavLink>

            </nav>
            <Link className="logout mt-auto flex gap-2 justify-center lg:text-base text-sm" to={'/'}>
                <Icon size={20} icon={ic_logout} />
                Log Out
            </Link>
        </div>
    )
}

export default Sidebar