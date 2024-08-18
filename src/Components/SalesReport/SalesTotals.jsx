import { ChartLine, Package2, TrendingDown, TrendingUp, UsersRound } from 'lucide-react'

const SalesTotals = () => {
  return (
    <div className='totals mt-8 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
    <div className='total-card hover:shadow-xl shadow-md min-h-40 p-4 rounded-lg bg-white min-w-[150px]'>
      <div className='flex flex-col h-full justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-5'>
            <p className='text-gray lg:text-base text-sm'>Total Users</p>
            <p className='lg:text-2xl text-lg font-bold '>40,689</p>
          </div>
          <UsersRound size={45} color='#00B69B'/>
        </div>
        <div className='flex items-center gap-2 text-gray lg:text-base text-xs'>
          <TrendingUp color='#00B69B' />
          8.5% Up from yesterday
        </div>
      </div>
    </div>
    <div className='total-card  hover:shadow-xl shadow-md min-h-40 p-4 rounded-lg bg-white min-w-[150px]'>
      <div className='flex flex-col h-full justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-5'>
            <p className='text-gray lg:text-base text-sm'>Total Order</p>
            <p className='lg:text-2xl text-lg font-bold'>10,293</p>
          </div>
          <Package2 size={45} color='orange'/>            </div>
        <div className='flex items-center gap-2 text-gray lg:text-base text-xs'>
          <TrendingUp color='#00B69B' />
          1.3% Up from past week
        </div>
      </div>
    </div>
    <div className='total-card  hover:shadow-xl shadow-md min-h-40 p-4 rounded-lg bg-white min-w-[150px]'>
      <div className='flex flex-col h-full justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-5'>
            <p className='text-gray lg:text-base text-sm'>Total Sales</p>
            <p className='font-bold lg:text-2xl text-lg'>$89,000</p>
          </div>
          <ChartLine size={45} color='green'/>
        </div>
        <div className='flex items-center gap-2 text-gray lg:text-base text-xs'>
          <TrendingDown color='red' />
          4.3% Down from yesterday
        </div>
      </div>
    </div>

  </div>
  )
}

export default SalesTotals
