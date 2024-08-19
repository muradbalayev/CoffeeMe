import axios from 'axios';
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, Flame, Pencil, SquarePlus, Trash2 } from 'lucide-react';
import UserModal from '../Components/Users/UserModal';


const AllUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [userid, setUserid] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Ad Soyad",
            selector: row => row.firstName + ' ' + row.lastName,
        },

        {
            name: "Yaş",
            selector: row => row.age,
        },
        {
            name: "Adres",
            selector: row => row.firstName + ' ' + row.lastName,
            sortable: true
        },
        {
            name: "Nömrə",
            selector: row => row.age,
        },
        {
            name: "Email",
            selector: row => row.firstName + ' ' + row.lastName,
        },
        {
            name: "Gender",
            selector: row => row.age,
        },
        {
            name: "Most Going Coffee Shop",
            selector: row => row.firstName + ' ' + row.lastName,
        },
        {
            name: "Streak",
            selector: row => (
                <div className="flex items-center gap-1">
                    <span>{row.age}</span>
                    <Flame size={20} color='orange' />
                </div>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>
                    <button onClick={() => handleUpdateClick(row.id)}
                        className='px-3 py-2 bg-green-600 text-white rounded-md'>
                        <Pencil size={18} />
                    </button>
                    <button className='px-3 py-2 bg-red-600 text-white rounded-md'
                        onClick={() => handleDelete(row.id)}>
                        <Trash2 size={18} />
                    </button>
                    <button className='px-3 py-2 bg-blue-600 text-white rounded-md'
                        onClick={() => handleModal(row.id)}>
                        <Eye size={18} />
                    </button>
                </div>
            )
        }
    ]

    // Fetch data
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(response => {
                // console.log("Data from API:", response.data);
                if (response.data && response.data.users && Array.isArray(response.data.users)) {
                    const UsersDatas = response.data.users.map(user => ({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age
                    }));
                    setUsers(UsersDatas);
                    setFilter(UsersDatas);
                    setLoading(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    //Modal
    function handleModal(id) {
        setUserid(id)
        setModalShow(true)
    }

    // Axtaris Filter
    useEffect(() => {
        const result = users.filter((user) => {
            return user.firstName.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    }, [users, search]);

    // DELETE METHOD
    const handleDelete = (id) => {
        Swal.fire({
            title: "Əminsiniz?",
            text: "Dəyişikliyi geri qaytara bilməyəcəksiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, silin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://dummyjson.com/users/${id}`)
                    .then(() => {
                        console.log('Məhsul Silindi!');
                        Swal.fire({
                            title: "Silindi!",
                            text: `Məhsul No:${id} müvəffəqiyyətlə silindi!`,
                            icon: "success"
                        });
                        setUsers(users.filter(user => user.id !== id));
                    })
                    .catch(error => {
                        console.error(`Error deleting product:`, error);
                        Swal.fire({
                            title: "Error!",
                            text: `Error deleting No ${id} product`,
                            icon: "error"
                        });
                    });
            }
        });
    };

    //Update Navigate
    const handleUpdateClick = (userid) => {
        setUserid(userid);
        navigate(`/dashboard/users/update/${userid}`);
    };

    return (
        Loading ? (
        <div className='card m-4 border rounded-md  overflow-hidden'>
            <div className="header px-4 py-2 text-white font-semibold flex items-center border-b border-gray-400">
                <h1 className='lg:text-2xl md:text-xl text-lg'>
                    Users
                </h1>
                <div className='flex justify-end gap-3 w-full mb-1 p-3 border-green-900'>
                    <input
                        className='form-control text-black md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md'
                        placeholder='Search'
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <Link to={'/dashboard/users/create'}
                        className='d-flex align-items-center'
                        style={{ borderRadius: '25%' }}>
                        <SquarePlus size={40} />
                    </Link>
                </div>
            </div>

            <div className='card-body'>

                <DataTable
                    columns={columns}
                    data={filter}
                    pagination
                    highlightOnHover
                    responsive
                >
                </DataTable>

            </div>
            <UserModal
                userid={userid}
                isOpen={modalShow}
                onClose={() => setModalShow(false)}
            />
        </div>) :
            <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
                <Coffee size={30} stroke='#214440'/>
                <h1 className="title text-2xl">Loading...</h1>
            </div>
    )
}

export default AllUsersPage
