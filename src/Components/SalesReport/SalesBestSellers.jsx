
const SalesBestSellers = () => {
    const userData = [
        { id: 1, name: "John Doe", sales: 20 },
        { id: 2, name: "John Doe", sales: 20 },
        { id: 3, name: "John Doe", sales: 20 },
        { id: 4, name: "John Doe", sales: 20 }
    ]

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-40 px-8">
            <div className="table-1 p-2">
                <h3 className="my-3 font-semibold lg:text-2xl md:text-xl text-lg whitespace-nowrap">Best Performing Member&apos;s</h3>
                <table className="w-full">
                    <thead className="rounded-t-lg text-white bg-green border-gray-200">
                        <tr>
                            <th className='px-6 py-5 text-left font-medium rounded-tl-lg tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-5 text-left font-medium rounded-tr-lg tracking-wider'>
                                Sales
                            </th>
                        </tr>
                    </thead>
                    <tbody className=' w-full divide-gray-700'>
                        {userData.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                                <td className='px-6 py-4 whitespace-nowrap w-full'>
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
            <div className="table-2 p-2">
                <h3 className="my-3 font-semibold lg:text-2xl md:text-xl text-lg whitespace-nowrap">Best Seller&apos;s Product Member&apos;s</h3>
                <table className="w-full">
                    <thead className="rounded-t-lg text-white bg-green border-gray-200">
                        <tr>
                            <th className='px-6 py-5 text-left font-medium rounded-tl-lg tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-5 text-left font-medium rounded-tr-lg tracking-wider'>
                                Sales
                            </th>
                        </tr>
                    </thead>
                    <tbody className=' w-full divide-gray-700'>
                        {userData.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                                <td className='px-6 py-4 whitespace-nowrap w-full'>
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

export default SalesBestSellers
