import { createContext, useState } from 'react'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

  const [isAuth, setIsAuth] = useState({
    isLoggedIn: false,
    user: {
      username: '',
      role: ''
    }
  })

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext