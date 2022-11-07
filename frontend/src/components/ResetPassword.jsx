import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ResetPassword({ inputs }) {

  const api = axios.create({
    baseURL: 'http://localhost:3002/api'
  })

  const [pwds, setPwds] = useState({})

  const inputHandler = (e) => {
    setPwds({...pwds, [e.target.id]: e.target.value})
  }

  const params = useParams()

  const resetPassword = (e) => {

    e.preventDefault()

    api.post(`/auth/resetpassword/${params.token}`, pwds)
        .then((response) => console.log(response.data.message))
        .catch((err) => console.log(err))
  }

  return (
    <>
      <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Reset Password</h1>
      <form onSubmit={ resetPassword } method="post">
        {
          inputs.map((input) => (
            <>
              <label for={input.id} className="font-medium my-2" style={ { display: 'block', color: 'rgb(138, 138, 138)' } }>{input.label}</label>
              <input type={input.type} id={input.id} name={input.name} className={input.class} value={input.value} style={input.style} onChange={inputHandler} />
            </>
          )) 
        }
      </form>
    </>
  )
}

export default ResetPassword