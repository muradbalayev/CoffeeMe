import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
const UserUpdate = () => {

    const { userid } = useParams();

    const [newData, setNewData] = useState({
        firstName: '',
        lastName: '',
        age: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/users/${userid}`)
            .then(response => {
                const data = response.data;
                setNewData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    age: data.age || ''
                });
                setLoading(true);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [userid]);

    const handleChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        Swal.fire({
            title: "Dəyişiklik Etmək İstədiyindən Əminsən?",
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

    const handleBack = () => {
        navigate('/dashboard/users')
    }

    const saveData = () => {
        if (!newData.firstName || !newData.lastName || !newData.age) {
            alert('Bütün xanaları doldurun!');
            return;
        }

        axios.put(`https://dummyjson.com/users/${userid}`, newData)
            .then(response => {
                console.log('Product changed successfully:', response.data);
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


    const isFormValid = newData.firstName && newData.lastName && newData.age;

    return (
        <div className='card m-4 overflow-hidden flex flex-col border rounded-lg pb-3 min-h-[670px]'>
            <div className="header px-4 py-3 border-b text-white font-semibold">
                Dəyişiklik Et
            </div>
            {loading ?
                <form className='flex flex-col flex-grow'>

                    <div className='card-body flex-grow'
                        style={{ overflowY: "visible" }}>
                        <div className='form-group'>
                            <label>First Name<span className='text-red-600'>*</span></label>
                            <input type="text"
                                name='firstName'
                                value={newData.firstName}
                                onChange={handleChange}
                                className="form-control" />
                        </div>
                        <div className='form-group'>
                            <label>Last Name<span className='text-red-600'>*</span></label>
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
                                className="form-control" />
                        </div>
                    </div>

                    <div className='card-footer flex justify-between px-4'>
                    <button onClick={handleBack}
                        className='border rounded px-4 py-2 bg-red-600 text-white font-semibold'>
                        Geri
                    </button>
                        <button disabled={!isFormValid} type='button' onClick={handleSave} className='border rounded px-4 py-2 bg-green-600 text-white font-semibold'>
                            Dəyiş
                        </button>
                    </div>
                </form>
                : null}
        </div>

    )
}

export default UserUpdate
