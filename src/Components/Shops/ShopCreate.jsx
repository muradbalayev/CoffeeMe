import { Eye, Image, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import { useAddShopMutation } from "../../redux/services/shopApi";

const AddShopModal = ({ setShowAddModal }) => {
  // const customFetch = useCustomFetch();
  const LogoFileRef = useRef(null);
  const PhotoFileRef = useRef(null);

  const [addShop] = useAddShopMutation();

  // const queryClient = useQueryClient();
  const [data, setData] = useState({
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    photo: null,
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [photoFileName, setPhotoFileName] = useState("Choose File");
  const [logoFileName, setLogoFileName] = useState("Choose File");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const fileURL = file ? URL.createObjectURL(file) : null;

    if (name === "photo") {
      setPhotoFileName(file ? file.name : "Choose File");
      setPhotoPreview(fileURL);
    } else if (name === "logo") {
      setLogoFileName(file ? file.name : "Choose File");
      setLogoPreview(fileURL);
    }

    setData({
      ...data,
      [name]: file,
    });
  };

  const handleEyeClick = (image) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.address ||
      !data.longitude ||
      !data.latitude ||
      !photoFileName ||
      !logoFileName ||
      photoFileName === "Choose File" ||
      logoFileName === "Choose File"
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
      await addShop(formData).unwrap(); // Trigger the mutation and unwrap the result
      toast.success("Shop Created Successfully!");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to create shop");
      console.error("Error adding shop:", error);
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
        <h2 className="text-dark display-5 title text-3xl p-3 mb-5">
          Add Shop
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
              <label className="form-label">Longitude</label>
              <input
                className="form-control"
                type="number"
                name="longitude"
                placeholder="Longitude"
                value={data.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Latitude</label>
              <input
                className="form-control"
                type="number"
                name="latitude"
                placeholder="Latitude"
                value={data.latitude}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-wrap inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Photo</label>
              <div
                className="form-control cursor-pointer flex  justify-between items-center gap-2"
                onClick={() => PhotoFileRef.current.click()}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <p className="select-none">{photoFileName}</p>
                  <Image color="#214440" />
                  <input
                    type="file"
                    name="photo"
                    hidden
                    ref={PhotoFileRef}
                    onChange={handleFileChange}
                  />
                </div>
                {photoPreview && (
                  <Eye
                    color="#214440"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEyeClick(photoPreview);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="inputContainer">
              <label className="form-label">Logo</label>
              <div
                className="form-control cursor-pointer flex justify-between items-center gap-2"
                onClick={() => LogoFileRef.current.click()}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <p className="select-none">{logoFileName}</p>
                  <Image color="#214440" />
                  <input
                    type="file"
                    name="logo"
                    hidden
                    ref={LogoFileRef}
                    onChange={handleFileChange}
                  />
                </div>
                {logoPreview && (
                  <Eye
                    color="#214440"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEyeClick(logoPreview);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex mt-10 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Add Shop <ShoppingCart color="white" />
              </button>
            </div>
          </div>
        </div>
      </form>
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[{ src: lightboxImage }]}
        />
      )}
    </div>
  );
};

export default AddShopModal
