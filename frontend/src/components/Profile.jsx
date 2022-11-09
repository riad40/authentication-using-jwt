import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useContext } from 'react'
import AuthContext from './AuthContext'

function Profile() {

  const [me, setMe] = useState('')
  const [err, setErr ] = useState('')

  const { isAuth } = useContext(AuthContext)

  const role = isAuth.user.role || 'customer'

  console.log(isAuth);

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
    
    const {isLoggedIn} = useContext(AuthContext)
    console.log(isLoggedIn);

  return (
    <div className="text-white text-center">
      <h1>{ !err && me }</h1>
      <p className='text-red-200'>{ err }</p>
      <Link to="/" onClick={ logout }>Log Out</Link>
    </div>
  )
}

export default Profile