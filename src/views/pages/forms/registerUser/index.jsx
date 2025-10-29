import { useState, useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';

import useJwt from '../../../../enpoints/jwt/useJwt'

// dummy implementation for a simple store and dispatch
const useDispatch = () => (action) => console.log('Dispatching action:', action);
const setUser = (user) => ({ type: 'SET_USER', payload: user });

// Main Registration Component
const RegistrationComponent = ({ onSubmit, onSwitchToLogin, onClose }) => {

  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0)
  const [otp, setOtp] = useState();
  const [mobile, setMobile] = useState();

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

  const watchedUserType = watch('userType')

  useEffect(() => {
    setUserType(watchedUserType)
  }, [watchedUserType])

  const handleUserTypeClick = (typeId) => {
    setValue('userType', typeId)
    setUserType(typeId)
    clearErrors('userType')
    setErrorMsg(''); // ✅ Clear API error when user selects type
    setValidationErrors([]); // ✅ Clear validation errors array
    setCurrentErrorIndex(0); // ✅ Reset error index
  }

  // ✅ Helper function to extract validation errors as array
  const extractValidationErrors = (errorResponse) => {
    if (errorResponse?.data?.errors) {
      const errors = errorResponse.data.errors;
      const errorMessages = [];
      
      // If errors is an object with field names as keys
      if (typeof errors === 'object' && !Array.isArray(errors)) {
        Object.keys(errors).forEach(field => {
          if (Array.isArray(errors[field])) {
            // If field has multiple errors (array)
            errors[field].forEach(msg => errorMessages.push(msg));
          } else if (typeof errors[field] === 'string') {
            // If field has single error (string)
            errorMessages.push(errors[field]);
          }
        });
      }
      // If errors is an array
      else if (Array.isArray(errors)) {
        errorMessages.push(...errors);
      }
      // If errors is a string
      else if (typeof errors === 'string') {
        errorMessages.push(errors);
      }
      
      return errorMessages;
    }
    
    return [];
  }

  // ✅ Function to go to next error
  const showNextError = () => {
    if (validationErrors.length > 1) {
      setCurrentErrorIndex((prevIndex) => 
        prevIndex < validationErrors.length - 1 ? prevIndex + 1 : 0
      );
    }
  }

  // ✅ Function to go to previous error
  const showPreviousError = () => {
    if (validationErrors.length > 1) {
      setCurrentErrorIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : validationErrors.length - 1
      );
    }
  }

  // ✅ The corrected function for form submission
  const handleFormSubmit = async (data) => {
  
    if (!data.userType) {
      setError('userType', {
        type: 'required',
        message: 'Please select a user type before signing up',
      })
      return
    }

    try {
      const response = await useJwt.register(data)

      // Store OTP and mobile from response
      const receivedOtp = response.data.data.otp;
      const receivedMobile = response.data.data.phoneNumber;
      
      setOtp(receivedOtp)
      setMobile(receivedMobile)

      // Console log for debugging
      console.log('Received OTP:', receivedOtp);
      console.log('Received Mobile:', receivedMobile);

      if (onSubmit) {
        onSubmit(response.data)
      }

      const receivedToken = response.data?.data?.token;

      if (response.data?.data?.userType === 2) {
        navigate(`/updateProfile/${receivedToken}`, {
            state: {
              otp: receivedOtp, 
              phone: receivedMobile 
            }
          })
      } else {
        if (receivedToken) {
          navigate(`/otp-verification/${receivedToken}`, {
            state: {
              otp: receivedOtp, 
              phone: receivedMobile 
            }
          })
        } else {
          console.error("❌ Token not found in API response.");
          setErrorMsg('An error occurred. Please try again.');
        }
      }

    } catch (error) {
      console.error('❌ Signup failed:', error.response?.data || error.message)
      
      // ✅ Enhanced error handling to extract validation errors as array
      const extractedErrors = extractValidationErrors(error.response);
      
      if (extractedErrors.length > 0) {
        setValidationErrors(extractedErrors);
        setCurrentErrorIndex(0);
        setErrorMsg(''); // Clear any previous generic error
      } else {
        // Fallback to generic message if no specific validation errors found
        setErrorMsg(error.response?.data?.message || 'Signup failed');
        setValidationErrors([]);
        setCurrentErrorIndex(0);
      }
    }
  }

  const handleSwitchToLogin = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin()
    } else {
      navigate('/signin')
    }
  }

  const userTypes = [
    { id: 1, label: 'Client', icon: '👤', description: 'Pet owner seeking services' },
    { id: 2, label: 'Doctor', icon: '👨‍⚕️', description: 'Veterinary professional' },
    { id: 3, label: 'Service Provider', icon: '🐾', description: 'Pet Services' },
  ]

  // ✅ Check if there are multiple validation errors to show navigation
  const hasMultipleErrors = validationErrors.length > 1;

  // ✅ Combined error message for Alert
  const combinedErrorMsg = errors.userType?.message || errorMsg || 
    (validationErrors.length > 0 ? validationErrors[currentErrorIndex] : '');

  return (
    <Fragment>
      <div className="my-20 bg-white shadow-lg border border-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 xl:px-16 2xl:px-40 max-w-full mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join Metavet</h2>
          <p className="text-gray-600 text-sm">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-800">First Name</label>
  <input
    type="text"
    {...register('firstName', {
      required: 'First name is required',
      minLength: { value: 2, message: 'First name must be at least 2 characters' },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: 'Only alphabets and spaces are allowed',
      },
    })}
    onKeyDown={(e) => {
      // Prevent typing anything other than letters or space
      if (
        !/[a-zA-Z\s]/.test(e.key) && 
        e.key !== 'Backspace' &&
        e.key !== 'Tab' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== 'Delete'
      ) {
        e.preventDefault();
      }
    }}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
      errors.firstName
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-primary hover:border-gray-300'
    } focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`}
    placeholder="First name"
  />
  {errors.firstName && (
    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
  )}
</div>


            <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-800">Last Name</label>
  <input
    type="text"
    {...register('lastName', {
      required: 'Last name is required',
      minLength: { value: 2, message: 'Last name must be at least 2 characters' },
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: 'Only alphabets and spaces are allowed',
      },
    })}
    onKeyDown={(e) => {
      // Prevent typing anything other than letters or space
      if (
        !/[a-zA-Z\s]/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Tab' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== 'Delete'
      ) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      // Clean pasted or programmatic input
      e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    }}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
      errors.lastName
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-primary hover:border-gray-300'
    } focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`}
    placeholder="Last name"
  />
  {errors.lastName && (
    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
  )}
