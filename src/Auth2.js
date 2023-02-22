import React, { useEffect, useState } from "react";
import { auth } from './configuration/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const style = {
  color: 'white',
  marginTop: '20px',
  fontFamily: 'Roboto',
}

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <h2 style={style}>Loading...</h2>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};