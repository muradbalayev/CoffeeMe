import { useState } from "react";
import { Check, Coffee, Search, X } from "lucide-react";
// import Swal from "sweetalert2";
// import AddWithdrawModal from "../../Components/Withdraw/WthCreate";
import {
  useGetWithdrawQuery,
  useUpdateWithdrawMutation,
} from "../../redux/services/withdrawApi";
import RejectWithdrawModal from "../../Components/Withdraw/RejectWithdraw";
import Swal from "sweetalert2";

const WithdrawPage = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetWithdrawQuery(
    undefined,
    {
      pollingInterval: 10000, // ReFetch every 5 seconds
    }
  );
  const [updateWithdraw, { error: mutationError }] =
    useUpdateWithdrawMutation();

  console.log(mutationError);

  const [editedItem, setEditedItem] = useState(null);

  // const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading)
    return (
      <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
        <Coffee size={30} color="#214440" />
        <h1 className="title text-2xl">Loading...</h1>
      </div>
    );

  if (isError) return <div>An error occurred: {error.message}</div>;

  // const filteredWithdraws = data.withdraws.filter((withdraw) =>
  //     withdraw.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid Date"; // Fallback in case of an error
    }
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  };

  const handleCompleteWithdraw = async (withdrawId) => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to complete this withdrawal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, complete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateWithdraw({ withdrawId, status: "completed" }).unwrap();
          Swal.fire(
            "Completed!",
            "The withdrawal has been completed.",
            "success"
          );
        } catch (error) {
          Swal.fire("Error!", "Failed to complete the withdrawal.", { error });
        }
      }
    });
  };

  if (isSuccess)
    return (
      <div className="wrapper">
        {editedItem && (
          <RejectWithdrawModal
            withdrawId={editedItem}
            setShowEditModal={setEditedItem}
          />
        )}
        <div className="withdraw-header flex items-center">
          <div className="relative p-2">
            <h1 className="title md:text-4xl text-2xl">Withdraw</h1>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <h1 className="title text-xl">Request&apos;s table</h1>
          <div className="gap-3 flex items-center mt-2">
            <div className="flex relative">
              <input
                className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" />
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll overflow-x-auto w-full mt-4">
          <table className="w-full rounded-t-xl overflow-hidden">
            <thead className="text-white bg-[#00704a]">
              <tr>
                <th className="id" scope="col">
                  #
                </th>
                <th scope="col">Id</th>
                <th scope="col">User</th>
                <th scope="col">Date and Time</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.withdraws
                .slice()
                .reverse()
                .map((withdraw, index) => (
                  <tr key={index}>
                    <td
                      scope="row"
                      className="col-1 border-b border-gray-300 id"
                    >
                      {index + 1}
                    </td>
                    <td className="col-1">{withdraw._id}</td>
                    <td className="col-2">{withdraw.partner.username} </td>
                    <td className="col-1">{withdraw.createdDate}</td>
                    <td className="col-1">{withdraw.amount}</td>
                    <td className="col-1">{withdraw.status}</td>

                    <td className="col-2 min-w-44  ">
                      <button
                        onClick={() => handleCompleteWithdraw(withdraw._id)}
                        className=" px-3 py-2 bg-blue-600 text-white rounded-md"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => setEditedItem(withdraw._id)}
                        className="px-3 ms-2 py-2 bg-red-600 text-white rounded-md"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default WithdrawPage;
