import React from 'react'
import { getUser } from '../../utils/getUser'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    let token = getUser()
    if(token){
        return children
    }else{
        return <Navigate to='/login'/>
    }
}

export default AuthRoute