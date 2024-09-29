import { User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddUserMutation } from "../../redux/services/userApi";

const AddUserModal = ({ setShowAddModal }) => {


    const [addUsers] = useAddUserMutation();

    const [data, setData] = useState({
        firstname: "",
        secondname: "",
        gender: "",
        phone: "",
        email: '',
        birthDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !data.firstname ||
            !data.secondname ||
            !data.address ||
            !data.gender ||
            !data.phone ||
            !data.email ||
            !data.birthDate
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

        try {
            await addUsers(formData).unwrap(); // Trigger the mutation and unwrap the result
            toast.success("User Created Successfully!");
            setShowAddModal(false);
        } catch (error) {
            toast.error("Failed to create user");
            console.error("Error adding user:", error);
        }
    };

    console.log(data);

    return (
        <div
            data-name="form-container"
            onClick={(e) => {
                e.target.dataset.name && setShowAddModal(false);
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
                    onClick={() => setShowAddModal(false)}
                />
                <h2 className="text-black text-center display-5 title text-3xl p-3 mb-5">
                    Add User
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
                                value={data.firstname}
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
                                value={data.secondname}
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
                                value={data.email}
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
                            <label className="form-label">Phone</label>
                            <input
                                className="form-control"
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={data.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">BirthDate</label>
                            <input
                                className="form-control"
                                type="date"
                                name="birthDate"
                                placeholder="Birth Date"
                                value={data.birthDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Gender</label>
                            <select
                                name="gender"
                                onChange={handleChange}
                                value={data.gender}
                                className="form-control py-2"> 
                                <option value='' disabled defaultValue={""}>
                                    Gender
                                </option>
                                <option value='man'>
                                    Man
                                </option>
                                <option value='woman'>
                                    Woman
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mt-10 justify-center">
                        <div>
                            <button
                                style={{ backgroundColor: "#214440" }}
                                type="submit"
                                className="action-btn px-4 py-2 flex items-center rounded text-white font-bold gap-2"
                            >
                                Add User <User color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUserModal
