import { api } from '../helpers/api'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function VerifyEmail() {

    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')

    const params = useParams()

    useEffect(() => {
      api.get(`/auth/register/verify/${params.token}`)
      .then((response) => {
          console.log(response)
          setMsg(response.data.message)
      }).catch((err) => {
        console.log(err)
        setErr(err.response.data.message)
      })
    })
    
  return (
    <>
        <div style={{ color: "#fff" }}>{ msg }</div>
        <div style={{ color: "red" }}>{ err }</div>
        <Link to="/login" className='text-color'>login</Link>
    </>

  )
}

export default VerifyEmail