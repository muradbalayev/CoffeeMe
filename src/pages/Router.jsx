
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import PartnerPage from "./Partner/PartnerPage";

import SalesReport from "./SalesReport/SalesReportPage";
import WalletPage from "./Wallet/WalletPage";
import WithdrawPage from "./Withdraw/WithdrawPage";
import WhtCreate from "../Components/Withdraw/WthCreate";
import ShopsPage from "./Shops/ShopsPage";
import MenuPage from "./Menu/MenuPage";
import ProductPage from "./Menu/ProductPage";
// import PartnerUpdate from "../Components/Partners/PartnerUpdate";
// import ProductUpdate from "../Components/Menu/ProductUpdate";
// import ProductCreate from "../Components/Menu/ProductCreate";
import SendNotification from "./Notification/SendNotificationPage";
import PartnerMessages from "./Notification/PartnerMessagesPage";
import AutoNotificationPage from "./Notification/AutoNotificationPage";
import SalesPage from "./SalesPage/SalesPages";
import Sidebar from "../Components/Sidebar";
import StockPage from "./Stock/StockPage";
import SubscribersPage from "./Subscribers/SubscribersPage";
import AllUsers from "./Users/AllUsers";
import PremiumUsers from "./Users/PremiumUsers";
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

            <Route path="/sales" element={<SalesPage />} />

            <Route path="/withdraw" element={<WithdrawPage />} />
            <Route path="/withdraw/create" element={<WhtCreate />} />

            <Route path="/users" element={<AllUsers />} />
            <Route path="/premiumusers" element={<PremiumUsers />} />


            <Route path="/partners" element={<PartnerPage />} />
            <Route path="/subscribers" element={<SubscribersPage />} />
            {/* <Route path="/partner/update/:partnerid" element={<PartnerUpdate />} /> */}

            <Route path="/shops" element={<ShopsPage />} />

            <Route path="/menu" element={<MenuPage />} />
            <Route path="/stock" element={<StockPage/>} />

            <Route path="/menu/:shopId/products" element={<ProductPage />} />
            {/* <Route path="/menu/:shopId/products/create" element={<ProductCreate />} /> */}
            {/* <Route path="/menu/:shopId/products/update/:productid" element={<ProductUpdate />} /> */}

            <Route path="/send-notification" element={<SendNotification />} />
            <Route path="/partner-messages" element={<PartnerMessages />} />
            <Route path="/auto-notifications" element={<AutoNotificationPage />} />


          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default DashboardPage;
