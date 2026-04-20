import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.user)

  // 1. Not logged in → go to login
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  // 2. Role not allowed → go to home
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />
  }

  // 3. Allowed → show page
  return <Outlet />
}

export default PrivateRoute