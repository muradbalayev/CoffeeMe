import { Eye, Image, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Lightbox from "yet-another-react-lightbox";

const AddProductModal = ({ shopId, setShowAddModal }) => {
  const PhotoFileRef = useRef(null);

  const queryClient = useQueryClient();
  const [data, setData] = useState({
    name: "",
    price: "",
    discount: "",
    discountType: "",
    category: "",
    description: "",
    photo: null,
  });
  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [photoPreview, setPhotoPreview] = useState(null);

  const [photoFileName, setPhotoFileName] = useState("Choose File");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const fileURL = file ? URL.createObjectURL(file) : null;

    if (name === "photo") {
      setPhotoFileName(file ? file.name : "Choose File");
      setPhotoPreview(fileURL);
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

  const mutation = useMutation(
    async (formData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/products/${shopId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      return await response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("shops");
        setShowAddModal(false);
        console.log("Shop added successfully:", data);
      },
      onError: (error) => {
        console.error("Error adding shop:", error);
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.price ||
      !data.discount ||
      !data.discountType ||
      !data.category ||
      !data.description ||
      !photoFileName ||
      photoFileName === "Choose File"
    ) {
      toast.error("Fill all the inputs");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    mutation.mutate(formData);
    toast.success("Product Created Successfully!");
    // Submit formData using useMutation
  };

  console.log(data);

  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowAddModal(false);
      }}
      className="addModalContainer overflow-hidden z-10 items-center justify-center flex absolute left-0 top-0 w-full min-h-svh"
    >
      <form
        className="addModalForm overflow-hidden w-3/4 items-center justify-center flex-col flex relative"
        onSubmit={handleSubmit}
      >
        <X
          color="red"
          size={30}
          className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition duration-300"
          onClick={() => setShowAddModal(false)}
        />
        <h2 className="text-dark display-5 title text-3xl p-3 mb-5">
          Add Product
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
              <label className="form-label">Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder="Price"
                value={data.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Discount</label>
              <input
                className="form-control"
                type="number"
                name="discount"
                placeholder="Discount"
                value={data.discount}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Discount Type</label>
              <select
                className="form-control"
                name="discountType"
                value={data.discountType}
                onChange={handleChange}
              >
                <option value="" defaultValue={"Select Discount Type"} disabled>
                  Select Discount Type
                </option>
                <option value="STANDARD_DISCOUNT">Standard Discount</option>
                <option value="SPECIAL_DISCOUNT">Special Discount</option>
              </select>
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                name="category"
                value={data.category}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  Select Category
                </option>
                <option value="drink">Drink</option>
                <option value="cookie">Cookie</option>
              </select>
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                placeholder="Description"
                value={data.description}
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
          </div>
          <div className="flex mt-10 justify-center">
            <div>
              <button
                style={{ backgroundColor: "#214440" }}
                type="submit"
                className="title px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Add Product <ShoppingCart color="white" />
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

export default AddProductModal;