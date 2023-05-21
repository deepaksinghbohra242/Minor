import React from "react";
import AdminNavbar from "./Admin/AdminNavbar";
import { useSelector } from "react-redux";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";


const Navbar = () => {
  //get user from store
  const state = useSelector(state => state.users)
  const {userAuth ,profile} = state;
  // console.log(profile);
  const isAdmin = userAuth?.isAdmin;
  const isAccountVerified  = state?.profile?.isAccountVerified  ;

  //account verification
  const account  = useSelector(state => state?.accountVerification);
  const {loading , appErr ,serverErr, token} = account
  // console.log(isAccountVerified);
  return (
    <>
      {isAdmin ? (<AdminNavbar isLogin={userAuth} />) : userAuth ? (<PrivateNavbar isLogin={userAuth} />) : (<PublicNavbar isLogin={userAuth} />)}
      {/* display alerts */}
      {userAuth && !userAuth?.isVerified && <AccountVerificationAlertWarning />}
      {loading && <h2 className="text-center">loading please wait ...</h2> }
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? <h2 className="text-center text-red-500">{serverErr} {appErr}</h2> : null}
    </>
  );
};

export default Navbar;
