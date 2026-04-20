import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axioInstance"
import { useDispatch, useSelector } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const { loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    try {
      dispatch(signInStart())

      const response = await axiosInstance.post(
        "/auth/sign-in",
        { email, password },
        { withCredentials: true }
      )

      console.log("LOGIN RESPONSE:", response.data)

      // ✅ FIX 1: Extract user and token correctly
      const { token, ...user } = response.data

      // ✅ FIX 2: Store token in localStorage
      localStorage.setItem("token", token)

      // ✅ FIX 3: Store user in Redux and localStorage
      dispatch(signInSuccess(user))
      localStorage.setItem("user", JSON.stringify(user))

      // ✅ FIX 3: Correct role check
      if (user.role === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/user/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
        dispatch(signInFailure(error.response.data.message))
      } else {
        setError("Something went wrong. Please try again!")
        dispatch(signInFailure("Something went wrong. Please try again!"))
      }
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPeopleGroup className="text-4xl text-blue-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                Task-Manager
              </h1>

              <p className="text-gray-600 mt-1">
                Manage your Tasks efficiently
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 pr-12"
                    placeholder="•••••••"
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {loading ? (
                <span className="block text-center py-3 bg-blue-600 text-white">
                  Loading...
                </span>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-md"
                >
                  LOGIN
                </button>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login