import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import JwtService from './../../../../@core/auth/jwt/jwtService'
import { Alert } from '@mui/material'
import { setUser } from './../../../../store/userSlice'

const jwt = new JwtService()

const LoginForm = ({ onSubmit }) => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      phone_number: '',
    },
  })

  const handleFormSubmit = async (data) => {
    try {
      setErrorMsg('')

      // Call the login API
      debugger
      const response = await jwt.login(data)
      const loginData = response.data

      const token = loginData.token

      // Set JWT tokens if available
      if (loginData?.accessToken) {
        jwt.setToken(loginData.accessToken)
        jwt.setRefreshToken(loginData.refreshToken)
      }

      if (onSubmit) {
        onSubmit(loginData)
      }

      reset()

      // Navigate to OTP Verification with dynamic OTP and phone
      navigate(`/otp-verification/${token}`, {
        state: {
          otp: loginData.otp,
          phone: data.phone_number,
        },
        replace: true,
      })
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error.message)
      setErrorMsg(error.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  // 👇 Function to handle navigation to signup page
  const onSwitchToSignup = () => {
    navigate('/SignUp')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">Sign in to your Metavet account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
          {/* Phone Number Field */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                {...register('phone_number', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number',
                  },
                })}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base md:text-lg ${
                  errors.phone_number
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-200 focus:border-primary hover:border-gray-300'
                }`}
                placeholder="Enter your 10-digit phone number"
              />
              {errors.phone_number && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.phone_number && (
              <p className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {errorMsg && (
            <Alert severity="error">{errorMsg}</Alert>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 sm:py-3 md:py-4 px-4 rounded-lg bg-primary text-white font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 text-sm sm:text-base md:text-lg"
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {isSubmitting ? 'Sending...' : 'Send OTP'}
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm md:text-base">
              <span className="px-4 bg-white text-gray-500">New to Metavet?</span>
            </div>
          </div>

          {/* Switch to Signup */}
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200 hover:underline decoration-2 underline-offset-2 text-xs sm:text-sm md:text-base"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create new account
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
          <p className="text-center text-[10px] sm:text-xs md:text-sm text-gray-500">
            By continuing, you agree to Metavet&apos;s Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
