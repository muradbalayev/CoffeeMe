import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import PartnerPage from "./PartnerPage";
import UserCreate from "../Components/Users/UserCreate";
import UserUpdate from "../Components/Users/UserUpdate";
import SalesReport from "./SalesPage";
import WalletPage from "./WalletPage";
import WithdrawPage from "./WithdrawPage";
import WhtCreate from "../Components/Withdraw/WthCreate";
import AllUsersPage from "./AllUsersPage";
import PremiumUsersPage from "./PremiumUsersPage";
import PartnerCreate from "../Components/Partners/PartnerCreate";
import PartnerUpdate from "../Components/Partners/PartnerUpdate";
import ShopsPage from "./Shops/ShopsPage";

import { QueryClient, QueryClientProvider } from "react-query";
import MenuPage from "./Menu/MenuPage";
import ProductPage from "./Menu/ProductPage";
import ProductUpdate from "../Components/Menu/ProductUpdate";
import ProductCreate from "../Components/Menu/ProductCreate";
function DashboardPage() {
  const queryClient = new QueryClient();

  return (
    <div className="flex h-screen w-full overflow-hidden max-w-[1920px] mx-auto">
      <QueryClientProvider client={queryClient}>
        <Sidebar />
        <div className="w-full overflow-y-scroll">
          <Routes>
            <Route path="/" element={<SalesReport />} />

            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
            <Route path="/withdraw/create" element={<WhtCreate />} />

            <Route path="/users" element={<AllUsersPage />} />
            <Route path="/premiumusers" element={<PremiumUsersPage />} />
            <Route path="/:users/create" element={<UserCreate />} />
            <Route path="/:users/update/:userid" element={<UserUpdate />} />

            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/partner/create" element={<PartnerCreate />} />
            <Route path="/partner/update/:partnerid" element={<PartnerUpdate />} />

            <Route path="/shops" element={<ShopsPage />} />

            <Route path="/menu" element={<MenuPage />} />

            <Route path="/menu/shopname/products" element={<ProductPage/>} />
            <Route path="/menu/shopname/products/create" element={<ProductCreate />} />
            <Route path="/menu/shopname/products/update/:productid" element={<ProductUpdate />} />
            

          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default DashboardPage;
