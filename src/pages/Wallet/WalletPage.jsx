
import { Check, Coffee, Search,Wallet as WalletIcon, X } from "lucide-react"
import { useState } from "react";
import { useGetShopQuery } from "../../redux/services/shopApi";
// import WalletEdit from "../../Components/Wallet/WalletEdit";



const WalletPage = () => {

  // const [transactions, setTransactions] = useState([]);


  const { data, isLoading, isError, isSuccess, error } = useGetShopQuery(undefined, {
    pollingInterval: 10000, // ReFetch every 5 seconds
  });
  console.log(data)




  // const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");


  // const [editedItem, setEditedItem] = useState(null);



  if (isLoading)
    return (
      <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
        <Coffee size={30} color="#214440" />
        <h1 className="title text-2xl">Loading...</h1>
      </div>
    );

  if (isError) return <div>An error occurred: {error.message}</div>;


  const filteredShops = data.shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isSuccess) return (
    <div className="wrapper">
      {/* {editedItem && (
        <WalletEdit data={editedItem} setShowEditModal={setEditedItem} />
      )} */}
      <div className="sales-header flex justify-between items-center">
        <div className='relative p-2'>
          <h1 className="title md:text-4xl text-2xl">
            Wallet
          </h1>
        </div>
        <div className="balance md:text-base text-xs hover:shadow-xl shadow-md whitespace-nowrap">
          <WalletIcon />
          1000 $
        </div>
      </div>
      <h1 className="mt-8 title text-xl">Recent transaction&apos;s</h1>
      <div className="gap-3 flex items-center mt-2">
        <div className="flex relative">
          <input
            className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="search-icon" />
        </div>
      </div>
      <div className="overflow-y-scroll overflow-x-auto w-full mt-4">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="text-white bg-[#00704a]" >
            <tr>
              <th className="id" scope="col">
                #
              </th>
              <th scope="col">Id</th>
              <th scope="col">User</th>
              <th scope="col">Date and Time</th>
              <th scope="col">Price</th>
              <th scope="col">Coffee Shop Name</th>

              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filteredShops.map((shop, index) => (
              <tr key={index}>
                <td scope="row" className="col-1 border-b border-gray-300 id">
                  {index + 1}
                </td>
                <td className="col-1">{shop._id}</td>
                <td className="col-2">{shop.name} {shop.shortAddress}</td>
                <td className="col-1">
                  aksmdaslmf
                </td>
                <td className="col-1">
                  {shop.name} {shop.shortAddress}
                </td>
                <td className="col-1">
                  {shop.name} {shop.shortAddress}
                </td>

                <td className="col-2 min-w-44  ">
                  <button
                    className=" px-3 py-2 bg-blue-600 text-white rounded-md"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    // onClick={() => handleDelete(shop._id)}
                    className="px-3 ms-2 py-2 bg-red-600 text-white rounded-md"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WalletPage
