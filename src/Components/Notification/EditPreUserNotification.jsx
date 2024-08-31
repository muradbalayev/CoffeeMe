import {  ShoppingCart, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import useCustomFetch from "../../hooks/useCustomFetch";

const EditPreUserNotification = ({  data, setShowEditModal }) => {

    const [editedData, setEditedData] = useState(data);
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

        if (!editedData.name || !editedData.title || editedData.message) {
            toast.error("All fields required");
            return;
        }

        const updateData = {
            name: editedData.name,
            title: editedData.title,
            message: editedData.message,
        };
       console.log(updateData)

        mutation.mutate(updateData);
        toast.success("Notification Edited Successfully!");
    };


    const mutation = useMutation(
        async (updateData) => {
            const response = await customFetch(

                `${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/notification/premium-users/${editedData._id
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
                queryClient.invalidateQueries("notification");
                setShowEditModal(false);
                console.log("Notification edited successfully:", data);
            },
            onError: (error) => {
                console.error("Error editing notification:", error);
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
                                disabled
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={editedData.title}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Message</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={editedData.message}
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

export default EditPreUserNotification;
