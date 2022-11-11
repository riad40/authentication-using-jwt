import { Link } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'

function Register({ inputs }) {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password:''
    })

    const [err, setErr] = useState('')
    const [succ, setSucc] = useState('')

    const inputHandler = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const register = (e) => {
        
        e.preventDefault()

        api.post('/auth/register', user)
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
                <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Register</h1>
                <form onSubmit = { register } method="post">
                    <p className='text-center text-red-300' >{ err }</p>
                    <p className='text-center text-green-300' >{ succ }</p>
                {
                    inputs.map((input) => (
                    <div>
                        <label for={input.id} className="font-medium my-2" style={{display: 'block', color: 'rgb(138, 138, 138)'} }>{input.label}</label>
                        <input type={input.type} id={input.id} name={input.name} className={input.class} value={input.value} style={input.style} onChange={inputHandler} />
                    </div>
                    )) 
                }
                </form>
                <div class="flex flex-col items-center py-3 options">
                    <span>Already have an account ?</span>
                    <Link to="/login" className="text-xl">Log In</Link>
                </div>
            </FormContainer>
        </>
    )
  }
  
  export default Register