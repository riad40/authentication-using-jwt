import { useState } from 'react'
import axios from 'axios'

function ForgetPassword({ inputs }) {

  const api = axios.create({
    baseURL: 'http://localhost:3002/api'
  })

  const [email, setEmail] = useState({
    email: ''
  })

  const [err, setErr] = useState('')
  const [succ, setSucc] = useState('')

  const inputHandler = (e) => {
    setEmail({...email, [e.target.id]: e.target.value})
  }

  const forgetPwd = (e) => {

    e.preventDefault()

    api.post('/auth/forgetpassword', email, { withCredentials: true })
        .then((response) => {
          setErr('')
          setSucc(response.data.message)
        })
        .catch((err) => {
          setErr(err.response.data.message)
          setSucc('')
        })

  }


  return (
    <>
      <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Forget Password</h1>
      <form onSubmit={forgetPwd} method="post">
        <p className='text-center text-red-300' >{ err }</p>
        <p className='text-center text-green-300' >{ succ }</p>
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

export default ForgetPassword