import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useEditPartnerMutation } from "../../redux/services/partnerApi";



const EditPartnerModal = ({ data, setShowEditModal }) => {
    const [editedData, setEditedData] = useState({
        ...data, 
        password: "" 
    });

    const [editPartner] = useEditPartnerMutation();


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setEditedData({
            ...editedData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editedData.username || !editedData.fullname || !editedData.shopPercentage && editedData.shopPercentage !== 0) {
            toast.error("All fields are required");
            return;
        }

        try {
            const formData = {
                username: editedData.username,
                password: editedData.password,
                fullname: editedData.fullname,
                shopPercentage: editedData.shopPercentage,
            };

            await editPartner({ id: editedData._id, formData }).unwrap();
            toast.success("Partner Edited Successfully!");
            setShowEditModal(false);
        } catch (error) {
            console.error("Error editing partner:", error);
            toast.error("Error editing partner");
        }
    };


    return (
        <div
            data-name="form-container"
            onClick={(e) => {
                e.target.dataset.name && setShowEditModal(false);
            }}
            className="addModalContainer"
        >
            <form
                className="addModalForm "
                onSubmit={handleSubmit}
            >
                <X
                    color="red"
                    size={30}
                    className="closeButton"
                    onClick={() => setShowEditModal(false)}
                />
                <h2 className="text-black text-center title text-3xl p-3 mb-5">
                    Edit Partner
                </h2>
                <div className="w-full gap-3 flex flex-col">

                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Username</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={editedData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={editedData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Partner Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="fullname"
                                placeholder="Partner Name"
                                value={editedData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Shop Percentage</label>
                            <input
                                className="form-control"
                                type="number"
                                name="shopPercentage"
                                placeholder="Shop Percentage"
                                value={editedData.shopPercentage}
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
                                Edit Partner <ShoppingCart color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
          
        </div>
    );
}

export default EditPartnerModal;
