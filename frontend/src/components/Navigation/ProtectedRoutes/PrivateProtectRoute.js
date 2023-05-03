import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate ,Outlet } from 'react-router-dom'



const PrivateProtectRoute = () => {
    //check if user login or not
    const user =  useSelector(state => state?.user)
    const userAuth = user
    return (
        userAuth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateProtectRoute