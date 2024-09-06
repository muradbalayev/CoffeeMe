import { useState } from "react";
import DataTable from "react-data-table-component";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
    Coffee,
    Eye,
    Flame,
    Pencil,
    Search,
    SquarePlus,
    Trash2,
} from "lucide-react";
import UserModal from "./UserModal";
import { useGetUserQuery } from "../../redux/services/userApi";

const UserTable = ({  title, icon, usertype }) => {
    const { data, isLoading, isError, isSuccess, error } = useGetUserQuery(undefined, {
        pollingInterval: 10000, // ReFetch every 5 seconds
    });
    console.log(data)
 
    const [search, setSearch] = useState("");
    const [userid, setUserid] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.firstname + " " + row.secondname,
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
        },
        {
            name: "Address",
            selector: (row) => row.address,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            title: (row) => row.phone
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Birth Date",
            selector: (row) => row.birthDate,
        },
        {
            name: "Most Going Coffee Shop",
            selector: (row) => row.firstname + " " + row.secondname,
        },
        {
            name: "Streak",
            selector: (row) => (
                <div className="flex items-center gap-1">
                    <span>{row.age}</span>
                    <Flame size={20} color="orange" />
                </div>
            ),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex justify-start items-center gap-2">
                    <button
                        onClick={() => handleUpdateClick(row.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-md"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        className="px-3 py-2 bg-red-600 text-white rounded-md"
                    // onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 size={18} />
                    </button>
                    <button
                        className="px-3 py-2 bg-blue-600 text-white rounded-md"
                        onClick={() => handleModal(row.id)}
                    >
                        <Eye size={18} />
                    </button>
                </div>
            ),
        },
    ];

    //Modal
    function handleModal(id) {
        setUserid(id);
        setModalShow(true);
    }


    //Update Navigate
    const handleUpdateClick = (userid) => {
        setUserid(userid);
        navigate(`/dashboard/${usertype}/update/${userid}`, {
            state: { usertype },
        });
    };

    const handleCreateClick = () => {
        navigate(`/dashboard/${usertype}/create`, { state: { usertype } });
    };

    if (isLoading)
        return (
            <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
                <Coffee size={30} stroke="#214440" />
                <h1 className="title text-2xl">Loading...</h1>
            </div>
        );

    if (isError) return (
        <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
            <h1 className="title text-2xl">{error}</h1>
        </div>
    );

    console.log(data);
    if (isSuccess) return (
        <div className="wrapper">
            <div className="users-header flex items-center justify-between">
                <div className="relative p-2 flex gap-1 items-center">
                    <h1 className="title lg:text-4xl md:text-3xl text-xl">{title}</h1>
                    {icon}
                </div>
                <div className="flex items-center gap-3 mb-1 p-3 border-green-900">
                    <div className="flex relative">
                        <input
                            className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
                            placeholder="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Search className="search-icon" />
                    </div>

                    <button
                        onClick={handleCreateClick}
                        className="text-green"
                        style={{ borderRadius: "25%" }}
                    >
                        <SquarePlus size={40} />
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    data={data.users}
                    // pagination
                    highlightOnHover
                    responsive
                ></DataTable>
            </div>
            <UserModal
                userid={userid}
                isOpen={modalShow}
                onClose={() => setModalShow(false)}
            />
        </div>
    );
};
export default UserTable;
