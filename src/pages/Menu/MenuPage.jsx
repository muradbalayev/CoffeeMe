import { Coffee, Search } from "lucide-react"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../../redux/services/menuApi";

const MenuPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, isSuccess, error } = useGetMenuQuery(undefined, {
        pollingInterval: 10000, // ReFetch every 5 seconds
    });
    console.log(data)


    if (isLoading)
        return (
            <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
                <Coffee size={30} color="#214440" />
                <h1 className="title text-2xl">Loading...</h1>
            </div>
        );
    if (isError) return <div>An error occurred: {error.message}</div>;

    if (isSuccess) return (
        <div className="wrapper">
            <div className="users-header flex items-center justify-between">
                <div className="relative p-2 flex gap-1 items-center">
                    <h1 className="title lg:text-4xl text-3xl ">Menu</h1>
                </div>
                <div className="flex items-center gap-3 mb-1 p-3 border-green-900">
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
            <div className="mt-4 grid lg:grid-cols-4 md:grid-col-3 grid-cols-2 lg:gap-8 gap-6">
                {data.shops.map((shop) => (
                    <motion.button
                        key={shop._id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2, delay: 0 }}
                        onClick={() => navigate(`/dashboard/menu/${shop._id}/products`)}
                        className="card border py-10 relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900 via-green-800 to-gray-800
                        hover:from-green-700 hover:via-green-600 hover:to-gray-700 transition-colors duration-300 ease-linear">
                        <div className="flex w-full h-full justify-center items-center">
                            <h1 className="shoptitle font-bold lg:text-xl md:text-lg text-base" style={{ color: "white", fontFamily: 'Inter , "sans-serif"' }}>{shop.name}</h1>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

export default MenuPage
