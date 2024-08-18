import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const UserDetailModal = ({ userid, isOpen, onClose }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userid) {
            axios.get(`https://dummyjson.com/users/${userid}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [userid]);

    return (
        <Modal open={isOpen} onClose={onClose} center>
            <div className="p-12">
                <h2 className="text-xl font-bold mb-4">User Details</h2>
                {userData ? (
                    <div>
                        <p><strong>ID:</strong> {userData.id}</p>
                        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Age:</strong> {userData.age}</p>
                        {/* Add more details as needed */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default UserDetailModal;