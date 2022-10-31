import { Link } from 'react-router-dom'

function Login({ inputs }) {

  return (
    <>
      <h1 className="block py-4 text-white text-2xl font-400 text-center text-color">Log In</h1>
      <form action="/login" method="post">
        {
          inputs.map((input) => (
            <>
              <label for={input.id} className="font-medium my-2" style={ { display: 'block', color: 'rgb(138, 138, 138)' } }>{input.label}</label>
              <input type={input.type} id={input.id} name={input.name} className={ input.class } value={ input.value } style={ input.style } />
            </>
          )) 
        }
        <div class="flex flex-col items-center py-3 options">
          <span>Don't have an account ?</span>
          <Link to="/register" className="text-xl">Register</Link>
        </div>
      </form>
    </>
  )
}

export default Login