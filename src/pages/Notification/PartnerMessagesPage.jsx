// import { useState } from "react";
import DataTable from "react-data-table-component"
import { Coffee, Pencil, Search, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import EditProductModal from "../../Components/Menu/ProductUpdate";
import { useState } from "react";

const deletePartnerMessage = async (id) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_API_GLOBAL_URL}/api/partner-messages/${id}`,
            {
                method: "DELETE",
            }
        );
        console.log(res);
    } catch (error) {
        console.error(error);
    }
};



const PartnerMessages = () => {

    const [editedItem, setEditedItem] = useState(null);
    const queryClient = useQueryClient();



    const fetchMessages = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/notification/partner-messages`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };


    const deleteMutation = useMutation({
        mutationFn: deletePartnerMessage,
        onSuccess: () => {
            queryClient.invalidateQueries(["partner-messages"]);
            console.log("Product deleted successfully");
        },
        onError: (error) => {
            console.error("Error deleting message:", error);
        },
    });

    const { isLoading, isError, isSuccess, data } = useQuery(
        "partner-messages",
        fetchMessages
    );

    // const [message, setMessage] = useState(null)
    // const [modalShow, setModalShow] = useState(false);



    //Photo Preview


    const columns = [
        {
            name: "Id",
            selector: (index) => index + 1,
            sortable: true
        },
        {
            name: "Partner Name",
            selector: row => row.name
        },
        {
            name: "Title",
            selector: row => row.title,
        },

        {
            name: "CreatedAt",
            selector: row => row.createdAt,
        },
        {
            name: "Message",
            selector: row => row.message,
            sortable: true
        },

        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>
                    <button onClick={() => setEditedItem(row)}
                        className='px-3 py-2 bg-blue-800 text-white rounded-md'>
                        <Pencil size={18} />
                    </button>
                    <button
                        className="px-3 py-2 bg-red-600 text-white rounded-md"
                        onClick={() => handleDelete(row._id)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }

    ]


    const handleDelete = async (notificationId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(notificationId);
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
        }
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
            <h1 className="title text-2xl">Error</h1>
        </div>
    );



    if (isSuccess)
        return (
            <div className="wrapper">
                {editedItem && (
                    <EditProductModal data={editedItem} setShowEditModal={setEditedItem} />
                )}
                <div className="sales-header flex items-center justify-between">
                    <div className='relative p-2'>
                        <h1 className="title md:text-4xl text-2xl">
                            Partner Messages
                        </h1>
                    </div>
                    <div className='flex gap-3 mb-1 p-3 border-green-900'>
                        <div className="flex relative gap-3 items-center">
                            <div className="flex relative">
                                <input
                                    className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
                                    placeholder="Search"
                                // value={search}
                                // onChange={(event) => setSearch(event.target.value)}
                                />
                                <Search className="search-icon" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <DataTable
                        columns={columns}
                        data={data.notifications}
                        highlightOnHover
                        responsive
                    >
                    </DataTable>
                </div>
            </div>

        )
}

export default PartnerMessages
