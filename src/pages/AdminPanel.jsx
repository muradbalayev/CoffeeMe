import { Route, Routes } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Users from "../Components/Users/Users"
import Partner from "../Components/Partner"
import Support from "../Components/Support"
import UserCreate from "../Components/Users/UserCreate"
import UserUpdate from "../Components/Users/UserUpdate"
import SalesReport from "../Components/SalesReport/SalesReport"

function AdminPage() {
    return (
        <div className="grid grid-cols-12 h-screen w-full overflow-hidden max-w-[1920px] mx-auto">
            <div className="lg:col-span-2 col-span-3 w-full">
                <Sidebar />
            </div>
            <div className="lg:col-span-10 col-span-9 w-full overflow-y-scroll">
                <Routes>
                    <Route path='/' element={<SalesReport />} />
                    
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/create' element={<UserCreate />} />
                    <Route path='/users/update/:userid' element={<UserUpdate />} />

                    <Route path='/partner' element={<Partner />} />
                    <Route path='/support' element={<Support />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPage