import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUser } from './../../../../store/userSlice'
import JwtService from './../../../../@core/auth/jwt/jwtService'
import { useNavigate } from 'react-router-dom'

const jwt = new JwtService()

const index = ({ onSubmit, onSwitchToLogin, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '+1',
      phoneNumber: '',
      email: '',
      userType: 0,
    },
  })

  // ✅ Watch userType changes
  const watchedUserType = watch('userType')

  useEffect(() => {
    setUserType(watchedUserType)
  }, [watchedUserType])

  // ✅ Handle user type button click
  const handleUserTypeClick = (typeId) => {
    setValue('userType', typeId)
    setUserType(typeId)
    clearErrors('userType')
  }

  // ✅ Handle form submission + API integration
const handleFormSubmit = async (data) => {
  if (!data.userType) {
    setError('userType', {
      type: 'required',
      message: 'Please select a user type before signing up',
    })
    return
  }

  try {
    console.log('📤 Sending signup data to backend:', data)

    const response = await jwt.register(data)

    dispatch(setUser(response.data))

    console.log('✅ Signup success:', response.data)
    console.log("👉 UserType:", response.data?.data?.userType);
  

    if (response.data?.accessToken) {
      jwt.setToken(response.data.accessToken)
      jwt.setRefreshToken(response.data.refreshToken)
    }

    if (onSubmit) {
      onSubmit(response.data)
    }
if(response.data?.data?.userType === 2){
  navigate('/updateProfile')
}else{
// ✅ Redirect to OTP verification page after successful signup
    navigate('/otp-verification')
}
    

  } catch (error) {
    console.error('❌ Signup failed:', error.response?.data || error.message)
    setErrorMsg(error.response?.data?.message || 'Signup failed')
  }
}

  // ✅ Handle login switch
  const handleSwitchToLogin = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin() // agar modal se call hua hai toh parent ka callback chalega
    } else {
      navigate('/signin') // agar route se open hua hai toh login page par bhej do
    }
  }

  const userTypes = [
    { id: 1, label: 'Client', icon: '👤', description: 'Pet owner seeking services' },
    { id: 2, label: 'Doctor', icon: '👨‍⚕️', description: 'Veterinary professional' },
    { id: 3, label: 'Service Provider', icon: ' 🐾 ', description: 'Pet Servies' },
  ]

  return (
    <div className="my-20 bg-white shadow-lg border border-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 xl:px-16 2xl:px-40 max-w-full mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join Metavet</h2>
        <p className="text-gray-600 text-sm">Create your account to get started</p>
      </div>

      {/* ✅ Hook up API integration with handleSubmit */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
        {/* User Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800 mb-3">I am a...</label>

          <input type="hidden" {...register('userType')} value={userType || ''} />

          <div className="grid grid-cols-1 gap-3">
            {userTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleUserTypeClick(type.id)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                  userType === type.id
                    ? 'bg-primary/5 border-primary text-primary shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl sm:text-2xl">{type.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base">{type.label}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate sm:whitespace-normal">{type.description}</p>
                  </div>
                  {userType === type.id && (
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {errors.userType && (
            <p className="text-red-500 text-sm flex items-center mt-2">
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.userType.message}
            </p>
          )}
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">First Name</label>
            <input
              type="text"
              {...register('firstName', {
                required: 'First name is required',
                minLength: { value: 2, message: 'First name must be at least 2 characters' },
              })}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
                errors.firstName
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-primary hover:border-gray-300'
              } focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`}
              placeholder="First name"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Last Name</label>
            <input
              type="text"
              {...register('lastName', {
                required: 'Last name is required',
                minLength: { value: 2, message: 'Last name must be at least 2 characters' },
              })}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
                errors.lastName
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-200 focus:border-primary hover:border-gray-300'
              } focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`}
              placeholder="Last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Phone Number</label>
          <div className="flex gap-2 sm:gap-3">
            <div className="w-2/5 sm:w-1/3">
              <select
                {...register('countryCode', { required: 'Country code is required' })}
                className={`w-full px-2 sm:px-3 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
                  errors.countryCode
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-200 focus:border-primary hover:border-gray-300'
                } bg-gray-50 focus:bg-white`}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
            </div>
            <div className="w-3/5 sm:w-2/3">
              <input
                type="tel"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
                  errors.phoneNumber
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-200 focus:border-primary hover:border-gray-300'
                } focus:outline-none bg-gray-50 focus:bg-white`}
                placeholder="Enter 10-digit number"
              />
            </div>
          </div>
          {(errors.countryCode || errors.phoneNumber) && (
            <p className="text-red-500 text-sm">
              {errors.countryCode?.message || errors.phoneNumber?.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Email Address</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
              errors.email
                ? 'border-red-400 focus:border-red-500'
                : 'border-gray-200 focus:border-primary hover:border-gray-300'
            } focus:outline-none bg-gray-50 focus:bg-white`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <p className="text-red-500 text-sm text-center">{errorMsg}</p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 text-sm sm:text-base"
        >
          Send OTP
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="text-primary font-semibold hover:underline"
          >
            Sign in instead
          </button>
        </p>
      </div>
    </div>
  )
}

export default index