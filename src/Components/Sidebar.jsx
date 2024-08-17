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
            <span className="text-xs">Coffee shop name</span>
            <div className="links w-full mt-10 flex flex-col">
                <NavLink to={"/dashboard"} >
                    <Icon icon={users} size={20} />
                    Users
                </NavLink>
                <NavLink to={"/dashboard/partner"} >
                    <Icon icon={coffee} size={20} />
                    Partner
                </NavLink>
                <NavLink to={"/dashboard/support"} >
                    <Icon icon={chat} size={20} />
                    Support Chat
                </NavLink>
                <NavLink to={"/dashboard/support"} >
                    <Icon icon={statsBars} size={20} />
                    Statictics
                </NavLink>
            </div>
            <Link className="logout mt-auto flex gap-2 justify-center" to={'/'}><Icon size={20} icon={ic_logout} /> Logout </Link>
        </div>
    )
}

export default Sidebar