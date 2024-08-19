import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { Toaster } from 'react-hot-toast'
function App() {


  return (
    <div className='w-full h-screen relative'>
     <Toaster
     containerClassName='toast'
        position='top-center'
        toastOptions={{
          duration: 3000,
          className: 'custom-toast',
          style: {
            backgroundColor: "#fd0",
            fontWeight: "600",
            padding: '16px',
            color: '#214440',
          },
        }} 
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path='/dashboard/*' element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
