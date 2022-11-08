import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Profile() {

  const [me, setMe] = useState('')
  const [err, setErr ] = useState('')

  const role = localStorage.getItem('role') || 'customer'

  const logout = () => {
    localStorage.clear()
    document.cookie.clear()
  }

  const api = axios.create({
    baseURL: 'http://localhost:3002/api'
  })

  api.get(`/user/${role}/me`, {
    headers: {'set-cookie': document.cookie},
    withCredentials: true
  }).then((response) => {
      setMe(response.data.message)
    })
    .catch((err) => {
      setErr(err.response.data.message)
    })
    
  return (
    <div className="text-white text-center">
      <h1>{ me }</h1>
      <p className='text-red-200'>{ err }</p>
      <Link to="/" onClick={ logout }>Log Out</Link>
    </div>
  )
}

export default Profile