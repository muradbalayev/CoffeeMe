import { Eye, Image, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Lightbox from "yet-another-react-lightbox";

const EditShopModal = ({ data, setShowEditModal }) => {
  const LogoFileRef = useRef(null);
  const PhotoFileRef = useRef(null);

  const [editedData, setEditedData] = useState(data);
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...data,
      [name]: value,
    });
  };

  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // const [photoFileName, setPhotoFileName] = useState("Choose File");
  // const [logoFileName, setLogoFileName] = useState("Choose File");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const imageUrl = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads`;

    if (data.photo) {
      setPhotoPreview(`${imageUrl}/${data.photo}`);
    }
    if (data.logo) {
      setLogoPreview(`${imageUrl}/${data.logo}`);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const fileURL = file ? URL.createObjectURL(file) : null;

    if (name === "photo") {
      setPhotoPreview(fileURL); 
    } else if (name === "logo") {
      setLogoPreview(fileURL);
    }

    setEditedData({
      ...data,
      [name]: file,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(editedData).forEach((key) => {
      if (editedData[key] !== undefined && editedData[key] !== null) {
        formData.append(key, editedData[key]);
      }
    });
    mutation.mutate(formData);
    toast.success("Shop Edited Successfully!");
    // Submit formData using useMutation
  };

  const handleEyeClick = (image) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const mutation = useMutation(
    async (formData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/shop/edit/${editedData._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      return await response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("shops");
        setShowEditModal(false);
        console.log("Shop edited successfully:", data);
      },
      onError: (error) => {
        console.error("Error adding shop:", error);
      },
    }
  );


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
        onSubmit={handleSubmit}
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
                value={editedData.name}
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
                type="text"
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
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={editedData.location.coordinates[1]}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Photo</label>
              <div
                className="form-control cursor-pointer flex justify-between items-center gap-2"
                onClick={() => PhotoFileRef.current.click()}
              >
                  <div className="flex items-center gap-2">
                <p className="select-none">Photo </p>
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
                  <div className="flex items-center gap-2">
                <p className="select-none">Logo</p>
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
                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
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


export default EditShopModal
