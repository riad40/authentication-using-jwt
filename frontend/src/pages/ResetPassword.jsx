import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'

function ResetPassword({ inputs }) {

  const [pwds, setPwds] = useState({
    newpassword:''
  })

  const inputHandler = (e) => {
    setPwds({...pwds, [e.target.id]: e.target.value})
  }

  const [err, setErr] = useState('')
  const [succ, setSucc] = useState('')

  const params = useParams()

  const resetPassword = (e) => {

    e.preventDefault()

    api.post(`/auth/resetpassword/${params.token}`, pwds)
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
      <FormContainer>
        <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Reset Password</h1>
        <form onSubmit={ resetPassword } method="post">
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
      </FormContainer>
    </>
  )
}

export default ResetPassword