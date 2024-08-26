import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

const EditPartnerModal = ({  data, setShowEditModal }) => {

    const [editedData, setEditedData] = useState(data);
    console.log(editedData)
    const queryClient = useQueryClient();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditedData({
            ...editedData,
            [name]: value,
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (
            !data.name ||
            !data.address ||
            !data.username ||
            !data.phone 
       
          ) {
            toast.error("Fill all the inputs");
            return;
          }

        // Append all the edited data to the formData
        Object.keys(editedData).forEach((key) => {
            if (editedData[key] !== undefined && editedData[key] !== null) {
                formData.append(key, editedData[key]);
            }
        });

        mutation.mutate(formData);
        toast.success("Partner Edited Successfully!");
    };


    const mutation = useMutation(
        async (formData) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_GLOBAL_URL}/api/partners/${editedData._id
                }`,
                {
                    method: "PUT",
                    body: formData,
                }
            );
            return await response.json();
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries("partners");
                setShowEditModal(false);
                console.log("Partner edited successfully:", data);
            },
            onError: (error) => {
                console.error("Error editing partner:", error);
            },
        }
    );

    return (
        <div
            data-name="form-container"
            onClick={(e) => {
                e.target.dataset.name && setShowEditModal(false);
            }}
            className="addModalContainer z-10 items-center justify-center flex absolute left-0 top-0 w-full min-h-svh"
        >
            <form
                className="addModalForm overflow-hidden w-3/4 items-center justify-center flex-col flex relative"
                onSubmit={handleSubmit}
            >
                <X
                    color="red"
                    size={30}
                    className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition duration-300"
                    onClick={() => setShowEditModal(false)}
                />
                <h2 className="text-dark display-5 title text-3xl p-3 mb-5">
                    Edit Product
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
                            <label className="form-label">Contact Number</label>
                            <input
                                className="form-control"
                                type="number"
                                name="phone"
                                placeholder="Contact Number"
                                value={editedData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Withdraw Method</label>
                            <select
                                className="form-control"
                                name="method"
                                value={editedData.method}
                                onChange={handleChange}
                            >
                                <option value="" selected disabled>
                                    Select Method
                                </option>
                                <option value="card">Cash</option>
                                <option value="cash">Card</option>
                            </select>
                        </div>
                    </div>
                */}
                
                    <div className="flex mt-10 gap-5 justify-center">
                        <div>
                            <button
                                style={{ backgroundColor: "#214440" }}
                                type="submit"
                                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
                            >
                                Edit Shop <ShoppingCart color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
          
        </div>
    );
}

export default EditPartnerModal;
