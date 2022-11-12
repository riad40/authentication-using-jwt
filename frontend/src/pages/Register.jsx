import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'

function Register({ inputs }) {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password:'',
        role: ''
    })

    const [err, setErr] = useState('')
    const [succ, setSucc] = useState('')
    const [roles, setRoles] = useState([])
    const [rolesErr, setRolesErr] = useState()

    const inputHandler = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    useEffect(() => {
        api.get('auth/roles')
        .then((res) => {
            setRoles(res.data.role)
        })
        .catch((err) => {
            setRolesErr(err.response.data.message)
        })
    }, [])
    

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
                    { rolesErr && <p className='text-center text-red-300' >{ rolesErr }</p> }
                    <select name="role" id='role' className='block mt-4 mb-1 p-3 w-full' style={{backgroundColor: '#303246', outline: 'none', color: 'white', padding: '10px', borderRadius: '10px'  }} onChange={inputHandler} value={ user.role }>
                        { 
                            roles.map((role) => (
                                <option value={ role.role }>{ role.role }</option>
                            ))
                        }
                    </select>
                    <button type="submit" className='block my-5 text-dark font-medium cursor-pointer w-full' style={{ backgroundColor: '#41CD7D', outline: 'none', padding: '10px', borderRadius: '10px' }}>Submit</button>
                </form>
                <div className="flex flex-col items-center py-3 options">
                    <span>Already have an account ?</span>
                    <Link to="/login" className="text-xl">Log In</Link>
                </div>
            </FormContainer>
        </>
    )
  }
  
  export default Register