import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './page/Login'
import Layout from './page/Layout'
import Index from './page/Index'
import Register from './page/Register'
import axios from 'axios'
import { UserContextProvider } from './context/userContext'
import { Account } from './page/Account'

// axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/:subpage?" element={<Account />}/>
            <Route path="/account/:subpage/:action" element={<Account />}/>
          </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App
