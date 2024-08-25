import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

const AddWithdrawModal = ({ setShowAddModal }) => {


  const queryClient = useQueryClient();
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



  const mutation = useMutation(
    async (formData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/shop/add`,
        {
          method: "POST",
          body: formData,
        }
      );
      return await response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("shops");
        setShowAddModal(false);
        console.log("Shop added successfully:", data);
      },
      onError: (error) => {
        console.error("Error adding shop:", error);
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.address ||
      !data.longitude ||
      !data.latitude
  ) {
      toast.error('Fill all the inputs');
      return;
  }


    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    mutation.mutate(formData);
    toast.success("Withdraw Created Successfully!");
    // Submit formData using useMutation
  };

  console.log(data);

  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowAddModal(false);
      }}
      className="addModalContainer overflow-hidden z-10 items-center justify-center flex absolute left-0 top-0 w-full min-h-svh"
    >
      <form
        className="addModalForm overflow-hidden w-3/4 items-center justify-center flex-col flex relative"
        onSubmit={handleSubmit}
      >
        <X
          color="red"
          size={30}
          className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition duration-300"
          onClick={() => setShowAddModal(false)}
        />
        <h2 className="text-dark display-5 title text-3xl p-3 mb-5">
          Add Withdraw
        </h2>
        <div className="w-full gap-3 flex flex-col">
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Coffee Shop Name</label>
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
              <label className="form-label">Date and Time</label>
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
              <label className="form-label">Withdraw Type</label>
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
              <label className="form-label">Withdraw Amount</label>
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
        
          <div className="flex mt-10 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Add Withdraw <ShoppingCart color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>
    
    </div>
  );
};

export default AddWithdrawModal
