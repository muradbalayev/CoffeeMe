import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ProductModal = ({ product, isOpen, onClose }) => {

    return (
        <Modal open={isOpen} onClose={onClose} center>
            <div className="px-4 py-6">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                {product ? (
                    <div>
                        <p><strong>ID:</strong> {product._id}</p>
                        <p><strong>Name:</strong> {product.name}</p>

                        {product.sizes[0] && (
                            <div className='flex gap-4'>
                                <p className='border-r pe-3 border-gray-400'><strong>S Price:</strong> {product.sizes[0].price} AZN</p>
                                <p className='border-r pe-3 border-gray-400'><strong>S Discount:</strong> {product.sizes[0].discount}%</p>
                                <p><strong>S DiscountedPrice:</strong> {product.sizes[0].discountedPrice} AZN</p>
                            </div>
                        )}

                        {product.sizes[1] && (
                            <div className='flex gap-4'>
                                <p className='border-r pe-3 border-gray-400'><strong>M Price:</strong> {product.sizes[1].price} AZN</p>
                                <p className='border-r pe-3 border-gray-400'><strong>M Discount:</strong> {product.sizes[1].discount}%</p>
                                <p><strong>M DiscountedPrice:</strong> {product.sizes[1].discountedPrice} AZN</p>
                            </div>
                        )}

                        {product.sizes[2] && (
                            <div className='flex gap-4'>
                                <p className='border-r pe-3 border-gray-400'><strong>L Price:</strong> {product.sizes[2].price} AZN</p>
                                <p className='border-r pe-3 border-gray-400'><strong>L Discount:</strong> {product.sizes[2].discount}%</p>
                                <p><strong>L DiscountedPrice:</strong> {product.sizes[2].discountedPrice} AZN</p>
                            </div>
                        )}
                        <p><strong>Category:</strong> {product.category}</p>
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