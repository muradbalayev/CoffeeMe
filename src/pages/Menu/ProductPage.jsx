import { useState } from "react";
import DataTable from "react-data-table-component"
import { Coffee, Eye, Pencil, Search, SquarePlus, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductModal from "../../Components/Menu/ProductModal";
// import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddProductModal from "../../Components/Menu/ProductCreate";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import EditProductModal from "../../Components/Menu/ProductUpdate";
import Swal from "sweetalert2";

const deleteShop = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  


const ProductPage = () => {
    const { shopId } = useParams();

    const [editedItem, setEditedItem] = useState(null);
    const queryClient = useQueryClient();


    const fetchProducts = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/api/shops/${shopId}/products`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };


    const deleteMutation = useMutation({
        mutationFn: deleteShop,
        onSuccess: () => {
          queryClient.invalidateQueries(["products"]);
          console.log("Product deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting product:", error);
        },
      });
    
    const { isLoading, isError, isSuccess, data } = useQuery(
        "products",
        fetchProducts
    );

    const [productId, setProductId] = useState(null)
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

    const columns = [
        {
            name: "Id",
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: "Product Name",
            selector: row => row.name
        },
        {
            name: "Price",
            selector: row => row.price
        },
        {
            name: "Photo",
            cell: (row) => (
                <button
                    className="px-1 py-1 border rounded max-w-16 my-1"
                    onClick={() => handlePhotoClick(row.photo)}
                >
                    {row.photo && (
                        <img
                            src={`${imgUrl}/${row.photo}`}
                            alt="Shop Photo"
                            className="object-contain h-9 w-9"
                        />
                    )}{" "}
                </button>
            )
        },
        {
            name: "Category",
            selector: row => row.category,
        },
        {
            name: "Discounted Price",
            selector: row => row.discountedPrice,
            sortable: true
        },
        {
            name: "Discount",
            selector: row => row.discount,
            sortable: true
        },
        {
            name: "Discount Type",
            selector: row => row.discountType,
            sortable: true
        },
        {
            name: "Description",
            selector: row => row.description,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>
                    <button onClick={() => setEditedItem(row)}
                        className='px-3 py-2 bg-blue-800 text-white rounded-md'>
                        <Pencil size={18} />
                    </button>
                    <button
                        className="px-3 py-2 bg-red-600 text-white rounded-md"
                    onClick={() => handleDelete(row._id)}
                    >
                        <Trash2 size={18} />
                    </button>
                    <button style={{ backgroundColor: '#214440' }}
                        className='px-2 py-1 text-white rounded-md'
                        onClick={() => handleModal(row._id)}>
                        <Eye />
                    </button>
                </div>
            )
        }

    ]

 
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
          deleteMutation.mutate(shopId);
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        }
      };
    


    function handleModal(id) {
        setProductId(id)
        setModalShow(true)
    }


    if (isLoading)
        return (
            <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
                <Coffee size={30} stroke="#214440" />
                <h1 className="title text-2xl">Loading...</h1>
            </div>
        );

    if (isError) return (
        <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
            <h1 className="title text-2xl">Error</h1>
        </div>
    );



    if (isSuccess) return (
        <div className="wrapper">
            {showAddModal && <AddProductModal shopId={shopId} setShowAddModal={setShowAddModal} />}
            {editedItem && (
                <EditProductModal shopId={shopId} data={editedItem} setShowEditModal={setEditedItem} />
            )}
            <div className="sales-header flex items-center justify-between">
                <div className='relative p-2'>
                    <h1 className="title md:text-4xl text-2xl">
                        Products
                    </h1>
                </div>
                <div className='flex gap-3 mb-1 p-3 border-green-900'>
                    <div className="flex relative gap-3 items-center">
                        <div className="flex relative">
                            <input
                                className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
                                placeholder="Search"
                            // value={search}
                            // onChange={(event) => setSearch(event.target.value)}
                            />
                            <Search className="search-icon" />
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="text-green"
                            style={{ borderRadius: "25%" }}
                        >
                            <SquarePlus size={40} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <DataTable
                    columns={columns}
                    data={data.products}
                    pagination
                    highlightOnHover
                    responsive
                >
                </DataTable>
            </div>
            <ProductModal
                productId={productId}
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

    )
}

export default ProductPage
