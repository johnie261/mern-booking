import { useState, useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../context/userContext"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/login', {email, password})
      setUser(res.data)
      alert("Login successful")
      setRedirect(true)
    } catch(error) {
      alert("not successful")
    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
       <div className="mb-40">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <input 
              type="email"
              placeholder="enter your email"
              value = {email}
              onChange = {e => setEmail(e.target.value)} />
            <input 
              type="password"
              placeholder="password"
              value = {password}
              onChange = {e => setPassword(e.target.value)} />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Dont have an account yet? <Link to="/register" className="underline text-black">Register Now</Link>
            </div>
          </form>
       </div>
    </div>
  )
}

export default Login