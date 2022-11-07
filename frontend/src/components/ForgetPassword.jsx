import { useState } from 'react'
import axios from 'axios'

function ForgetPassword({ inputs }) {

  const api = axios.create({
    baseURL: 'http://localhost:3002/api'
  })

  const [email, setEmail] = useState({})

  const inputHandler = (e) => {
    setEmail({...email, [e.target.id]: e.target.value})
  }

  const forgetPwd = (e) => {

    e.preventDefault()

    api.post('/auth/forgetpassword', email, { withCredentials: true })
        .then((response) => {
        console.log(response.data)
        })
        .catch((err) => {
        console.log(err.response.data.message)
        })

  }


  return (
    <>
      <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Forget Password</h1>
      <form onSubmit={forgetPwd} method="post">
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