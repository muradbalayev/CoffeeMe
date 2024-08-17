import { Route, Routes } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import Users from "../Components/Users"
import Partner from "../Components/Partner"

function DashboardPage() {
  return (
    <div className="grid grid-cols-12 h-screen w-full">
        <div className="lg:col-span-2 col-span-3 w-full">
        <Sidebar />

        </div>
        <div className="lg:col-span-10 col-span-9 w-full">
        <Routes>
            <Route path='/' element={<Users/>} />
            <Route path='/partner' element={<Partner/>} />
        </Routes>
        </div>
    </div>
  )
}

export default DashboardPage