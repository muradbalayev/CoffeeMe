import { Eye, Image, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Lightbox from "yet-another-react-lightbox";
import useCustomFetch from "../../hooks/useCustomFetch";

const AddProductModal = ({ shopId, setShowAddModal }) => {
  const customFetch = useCustomFetch();

  const PhotoFileRef = useRef(null);

  const queryClient = useQueryClient();
  const [data, setData] = useState({
    name: "",
    sizes: [
      { size: "s", price: "", discount: "" },
      { size: "m", price: "", discount: "" },
      { size: "l", price: "", discount: "" },
    ],
    discountType: "",
    category: "",
    type: "",
    description: "",
    photo: null,
  });
  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Map the input fields to corresponding sizes array index and field
    const sizeMap = {
      sPrice: { index: 0, field: "price" },
      sDiscount: { index: 0, field: "discount" },
      mPrice: { index: 1, field: "price" },
      mDiscount: { index: 1, field: "discount" },
      lPrice: { index: 2, field: "price" },
      lDiscount: { index: 2, field: "discount" },
    };

    if (sizeMap[name]) {
      const { index, field } = sizeMap[name];

      // Create a copy of the sizes array from the state
      const updatedSizes = [...data.sizes];

      // Update the specific field in the sizes array
      updatedSizes[index][field] = value;

      // Update the state with the modified sizes array
      setData({
        ...data,
        sizes: updatedSizes,
      });
    } else {
      // Handle other form inputs that are not related to sizes
      setData({
        ...data,
        [name]: value,
      });
    }
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
      const response = await customFetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/products/${shopId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(formData)
      return await response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("products");
        setShowAddModal(false);
        console.log("Product added successfully:", data);
      },
      onError: (error) => {
        console.error("Error adding product:", error);
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out sizes where both price and discount are empty
    const filteredSizes = data.sizes.filter(
      (size) => size.price > 0 && size.discount > 0
    );

    // Check if there's at least one valid size after filtering
    if (filteredSizes.length === 0) {
      toast.error("At least one size must have a price or discount.");
      return;
    }

    if (
      !data.name ||
      !data.discountType ||
      !data.category ||
      !data.type ||
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
        if (key === "sizes") {
          // Append the filtered sizes array to formData
          formData.append(key, JSON.stringify(filteredSizes));
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    mutation.mutate(formData);
    toast.success("Product Created Successfully!");
  };
  console.log(data);

  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowAddModal(false);
      }}
      className="addModalContainer "
    >
      <form
        className="addModalForm"
        onSubmit={handleSubmit}
      >
        <X
          color="red"
          size={30}
          className="closeButton"
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
                required
                value={data.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">S Price</label>
              <input
                className="form-control"
                type="text"
                name="sPrice"
                placeholder="SPrice"
                value={data.sizes[0].price}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">S Discount</label>
              <input
                className="form-control"
                type="text"
                name="sDiscount"
                placeholder="S Discount"
                value={data.sizes[0].discount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">M Price</label>
              <input
                className="form-control"
                type="text"
                name="mPrice"
                placeholder="M Price"
                value={data.sizes[1].price}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">M Discount</label>
              <input
                className="form-control"
                type="text"
                name="mDiscount"
                placeholder="M Discount"
                value={data.sizes[1].discount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">L Price</label>
              <input
                className="form-control"
                type="text"
                name="lPrice"
                placeholder="L Price"
                value={data.sizes[2].price}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">L Discount </label>
              <input
                className="form-control"
                type="text"
                name="lDiscount"
                placeholder="L Discount"
                value={data.sizes[2].discount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
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
                <option defaultValue="" disabled>
                  Select Category
                </option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
                <option value="other">Other</option>
              </select>
            </div>

          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
          <div className="inputContainer">
              <label className="form-label">Type</label>
              <select
                className="form-control"
                name="type"
                value={data.type}
                onChange={handleChange}
              >
                <option disabled>
                  Select Type
                </option>
                <option value="none">None</option>
                <option value="takeaway">Takeaway</option>
                <option value="cup">Cup</option>
                <option value="all">All</option>
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
