import { useState } from "react";
import { Coffee, Eye, Pencil, Search } from "lucide-react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import EditPartnerModal from "../../Components/Partners/PartnerUpdate";
import PartnerModal from "../../Components/Partners/PartnerModal";
import { useGetPartnerQuery } from "../../redux/services/partnerApi";
import '../Shops/ShopPage.css'
import './PartnerPage.css'

const PartnerPage = () => {

  const [editedItem, setEditedItem] = useState(null);

  const { data, isLoading, isError, isSuccess, error } = useGetPartnerQuery(undefined, {
    pollingInterval: 10000, // ReFetch every 5 seconds
  });
  console.log(data)


  const [partner, setPartner] = useState(null)
  const [modalShow, setModalShow] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");


  function handleModal(partner) {
    setPartner(partner)
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

  const partners = Array.isArray(data.partners) ? data.partners : [];

  const filteredPartners = partners.filter((partner) =>
    partner?.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (isSuccess) return (
    <div className="wrapper relative flex flex-col items-center gap-5 ">
      {editedItem && (
        <EditPartnerModal data={editedItem} setShowEditModal={setEditedItem} />
      )}

      <div className="flex justify-between w-full items-center p-2">
        <h1 className="title lg:text-4xl text-3xl">Partners</h1>
        <div className="gap-3 flex items-center">
          <div className="flex relative">
            <input
              className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" />
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll overflow-x-auto w-full">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="text-white bg-[#00704a]" >
            <tr>
              <th className="id" scope="col">
                #
              </th>
              <th scope="col">Partner Name</th>
              <th scope="col">Shop Name</th>
              <th scope="col">Address</th>
              <th scope="col">Username</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Machine Learning</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filteredPartners
              .slice()
              .reverse()
              .map((partner, index) => (
                <tr key={index}>
                  <td scope="row" className="col-1 border-b border-gray-300 id">
                    {index + 1}
                  </td>
                  <td className="col-2">{partner.fullname}</td>
                  <td className="col-2">{partner.shop.name}</td>
                  <td className="col-2">{partner.shop.address}</td>
                  <td className="col-2">{partner.username}</td>
                  <td className="col-2">{partner.phone}</td>
                  <td className="col-2">{partner.ml}
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td className="col-2 min-w-44 flex justify-center gap-2 ">
                    <button onClick={() => setEditedItem(partner)}
                      className='px-3 py-2 bg-blue-800 text-white rounded-md'>
                      <Pencil size={18} />
                    </button>

                    <button style={{ backgroundColor: '#214440' }}
                      className='px-2 py-1 text-white rounded-md'
                      onClick={() => handleModal(partner)}>
                      <Eye />
                    </button>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <div className="w-full mx-auto flex items-center justify-center">
      <button className="px-4 py-3" style={{ backgroundColor: "#214440", color: "white"}}>Load More</button>
    </div> */}
      <PartnerModal
        partner={partner}
        isOpen={modalShow}
        onClose={() => setModalShow(false)}
      />

    </div>
  );

}
export default PartnerPage