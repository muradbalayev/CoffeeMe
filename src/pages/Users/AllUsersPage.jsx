import { Users } from "lucide-react";
import UserTable from "../../Components/Users/UserTable"


const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/api/users`);
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
};

const AllUsersPage = () => {
    const users =
    {
        id: 1,
        title: "Users",
        icon: <Users size={30} color="#214440" />,
        type: 'users'
    }


    return (
        <UserTable
            fetchUsers={fetchUsers}
            key={users.id}
            title={users.title}
            icon={users.icon}
            usertype={users.type}
        />
    )

}

export default AllUsersPage;