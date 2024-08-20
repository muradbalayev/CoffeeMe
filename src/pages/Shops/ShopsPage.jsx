import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import "./ShopPage.css";

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
      className="addModalContainer align-items-center justify-content-center d-flex position-absolute left-0 top-0 w-100 min-vh-100"
    >
      <form
        className="addModalForm w-75 align-items-center justify-content-center flex-column d-flex"
        onSubmit={handleSubmit}
      >
        <h2 className="text-dark display-5">Add Shop</h2>
        <div className="w-100 gap-3 d-flex flex-column">
          <div className="w-100 d-flex inputRow gap-5 justify-content-between">
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
          <div className="w-100 d-flex inputRow gap-5 justify-content-between">
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
          <div className="w-100 d-flex inputRow gap-5 justify-content-between">
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
          <div className="w-100 d-flex inputRow gap-5 justify-content-center">
            <div className="inputContainer w-50">
              <button type="submit" className="btn btn-primary">
                Add Shop
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="position-relative d-flex flex-column align-items-center gap-5 p-5 min-vh-100">
      {showAddModal && <AddShopModal setShowAddModal={setShowAddModal} />}
      <div className="d-flex justify-content-between w-100 align-items-center">
        <h1 className="h1">Shops</h1>
        <div className="gap-1">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            +
          </button>
        </div>
      </div>
      <table className="table w-100 table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Products</th>
            <th scope="col">Location</th>
            <th scope="col">Logo</th>
            <th scope="col">Photo</th>
          </tr>
        </thead>
        <tbody>
          {data.shops.map((shop, index) => (
            <tr key={index}>
              <th scope="row" className="col-1">
                {index + 1}
              </th>
              <td className="col-1">{shop._id}</td>
              <td className="col-2">{shop.name}</td>
              <td className="col-1">
                <button className="btn btn-sm btn-dark">
                  <i className="fa-solid fa-eye"></i>
                </button>
              </td>
              <td className="col-1">
                {parseInt(shop.location.coordinates[0]) +
                  "," +
                  parseInt(shop.location.coordinates[1])}
              </td>
              <td className="col-1">
                <button className="btn btn-sm btn-dark">
                  <i className="fa-solid fa-eye"></i>
                </button>
              </td>
              <td className="col-1">
                <button className="btn btn-sm btn-dark">
                  <i className="fa-solid fa-eye"></i>
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
