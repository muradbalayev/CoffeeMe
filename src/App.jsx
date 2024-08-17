import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
function App() {

  return (
    <div className='w-full h-screen'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/dashboard/*' element={<DashboardPage/> } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
