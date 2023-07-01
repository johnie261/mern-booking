import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const Account = () => {
    const {user, ready, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let {subpage} = useParams()

    if (subpage === undefined) {
        subpage = 'profile'
      }

    if(!ready) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (ready && !user && !redirect) {
      return <Navigate to="/login"/>
    }

    const LinkClass = (type = null) => {
      let classes = 'py-2 px-6'
      if (type === subpage || (subpage === undefined && type ==='profile')) {
        classes += ' bg-primary text-white rounded-full'
      }
      return classes
    } 

    const logout = async() => {
      await axios.post('/logout')
      setUser(null)
      setRedirect('/')
    }

    if (redirect) {
      return <Navigate to={redirect} />
    }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link className={LinkClass('profile')} to={'/account'}>My profile</Link>
        <Link className={LinkClass('bookings')} to={'/account/bookings'}>My bookings</Link>
        <Link className={LinkClass('places')} to={'/account/places'}>My accommodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Login as {user.name} ({user.email}) <br/>
          <button onClick={logout} className='primary max-w-sm mt-3'>Logout</button>
        </div>
      )}
    </div>
  )
}
