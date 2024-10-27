import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useEditShopMutation } from "../../redux/services/shopApi";

const EditNotification = ({ data, setShowEditModal }) => {


  const [editedData, setEditedData] = useState(data);

  const [editShop] = useEditShopMutation();


  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (
      !editedData.name ||
      !editedData.address 
    ) {
      toast.error('Fill all inputs!');
      return;
    }
  
    // Append all the edited data to the formData
    Object.keys(editedData).forEach((key) => {
     if (editedData[key] !== undefined && editedData[key] !== null) {
        formData.append(key, editedData[key]);
      }
    });
  
    try {
      await editShop({ id: editedData._id, formData }).unwrap();
      setShowEditModal(false);
      toast.success("Shop Edited Successfully!");
    } catch (error) {
      toast.error("Failed to edit the shop!", error);
    }

  };



  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowEditModal(false);
      }}
      className="addModalContainer "
    >
      <form
        className="addModalForm"
        onSubmit={handleSubmit}
      >
        <X
          color="red"
          size={30}
          className="closeButton"
          onClick={() => setShowEditModal(false)}
        />
        <h2 className="text-black text-center title text-3xl p-3 mb-5">
          Edit Notification
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
                value={editedData.name}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Short Address</label>
              <input
                className="form-control"
                type="text"
                name="shortAddress"
                placeholder="Short Address"
                value={editedData.shortAddress}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
        
            <div className="inputContainer">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                type="text"
                name="address"
                placeholder="Address"
                value={editedData.address}
                onChange={handleChange}
              />
            </div>
          </div>


          <div className="flex mt-10 gap-5 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="action-btn px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Edit <ShoppingCart color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default EditNotification;
