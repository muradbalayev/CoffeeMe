import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import useCustomFetch from "../../hooks/useCustomFetch";

const EditPartnerModal = ({ data, setShowEditModal }) => {
    const [editedData, setEditedData] = useState({
        ...data, 
        password: "" 
    });
    const customFetch = useCustomFetch();

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

        if (!editedData.username || !editedData.password) {
            toast.error("Username is required");
            return;
        }

        const updateData = {
            username: editedData.username,
            password: editedData.password,
        };
    //    console.log(updateData)

        mutation.mutate(updateData);
        toast.success("Partner Edited Successfully!");
    };


    const mutation = useMutation(
        async (updateData) => {
            const response = await customFetch(

                `${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/partners/${editedData._id
                }`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PUT",
                    body: JSON.stringify(updateData),
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
                                disabled
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
                                disabled
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
