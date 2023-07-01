import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await axios.post('/register', {
        name,
        email,
        password
      })
      toast.success('Registration successful');
    } catch (error) {
        console.log(error);
      toast.error('Registration failed')
      alert('not successful')
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
       <div className="mb-40">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit = {handleSubmit}>
            <input 
              type="name"
              placeholder="your name"
              value = {name}
              onChange = {e => setName(e.target.value)} />
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
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already have an account? <Link to="/login" className="underline text-black">Login Now</Link>
            </div>
          </form>
       </div>
    </div>
  )
}

export default Register