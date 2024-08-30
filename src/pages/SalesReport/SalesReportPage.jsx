import { Wallet } from 'lucide-react'
import SalesTotals from '../../Components/SalesReport/SalesTotals'
// import SalesCharts from '../Components/SalesReport/SalesCharts'
import SalesTable from '../../Components/SalesReport/SalesTable'


function SalesReport() {
  return (
    <div className="wrapper sales-report">
      <div className="sales-header  flex justify-between items-center">
        <div className='relative p-2'>
          <h1 className="title md:text-4xl text-2xl">
            Sales Report
          </h1>

        </div>
        <div className="balance md:text-base text-xs hover:shadow-xl shadow-md whitespace-nowrap">
          <Wallet/>
          1000 $
        </div>
      </div>
      <SalesTotals />
      {/* <SalesCharts /> */}
      <SalesTable />
    </div>
  )
}

export default SalesReport