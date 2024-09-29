import {   User, X } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useEditUserMutation } from "../../redux/services/userApi";



const EditUserModal = ({ data, setShowEditModal }) => {

    const [editedData, setEditedData] = useState({
        ...data, 
        birthdate: data.birthdate ? new Date(data.birthdate).toISOString().split('T')[0] : '', // Format birthDate

    });
    

    const [editUser] = useEditUserMutation();


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setEditedData({
            ...editedData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editedData.firstname || !editedData.secondname || !editedData.gender || !editedData.address
             || !editedData.phone || !editedData.email || !editedData.birthdate) {
            toast.error("All fields are required");
            return;
        }

        try {
            const formData = {
                firstname: editedData.firstname,
                secondname: editedData.secondname,
                email: editedData.email,
                gender: editedData.gender,
                address: editedData.address,
                phone: editedData.phone,
                birthdate: editedData.birthdate,

                
            };

            await editUser({ id: editedData._id, formData }).unwrap();
            toast.success("User Edited Successfully!");
            setShowEditModal(false);
        } catch (error) {
            console.error("Error editing user:", error);
            toast.error("Error editing user");
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
                    Edit User
                </h2>
                <div className="w-full gap-3 flex flex-col">
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">First Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={editedData.firstname}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Second Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="secondname"
                                placeholder="Second Name"
                                value={editedData.secondname}
                                onChange={handleChange}
                               
                            />
                        </div>
                    </div>
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={editedData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Phone</label>
                            <input
                                className="form-control"
                                type="number"
                                name="phone"
                                placeholder="Phone"
                                value={editedData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Birth Date</label>
                            <input
                                className="form-control"
                                type="date"
                                name="birthdate"
                                placeholder="Birth Date"
                                value={editedData.birthdate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Gender</label>
                            <select
                                className="form-control py-2"
                                name="gender"
                                value={editedData.gender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="man">Man</option>
                                <option value="woman">Woman</option>
                            </select>
                        </div>
                    </div>
                
                    <div className="flex mt-10 gap-5 justify-center">
                        <div>
                            <button
                                style={{ backgroundColor: "#214440" }}
                                type="submit"
                                className="action-btn px-4 py-2 flex items-center rounded text-white font-bold gap-2"
                            >
                                Edit User <User color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
          
        </div>
    );
}

export default EditUserModal;
