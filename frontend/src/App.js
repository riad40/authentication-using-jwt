import { Home, Login, Profile, Register, VerifyEmail, ForgetPassword, ResetPassword, NotFound, IsLoggedIn } from './pages/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { inputs, inputs1, inputs2, inputs3} from './helpers/inputs' 

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login inputs={ inputs } /> } />
            <Route path="/register" element={ <Register inputs={ inputs1 } /> } />
            <Route path="/verify/:token" element={ <VerifyEmail /> } />
            <Route element={ <IsLoggedIn /> }>
              <Route path='/profile' element={ <Profile /> } />
            </Route>
            <Route path="/forgetpassword" element={ <ForgetPassword inputs={ inputs2 } /> } />
            <Route path='/resetpassword/:token' element={ <ResetPassword inputs={ inputs3 } /> } />
            <Route path='*' element={ <NotFound /> } />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App