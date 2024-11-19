import { Eye, Image, Plus, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import { useAddProductMutation } from "../../redux/services/productApi";
import * as XLSX from "xlsx";


const AddProductModal = ({ shopId, setShowAddModal }) => {
  const [addProduct] = useAddProductMutation();

  const PhotoFileRef = useRef(null);


  const [extraInput, setExtraInput] = useState({
    name: "",
    price: "",
    discount: ""
  });

  const [syrupInput, setSyrupInput] = useState({
    name: "",
    price: "",
    discount: "",
  });

  const handleAddExtra = () => {
    if (!extraInput.name || !extraInput.price || !extraInput.discount) {
      toast.error("Please fill in all extra fields.");
      return;
    }

    setData({
      ...data,
      additions: {
        ...data.additions,
        extras: [...data.additions.extras, extraInput],
      }
    });

    setExtraInput({ name: "", price: "", discount: "" });
  };


  const handleRemoveExtra = (index) => {
    const updatedExtras = data.additions.extras.filter((_, i) => i !== index);
    setData({
      ...data,
      additions: {
        ...data.additions,
        extras: updatedExtras,
      }
    });
  };


  const handleAddSyrup = () => {
    if (!syrupInput.name || !syrupInput.price || !syrupInput.discount) {
      toast.error("Please fill in all syrup fields.");
      return;
    }

    setData({
      ...data,
      additions: {
        ...data.additions,
        syrups: [...data.additions.syrups, syrupInput],
      }
    });

    setSyrupInput({ name: "", price: "", discount: "" });
  };

  const handleRemoveSyrup = (index) => {
    const updatedSyrups = data.additions.syrups.filter((_, i) => i !== index);
    setData({
      ...data,
      additions: {
        ...data.additions,
        syrups: updatedSyrups,
      }
    });
  };

  const [data, setData] = useState({
    name: "",
    sizes: [
      { size: "s", price: "", discount: "" },
      { size: "m", price: "", discount: "" },
      { size: "l", price: "", discount: "" },
    ],
    additions: {
      extras: [],
      syrups: [],
    },
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

    // Validate size prices and discounts
    for (let i = 0; i < data.sizes.length; i++) {
      const { price, discount } = data.sizes[i];
      if ((price && !discount) || (!price && discount)) {
        toast.error(`Both price and discount must be provided for size ${data.sizes[i].size.toUpperCase()}.`);
        return;
      }
    }

    const hasValidSize = data.sizes.some(
      (size) => size.price && size.discount
    );

    if (!hasValidSize) {
      toast.error("At least one size must have both a price and a discount.");
      return;
    }

    const filteredSizes = data.sizes.filter(
      (size) => size.price > 0 && size.discount >= 0
    );

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
        } else if (key === "additions") {
          formData.append(key, JSON.stringify(data.additions));
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

  // Import Excel
  // const handleExcelUpload = async (event) => {
  //   const file = event.target.files[0];
  
  //   if (!file) return;
  
  //   try {
  //     // Read the file
  //     const data = await file.arrayBuffer();
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const parsedData = XLSX.utils.sheet_to_json(sheet);
  
  //     console.log("Parsed Excel Data:", parsedData);
  
  //     // Create a FormData object if the backend requires it
  //     const formData = new FormData();
  //     formData.append("shopId", shopId);
  //     formData.append("excelData", JSON.stringify(parsedData));
  
  //     // Send POST request with parsed data
  //     await addProduct({ shopId, formData }).unwrap();
  
  //     toast.success("Products added successfully!");
  //     setShowAddModal(false); // Close modal
  //   } catch (error) {
  //     toast.error("Failed to upload Excel file. Please try again.");
  //     console.error("Error processing Excel file:", error);
  //   }
  // };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) return;
  
    try {
      // Read and parse Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
  
      console.log("Parsed Excel Data:", parsedData);
  
      // Transform parsed data into the format expected by backend
      const products = parsedData.map((item) => ({
        additions: {
          extras: [
            {
              name: item.Extras || "N/A",
              price: parseFloat(item.Price) || 0,
              discount: parseFloat(item.Discount.replace("%", "")) || 0,
              discountedPrice:
                parseFloat(item.Discounted_Price.replace("֏", "")) || 0,
              _id: item.ID || "",
            },
          ],
          syrups: [], // Add logic for syrups if available in Excel
        },
        _id: item.ID || "",
        name: item.Name || "",
        sizes: [
          {
            size: "s", // Replace with actual size if available
            price: parseFloat(item.Price) || 0,
            discount: parseFloat(item.Discount.replace("%", "")) || 0,
            discountedPrice:
              parseFloat(item.Discounted_Price.replace("֏", "")) || 0,
          },
        ],
        category: item.Category || "default",
        type: "all", // Replace with actual type if available
        shop: shopId, // Use shopId from context or props
        description: item.Description || "",
        photo: "default.jpg", // Placeholder; replace with actual data
        discountType: item.Discount_Type || "STANDARD_DISCOUNT",
        rating: 4.0, // Replace with actual rating if available
        ratingCount: 0, // Replace with actual count if available
        stock: true, // Replace with stock status if available
      }));
  
      console.log("Transformed Products Data:", products);
  
      // Send the transformed data to the backend
      await addProduct({ shopId, products }).unwrap();
  
      toast.success("Products uploaded successfully!");
      setShowAddModal(false); // Close modal
    } catch (error) {
      toast.error("Failed to upload Excel file. Please try again.");
      console.error("Error processing Excel file:", error);
    }
  };
  


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
        <label
          htmlFor="excelUpload"
          className="px-3 py-2 bg-green-500 text-white rounded-md my-2 cursor-pointer"
        >
          Import Excel File
        </label>
        <input
          id="excelUpload"
          type="file"
          accept=".xlsx, .xls"
          className="hidden"
          onChange={handleExcelUpload}
        />
        <div className="w-full mt-2 gap-3 flex flex-col">
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
          <div className="w-full flex inputRow gap-3 justify-between relative">
            <div className="inputContainer">
              <label className="form-label">Extra&apos;s Name</label>
              <input
                className="form-control"
                type="text"
                name="extraName"
                placeholder="Extra Name"
                value={extraInput.name}
                onChange={(e) => setExtraInput({ ...extraInput, name: e.target.value })}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Extra&apos;s Price</label>
              <input
                className="form-control"
                type="number"
                name="extraPrice"
                placeholder="Extra Price"
                value={extraInput.price}
                onChange={(e) => setExtraInput({ ...extraInput, price: e.target.value })}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label whitespace-nowrap">Extra&apos;s Discount</label>
              <input
                className="form-control"
                type="number"
                name="extraDiscount"
                placeholder="Extra Discount"
                value={extraInput.discount}
                onChange={(e) => setExtraInput({ ...extraInput, discount: e.target.value })}
              />
            </div>

            <div className="relative min-w-6">
              <Plus
                size={30}
                color="blue"
                className="cursor-pointer absolute top-[70%] -translate-y-1/2 right-0"
                onClick={handleAddExtra}
              />
            </div>
          </div>
          {data.additions.extras.length > 0 && (
            <div className="min-h-28 p-2 gap-2 border border-gray-400 rounded flex flex-wrap justify-start items-start">
              {data.additions.extras.map((extra, index) => (
                <div key={index} className="border rounded-md border-gray-400 p-2 pe-8 relative">
                  {`${extra.name}: ${extra.price}₼ , ${extra.discount}%`}
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
          <div className="w-full flex inputRow gap-3 justify-between relative">
            <div className="inputContainer">
              <label className="form-label">Syrup&apos;s Name</label>
              <input
                className="form-control"
                type="text"
                name="syrupName"
                placeholder="Syrup Name"
                value={syrupInput.name}
                onChange={(e) => setSyrupInput({ ...syrupInput, name: e.target.value })}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label">Syrup&apos;s Price</label>
              <input
                className="form-control"
                type="number"
                name="syrupPrice"
                placeholder="Syrup Price"
                value={syrupInput.price}
                onChange={(e) => setSyrupInput({ ...syrupInput, price: e.target.value })}
              />
            </div>
            <div className="inputContainer">
              <label className="form-label whitespace-nowrap">Syrup&apos;s Discount</label>
              <input
                className="form-control"
                type="number"
                name="syrupDiscount"
                placeholder="Syrup Discount"
                value={syrupInput.discount}
                onChange={(e) => setSyrupInput({ ...syrupInput, discount: e.target.value })}
              />
            </div>

            <div className="relative min-w-6">
              <Plus
                size={30}
                color="blue"
                className="cursor-pointer absolute top-[70%] -translate-y-1/2 right-0"
                onClick={handleAddSyrup}
              />
            </div>
          </div>
          {data.additions.syrups.length > 0 && (
            <div className="min-h-28 p-2 gap-2 border border-gray-400 rounded flex flex-wrap justify-start items-start">
              {data.additions.syrups.map((syrup, index) => (
                <div key={index} className="border rounded-md border-gray-400 p-2 pe-8 relative">
                  {`${syrup.name}: ${syrup.price}₼ , ${syrup.discount}%`}
                  <X
                    size={18}
                    color="red"
                    className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
                    onClick={() => handleRemoveSyrup(index)}
                  />
                </div>
              ))}
            </div>
          )}
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
