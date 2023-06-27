import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './page/Login'
import Layout from './page/Layout'
import Index from './page/Index'
import Register from './page/Register'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
