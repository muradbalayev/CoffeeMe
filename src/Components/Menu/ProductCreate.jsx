import axios from 'axios'
import { Flame } from 'lucide-react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
const ProductCreate = () => {

    const [newData, setNewData] = useState({
        firstName: '',
        lastName: '',
        age: ''
    })

    const navigate = useNavigate();


    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        Swal.fire({
            title: "Yadda Saxlamaq İstədiyindən Əminsən?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, yadda saxla!"
        }).then((result) => {
            if (result.isConfirmed) {
                saveData();
            }
        });
    };

    const saveData = () => {
        if (!newData.firstName || !newData.lastName || !newData.age) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.post(`https://dummyjson.com/users/add`, newData)
            .then(response => {
                console.log('User added successfully:', response.data);
                navigate('/dashboard/users');
                Swal.fire({
                    title: "Yadda Saxlanıldı!",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Xeta:', error);
                alert('Xeta.');
            });
    };


    const handleBack = () => {
        navigate(`/dashboard/menu/shopname/products`);
    }


    const isFormValid = newData.firstName && newData.lastName && newData.age;

    return (
        <div className='card overflow-hidden m-4 flex flex-col border rounded-lg pb-3 min-h-[670px]'>
            <div className="header px-4 py-3 border-b text-white font-semibold">
                Yarat
            </div>
            <form className='flex flex-col flex-grow'>

                <div className='card-body bg-white flex-grow'>
                    <div className='form-group'>
                        <label>Name<span className='text-red-600'>*</span></label>
                        <input type="text"
                            name='firstName'
                            value={newData.firstName}
                            onChange={handleChange}
                            className="border rounded" />
                    </div>
                    <div className='form-group'>
                        <label>Surname<span className='text-red-600'>*</span></label>
                        <input
                            name='lastName'
                            value={newData.lastName}
                            onChange={handleChange}
                            type="text"
                            className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label>Age<span className='text-red-600'>*</span></label>
                        <input
                            name='age'
                            value={newData.age}
                            onChange={handleChange}
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className='form-group'>
                        <label>Adres<span className='text-red-600'>*</span></label>
                        <input
                            name='age'
                            value={newData.age}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='form-group'>
                        <label>Number<span className='text-red-600'>*</span></label>
                        <input
                            name='age'
                            value={newData.age}
                            onChange={handleChange}
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email<span className='text-red-600'>*</span></label>
                        <input
                            name='age'
                            value={newData.age}
                            onChange={handleChange}
                            type="email"
                            className="form-control"
                        />
                    </div>
                    <div className='form-group'>
                        <label>Gender<span className='text-red-600'>*</span></label>
                        <select className='outline-none text-gray border border-gray-300 py-2 ps-4 rounded-md'>
                            <option selected disabled>
                                Gender
                            </option>
                            <option>
                                Male
                            </option>
                            <option>
                                Female
                            </option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Most Going Coffee Shop<span className='text-red-600'>  *</span></label>
                        <select className='outline-none text-gray border border-gray-300 py-2 ps-4 rounded-md'>
                            <option selected disabled>
                                Most Going Coffee Shop
                            </option>
                            <option>
                                Coffee Shop 1
                            </option>
                            <option>
                                Coffee Shop 2
                            </option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='flex items-center'><Flame size={18} color='red' />Streak <span className='text-red-600'> *</span></label>
                        <input
                            name='age'
                            value={newData.age}
                            onChange={handleChange}
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className='form-group'>
                        <label>User Plan<span className='text-red-600'>  *</span></label>
                        <select className='outline-none text-gray border border-gray-300 py-2 ps-4 rounded-md'>
                            <option selected disabled>
                                User Plan
                            </option>
                            <option>
                                Standart
                            </option>
                            <option>
                                Premium
                            </option>
                        </select>
                    </div>

                </div>
                <div className='card-footer flex justify-between px-4 mt-8'>
                    <button onClick={handleBack}
                        className='border rounded px-4 py-2 bg-red-600 text-white font-semibold'>
                        Geri
                    </button>
                    <button disabled={!isFormValid}
                        type='button'
                        onClick={handleSave}
                        className='border rounded px-4 py-2 bg-green-600 text-white font-semibold'>
                        Yarat
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductCreate
