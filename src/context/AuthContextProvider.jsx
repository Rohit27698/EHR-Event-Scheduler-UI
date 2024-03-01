import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext()

export const AuthContextProvider = ({children}) => {
  const[user,setUser]=useState('')
  const[isLogged,setIsLogged]=useState(false);
  const logout=()=>{
    setIsLogged(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLogin');
    setUser('')

  }
  useEffect(()=>{
    const user = localStorage.getItem("user")
    const isLogin = localStorage.getItem("isLogin")
    if(isLogin){
      setUser(user);
      setIsLogged(true)
    }
  },[])
  // console.log(user)
  return (
    <AuthContext.Provider value={{user,isLogged,setUser,logout,setIsLogged}}>
      {children}
    </AuthContext.Provider>
  )
}
