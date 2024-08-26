import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const Partner = ({ partner, isOpen, onClose }) => {

    return (
        <Modal open={isOpen} onClose={onClose} center>
            <div className="p-12">
                <h2 className="text-xl font-bold mb-4">Partner Details</h2>
                {partner ? (
                    <div>
                        <p><strong>ID:</strong> {partner._id}</p>
                        <p><strong>Name:</strong> {partner.name}</p>
                        <p><strong>Price:</strong> {partner.price}</p>
                        <p><strong>Category:</strong> {partner.category}</p>
                        <p><strong>Discount:</strong> {partner.discount}</p>
                        <p><strong>DiscountedPrice:</strong> {partner.discountedPrice}</p>
                        <p><strong>Discount Type:</strong> {partner.discountType}</p>
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

export default Partner;