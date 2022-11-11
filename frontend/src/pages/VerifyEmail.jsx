import { api } from '../helpers/api'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'

function VerifyEmail() {

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