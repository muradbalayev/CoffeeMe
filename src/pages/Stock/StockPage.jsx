import { useState } from "react";
import DataTable from "react-data-table-component"
import { Coffee, Eye, Pencil, Search, SquarePlus, Trash2 } from "lucide-react";
// import { useParams } from "react-router-dom";
import ProductModal from "../../Components/Menu/ProductModal";
import AddProductModal from "../../Components/Menu/ProductCreate";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import EditProductModal from "../../Components/Menu/ProductUpdate";
import Swal from "sweetalert2";
import { useDeleteProductMutation, useGetProductQuery } from "../../redux/services/productApi";



  

const StockPage = () => {

    // const { data, isLoading, isError, isSuccess, error } = useGetStockQuery(undefined, {
    //     pollingInterval: 10000, // ReFetch every 5 seconds
    //   });

    //       console.log(data)
    const [deleteProduct] = useDeleteProductMutation();

const data = [
    {
        id: 1,
        name: "Product 1",
        shopName: "Shop 1",
        status: "Active",
    }
]

    const handleDelete = async (productId) => {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Accept it!",
        });
    
        if (result.isConfirmed) {
          // Call the delete mutation
          deleteProduct(productId).then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          }).catch((error) => {
            Swal.fire("Error!", "There was an issue deleting the product.", {error});
          });
        }
      };
    
    


    const [open, setOpen] = useState(false);
    // const [imageSrc, setImageSrc] = useState("");

    // const handlePhotoClick = (par) => {
    //     //Lightbox
    //     const url = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads/products/${shopId}/${par}`;
    //     setImageSrc(url);
    //     setOpen(true);
    // };

    //Photo Preview
    // const imgUrl = `${import.meta.env.VITE_API_GLOBAL_URL}/public/uploads/products/${shopId}`;

    // const discountTypeMap = {
    //     STANDARD_DISCOUNT: 'Standard Discount',
    //     SPECIAL_DISCOUNT: 'Special Discount',
    // };

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: "Product Name",
            selector: row => row.name
        },
        {
            name: "Shop Name",
            selector: row => row.shopName,
        },
        // {
        //     name: "Photo",
        //     cell: (row) => (
        //         <button
        //             className="px-1 py-1 border rounded max-w-16 my-1"
        //             onClick={() => handlePhotoClick(row.photo)}
        //         >
        //             {row.photo && (
        //                 <img
        //                     src={`${imgUrl}/${row.photo}`}
        //                     alt="Shop Photo"
        //                     className="object-contain h-14 w-14"
        //                 />
        //             )}{" "}
        //         </button>
        //     )
        // },
        {
            name: "Stock Status",
            selector: row => row.status,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>
                    <button
                        className="px-3 py-2 flex items-center gap-2 bg-green-600 text-white rounded-md"
                    onClick={() => handleDelete(row._id)}
                    >
                     <p className="cursor-pointer">Accept</p> 
                     </button>
                </div>
            )
        }

    ]



    // if (isLoading)
    //     return (
    //         <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
    //             <Coffee size={30} stroke="#214440" />
    //             <h1 className="title text-2xl">Loading...</h1>
    //         </div>
    //     );

    // if (isError) return (
    //     <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
    //         <h1 className="title text-2xl">Error:{error}</h1>
    //     </div>
    // );



    // if (isSuccess) 
    return (
        <div className="wrapper">
           
            <div className="sales-header flex items-center justify-between">
                <div className='relative p-2'>
                    <h1 className="title md:text-4xl text-2xl">
                        Stock
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
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <DataTable
                    columns={columns}
                    data={data}
                    highlightOnHover
                    responsive
                >
                </DataTable>
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                // slides={[{ src: imageSrc }]}
                plugins={[Thumbnails][Fullscreen]}
            />
        </div>

    )
}

export default StockPage
