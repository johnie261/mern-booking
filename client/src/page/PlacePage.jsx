import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../components/perks'
import axios from 'axios'

const PlacePage = () => {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  const {action} = useParams()

  const addPhotoByLink = async(e) => {
    e.preventDefault()
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
    setAddedPhotos((prev) => [...prev, filename]);
    setPhotoLink('')
  }

  const uploadPhoto = (e) => {
    const files = e.target.files
    const data = new FormData()
    for(let i = 0; i<files.length; i++) {
        data.set('photos', files[i])
    }
    axios.post('/upload', data, {
      headers: {'content-type' : 'multipart/form-data'}
    }).then(res => {
      const {data:filenames} = res
      setAddedPhotos((prev) => [...prev, ...filenames]);
    })
  }

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to='/account/places/new'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
           </svg>
           Add new place
        </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            <h2 className='mt-4 text-2xl'>Title</h2>
            <input 
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}  
              placeholder='title, for example: my lovely apt' />
            <h2 className='mt-4 text-2xl'>Address</h2>
            <input 
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}  
              placeholder='address'/>
            <h2 className='mt-4 text-2xl'>Photos</h2>
            <div className='flex gap-2'>
              <input 
                type='text' 
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)} 
                placeholder={'Add using a link ... jpg'} />
              <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
            </div>
            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'> 
              {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                <div key={index} className='flex h-32'>
                  <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/'+link} />
                </div>
               ))}
              <label className='h-32 cursor-pointer flex justify-center items-center gap-1 bg-transparent border rounded-2xl p-2 text-2xl text-gray-600'>
                <input multiple type='file' onChange={uploadPhoto} className='hidden'/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                upload
              </label>
            </div>
            <h2 className='mt-4 text-2xl'>Description</h2>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
            <h2 className='mt-4 text-2xl'>Perks</h2>
            <p className='text-gray-500 text-sm'>Select all the perks of your place</p>
            <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            <h2 className='mt-4 text-2xl'>Extra info</h2>
            <p className='text-gray-500 text-sm'>House rules, etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}   
            />
            <h2 className='mt-4 text-2xl'>check in, check out and max quest</h2>
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 -mb-1'>check in time</h3>
                <input 
                  type='text' 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)} 
                  placeholder='14:00'/>
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>check out time</h3>
                <input
                  type='text' 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)} 
                  placeholder='14:00'/>
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Number of guests</h3>
                <input 
                  type='number' 
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)} 
                  placeholder='12'/>
              </div>
            </div>
            <button className='primary mt-4'>save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PlacePage