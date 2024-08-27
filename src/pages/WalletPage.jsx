import axios from "axios";
import { Coffee, Wallet as WalletIcon }  from "lucide-react"
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"



const WalletPage = () => {

const [transactions, setTransactions] = useState([]);
const [Loading, setLoading] = useState(false);

const columns = [
  {
      name: "Id",
      selector: row => row.id,
      sortable: true
  },
  {
    name: "User",
    selector: row => row.firstName,
    sortable: true
},
  {
      name: "Tarix və saat",
      selector: row => row.firstName
  },
  {
      name: "Məbləğ",
      selector: row => row.age,
  },
  {
      name: "Coffee shop name",
      selector: row => row.lastName,
      sortable: true
  },
  
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


  return (
    Loading ?
    <div className="wrapper">
       <div className="sales-header flex justify-between items-center">
        <div className='relative p-2'>
          <h1 className="title md:text-4xl text-2xl">
            Wallet
          </h1>
        </div>
        <div className="balance md:text-base text-xs hover:shadow-xl shadow-md whitespace-nowrap">
          <WalletIcon/>
          1000 $
        </div>
      </div>
      <h1 className="mt-8 title text-xl">Recent transaction&apos;s</h1>

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
    </div> : 
   <div className="mx-auto h-screen w-full flex items-center justify-center gap-2">
   <Coffee size={30} stroke='#214440'/>
   <h1 className="title text-2xl">Loading...</h1>
</div>
  )
}

export default WalletPage
