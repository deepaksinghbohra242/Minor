import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate ,Outlet } from 'react-router-dom'



const AdminRoute = () => {
    //check if user login or not
    const user =  useSelector(state => state?.user)
    const userAuth = user
    return (
        userAuth?.isAdmin ? <Outlet /> : <Navigate to="/login" />
    )
}

export default AdminRoute

// import React from "react";
// import { useSelector } from "react-redux";
// import { Route, Navigate ,Outlet } from "react-router-dom";

// const AdminRoute = () => {
//   //check if user is loggin
//   const user = useSelector(state => state?.users);
//   const { userAuth } = user;
//   return (
//     <Route
//       render={() =>
//         userAuth?.isAdmin ?< Outlet /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default AdminRoute;