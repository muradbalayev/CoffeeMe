import { useState } from "react";
import DataTable from "react-data-table-component"
import { Coffee, Eye, Pencil, Search } from "lucide-react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import EditPartnerModal from "../../Components/Partners/PartnerUpdate";
import PartnerModal from "../../Components/Partners/PartnerModal";
import { useGetPartnerQuery } from "../../redux/services/partnerApi";


const PartnerPage = () => {

  const [editedItem, setEditedItem] = useState(null);

  const { data, isLoading, isError, isSuccess, error } = useGetPartnerQuery(undefined, {
    pollingInterval: 10000, // ReFetch every 5 seconds
  });
  console.log(data)


  const [partner, setPartner] = useState(null)
  const [modalShow, setModalShow] = useState(false);


  const columns = [
    {
      name: "Id",
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: "Partner Name",
      selector: row => row.fullname
    },
    {
      name: "Shop Name",
      selector: row => row.shop.name
    },
    {
      name: "Address",
      selector: row => row.shop.address,
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
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex justify-start items-center gap-2'>
          <button onClick={() => setEditedItem(row)}
            className='px-3 py-2 bg-blue-800 text-white rounded-md'>
            <Pencil size={18} />
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

  function handleModal(row) {
    setPartner(row)
    setModalShow(true)
  }

  if (isLoading) return (
    <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
      <Coffee size={30} stroke="#214440" />
      <h1 className="title text-2xl">Loading...</h1>
    </div>
  );


  if (isError) return (
    <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
      <h1 className="title text-2xl">{error.message || "An error occurred"}</h1>
    </div>
  );
  console.log(data)

  if (isSuccess) return (
    <div className="wrapper">
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
                className="form-control font-semibold md:text-lg text-sm text-green md:w-80 sm:w-40 w-24 p-2 border outline-none rounded-md"
                placeholder="Search"
              // value={search}
              // onChange={(event) => setSearch(event.target.value)}
              />
              <Search className="search-icon md:block hidden" />
            </div>

          </div>
        </div>
      </div>
      <div className='mt-4'>
        <DataTable
          columns={columns}
          data={data.partners || []} 
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

export default PartnerPage
