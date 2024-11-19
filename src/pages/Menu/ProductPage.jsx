import { useState } from "react";
import { Coffee, Eye, File, Pencil, Search, SquarePlus, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductModal from "../../Components/Menu/ProductModal";
import AddProductModal from "../../Components/Menu/ProductCreate";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import EditProductModal from "../../Components/Menu/ProductUpdate";
import Swal from "sweetalert2";
import { useDeleteProductMutation, useGetProductQuery } from "../../redux/services/productApi";

import * as XLSX from "xlsx";





const ProductPage = () => {

    const { shopId } = useParams();
    const { data, isLoading, isError, isSuccess, error } = useGetProductQuery(shopId);
    console.log(data)
    const [deleteProduct] = useDeleteProductMutation();
    const [searchQuery, setSearchQuery] = useState("");


    const handleDelete = async (shopId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            // Call the delete mutation
            deleteProduct(shopId).then(() => {
                Swal.fire("Deleted!", "Your shop has been deleted.", "success");
            }).catch((error) => {
                Swal.fire("Error!", "There was an issue deleting the shop.", { error });
            });
        }
    };

    const [editedItem, setEditedItem] = useState(null);


    const [product, setProduct] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const handlePhotoClick = (par) => {
        //Lightbox
        const url = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads/products/${shopId}/${par}`;
        setImageSrc(url);
        setOpen(true);
    };

    //Photo Preview
    const imgUrl = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads/products/${shopId}`;

    const discountTypeMap = {
        STANDARD_DISCOUNT: 'Standard Discount',
        SPECIAL_DISCOUNT: 'Special Discount',
    };


    function handleModal(row) {
        setProduct(row)
        setModalShow(true)
    }

    const products = Array.isArray(data?.products) ? data?.products : [];


    const handleExportToExcel = () => {
        // Transform data to export format
        const exportData = products.map((product) => ({
            ID: product._id,
            Name: product.name,
            Price: `${product.sizes[0]?.price || "N/A"} ₼`,
            Category: product.category || "N/A",
            Discounted_Price: `${product.sizes[0]?.discountedPrice || "N/A"} ₼`,
            Discount: `${product.sizes[0]?.discount || "N/A"}%`,
            Discount_Type: discountTypeMap[product.discountType] || "Unknown Discount Type",
            Description: product.description || "N/A",
            Extras: product.additions.extras?.map(extra => `${extra.name} (${extra.price} ₼, ${extra.discount}%)`).join(", ") || "N/A",
            Syrups: product.additions.syrups?.map(syrup => `${syrup.name} (${syrup.price} ₼, ${syrup.discount}%)`).join(", ") || "N/A",
            Status: product.status || "N/A"
        }));
    
        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
    
        // Create a workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    
        // Export to Excel file
        XLSX.writeFile(workbook, "Products.xlsx");
    };
    

    if (isLoading)
        return (
            <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
                <Coffee size={30} stroke="#214440" />
                <h1 className="title text-2xl">Loading...</h1>
            </div>
        );

    if (isError) return (
        <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
            <h1 className="title text-2xl">Error:{error}</h1>
        </div>
    );



    const filteredProducts = products.filter((product) =>
        product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isSuccess) return (
        <div className="wrapper relative flex flex-col items-center gap-5 ">
            {showAddModal && <AddProductModal shopId={shopId} setShowAddModal={setShowAddModal} />}
            {editedItem && (
                <EditProductModal shopId={shopId} data={editedItem} setShowEditModal={setEditedItem} />
            )}

            <div className="flex justify-between w-full items-center p-2">
                <h1 className="title lg:text-4xl text-3xl">Products</h1>
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
                    {/* <button>
                        <File size={35} />
                    </button> */}
                    <button onClick={handleExportToExcel} className="px-3 py-2 bg-green-500 text-white rounded-md">
                        Export to Excel
                    </button>
                    <button onClick={() => setShowAddModal(true)}>
                        <SquarePlus size={40} />
                    </button>
                </div>
            </div>
            <div className="overflow-y-scroll overflow-x-auto w-full">
                <table className="w-full rounded-t-xl overflow-hidden">
                    <thead className="text-white bg-[#00704a]" >
                        <tr>
                            <th className="id" scope="col">
                                #
                            </th>
                            <th scope="col">Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Caregory</th>
                            <th scope="col">Discounted Price</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Discount Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Extras</th>
                            <th scope="col">Syrups</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {filteredProducts
                            .slice()
                            .reverse()
                            .map((product, index) => (
                                <tr key={index}>
                                    <td scope="row" className="col-1 border-b border-gray-300 id">
                                        {index + 1}
                                    </td>
                                    <td className="col-1">{product._id}</td>
                                    <td className="col-2">{product.name} </td>
                                    <td className="col-2">{product.sizes[0].price} ₼</td>

                                    <td className="col-1 min-w-32">
                                        <button
                                            className="px-1 py-1 border rounded max-w-16 my-1"
                                            onClick={() => handlePhotoClick(product.photo)}
                                        >
                                            {product.photo && (
                                                <img
                                                    src={`${imgUrl}/${product.photo}`}
                                                    alt="Product Photo"
                                                    className="object-contain h-14 w-14"
                                                />
                                            )}
                                        </button>
                                    </td>
                                    <td className="col-2">{product.category} </td>
                                    <td className="col-2">{product.sizes[0].discountedPrice} ₼</td>
                                    <td className="col-2">{product.sizes[0].discount} %</td>
                                    <td className="col-2">{discountTypeMap[product.discountType] || 'Unknown Discount Type'}</td>

                                    <td className="col-2">{product.description} </td>
                                    <td className="col-2">
                                        {product.additions.extras && product.additions.extras.length > 0 ? (
                                            product.additions.extras.map((extra, index) => (
                                                <div key={index} className="flex gap-2 items-center justify-center">
                                                    <span className="whitespace-nowrap">{extra.name}</span>
                                                    <span className="whitespace-nowrap">{extra.price} ₼</span>
                                                    <span className="whitespace-nowrap">{extra.discount}%</span>
                                                </div>
                                            ))
                                        ) : (
                                            <span>No Extras</span>
                                        )}
                                    </td>
                                    <td className="col-2">
                                        {product.additions.syrups && product.additions.syrups.length > 0 ? (
                                            product.additions.syrups.map((syrup, index) => (
                                                <div key={index} className="flex gap-2 items-center justify-center">
                                                    <span className="whitespace-nowrap">{syrup.name}</span>
                                                    <span className="whitespace-nowrap">{syrup.price} ₼</span>
                                                    <span className="whitespace-nowrap">{syrup.discount}%</span>
                                                </div>
                                            ))
                                        ) : (
                                            <span>No Syrups</span>
                                        )}
                                    </td>
                                    <td className="col-2">{product.status}</td>

                                    <td className="col-2 min-w-44">
                                        <div className='flex justify-start items-center gap-2'>
                                            <button onClick={() => setEditedItem(product)}
                                                className='px-3 py-2 bg-blue-800 text-white rounded-md'>
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                className="px-3 py-2 bg-red-600 text-white rounded-md"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <button style={{ backgroundColor: '#214440' }}
                                                className='px-2 py-1 text-white rounded-md'
                                                onClick={() => handleModal(product)}>
                                                <Eye />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="w-full mx-auto flex items-center justify-center">
      <button className="px-4 py-3" style={{ backgroundColor: "#214440", color: "white"}}>Load More</button>
    </div> */}
            <ProductModal
                product={product}
                isOpen={modalShow}
                onClose={() => setModalShow(false)}
            />
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: imageSrc }]}
                plugins={[Thumbnails][Fullscreen]}
            />
        </div>
    );


}

export default ProductPage