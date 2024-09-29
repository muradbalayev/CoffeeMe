import { useState } from "react";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import "yet-another-react-lightbox/styles.css";
import "../Shops/ShopPage.css";
import {
  Coffee,
  Flame,
  Pencil,
  Search,
  SquarePlus,
  Users,
} from "lucide-react";
import EditShopModal from "../../Components/Shops/ShopUpdate";
import AddShopModal from "../../Components/Shops/ShopCreate";
import { useGetPremiumUserQuery } from "../../redux/services/premiumUserApi";


function PremiumUsers() {


  const { data, isLoading, isError, isSuccess, error } = useGetPremiumUserQuery(undefined, {
    pollingInterval: 10000, // ReFetch every 5 seconds
  });
  console.log(data)



  // const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
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


  //   const filteredUsers = data.users.filter((user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const users = Array.isArray(data.users) ? data.users : [];


  if (isSuccess) return (
    <div className="wrapper relative flex flex-col items-center gap-5 ">
      {showAddModal && <AddShopModal setShowAddModal={setShowAddModal} />}
      {editedItem && (
        <EditShopModal data={editedItem} setShowEditModal={setEditedItem} />
      )}

      <div className="flex justify-between w-full items-center p-2">
        <h1 className="title flex items-center  gap-3 lg:text-4xl text-3xl">Premium Users <Users size={30} color="#214440" /></h1>
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
          <button onClick={() => setShowAddModal(true)}>
            <SquarePlus size={40} />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-auto w-full">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="text-white bg-[#00704a]" >
            <tr>
              <th className="id" scope="col">
                #
              </th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">BirthDate</th>
              <th scope="col">Most Going Coffee Shop</th>
              <th scope="col" className="w-full text-center">
                <div className="flex justify-center items-center gap-1 w-full">
                  Streak <Flame size={20} color="orange" />
                </div>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td scope="row" className="col-1 border-b border-gray-300 id">
                  {index + 1}
                </td>
                <td className="col-1">{user._id}</td>
                <td className="col-2">{user.firstname} {user.secondname} </td>
                <td className="col-2">{user.gender}</td>
                <td className="col-2">{user.address}</td>
                <td className="col-2">{user.phone}</td>
                <td className="col-2">{user.email}</td>
                <td className="col-2">{new Date(user.birthdate).toLocaleDateString()}</td>
                <td className="col-2">{user.firstname} {user.secondname}</td>
                <td className="col-2">
                  <div className="flex items-center justify-center gap-1">
                  {user.streak?.count}
                  <Flame size={20} color="orange" />
                  </div>
                  </td>

                <td className="col-2 min-w-44  ">
                  <button
                    onClick={() => setEditedItem(user)}
                    className=" px-3 py-2 bg-blue-600 text-white rounded-md"
                  >
                    <Pencil size={18} />
                  </button>
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

export default PremiumUsers;
