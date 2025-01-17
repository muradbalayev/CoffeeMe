import { Eye, Image, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import { useEditShopMutation } from "../../redux/services/shopApi";

const EditShopModal = ({ data, setShowEditModal }) => {
  const LogoFileRef = useRef(null);
  const PhotoFileRef = useRef(null);

  const [editedData, setEditedData] = useState({
    ...data,
    open: data.openHours.open,
    close: data.openHours.close,
  });

  console.log({ editedData });

  const [editShop] = useEditShopMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "longitude" || name === "latitude") {
      const newCoordinates = [...editedData.location.coordinates];
      if (name === "longitude") {
        newCoordinates[0] = value;
      } else {
        newCoordinates[1] = value;
      }
      setEditedData({
        ...editedData,
        location: {
          ...editedData.location,
          coordinates: newCoordinates,
        },
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  };

  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [photoFileName, setPhotoFileName] = useState("");
  const [logoFileName, setLogoFileName] = useState("");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const imageUrl = `${
      import.meta.env.VITE_API_GLOBAL_URL
    }/public/uploads/shops`;

    if (data.photo) {
      setPhotoFileName(data.photo);

      setPhotoPreview(
        `${imageUrl}/${editedData.name}-${editedData.address}/${data.photo}`
      );
    }
    if (data.logo) {
      setLogoFileName(data.logo);

      setLogoPreview(
        `${imageUrl}/${editedData.name}-${editedData.address}/${data.logo}`
      );
    }
  }, [data, editedData.name, editedData.address]);

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const fileURL = file ? URL.createObjectURL(file) : null;

    if (name === "photo") {
      setPhotoPreview(null);
      setPhotoFileName("");

      setPhotoPreview(fileURL);
      setPhotoFileName(file && file.name);
    } else if (name === "logo") {
      setLogoPreview(null);
      setLogoFileName("");

      setLogoFileName(file && file.name);
      setLogoPreview(fileURL);
    }

    setEditedData((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (
      !editedData.name ||
      !editedData.discountPercentage ||
      !editedData.address ||
      !editedData.location.coordinates[0] ||
      !editedData.location.coordinates[1] ||
      !editedData.open ||
      !editedData.close ||
      !photoFileName ||
      !logoFileName
    ) {
      toast.error("Fill all inputs!");
      return;
    }

    // Append all the edited data to the formData
    Object.keys(editedData).forEach((key) => {
      if (key === "location") {
        formData.append("longitude", editedData.location.coordinates[0]);
        formData.append("latitude", editedData.location.coordinates[1]);
      } else if (editedData[key] !== undefined && editedData[key] !== null) {
        formData.append(key, editedData[key]);
      }
    });

    try {
      await editShop({ id: editedData._id, formData }).unwrap();
      setShowEditModal(false);
      toast.success("Shop Edited Successfully!");
    } catch (error) {
      toast.error("Failed to edit the shop!", error);
    }
  };

  const handleEyeClick = (image) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowEditModal(false);
      }}
      className="addModalContainer "
    >
      <form className="addModalForm" onSubmit={handleSubmit}>
        <X
          color="red"
          size={30}
          className="closeButton"
          onClick={() => setShowEditModal(false)}
        />
        <h2 className="text-black text-center title text-3xl p-3 mb-5">
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
                value={editedData.name}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Short Address</label>
              <input
                className="form-control"
                type="text"
                name="shortAddress"
                placeholder="Short Address"
                value={editedData.shortAddress}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Discount Percentage</label>
              <input
                className="form-control"
                type="text"
                name="discountPercentage"
                placeholder="Short Address"
                value={editedData.discountPercentage}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                type="text"
                name="address"
                placeholder="Address"
                value={editedData.address}
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
                value={editedData.location.coordinates[0]}
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
                value={editedData.location.coordinates[1]}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Open time</label>
              <input
                className="form-control"
                type="number"
                name="open"
                placeholder="Open time"
                value={editedData.open}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Close time</label>
              <input
                className="form-control"
                type="number"
                name="close"
                placeholder="Close time"
                value={editedData.close}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-wrap inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Photo</label>
              <div
                className="form-control cursor-pointer flex justify-between items-center gap-2"
                onClick={() => PhotoFileRef.current.click()}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <p className="select-none">{photoFileName} </p>
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
                className="form-control cursor-pointer flex items-center justify-between gap-2"
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
          <div className="flex mt-10 gap-5 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="action-btn px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Edit Shop <ShoppingCart color="white" />
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

export default EditShopModal;
