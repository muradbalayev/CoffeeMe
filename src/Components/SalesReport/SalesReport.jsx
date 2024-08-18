import SalesBestSellers from './SalesBestSellers'
import SalesCharts from './SalesCharts'
import SalesTotals from './SalesTotals'
import { Wallet } from 'lucide-react'


function SalesReport() {
  return (
    <div className="wrapper sales-report">
      <div className="sales-header  flex justify-between items-center">
        <div className='relative p-2'>
          <h1 className="title">
            Sales Report
          </h1>

        </div>
        <div className="balance hover:shadow-xl shadow-md whitespace-nowrap">
          <Wallet size={25} />
          1000 $
        </div>
      </div>
      <SalesTotals />
      <SalesCharts />
      <SalesBestSellers />
    </div>
  )
}

export default SalesReport