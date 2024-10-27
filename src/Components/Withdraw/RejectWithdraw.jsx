import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateWithdrawMutation } from "../../redux/services/withdrawApi";
import Swal from "sweetalert2";

const RejectWithdrawModal = ({ withdrawId, setShowEditModal }) => {
  const [editedData, setEditedData] = useState({
    rejectedReason: "", // Initialize rejectedReason as an empty string
  });

  const [updateWithdraw] = useUpdateWithdrawMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editedData.rejectedReason) {
      toast.error("Please provide a reason for rejection!");
      return;
    }

    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this withdrawal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Pass formData directly
          await updateWithdraw({
            withdrawId,
            status: "rejected",
            rejectedReason: editedData.rejectedReason,
          }).unwrap();
          setShowEditModal(false);
          toast.success("Withdraw Rejected Successfully!");
        } catch (error) {
          toast.error("Failed to reject the Withdraw!", error);
        }
      }
    });
  };

  return (
    <div
      data-name="form-container"
      onClick={(e) => {
        e.target.dataset.name && setShowEditModal(false);
      }}
      className="addModalContainer "
    >
      <form className="addModalForm" onSubmit={handleSubmit}>
        <X
          color="red"
          size={30}
          className="closeButton"
          onClick={() => setShowEditModal(false)}
        />
        <h2 className="text-black text-center title text-3xl p-3 mb-5">
          Reject Withdraw
        </h2>
        <div className="w-full gap-3 flex flex-col">
          <div className="w-full flex inputRow gap-5 justify-between">
            <div className="inputContainer">
              <label className="form-label">Reject Reason</label>
              <textarea
                rows={4}
                className="form-control"
                name="rejectedReason"
                required
                placeholder="Enter reason for rejection"
                value={editedData.rejectedReason}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex mt-10 gap-5 justify-center">
            <div>
              <button
                type="submit"
                className="action-btn bg-red-600 hover:bg-red-700 px-4 py-2 flex items-center rounded text-white font-bold gap-2"
              >
                Reject Withdraw
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RejectWithdrawModal;
