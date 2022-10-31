import { Link } from 'react-router-dom'

function Register({ inputs }) {

    return (
        <>
            <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Register</h1>
            <form action="/Register" method="post">
            {
                inputs.map((input) => (
                <>
                    <label for={input.id} className="font-medium my-2" style={ { display: 'block', color: 'rgb(138, 138, 138)' } }>{input.label}</label>
                    <input type={input.type} id={input.id} name={input.name} className={ input.class } value={ input.value } style={ input.style } />
                </>
                )) 
            }
            </form>
            <div class="flex flex-col items-center py-3 options">
            <span>Already have an account ?</span>
            <Link to="/" className="text-xl">Log In</Link>
            </div>
        </>
    )
  }
  
  export default Register