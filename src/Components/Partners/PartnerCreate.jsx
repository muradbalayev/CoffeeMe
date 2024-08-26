import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

const AddPartnerModal = ({  setShowAddModal }) => {

  const queryClient = useQueryClient();
  const [data, setData] = useState({
    name: "",
    address: "",
    username: "",
    phone: "",
    method: "",
  });

  console.log(data);

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
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/partnershops`,
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
        console.log("Partner added successfully:", data);
      },
      onError: (error) => {
        console.error("Error adding Partner:", error);
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.address ||
      !data.username ||
      !data.phone ||
      !data.method
 
    ) {
      toast.error("Fill all the inputs");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    mutation.mutate(formData);
    toast.success("Partner Created Successfully!");
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
          Add Product
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
              <label className="form-label">Contact Number</label>
              <input
                className="form-control"
                type="number"
                name="phone"
                placeholder="Contact Number"
                value={data.phone}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Withdraw Method</label>
              <select
                className="form-control"
                name="method"
                value={data.method}
                onChange={handleChange}
              >
                <option value="" defaultValue={"Select Discount Type"} disabled>
                  Select Withdraw Method
                </option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>
          <div className="flex mt-10 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Add Product <ShoppingCart color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>
  
    </div>
  );
};

export default AddPartnerModal;
