import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import FormContainer from '../components/FormContainer'

function Register({ inputs }) {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password:'',
        repeatpassword: '',
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
            setRolesErr(err.response?.data?.message)
        })
    })

    let frntErrs = false

    const inputsValidation = () => {
        if(user.username === '') {
            inputs[0].err = true
            inputs[0].errMsg = 'username is required'
            frntErrs = true
        } 
        if(user.email === '') {
          inputs[1].err = true
          inputs[1].errMsg = 'email is required'
          frntErrs = true
        } else if(!user.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]{2,})+$/)) {
          inputs[1].err = true
          inputs[1].errMsg = 'invalid email format'
          frntErrs = true
        }
        if(user.password === '') {
          inputs[2].err = true
          inputs[2].errMsg = 'Password is required'
          frntErrs = true
        } else if(user.password.length < 4) {
            inputs[2].err = true
            inputs[2].errMsg = 'Password mus be at least 4 chars'
            frntErrs = true
        }
        if(user.repeatpassword === '') {
            inputs[3].err = true
            inputs[3].errMsg = 'Repeat Password is required'
            frntErrs = true
        } else if(user.repeatpassword !== user.password) {
            inputs[3].err = true
            inputs[3].errMsg = `Passwords dosen't match`
            frntErrs = true
        }
    }
    

    const register = (e) => {
        
        e.preventDefault()

        inputsValidation()

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
                    <p className='text-center text-red-300' >{ !frntErrs && err }</p>
                    <p className='text-center text-green-300' >{ succ }</p>
                {
                    inputs.map((input) => (
                    <div>
                        <label for={input.id} className="font-medium my-2" style={{display: 'block', color: 'rgb(138, 138, 138)'} }>{input.label}</label>
                        <input type={input.type} id={input.id} name={input.name} className={input.class} placeholder={input.placeholder} value={input.value} style={input.style} onChange={inputHandler} />
                        <p className='text-red-300'>{ input.err && input.errMsg }</p>
                    </div>
                    )) 
                }   
                    { rolesErr && <p className='text-center text-red-300' >{ rolesErr }</p> }
                    <label for="role" className="font-medium my-2" style={{display: 'block', color: 'rgb(138, 138, 138)'} }>Select Role</label>
                    <select name="role" id='role' className='block p-3 w-full' style={{backgroundColor: '#303246', outline: 'none', color: 'white', padding: '10px', borderRadius: '10px', WebkitAppearance: 'none', MozAppearance: 'none' }} onChange={inputHandler} value={ user.role }>
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