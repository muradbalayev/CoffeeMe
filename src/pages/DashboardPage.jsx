import { Route, Routes } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Partner from "../Components/Partner"
import Support from "../Components/Support"
import UserCreate from "../Components/Users/UserCreate"
import UserUpdate from "../Components/Users/UserUpdate"
import SalesReport from "./SalesPage"
import UsersPage from "./UsersPage"

function DashboardPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden max-w-[1920px] mx-auto">
                <Sidebar />
            <div className="w-full overflow-y-scroll">
                <Routes>
                    <Route path='/' element={<SalesReport />} />
                    
                    <Route path='/users' element={<UsersPage />} />
                    <Route path='/users/create' element={<UserCreate />} />
                    <Route path='/users/update/:userid' element={<UserUpdate />} />

                    <Route path='/partner' element={<Partner />} />
                    <Route path='/support' element={<Support />} />
                </Routes>
            </div>
        </div>
    )
}

export default DashboardPage