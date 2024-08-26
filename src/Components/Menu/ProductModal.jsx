import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ProductModal = ({ product, isOpen, onClose }) => {

    return (
        <Modal open={isOpen} onClose={onClose} center>
            <div className="p-12">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                {product ? (
                    <div>
                        <p><strong>ID:</strong> {product._id}</p>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Price:</strong> {product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Discount:</strong> {product.discount}</p>
                        <p><strong>DiscountedPrice:</strong> {product.discountedPrice}</p>
                        <p><strong>Discount Type:</strong> {product.discountType}</p>
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

export default ProductModal;