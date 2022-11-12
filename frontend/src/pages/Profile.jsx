import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'

function Profile() {

  const [me, setMe] = useState('')
  const [err, setErr ] = useState('')

  const { isAuth } = useContext(AuthContext)

  const role = isAuth.user.role || 'customer'

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
    <FormContainer>
      <div className="text-white text-center">
        <h1>{ !err && me }</h1>
        <p className='text-red-200'>{ err }</p>
        <p className='text-color'>Log Out</p>
      </div>
    </FormContainer>
  )
}

export default Profile