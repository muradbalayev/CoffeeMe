import { ChartLine, Package2, TrendingDown, TrendingUp, UsersRound } from 'lucide-react'
import Icon from 'react-icons-kit'
import { ic_account_balance_wallet } from 'react-icons-kit/md/ic_account_balance_wallet'


function SalesReport() {
  return (
    <div className="wrapper sales-report">
      <div className="sales-header flex justify-between items-center">
        <h1 className="title">
          Sales Report
        </h1>
        <div className="balance">
          <Icon icon={ic_account_balance_wallet} size={25} />
          1000 $
        </div>
      </div>
      <div className='totals mt-8 px-3 grid grid-cols-3 gap-10'>
        <div className='total-card shadow-md h-40 p-4 rounded-lg bg-white'>
          <div className='flex flex-col h-full justify-between'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-5'>
                <p className='text-gray'>Total Users</p>
                <p className='text-2xl font-bold'>40,689</p>
              </div>
              <UsersRound size={45} color='#00B69B'/>
            </div>
            <div className='flex gap-2 text-gray'>
              <TrendingUp color='#00B69B' />
              8.5% Up from yesterday
            </div>
          </div>
        </div>
        <div className='total-card shadow-md h-40 p-4 rounded-lg bg-white'>
          <div className='flex flex-col h-full justify-between'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-5'>
                <p className='text-gray'>Total Order</p>
                <p className='text-2xl font-bold'>10,293</p>
              </div>
              <Package2 size={45} color='orange'/>            </div>
            <div className='flex gap-2 text-gray'>
              <TrendingUp color='#00B69B' />
              1.3% Up from past week
            </div>
          </div>
        </div>
        <div className='total-card shadow-md h-40 p-4 rounded-lg bg-white'>
          <div className='flex flex-col h-full justify-between'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-5'>
                <p className='text-gray'>Total Sales</p>
                <p className='text-2xl font-bold'>$89,000</p>
              </div>
              <ChartLine size={45} color='green'/>
            </div>
            <div className='flex gap-2 text-gray'>
              <TrendingDown color='red' />
              4.3% Down from yesterday
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default SalesReport