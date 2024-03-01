import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivatRoute = () => {
  const isLogin = localStorage.getItem("isLogin")
  if (isLogin) {
    return (<div><Outlet /></div>)
  } else {
    return <Navigate to="/login" />
  }
}
