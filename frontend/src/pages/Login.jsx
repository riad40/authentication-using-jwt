import { useState, useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'

function Login({ inputs }) {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [err, setErr] = useState('')


  const { isAuth, setIsAuth } = useContext(AuthContext)

  const inputHandler = (e) => {
    setUser({...user, [e.target.id]: e.target.value})
  }

  let frntErrs = false

  const inputsValidation = () => {
    if(user.email === '') {
      inputs[0].err = true
      inputs[0].errMsg = 'email is required'
      frntErrs = true
    } 
    if(!user.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]{2,})+$/)) {
      inputs[0].err = true
      inputs[0].errMsg = 'invalid email format'
      frntErrs = true
    }
    if(user.password === '') {
      inputs[1].err = true
      inputs[1].errMsg = 'Password is required'
      frntErrs = true
    }
  }

  const login = (e) => {

    e.preventDefault()

    inputsValidation()

    api.post('/auth/login', user, { withCredentials: true })
      .then((response) => {
        setIsAuth({
          isLoggedIn: true,
          user: {
            role: response.data.role
          }
        })
      })
      .catch((err) => {
        setIsAuth({
          isLoggedIn: false
        })
        setErr(err.response.data.message)
      })
  }

  return (
    <>
      <FormContainer>
        <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Log In</h1>
        <form onSubmit={login} method="post">
          <p className='text-center text-red-300'>{ !frntErrs && err }</p>
          {
            inputs.map((input) => (
              <>
                <label for={input.id} className="font-medium my-2" style={ { display: 'block', color: 'rgb(138, 138, 138)' } }>{input.label}</label>
                <input type={input.type} id={input.id} name={input.name} className={input.class} value={input.value} placeholder={input.placeholder} style={input.style} onChange={inputHandler} />
                <p className='text-red-300'>{ input.err && input.errMsg }</p>
              </>
            )) 
          }
          <div className="flex flex-col items-start mt-2 options">
            <Link to="/forgetpassword" className="text-sm">Forget Password ?</Link>
          </div>
          <button type="submit" className='block my-5 text-dark font-medium cursor-pointer w-full' style={{ backgroundColor: '#41CD7D', outline: 'none', padding: '10px', borderRadius: '10px' }}>Submit</button>
          <div className="flex flex-col items-center py-3 options">
            <span>Don't have an account ?</span>
            <Link to="/register" className="text-xl">Register</Link>
          </div>
        </form>
        { isAuth.isLoggedIn && <Navigate to='/profile' /> }
      </FormContainer>
    </>
  )
}

export default Login