import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const genderdata = [
    { name: 'Male', value: 38.6 },
    { name: 'Female', value: 22.5 },
];

const agedata = [
    { name: '18-35 years', value: 38.6 },
    { name: '35-45 years', value: 22.5 },
];

const COLORSGENDER = ['#214440', '#A8C5DA'];
const COLORSAGE = ['#A8C5DA', '#1C1C1CCC'];
const SalesCharts = () => {
  return (
    <div className='flex mt-5 lg:flex-row flex-col items-center justify-around'>
    <div className="chart-container relative min-w-[350px] h-[350px]">
    <ResponsiveContainer width='100%' height='100%'>
        <h1 className='absolute font-semibold top-10 left-10'>Sales by Gender</h1>
        <PieChart>
            <Pie
                data={genderdata}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
            >
                {genderdata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORSGENDER[index % COLORSGENDER.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
            />
        </PieChart>
    </ResponsiveContainer>
</div>
<div className="chart-container relative min-w-[350px] h-[350px]">
    <ResponsiveContainer width='100%' height='100%'>
        <h1 className='absolute font-semibold top-10 left-10'>Sales by Age</h1>
        <PieChart>
            <Pie
                data={agedata}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
            >
                {agedata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORSAGE[index % COLORSAGE.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
            />
        </PieChart>
    </ResponsiveContainer>
</div>
 
</div>
  )
}

export default SalesCharts
