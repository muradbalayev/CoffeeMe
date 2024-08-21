import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { Coffee, Eye, Pencil, Search, SquarePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PartnerModal from "../Components/Partners/PartnerModal";



const PartnerPage = () => {
  const navigate = useNavigate();

  const [partners, setPartners] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [partnerId, setPartnerId] = useState(null)
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState("");


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
      name: "Username",
      selector: row => row.firstName
    },
    {
      name: "Adres",
      selector: row => row.age,
    },
    {
      name: "Contact Number",
      selector: row => row.firstName,
      sortable: true
    },
    {
      name: "Withdraw Method",
      selector: row => row.age,
      sortable: true
    },
    {
      name: "Rating",
      selector: row => row.age,
      sortable: true
    },

    {
      name: "Password",
      selector: row => row.age,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex justify-start items-center gap-2'>
          <button onClick={() => handleUpdateClick(row.id)}
            className='px-3 py-2 bg-blue-800 text-white rounded-md'>
            <Pencil size={18} />
          </button>

          <button
           className='px-2 py-1 text-white rounded-md bg-green-800'
            onClick={() => handleModal(row.id)}>
            <Eye />
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
          const PartnerDatas = response.data.users.map(data => ({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age
          }));
          setPartners(PartnerDatas);
          setFilter(PartnerDatas)
          setLoading(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const result = partners.filter((partner) => {
      return partner.firstName.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [partners, search]);


  function handleModal(id) {
    setPartnerId(id)
    setModalShow(true)
  }

  const handleUpdateClick = (partnerid) => {
    setPartnerId(partnerid);
    navigate(`/dashboard/partner/update/${partnerid}`);
  };



  return (
    Loading ?
      <div className="wrapper">
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
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <Search className="search-icon" />
              </div>
              <Link
                to={"/dashboard/partner/create"}
                className="text-green"
                style={{ borderRadius: "25%" }}
              >
                <SquarePlus size={40} />
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-4'>

          <DataTable
            columns={columns}
            data={filter}
            pagination
            highlightOnHover
            responsive
          >
          </DataTable>
        </div>
        <PartnerModal
          partnerId={partnerId}
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

export default PartnerPage
