import { Eye, Image, Plus, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import { useAddProductMutation } from "../../redux/services/productApi";

const AddProductModal = ({ shopId, setShowAddModal }) => {
  const [addProduct] = useAddProductMutation();

  const PhotoFileRef = useRef(null);

  const [extraInput, setExtraInput] = useState("");

  const handleAddExtra = () => {
    if (extraInput.trim() !== "") {
      setData((prevData) => ({
        ...prevData,
        extras: [...prevData.extras, extraInput.trim()],
      }));
      setExtraInput(""); 
    }
  };

  const handleExtraInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddExtra();
    }
  };

  const handleRemoveExtra = (index) => {
    setData((prevData) => ({
      ...prevData,
      extras: prevData.extras.filter((_, i) => i !== index),
    }));
  };

  const [data, setData] = useState({
    name: "",
    sizes: [
      { size: "s", price: "", discount: "" },
      { size: "m", price: "", discount: "" },
      { size: "l", price: "", discount: "" },
    ],
    extras: [],
    discountType: "",
    category: "",
    type: "",
    description: "",
    photo: null,
  });
  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isValidNumber = !isNaN(value) && value.trim() !== '';

    // Prevent negative numbers for price and discount
    if (name.endsWith('Price') || name.endsWith('Discount')) {
      if (isValidNumber && Number(value) < 0) {
        toast.error("Price or Discount cannot be negative.");
        return; // Do not update state if the value is negative
      }
    }


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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any size has a price without a discount or vice versa
    for (let i = 0; i < data.sizes.length; i++) {
      const { price, discount } = data.sizes[i];
      if ((price && !discount) || (!price && discount)) {
        toast.error(`Both price and discount must be provided for size ${data.sizes[i].size.toUpperCase()}.`);
        return;
      }
    }

    // Ensure at least one valid size is present
    const hasValidSize = data.sizes.some(
      (size) => size.price && size.discount
    );

    if (!hasValidSize) {
      toast.error("At least one size must have both a price and a discount.");
      return;
    }


    // Filter out sizes where both price and discount are empty
    const filteredSizes = data.sizes.filter(
      (size) => size.price > 0 && size.discount >= 0
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
          formData.append(key, JSON.stringify(filteredSizes));
        } else if (key === "extras") {
          formData.append(key, JSON.stringify(data.extras));
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    try {
      await addProduct({ shopId, formData }).unwrap();
      toast.success("Product Created Successfully!");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error adding product:", error);
    }
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
        <h2 className="text-black text-center title text-3xl p-3 mb-5">
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
                name="lDiscount"
                placeholder="L Discount"
                value={data.sizes[2].discount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Extra</label>
              <div className="relative">
                <input
                  className="form-control w-full"
                  type="text"
                  name="extra"
                  placeholder="Add Extra"
                  value={extraInput}
                  onChange={(e) => setExtraInput(e.target.value)}
                  onKeyPress={handleExtraInputKeyPress}
                />
                <Plus
                  size={25} color="blue"
                  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
                  onClick={handleAddExtra}
                />
              </div>

              {data.extras.length > 0 && (
              <div className="min-h-28 p-2 gap-2 border border-gray-400 rounded mt-3 flex flex-wrap justify-start items-start">
                {data.extras.map((extra, index) => (
                  <div key={index} className="border rounded-md border-gray-400 p-2 pe-8 relative">
                    {extra}
                    <X
                      size={18}
                      color="red"
                      className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
                      onClick={() => handleRemoveExtra(index)}
                      />
                  </div>
                ))}
              </div>
              )}
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
                required
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
                required
                value={data.category}
                onChange={handleChange}
              >
                <option value="" defaultValue={"Select Category"} disabled >
                  Select Category
                </option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="inputContainer">
              <label className="form-label">Type</label>
              <select
                className="form-control"
                name="type"
                value={data.type}
                onChange={handleChange}
                required
              >
                <option disabled value="" defaultValue={"Select Type"} >
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
              <textarea
                className="form-control"
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
                    required
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
                className="action-btn px-4 py-2 flex items-center rounded text-white font-bold gap-2"
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
