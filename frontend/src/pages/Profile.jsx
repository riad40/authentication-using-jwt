import { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const [me, setMe] = useState('')
  const [err, setErr ] = useState('')
  const Navigate = useNavigate()

  const { isAuth, setIsAuth } = useContext(AuthContext)

  const role = isAuth.user.role

  const logout = () => {
    api.get(`/auth/logout`, {
      withCredentials: true
    }).then((response) => {
        Navigate('/')
        setIsAuth({
          isLoggedIn: false
        })
      })
      .catch((err) => {
        setErr(err.response.data.message)
      })
  }

  useEffect(() => {
    api.get(`/user/${role}/me`, {
      headers: {'set-cookie': document.cookie},
      withCredentials: true
    }).then((response) => {
        setMe(response.data.message)
      })
      .catch((err) => {
        setErr(err.response.data.message)
      })
  })
    
  return (
    <FormContainer>
      <div className="text-white text-center">
        <h1>{ !err && me }</h1>
        <p className='text-red-200'>{ err }</p>
        <button className='text-color' onClick={ logout }>Log Out</button>
      </div>
    </FormContainer>
  )
}

export default Profile