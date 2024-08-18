import SalesCharts from './SalesCharts'
import SalesTotals from './SalesTotals'
import { Wallet } from 'lucide-react'


function SalesReport() {
  return (
    <div className="wrapper sales-report">
      <div className="sales-header flex justify-between items-center">
        <h1 className="title">
          Sales Report
        </h1>
        <div className="balance whitespace-nowrap">
        <Wallet size={25} />
          1000 $
        </div>
      </div>
      <SalesTotals />
      <SalesCharts />

    </div>
  )
}

export default SalesReport