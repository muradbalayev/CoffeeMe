import {
  ChartLine,
  Package2,
  TrendingDown,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const SalesTotals = () => {
  const totalData = [
    {
      id: 1,
      name: "Total Users",
      sales: "40,689",
      icon: <UsersRound size={45} color="#00B69B" />,
      exchange: "",
      arrowicon: <TrendingUp color="#00B69B" />,
      percentage: "8.5% Up from yesterday",
      path: '/dashboard/users'
    },
    {
      id: 2,
      name: "Total Order",
      sales: "10,293",
      icon: <Package2 size={45} color="orange" />,
      exchange: "",
      arrowicon: <TrendingUp color="#00B69B" />,
      percentage: "1.3% Up from past week",
      path: ''
    },
    {
      id: 3,
      name: "Total Sales",
      sales: "$80,600",
      icon: <ChartLine size={45} color="green" />,
      exchange: "",
      arrowicon: <TrendingDown color="red"/>,
      percentage: "4.3% Down from yesterday",
      path: '/dashboard/wallet'
    },
  ];

  return (
    <div className="totals mt-8 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {totalData.map((total) => (
        <Link to={total.path}
          key={total.id}
          className="total-card cursor-pointer hover:shadow-xl shadow-md min-h-48 p-4 rounded-lg bg-white min-w-[150px]">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-5  ">
                <p className="text-gray lg:text-base text-sm">{total.name}</p>
                <p className="lg:text-2xl text-lg font-bold ">{total.sales}</p>
              </div>
              {total.icon}
            </div>
            <div className="flex items-center gap-2 text-gray lg:text-base text-xs">
              {total.arrowicon}
              {total.percentage}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SalesTotals;
