import { useState } from "react";
// import toast from "react-hot-toast";


const SendNotification = () => {

    const [data, setData] = useState({
        title: "",
        category: "",
        message: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };


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

            <form
                // onSubmit={handleSubmit}
                className='notification-form w-full p-3 mt-6 flex flex-col items-center gap-6'>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-bold'>Title</label>
                    <input onChange={handleChange}
                        name="title"
                        value={data.title}
                        type='text'
                        placeholder='Title'
                        className='outline-none border-4 rounded-lg md:text-base text-sm md:p-3 p-2 w-full border-green-800' />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-bold'>Category</label>
                    <select
                        name="category"
                        onChange={handleChange}
                        value={data.category}
                        className='w-full outline-none border-4 rounded-lg md:text-base text-sm md:p-3 p-2 border-green-800'>
                        <option value='' disabled defaultValue={""}>
                            Category
                        </option>
                        <option value='all-users'>
                            All Users
                        </option>
                        <option value='premium-users'>
                            Premium Users
                        </option>
                        <option value='streak'>
                            Streak
                        </option>
                        <option value='gold-badge'>
                            Gold Badge
                        </option>
                    </select>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-bold'>Message</label>
                    <input
                        name="message"
                        onChange={handleChange}
                        value={data.message}
                        type='text'
                        placeholder='Message'
                        className='w-full outline-none border-4 rounded-lg md:text-base text-sm  md:p-3 p-2 border-green-800 ' />
                </div>
                <button type="submit" className='border-4 text-white bg-green-800 px-4 py-2'>Send Notification</button>
            </form>

            {/* Table */}
            <div className="table overflow-x-auto">
                <h3 className="my-3 font-semibold lg:text-xl md:text-lg text-base">Last 5 notifications sent</h3>
                <table className="min-w-full">
                    <thead className="bg-green-800 text-white">
                        <tr>
                            <th className='md:px-6 px-2 md:py-5 py-3 md:text-lg text-sm text-left font-medium tracking-wider'>
                                Messages
                            </th>
                            <th className='md:px-6 px-2 md:py-5 py-3 md:text-lg text-sm text-left font-medium tracking-wider'>
                                User
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {notificationData.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                                <td className='md:px-6 px-3 md:py-4 py-3 whitespace-nowrap text-left'>
                                    <div className=' md:text-sm text-xs font-medium'>{user.message}</div>
                                </td>
                                <td className='md:px-6 px-3 md:py-4 py-3 whitespace-nowrap text-left'>
                                    <div className='md:text-sm text-xs font-medium'>{user.name}</div>
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
