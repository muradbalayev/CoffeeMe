import axios from 'axios';
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Icon from 'react-icons-kit';
import { ic_create } from 'react-icons-kit/md/ic_create';
import { trashO } from 'react-icons-kit/fa/trashO';
import { ic_remove_red_eye } from 'react-icons-kit/md/ic_remove_red_eye'
import Swal from 'sweetalert2';
import {  Link, useNavigate } from 'react-router-dom';
import UserDetailModal from './UserModal';
import { SquarePlus } from 'lucide-react';


const Users = () => {
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
            name: "Ad",
            selector: row => row.firstName,
        },
        {
            name: "Soyad",
            selector: row => row.lastName,
        },
        {
            name: "Şəkil",
            selector: row => row.age,
        },
        {
            name: "Balans",
            selector: row => row.age,
            sortable: true
        },
        {
            name: "Tarixçə",
            selector: row => row.age,
        },
        {
            name: "Streak",
            selector: row => row.age,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>
                    <button onClick={() => handleUpdateClick(row.id)}
                        className='px-3 py-2 bg-green-600 text-white rounded-md'>
                        <Icon className='d-flex' icon={ic_create} />
                    </button>
                    <button className='px-3 py-2 bg-red-600 text-white rounded-md'
                     onClick={() => handleDelete(row.id)}>
                        <Icon className='d-flex' icon={trashO} />
                    </button>
                    <button className='px-3 py-2 bg-blue-600 text-white rounded-md'
                        onClick={() => handleModal(row.id)}>
                        <Icon className='d-flex' icon={ic_remove_red_eye} />
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
                    .then(response => {
                        console.log('Məhsul Silindi!');
                        Swal.fire({
                            title: "Silindi!",
                            text: `Məhsul No:${id} müvəffəqiyyətlə silindi!`,
                            icon: "success"
                        })
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
        Loading ? (<div className='card m-4 border rounded-md  overflow-hidden'>
            <div className="header px-4 py-2 text-white font-semibold flex items-center border-b border-gray-400">
                <h1 className='text-2xl'>
                Users
                </h1>
                <div className='flex justify-end gap-3 w-full mb-1 p-3 border-green-900'>
                                <input
                                    className='form-control w-50 p-2 border outline-none rounded-md'
                                    placeholder='Search'
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <Link to={'/dashboard/users/create'}
                                className='d-flex align-items-center'
                                style={{ borderRadius: '25%' }}>
                                <SquarePlus size={40}/>
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
            <UserDetailModal
                    userid={userid}
                    isOpen={modalShow}
                    onClose={() => setModalShow(false)}
                />
        </div> ) : null
    )
}

export default Users
