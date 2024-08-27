
const SalesTable = () => {
    const userData = [
        { id: 1, name: "John Doe", sales: 20 },
        { id: 2, name: "John Doe", sales: 20 },
        { id: 3, name: "John Doe", sales: 20 },
        { id: 4, name: "John Doe", sales: 20 },
        { id: 5, name: "John Doe", sales: 20 }
    ]

    return (
        <div className="tables grid mt-8 lg:grid-cols-2 grid-cols-1 gap-20 md:px-8 px-2">
            <div className="table">
                <h3 className="my-3 font-semibold lg:text-2xl md:text-xl text-lg ">New Members</h3>
                <table className="w-full">
                    <thead className="rounded-t-lg text-white bg-green border-gray-200">
                        <tr>
                            <th className='px-6 md:py-5 py-3 text-left font-medium rounded-tl-lg tracking-wider'>
                                Name
                            </th>
                            <th className='md:px-6 px-3 md:py-5 py-3 text-left font-medium rounded-tr-lg tracking-wider'>
                                Sales
                            </th>
                        </tr>
                    </thead>
                    <tbody className=' w-full divide-gray-700'>
                        {userData.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                                <td className='px-2 py-2 whitespace-nowrap w-full'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-10 w-10'>
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium'>{user.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium'>{user.sales}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table">
                <h3 className="my-3 font-semibold lg:text-2xl md:text-xl text-lg ">Best Performing Members</h3>
                <table className="w-full">
                    <thead className="rounded-t-lg text-white bg-green border-gray-200">
                        <tr>
                            <th className='px-6 md:py-5 py-3 text-left font-medium rounded-tl-lg tracking-wider'>
                                Name
                            </th>
                            <th className='md:px-6 px-3 md:py-5 py-3 text-left font-medium rounded-tr-lg tracking-wider'>
                                Sales
                            </th>
                        </tr>
                    </thead>
                    <tbody className=' w-full divide-gray-700'>
                        {userData.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                                <td className='px-2 py-2 whitespace-nowrap w-full'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-10 w-10'>
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium'>{user.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium'>{user.sales}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table">
                <h3 className="my-3 font-semibold lg:text-2xl md:text-xl text-lg">Top Selling Product</h3>
                <table className="w-full">
                    <thead className="rounded-t-lg text-white bg-green border-gray-200">
                        <tr>
                            <th className='px-6 md:py-5 py-3 text-left font-medium rounded-tl-lg tracking-wider'>
                                Name
                            </th>
                            <th className='md:px-6 px-3 md:py-5 py-3 text-left font-medium rounded-tr-lg tracking-wider'>
                                Sales
                            </th>
                        </tr>
                    </thead>
                    <tbody className=' w-full divide-gray-700'>
                        {userData.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                                <td className='px-2 py-2 whitespace-nowrap w-full'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-10 w-10'>
                                            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                                                {user.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium'>{user.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium'>{user.sales}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default SalesTable
