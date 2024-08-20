import { Route, Routes } from "react-router-dom"
import Sidebar from "../Components/Sidebar"
import PartnerPage from "./PartnerPage"
import Support from "../Components/Support"
import UserCreate from "../Components/Users/UserCreate"
import UserUpdate from "../Components/Users/UserUpdate"
import SalesReport from "./SalesPage"
import WalletPage from "./WalletPage"
import WithdrawPage from "./WithdrawPage"
import WhtCreate from "../Components/Withdraw/WthCreate"
import AllUsersPage from "./AllUsersPage"
import PremiumUsersPage from "./PremiumUsersPage"
import PartnerCreate from "../Components/Partners/PartnerCreate"
import PartnerUpdate from "../Components/Partners/PartnerUpdate"

function DashboardPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden max-w-[1920px] mx-auto">
            <Sidebar />
            <div className="w-full overflow-y-scroll">
                <Routes>
                    <Route path='/' element={<SalesReport />} />

                    <Route path="/wallet" element={<WalletPage />} />

                    <Route path="/withdraw" element={<WithdrawPage />} />
                    <Route path="/withdraw/create" element={<WhtCreate />} />

                    <Route path='/users' element={<AllUsersPage />} />
                    <Route path='/premiumusers' element={<PremiumUsersPage />} />
                    <Route path='/:users/create' element={<UserCreate />} />
                    <Route path='/:users/update/:userid' element={<UserUpdate />} />

                    <Route path='/partner' element={<PartnerPage />} />
                    <Route path="/partner/create" element={<PartnerCreate />} />
                    <Route path="/partner/update/:partnerid" element={<PartnerUpdate />} />

                    <Route path='/support' element={<Support />} />
                </Routes>
            </div>
        </div>
    )
}

export default DashboardPage