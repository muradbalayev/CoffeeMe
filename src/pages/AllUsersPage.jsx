import { Users } from "lucide-react";
import UserTable from "../Components/Users/UserTable";

const AllUsersPage = () => {
    const users = 
        {
            id: 1,
            title: "Users",
            path: "https://dummyjson.com/users",
            icon: <Users size={30} color="#214440"/>,
            type: 'users'
        }
    

    return (
        <UserTable
            key={users.id}
            title={users.title}
            path={users.path}
            icon={users.icon}
            usertype={users.type}
        />
    )
    
}

export default AllUsersPage;
