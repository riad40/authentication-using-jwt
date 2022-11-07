import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'

function VerifyEmail() {

    const api = axios.create({
        baseURL: 'http://localhost:3002/api'
    })

    const [msg, setMsg] = useState('tst')

    const params = useParams()
    api.get(`/auth/register/verify/${params.token}`)
        .then((response) => {
            console.log(response)
            setMsg(response.data.message)
        }).catch((err) => console.log(err))

  return (
    <>
        <div style={{ color: "#fff" }}>{ msg }</div>
        <Link to="/login" className='text-color'>login</Link>
    </>

  )
}

export default VerifyEmail