import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import "yet-another-react-lightbox/styles.css";
import "./ShopPage.css";
import {
  Coffee,
  Eye,
  Pencil,
  Search,
  SquarePlus,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import EditShopModal from "../../Components/Shops/ShopUpdate";
import AddShopModal from "../../Components/Shops/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useDeleteShopMutation, useGetShopQuery } from "../../redux/services/shopApi";


function ShopsPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess, error } = useGetShopQuery(undefined, {
    pollingInterval: 10000, // ReFetch every 5 seconds
  });
  console.log(data)

  const [deleteShop] = useDeleteShopMutation();

  const handleDelete = async (shopId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      // Call the delete mutation
      deleteShop(shopId).then(() => {
        Swal.fire("Deleted!", "Your shop has been deleted.", "success");
      }).catch((error) => {
        Swal.fire("Error!", "There was an issue deleting the shop.", { error });
      });
    }
  };


  // const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const [editedItem, setEditedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");


  const handleLogoClick = (par) => {
    const url = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads/shops/${par}`;
    setImageSrc(url);
    setOpen(true);
  };

  if (isLoading)
    return (
      <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
        <Coffee size={30} color="#214440" />
        <h1 className="title text-2xl">Loading...</h1>
      </div>
    );

  if (isError) return <div>An error occurred: {error.message}</div>;

  const imgUrl = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads/shops`;

  const filteredShops = data.shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isSuccess) return (
    <div className="wrapper relative flex flex-col items-center gap-5 ">
      {showAddModal && <AddShopModal setShowAddModal={setShowAddModal} />}
      {editedItem && (
        <EditShopModal data={editedItem} setShowEditModal={setEditedItem} />
      )}

      <div className="flex justify-between w-full items-center p-2">
        <h1 className="title lg:text-4xl text-3xl">Shops</h1>
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
      <div className="overflow-y-scroll overflow-x-auto w-full">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="text-white bg-[#00704a]" >
            <tr>
              <th className="id" scope="col">
                #
              </th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Products</th>
              <th scope="col">Location</th>
              <th scope="col">Logo</th>
              <th scope="col">Photo</th>
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
                  <button
                    onClick={() => navigate(`/dashboard/menu/${shop._id}/products`)}
                    className="px-3 py-2 border"
                    style={{ backgroundColor: "#00704a", color: "white" }}>
                    <Eye size={15} color="white"></Eye>
                  </button>
                </td>
                <td className="col-1">
                  {parseInt(shop.location.coordinates[0]) +
                    "," +
                    parseInt(shop.location.coordinates[1])}
                </td>
                <td className="col-1 min-w-32">
                  <button
                    className="px-1 py-1 border rounded max-w-16"
                    onClick={() => handleLogoClick(`${shop.name}-${shop.address}/${shop.logo}`)}
                  >
                    {shop.logo && (
                      <img
                        src={`${imgUrl}/${shop.name}-${shop.address}/${shop.logo}`}
                        alt="Shop Logo"
                        className="object-contain h-14 w-14"
                      />
                    )}{" "}
                  </button>
                </td>
                <td className="col-1 min-w-32">
                  <button
                    className="px-1 py-1 border rounded max-w-16"
                    onClick={() => handleLogoClick(`${shop.name}-${shop.address}/${shop.photo}`)}
                  >
                    {shop.logo && (
                      <img
                        src={`${imgUrl}/${shop.name}-${shop.address}/${shop.photo}`}
                        alt="Shop Logo"
                        className="object-contain h-14 w-14"
                      />
                    )}
                  </button>
                </td>
                <td className="col-2 min-w-44  ">
                  <button
                    onClick={() => setEditedItem(shop)}
                    className=" px-3 py-2 bg-blue-600 text-white rounded-md"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(shop._id)}
                    className="px-3 ms-2 py-2 bg-red-600 text-white rounded-md"
                  >
                    <Trash2 size={18} />
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
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: imageSrc }]}
        plugins={[Thumbnails][Fullscreen]}
      />
    </div>
  );
}

export default ShopsPage;
