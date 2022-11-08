import { Home, Login, Profile, Register, VerifyEmail, ForgetPassword, ResetPassword, NotFound } from './components/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  const inputs = [
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'submit',
      id: 'submit',
      name: 'submit',
      value: 'Submit',
      class: 'block my-5 text-dark font-medium cursor-pointer w-full',
      style: {
        backgroundColor: '#41CD7D', 
        outline: 'none', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    }
  ]
  const inputs1 = [
    {
      type: 'text',
      id: 'username',
      name: 'username',
      label: 'Username',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'text',
      id: 'role',
      name: 'role',
      label: 'Role',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'submit',
      id: 'submit',
      name: 'submit',
      value: 'Submit',
      class: 'block my-5 text-dark font-medium cursor-pointer w-full',
      style: {
        backgroundColor: '#41CD7D', 
        outline: 'none', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    }
  ]
  const inputs2 = [
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'submit',
      id: 'submit',
      name: 'submit',
      value: 'Submit',
      class: 'block my-5 text-dark font-medium cursor-pointer w-full',
      style: {
        backgroundColor: '#41CD7D', 
        outline: 'none', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    }
  ]
  const inputs3 = [
    {
      type: 'password',
      id: 'newpassword',
      name: 'newpassword',
      label: 'New Password',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'password',
      id: 'repeatpassword',
      name: 'repeatpassword',
      label: 'Repeat Password',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'submit',
      id: 'submit',
      name: 'submit',
      value: 'Submit',
      class: 'block my-5 text-dark font-medium cursor-pointer w-full',
      style: {
        backgroundColor: '#41CD7D', 
        outline: 'none', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    }
  ]

  return (
    <div className="App">
      <Router>
        <div className="w-2/5 rounded-lg" style={ { backgroundColor: '#202442'}}>
          <div className="p-5">
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/login" element={ <Login inputs={ inputs } /> } />
              <Route path="/register" element={ <Register inputs={ inputs1 } /> } />
              <Route path="/verify/:token" element={ <VerifyEmail /> } />
              <Route path='/profile' element={ <Profile /> } />
              <Route path="/forgetpassword" element={ <ForgetPassword inputs={ inputs2 } /> } />
              <Route path='/resetpassword/:token' element={ <ResetPassword inputs={ inputs3 } /> } />
              <Route path='*' element={ <NotFound /> } />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App