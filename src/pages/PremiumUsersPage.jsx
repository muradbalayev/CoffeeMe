import { Crown } from "lucide-react";
import UserTable from "../Components/Users/UserTable";

const PremiumUsersPage = () => {
  const users = 
    {
      id: 1,
      title: "Premium Users",
      path: "https://dummyjson.com/users",
      icon: <Crown size={35} color="#214440" />,
      type: 'premiumusers'
    }
  

  return (
    <UserTable key={users.id}
      title={users.title} 
      path={users.path}
      icon={users.icon}
      usertype={users.type}
      />
  )
}

export default PremiumUsersPage
