import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import WthModal from "../../Components/Withdraw/WthModal";
import { Coffee, Eye, Search, SquarePlus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import AddWithdrawModal from "../../Components/Withdraw/WthCreate";



const WithdrawPage = () => {

    const [requests, setRequests] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [requestId, setRequestId] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);


    const columns = [
        {
            name: "Id",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Shop Name",
            selector: row => row.firstName
        },
        {
            name: "Date and Time",
            selector: row => row.age,
        },
        {
            name: "Withdraw Type",
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: "Withdraw Amount",
            selector: row => row.age,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>

                    <button className='px-2 py-1 bg-green-800 text-white rounded-md'
                        onClick={() => handleModal(row.id)}>
                        <Eye />
                    </button>
                    <button
                        className="px-3 py-2 bg-red-600 text-white rounded-md"
                        onClick={() => handleDelete(row.id)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }

    ]

    // Fetch data
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(response => {
                // console.log("Data from API:", response.data);
                if (response.data && response.data.users && Array.isArray(response.data.users)) {
                    const RequestDatas = response.data.users.map(data => ({
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age
                    }));
                    setRequests(RequestDatas);
                    setFilter(RequestDatas)
                    setLoading(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const result = requests.filter((partner) => {
            return partner.firstName.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    }, [requests, search]);

    function handleModal(id) {
        setRequestId(id)
        setModalShow(true)
    }

    // DELETE METHOD
    const handleDelete = (id) => {
        Swal.fire({
            title: "Əminsiniz?",
            text: "Dəyişikliyi geri qaytara bilməyəcəksiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, silin!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://dummyjson.com/users/${id}`)
                    .then(() => {
                        console.log("Məhsul Silindi!");
                        Swal.fire({
                            title: "Silindi!",
                            text: `Məhsul No:${id} müvəffəqiyyətlə silindi!`,
                            icon: "success",
                        });
                        setRequests(requests.filter((request) => request.id !== id));
                    })
                    .catch((error) => {
                        console.error(`Error deleting product:`, error);
                        Swal.fire({
                            title: "Error!",
                            text: `Error deleting No ${id} product`,
                            icon: "error",
                        });
                    });
            }
        });
    };

    return (
        Loading ?
            <div className="wrapper">
                {showAddModal && <AddWithdrawModal setShowAddModal={setShowAddModal} />}

                <div className="sales-header flex items-center">
                    <div className='relative p-2'>
                        <h1 className="title md:text-4xl text-2xl">
                            Withdraw
                        </h1>
                    </div>

                </div>
                <div className="w-full flex justify-between items-center mt-4">
                    <h1 className="title text-xl">Request&apos;s table</h1>
                    <div className='flex relative gap-3 mb-1 p-3 border-green-900'>
                        <div className="flex relative">
                            <input
                                className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
                                placeholder="Search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <Search className="search-icon" />
                        </div>
                        <button onClick={() => setShowAddModal(true)}>
                            <SquarePlus size={40} />
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={filter}
                    pagination
                    highlightOnHover
                    responsive
                >
                </DataTable>
                <WthModal
                    requestId={requestId}
                    isOpen={modalShow}
                    onClose={() => setModalShow(false)}
                />
            </div> :
            <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
                <Coffee size={30} stroke='#214440' />
                <h1 className="title text-2xl">Loading...</h1>
            </div>
    )
}

export default WithdrawPage
