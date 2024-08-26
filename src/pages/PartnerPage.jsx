import { useState } from "react";
import DataTable from "react-data-table-component"
import { Coffee, Eye, Pencil, Search, SquarePlus, Trash2 } from "lucide-react";
// import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import Swal from "sweetalert2";
import AddPartnerModal from "../Components/Partners/PartnerCreate";
import EditPartnerModal from "../Components/Partners/PartnerUpdate";
import PartnerModal from "../Components/Partners/PartnerModal";

const deleteShop = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_GLOBAL_URL}/api/partners/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};



const ProductPage = () => {

  const [editedItem, setEditedItem] = useState(null);
  const queryClient = useQueryClient();



  const fetchPartners = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/api/partners`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };


  const deleteMutation = useMutation({
    mutationFn: deleteShop,
    onSuccess: () => {
      queryClient.invalidateQueries(["partners"]);
      console.log("Partner deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting partner:", error);
    },
  });

  const { isLoading, isError, isSuccess, data } = useQuery(
    "partners",
    fetchPartners
  );

  const [partner, setPartner] = useState(null)
  const [modalShow, setModalShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);


  //Photo Preview

  // const discountTypeMap = {
  //   STANDARD_DISCOUNT: 'Standard Discount',
  //   SPECIAL_DISCOUNT: 'Special Discount',
  // };

  const columns = [
    {
      name: "Id",
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: "Partner Name",
      selector: row => row.name
    },
    {
      name: "Address",
      selector: row => row.address,
    },
    {
      name: "Username",
      selector: row => row.username,
    },
    {
      name: "Contact Number",
      selector: row => row.phone,
      sortable: true
    },
    // {
    //   name: "Withdraw Method",
    //   selector: row => row.method,
    //   sortable: true
    // },
    // {
    //   name: "Discount Type",
    //   selector: row => discountTypeMap[row.discountType] || 'Unknown Discount Type',
    //   sortable: true
    // },
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
          <button style={{ backgroundColor: '#214440' }}
            className='px-2 py-1 text-white rounded-md'
            onClick={() => handleModal(row)}>
            <Eye />
          </button>
        </div>
      )
    }

  ]


  const handleDelete = async (partnerId) => {
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
      deleteMutation.mutate(partnerId);
      Swal.fire("Deleted!", "Your partner has been deleted.", "success");
    }
  };



  function handleModal(row) {
    setPartner(row)
    setModalShow(true)
  }


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



  if (isSuccess) return (
    <div className="wrapper">
      {showAddModal && <AddPartnerModal setShowAddModal={setShowAddModal} />}
      {editedItem && (
        <EditPartnerModal data={editedItem} setShowEditModal={setEditedItem} />
      )}
      <div className="sales-header flex items-center justify-between">
        <div className='relative p-2'>
          <h1 className="title md:text-4xl text-2xl">
            Partners
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
          data={data.partners}
          highlightOnHover
          responsive
        >
        </DataTable>
      </div>
      <PartnerModal
        partner={partner}
        isOpen={modalShow}
        onClose={() => setModalShow(false)}
      />
    </div>

  )
}

export default ProductPage
