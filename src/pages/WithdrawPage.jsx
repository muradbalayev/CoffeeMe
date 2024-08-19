import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import WthModal from "../Components/Withdraw/WthModal";
import { Coffee, Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";



const WithdrawPage = () => {

    const [transactions, setTransactions] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [userid, setUserid] = useState(null)
    const [modalShow, setModalShow] = useState(false);

    const columns = [
        {
            name: "Id",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Shop Name",
            selector: row => row.firstName
        },
        {
            name: "Tarix və saat",
            selector: row => row.age,
        },
        {
            name: "Wth type",
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: "Wth amount",
            selector: row => row.age,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className='flex justify-start items-center gap-2'>
                    <Link to={'/dashboard/withdraw/create'}
                        className='px-2 py-1 bg-green-600 text-white rounded-md'>
                        <Plus />
                    </Link>
                    <button className='px-2 py-1 bg-blue-600 text-white rounded-md'
                        onClick={() => handleModal(row.id)}>
                      <Eye/>
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
                    const TransactionDatas = response.data.users.map(data => ({
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age
                    }));
                    setTransactions(TransactionDatas);
                    setLoading(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function handleModal(id) {
        setUserid(id)
        setModalShow(true)
    }


    return (
        Loading ?
            <div className="wrapper">
                <div className="sales-header flex items-center">
                    <div className='relative p-2'>
                        <h1 className="title md:text-4xl text-2xl">
                            Withdraw
                        </h1>
                    </div>
                </div>
                <h1 className="mt-8 title text-xl">Request&apos;s table</h1>

                <div className='mt-4'>

                    <DataTable
                        columns={columns}
                        data={transactions}
                        pagination
                        highlightOnHover
                        responsive
                    >
                    </DataTable>
                </div>
                <WthModal
                    userid={userid}
                    isOpen={modalShow}
                    onClose={() => setModalShow(false)}
                />
            </div> :
           <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
           <Coffee size={30} stroke='#214440'/>
           <h1 className="title text-2xl">Loading...</h1>
       </div>
    )
}

export default WithdrawPage
