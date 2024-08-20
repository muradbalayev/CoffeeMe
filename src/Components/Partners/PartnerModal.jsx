import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const PartnerModal = ({ partnerId, isOpen, onClose }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (partnerId) {
            axios.get(`https://dummyjson.com/users/${partnerId}`)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [partnerId]);

    return (
        <Modal open={isOpen} onClose={onClose} center>
            <div className="p-12">
                <h2 className="text-xl font-bold mb-4">User Details</h2>
                {data ? (
                    <div>
                        <p><strong>ID:</strong> {data.id}</p>
                        <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
                        <p><strong>Age:</strong> {data.age}</p>
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

export default PartnerModal;