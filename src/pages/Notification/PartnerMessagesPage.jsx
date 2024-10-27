import { useState } from "react";

import "yet-another-react-lightbox/styles.css";
import "../Shops/ShopPage.css";
import {
  Check,
  Coffee,
  Pencil,
  Search,
} from "lucide-react";
// import Swal from "sweetalert2";
import { useGetShopQuery } from "../../redux/services/shopApi";
import EditNotification from "../../Components/Notification/NotificationEdit";


function ShopsPage() {


  const { data, isLoading, isError, isSuccess, error } = useGetShopQuery(undefined, {
    pollingInterval: 10000, // ReFetch every 5 seconds
  });
  console.log(data)




  // const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");


  const [editedItem, setEditedItem] = useState(null);



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
    <div className="wrapper relative flex flex-col items-center gap-5 ">
      {editedItem && (
        <EditNotification data={editedItem} setShowEditModal={setEditedItem} />
      )}

      <div className="flex justify-between w-full items-center p-2">
        <h1 className="title lg:text-4xl text-3xl">Partner Notifications</h1>
        <div className="gap-3 flex items-center">
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
      </div>
      <div className="overflow-y-scroll overflow-x-auto w-full">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="text-white bg-[#00704a]" >
            <tr>
              <th className="id" scope="col">
                #
              </th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Message</th>
              <th scope="col">Date</th>
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
                <td className="min-w-72">
                  {shop.name} {shop.shortAddress}
                </td>
                <td className="col-1">
                  {parseInt(shop.location.coordinates[0]) +
                    "," +
                    parseInt(shop.location.coordinates[1])}
                </td>


                <td className="col-2 ">
                  <div className='flex justify-center items-center gap-2'>
                    <button
                      className="px-3 py-2 flex items-center gap-2 bg-green-600 text-white rounded-md"
                    // onClick={() => handleDelete(row._id)}
                    >
                      <Check size={18} />

                    </button>
                    <button
                      className="px-3 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md"
                      onClick={() => setEditedItem(shop)}
                    >
                     <Pencil size={18} />
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full mx-auto flex items-center justify-center">
  <button className="px-4 py-3" style={{ backgroundColor: "#214440", color: "white"}}>Load More</button>
</div> */}

    </div>
  );
}

export default ShopsPage;
