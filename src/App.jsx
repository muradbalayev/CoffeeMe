import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPanel'
function App() {

  return (
    <div className='w-full h-screen'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/dashboard/*' element={<AdminPage/> } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
