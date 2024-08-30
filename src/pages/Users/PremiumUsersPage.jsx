import { Crown } from "lucide-react";
import UserTable from "../../Components/Users/UserTable";


const fetchUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/api/users/premium`);
  if (!res.ok) {
      throw new Error("Network response was not ok");
  }
  return res.json();
};
const PremiumUsersPage = () => {
  const users = 
    {
      id: 1,
      title: "Premium Users",
      icon: <Crown size={35} color="#214440" />,
      type: 'premiumusers'
    }
  

  return (
    <UserTable key={users.id}
    fetchUsers={fetchUsers}
      title={users.title} 
      icon={users.icon}
      usertype={users.type}
      />
  )
}

export default PremiumUsersPage
