import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { decodeJwt } from 'jose'
export const AppAuthContext = createContext();

const AppAuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useLocalStorage('ACT');
  const [userData, setUserData] = useLocalStorage('userData');
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const providerValue = {
    userToken,
    setUserToken,
    userData,
    setUserData,
    authenticatedUser,
    setAuthenticatedUser
  }




  return (
    <AppAuthContext.Provider value={providerValue}>
      {children}
    </AppAuthContext.Provider>
  )
};

export default AppAuthProvider;