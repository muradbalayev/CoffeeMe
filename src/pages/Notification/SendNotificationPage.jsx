
const SendNotification = () => {
    const notificationData = [
        { id: 1, name: "John Doe", message: "Message sent successfully!" },
        { id: 2, name: "John Doe", message: "Message sent successfully!" },
        { id: 3, name: "John Doe", message: "Message sent successfully!" },
        { id: 4, name: "John Doe", message: "Message sent successfully!" },
        { id: 5, name: "John Doe", message: "Message sent successfully!" }
    ]

    return (
        <div className="wrapper">
            <div className="header flex items-center justify-between">
                <div className="relative p-2 flex gap-1 items-center">
                    <h1 className="title lg:text-4xl md:text-3xl text-xl">Send Notification</h1>
                </div>
               
            </div>

                <form className='notification-form w-full p-3 mt-6 flex flex-col items-center gap-6'>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='font-bold'>Title</label>
                        <input className='outline-none border-4 rounded-lg  p-3 w-full border-green-800 ' type='text' placeholder='Title' />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='font-bold'>Category</label>
                        <select className='w-full outline-none border-4 rounded-lg p-3 border-green-800'>
                            <option disabled selected>
                                Category
                            </option>
                            <option>
                                All Users
                            </option>
                            <option>
                                Premium Users
                            </option>
                            <option>
                                Streak
                            </option>
                            <option>
                                Gold Badge
                            </option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='font-bold'>Message</label>
                        <input className='w-full outline-none border-4 rounded-lg  p-3 border-green-800 ' type='text' placeholder='Message' />
                    </div>
                    <button className='border-4 text-white bg-green-800 px-4 py-2'>Send Notification</button>
                </form>

                {/* Table */}
                <div className="table">
                <h3 className="my-3 font-semibold lg:text-xl md:text-lg text-base ">Last 5 notifications sent</h3>
                <table className="w-full">
                    <thead className="rounded-t-lg text-white bg-green border-gray-200">
                        <tr>
                            <th className='px-6 md:py-5 py-3 text-left font-medium rounded-tl-lg tracking-wider'>
                                Messages
                            </th>
                            <th className='w-full px-6 md:py-5 py-3 text-left font-medium rounded-tr-lg tracking-wider'>
                                User
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className=' w-full divide-gray-700'>
                        {notificationData.map((user) => (
                            <tr aria-colspan={12}  key={user.id} className="border-b border-gray-700">
                                <td className='px-2 py-2 whitespace-nowrap w-full'>
                                    <div className='flex items-center'>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium'>{user.message}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium'>{user.name}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SendNotification
