import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Register({ inputs }) {

    const api = axios.create({
        baseURL: 'http://localhost:3002/api'
    })

    const [user, setUser] = useState({})

    const inputHandler = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const register = (e) => {
        
        e.preventDefault()

        api.post('/auth/register', user)
            .then((response) => {
                console.log(response.data.message)
            })
            .catch((err) => console.log(err.response.data.message))
    }

    return (
        <div>
            <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Register</h1>
            <form onSubmit = { register } method="post">
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
        </div>
    )
  }
  
  export default Register