</div>

          </div>

          <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-800">Phone Number</label>
  <div className="flex gap-2 sm:gap-3">
    {/* Country Code */}
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

    {/* Phone Number */}
    <div className="w-3/5 sm:w-2/3">
      <input
        type="tel"
        {...register('phoneNumber', {
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Please enter a valid 10-digit phone number',
          },
        })}
        onKeyDown={(e) => {
          // Allow only digits and control keys
          if (
            !/[0-9]/.test(e.key) &&
            e.key !== 'Backspace' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight' &&
            e.key !== 'Delete'
          ) {
            e.preventDefault();
          }
        }}
        onInput={(e) => {
          // Clean pasted or programmatic input (remove non-digits)
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
          errors.phoneNumber
            ? 'border-red-400 focus:border-red-500'
            : 'border-gray-200 focus:border-primary hover:border-gray-300'
        } focus:outline-none bg-gray-50 focus:bg-white`}
        placeholder="Enter 10-digit number"
        maxLength={10}
      />
    </div>
  </div>

  {(errors.countryCode || errors.phoneNumber) && (
    <p className="text-red-500 text-sm">
      {errors.countryCode?.message || errors.phoneNumber?.message}
    </p>
  )}
</div>


         <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-800">Email Address</label>
  <input
    type="email"
    {...register('email', {
      required: 'Email is required',
      pattern: {
        // ✅ Gmail-only regex (letters/numbers before @, only gmail.com allowed)
        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        message: 'Please enter a valid Gmail address (example@gmail.com)',
      },
    })}
    onKeyDown={(e) => {
      // Allow letters, numbers, one @, and control keys
      const allowedKeys = [
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        '.',
        '_',
        '-',
        '+',
      ];

      // Allow only one '@' symbol
      if (e.key === '@' && e.target.value.includes('@')) {
        e.preventDefault();
      }

      if (
        !/[a-zA-Z0-9@._+\-]/.test(e.key) && // Only these characters allowed
        !allowedKeys.includes(e.key)
      ) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      // Remove invalid pasted characters (anything not allowed)
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._+\-]/g, '');
    }}
    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base ${
      errors.email
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-primary hover:border-gray-300'
    } focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`}
    placeholder="Enter your Gmail address"
  />
  {errors.email && (
    <p className="text-red-500 text-sm">{errors.email.message}</p>
  )}
</div>


          {/* ✅ Enhanced Alert for userType error and API errors with navigation */}
          {combinedErrorMsg && (
            <Alert 
              severity="error" 
              onClose={() => {
                setErrorMsg('');
                setValidationErrors([]);
                setCurrentErrorIndex(0);
              }}
              action={
                hasMultipleErrors ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {currentErrorIndex + 1} of {validationErrors.length}
                    </span>
                    <button
                      type="button"
                      onClick={showPreviousError}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Previous error"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={showNextError}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                      title="Next error"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ) : null
              }
            >
              {combinedErrorMsg}
            </Alert>
          )}

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 text-sm sm:text-base"
          >
            Send OTP
          </button>
        </form>

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
    </Fragment>
  )
}

export default RegistrationComponent