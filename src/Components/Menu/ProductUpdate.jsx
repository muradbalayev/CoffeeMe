import { Eye, Image, Plus, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import { useEditProductMutation } from "../../redux/services/productApi";

const EditProductModal = ({ shopId, data, setShowEditModal }) => {
    const [editProduct] = useEditProductMutation();

    const PhotoFileRef = useRef(null);

    const [editedData, setEditedData] = useState({
        ...data,
        sizes: data.sizes?.map(size => ({
            size: size.size || '', // Ensure size name is included
            price: size.price || '',
            discount: size.discount || ''
        })) || [
                { size: 's', price: '', discount: '' },
                { size: 'm', price: '', discount: '' },
                { size: 'L', price: '', discount: '' }
            ],
        additions: {
            extras: Array.isArray(data.additions.extras) ? data.additions.extras : [],
            syrups: Array.isArray(data.additions.syrups) ? data.additions.syrups : []
        }
    });


    console.log(editedData)


    const [extraInput, setExtraInput] = useState({
        name: '',
        price: '',
        discount: ''
    });

    const [syrupInput, setSyrupInput] = useState({
        name: '',
        price: '',
        discount: ''
    });


    const handleAddExtra = () => {
        if (extraInput.name.trim() !== "" && extraInput.price.trim() !== "" && extraInput.discount.trim() !== "") {
            setEditedData((prevData) => ({
                ...prevData,
                additions: {
                    ...prevData.additions,
                    extras: [...prevData.additions.extras, { ...extraInput }],
                }
            }));
            setExtraInput({
                name: '',
                price: '',
                discount: ''
            });
        } else {
            toast.error('Please provide a name and price for the extra.');
        }
    };

    const handleAddSyrup = () => {
        if (syrupInput.name.trim() !== "" && syrupInput.price.trim() !== "" && syrupInput.discount.trim() !== "") {
            setEditedData((prevData) => ({
                ...prevData,
                additions: {
                    ...prevData.additions,
                    syrups: [...prevData.additions.syrups, { ...syrupInput }],
                }
            }));
            setSyrupInput({
                name: '',
                price: '',
                discount: ''
            });
        } else {
            toast.error('Please provide a name and price for the syrup.');
        }
    };

    const handleExtraInputChange = (e) => {
        const { name, value } = e.target;
        setExtraInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleSyrupInputChange = (e) => {
        const { name, value } = e.target;
        setSyrupInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleRemoveExtra = (index) => {
        setEditedData((prevData) => ({
            ...prevData,
            additions: {
                ...prevData.additions,
                extras: prevData.additions.extras.filter((_, i) => i !== index),
            }
        }));
    };

    const handleRemoveSyrup = (index) => {
        setEditedData((prevData) => ({
            ...prevData,
            additions: {
                ...prevData.additions,
                syrups: prevData.additions.syrups.filter((_, i) => i !== index),
            }
        }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        const isValidNumber = !isNaN(value) && value.trim() !== '';
        if ((name.endsWith('Price') || name.endsWith('Discount')) && isValidNumber && Number(value) < 0) {
            toast.error("Price or Discount cannot be negative.");
            return;
        }


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


            const updatedSizes = [...(editedData.sizes || [])];

            // Initialize missing size objects with default size names if needed
            while (updatedSizes.length <= index) {
                updatedSizes.push({ size: ['s', 'm', 'l'][index], price: 0, discount: 0 });
            }

            updatedSizes[index][field] = value;
            setEditedData({
                ...editedData,
                sizes: updatedSizes,
            });
        } else {
            setEditedData({
                ...editedData,
                [name]: value,
            });
        }
    };

    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoFileName, setPhotoFileName] = useState("");

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);

    useEffect(() => {
        const imageUrl = `${import.meta.env.VITE_API_GLOBAL_URL
            }/public/uploads/products`;

        if (data.photo) {
            setPhotoFileName(data.photo);

            setPhotoPreview(
                `${imageUrl}/${shopId}/${data.photo}`
            );
        }

    }, [data, shopId]);

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        const fileURL = file ? URL.createObjectURL(file) : null;

        if (name === "photo") {
            setPhotoPreview(null);
            setPhotoFileName("");

            setPhotoPreview(fileURL);
            setPhotoFileName(file && file.name);
        }

        setEditedData((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const filteredSizes = (editedData.sizes || []).map(size => ({
            size: size.size || '',
            price: size.price || '0',
            discount: size.discount || '0'
        })).filter(size => Number(size.price) > 0 || Number(size.discount) > 0);

        if (filteredSizes.length === 0) {
            toast.error("At least one size must have a price or discount.");
            return;
        }
        if (
            !editedData.name ||
            !editedData.discountType ||
            !editedData.category ||
            !editedData.type ||
            !editedData.description ||
            !photoFileName
        ) {
            toast.error('Fill all inputs!');
            return;
        }

        const formData = new FormData();
        Object.keys(editedData).forEach((key) => {
            if (editedData[key] !== undefined && editedData[key] !== null) {
                if (key === "sizes") {
                    formData.append(key, JSON.stringify(filteredSizes));
                } else if (key === "additions") {
                    formData.append(key, JSON.stringify(editedData.additions));
                } else {
                    formData.append(key, editedData[key]);
                }
            }
        });

        try {
            await editProduct({ id: editedData._id, formData }).unwrap();
            setShowEditModal(false);
            toast.success("Product Edited Successfully!");
        } catch (error) {
            toast.error("Failed to edit the product. Please try again.");
            console.error("Error editing product:", error);
        }
    };

    const handleEyeClick = (image) => {
        setLightboxImage(image);
        setIsLightboxOpen(true);
    };

    return (
        <div
            data-name="form-container"
            onClick={(e) => e.target.dataset.name && setShowEditModal(false)}
            className="addModalContainer"
        >
            <form
                className="addModalForm"
                onSubmit={handleSubmit}
            >
                <X
                    color="red"
                    size={30}
                    className="closeButton"
                    onClick={() => setShowEditModal(false)}
                />
                <h2 className="text-black text-center title text-3xl p-3 mb-5">Edit Product</h2>
                <div className="w-full gap-3 flex flex-col">
                    <div className="w-full flex inputRow gap-5 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editedData.name || ''}
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
                                placeholder="S Price"
                                value={(editedData.sizes && editedData.sizes[0]?.price) || '0'} // Use optional chaining
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
                                value={(editedData.sizes && editedData.sizes[0]?.discount) || '0'} // Use optional chaining
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
                                value={(editedData.sizes && editedData.sizes[1]?.price) || '0'} // Use optional chaining
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
                                value={(editedData.sizes && editedData.sizes[1]?.discount) || '0'} // Use optional chaining
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
                                value={(editedData.sizes && editedData.sizes[2]?.price) || '0'} // Use optional chaining
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">L Discount</label>
                            <input
                                className="form-control"
                                type="text"
                                name="lDiscount"
                                placeholder="L Discount"
                                value={(editedData.sizes && editedData.sizes[2]?.discount) || '0'} // Use optional chaining
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-full flex inputRow gap-3 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Extra Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={extraInput.name}
                                onChange={handleExtraInputChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Extra Price</label>
                            <input
                                className="form-control"
                                type="text"
                                name="price"
                                value={extraInput.price}
                                onChange={handleExtraInputChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Extra Discount</label>
                            <input
                                className="form-control"
                                type="text"
                                name="discount"
                                value={extraInput.discount}
                                onChange={handleExtraInputChange}
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
                    {editedData.additions.extras?.length > 0 && (
                        <div className="extrasList min-h-28 p-2 gap-2 border border-gray-400 rounded flex flex-wrap justify-start items-start">
                            {editedData.additions.extras?.map((extra, index) => (
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
                    <div className="w-full flex inputRow gap-3 justify-between">
                        <div className="inputContainer">
                            <label className="form-label">Syrup Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={syrupInput.name}
                                onChange={handleSyrupInputChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Syrup Price</label>
                            <input
                                className="form-control"
                                type="text"
                                name="price"
                                value={syrupInput.price}
                                onChange={handleSyrupInputChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <label className="form-label">Syrup Discount</label>
                            <input
                                className="form-control"
                                type="text"
                                name="discount"
                                value={syrupInput.discount}
                                onChange={handleSyrupInputChange}
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
                    {editedData.additions.syrups?.length > 0 && (
                        <div className="syrupsList min-h-28 p-2 gap-2 border border-gray-400 rounded flex flex-wrap justify-start items-start">
                            {editedData.additions.syrups?.map((syrup, index) => (
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
                                value={editedData.discountType}
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
                                value={editedData.category}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Category</option>
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
                                value={editedData.type}
                                onChange={handleChange}
                            >
                                <option defaultValue="" disabled>
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
                                value={editedData.description}
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
            </form>
            <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                slides={[{ src: lightboxImage }]}
            />
        </div>
    );
}

export default EditProductModal;