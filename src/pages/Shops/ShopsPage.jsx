import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import "./ShopPage.css";
import {
  Coffee,
  Eye,
  Pencil,
  Search,
  ShoppingCart,
  SquarePlus,
  Trash2,
} from "lucide-react";

console.log(`${import.meta.env.VITE_API_URL}/api/shop/`);
const fetchShops = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shop`);
  console.log(res);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
const AddShopModal = ({ setShowAddModal }) => {
  const [data, setData] = useState({
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    photo: null,
    logo: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setData({
      ...data,
      [name]: file,
    });
  };
  const mutation = useMutation(
    async (formData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shop/add`, {
        method: "POST",
        body: formData,
      });
      return response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("shops"); // Veri güncellemelerini yenile
        setShowAddModal(false); // Modal'ı kapat
        console.log("Shop added successfully:", data);
      },
      onError: (error) => {
        console.error("Error adding shop:", error);
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    mutation.mutate(formData); // Submit formData using useMutation
  };
  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowAddModal(false);
      }}
      className="addModalContainer items-center justify-center flex absolute left-0 top-0 w-full min-h-svh"
    >
      <form
        className="addModalForm w-3/4 items-center justify-center flex-col flex"
        onSubmit={handleSubmit}
      >
        <h2 className="text-dark display-5 title text-3xl p-3 mb-5">
          Add Shop
        </h2>
        <div className="w-full gap-3 flex flex-col">
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                type="text"
                name="address"
                placeholder="Address"
                value={data.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Longitude</label>
              <input
                className="form-control"
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={data.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Latitude</label>
              <input
                className="form-control"
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={data.latitude}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Photo</label>
              <input
                className="form-control"
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Logo</label>
              <input
                className="form-control"
                type="file"
                name="logo"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Add Shop <ShoppingCart color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

function ShopsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const { isLoading, isError, isSuccess, data, error } = useQuery(
    "shops",
    fetchShops
  );

  if (isLoading)
    return (
      <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
        <Coffee size={30} stroke="#214440" />
        <h1 className="title text-2xl">Loading...</h1>
      </div>
    );
  if (isError) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="wrapper relative flex flex-col items-center gap-5">
      {showAddModal && <AddShopModal setShowAddModal={setShowAddModal} />}
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="title md:text-4xl text-2xl">Shops</h1>
        <div className="gap-3 flex items-center">
          <div className="flex relative">
            <input
              className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border-3 outline-none rounded-md"
              placeholder="Search"
            />
            <Search className="search-icon" />
          </div>
          <button onClick={() => setShowAddModal(true)}>
            <SquarePlus size={40} />
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead className="text-white" style={{ backgroundColor: "#214440" }}>
          <tr>
            <th scope="col">#</th>
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
          {data.shops.map((shop, index) => (
            <tr key={index}>
              <th scope="row" className="col-1 border-b border-gray-300">
                {index + 1}
              </th>
              <td className="col-1">{shop._id}</td>
              <td className="col-2">{shop.name}</td>
              <td className="col-1">
              <button className="px-3 py-2 border rounded bg-blue-600">
                  <Eye size={18} color="white"></Eye>
                </button>
              </td>
              <td className="col-1">
                {parseInt(shop.location.coordinates[0]) +
                  "," +
                  parseInt(shop.location.coordinates[1])}
              </td>
              <td className="col-1">
                <button className="px-3 py-2 border rounded bg-blue-600">
                  <Eye size={18} color="white"></Eye>
                </button>
              </td>
              <td className="col-1">
              <button className="px-3 py-2 border rounded bg-blue-600">
                  <Eye size={18} color="white"></Eye>
                </button>
              </td>
              <td className="col-2">
                <button className="px-3 py-2 bg-green-600 text-white rounded-md">
                  <Pencil size={18} />
                </button>
                <button className="px-3 ms-2 py-2 bg-red-600 text-white rounded-md">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShopsPage;
