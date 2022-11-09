import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext'

function IsLoggedIn() {

    const { isAuth } = useContext(AuthContext)

    // let isAuth = true

    return isAuth.isLoggedIn ? <Outlet /> : <Navigate to="/login" />

}

export default IsLoggedIn