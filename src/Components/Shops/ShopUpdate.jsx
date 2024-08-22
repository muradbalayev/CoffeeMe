import { Image, ShoppingCart, X } from "lucide-react";
import { useRef } from "react";

const EditShopModal = ({ data, setShowEditModal }) => {
    const fileRef = useRef(null);
  
    return (
      <div
        data-name="form-container"
        onClick={(e) => {
          e.target.dataset.name && setShowEditModal(false);
        }}
        className="addModalContainer z-10 items-center justify-center flex absolute left-0 top-0 w-full min-h-svh"
      >
        <form
          className="addModalForm w-3/4 items-center justify-center flex-col flex relative"
          // onSubmit={handleSubmit}
        >
          <X
            color="red"
            size={30}
            className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition duration-300"
            onClick={() => setShowEditModal(false)}
          />
          <h2 className="text-dark display-5 title text-3xl p-3 mb-5">
            Edit Shop
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
                  value={data.name}
                  // onChange={handleChange}
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
                  // onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex inputRow gap-5 justify-between">
              <div className="inputContainer">
                <label className="form-label">Longitude</label>
                <input
                  className="form-control"
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                  value={data.location.coordinates[0]}
                  // onChange={handleChange}
                />
              </div>
              <div className="inputContainer">
                <label className="form-label">Latitude</label>
                <input
                  className="form-control"
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                  value={data.location.coordinates[1]}
                  // onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex inputRow gap-5 justify-between">
              <div className="inputContainer">
                <label className="form-label">Photo</label>
                <div
                  className="form-control cursor-pointer flex items-center gap-2"
                  onClick={() => fileRef.current.click()}
                >
                  <p className="select-none">Choose File </p>
                  <Image color="#214440" />
                  <input
                    type="file"
                    name="photo"
                    hidden
                    ref={fileRef}
                    // onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="inputContainer">
                <label className="form-label">Logo</label>
                <div
                  className="form-control cursor-pointer flex items-center gap-2"
                  onClick={() => fileRef.current.click()}
                >
                  <p className="select-none">Choose File </p>
                  <Image color="#214440" />
                  <input
                    type="file"
                    name="logo"
                    hidden
                    ref={fileRef}
                    // onChange={handleFileChange}
                  />
                </div>
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
  };
  

export default EditShopModal
