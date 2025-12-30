import { useState, useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import useJwt from '../../../../enpoints/jwt/useJwt'

const useDispatch = () => (action) => console.log('Dispatching action:', action);
const setUser = (user) => ({ type: 'SET_USER', payload: user });

const RegistrationComponent = ({ onSubmit, onSwitchToLogin, onClose }) => {

  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0)
  const [otp, setOtp] = useState();
  const [mobile, setMobile] = useState();

  // 🆕 dropdown states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [serviceTypeError, setServiceTypeError] = useState("");

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
      serviceType: ""
    },
  })

  const watchedUserType = watch('userType')

  useEffect(() => {
    setUserType(watchedUserType)
    // Reset service type when user type changes
    if (watchedUserType !== 3) {
      setSelectedServiceType("");
      setValue("serviceType", "");
      setServiceTypeError("");
    }
  }, [watchedUserType])

  const handleUserTypeClick = (typeId) => {
    setValue('userType', typeId)
    setUserType(typeId)
    clearErrors('userType')
    setErrorMsg('');
    setValidationErrors([]);
    setCurrentErrorIndex(0);
  }

  const extractValidationErrors = (errorResponse) => {
    if (errorResponse?.data?.errors) {
      const errors = errorResponse.data.errors;
      const errorMessages = [];

      if (typeof errors === 'object' && !Array.isArray(errors)) {
        Object.keys(errors).forEach(field => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach(msg => errorMessages.push(msg));
          } else if (typeof errors[field] === 'string') {
            errorMessages.push(errors[field]);
          }
        });
      }
      else if (Array.isArray(errors)) {
        errorMessages.push(...errors);
      }
      else if (typeof errors === 'string') {
        errorMessages.push(errors);
      }

      return errorMessages;
    }
    return [];
  }

  const showNextError = () => {
    if (validationErrors.length > 1) {
      setCurrentErrorIndex((prevIndex) =>
        prevIndex < validationErrors.length - 1 ? prevIndex + 1 : 0
      );
    }
  }

  const showPreviousError = () => {
    if (validationErrors.length > 1) {
      setCurrentErrorIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : validationErrors.length - 1
      );
    }
  }

  const handleFormSubmit = async (data) => {

    if (!data.userType) {
      setError('userType', {
        type: 'required',
        message: 'Please select a user type before signing up',
      })
      return
    }

    // Validate service type for Service Provider
    if (data.userType === 3 && !selectedServiceType) {
      setServiceTypeError('Please select a service type');
      return;
    }

    try {
      const response = await useJwt.register(data)

      const receivedOtp = response.data.data.otp;
      const receivedMobile = response.data.data.phoneNumber;

      setOtp(receivedOtp)
      setMobile(receivedMobile)

      if (onSubmit) {
        onSubmit(response.data)
      }

      const receivedToken = response.data?.data?.token;



    //   if (data.userType == 3) {
    //   const payloadForServiceProvider = {
    //     uid: response.data.data.uid,
    //     serviceType: selectedServiceType  
    //   }

    //   const serviceResponse = await useJwt.createServiceProvider(payloadForServiceProvider);
    //   console.log("Service Provider created:", serviceResponse.data);
    // }




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

      // Clear previous errors
      setErrorMsg('');
      setValidationErrors([]);
      setCurrentErrorIndex(0);
      clearErrors();

      // Check for specific field errors in the response
      const errorMessage = error.response?.data?.error || error.response?.data?.message || '';
      
      // Handle specific field errors
      if (errorMessage.toLowerCase().includes('email already exists') || 
          errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('exist')) {
        setError('email', {
          type: 'manual',
          message: 'This email is already registered. Please use a different email or sign in.'
        });
        setErrorMsg('');
      } 
      else if (errorMessage.toLowerCase().includes('phone') && errorMessage.toLowerCase().includes('exist')) {
        setError('phoneNumber', {
          type: 'manual',
          message: 'This phone number is already registered. Please use a different number.'
        });
        setErrorMsg('');
      }
      else {
        // Try to extract validation errors
        const extractedErrors = extractValidationErrors(error.response);

        if (extractedErrors.length > 0) {
          setValidationErrors(extractedErrors);
          setCurrentErrorIndex(0);
        } else {
          // Show general error message
          setErrorMsg(error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.');
        }
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

  const serviceOptions = [
  { label: "Pet Walker", value: "Pet_Walker" },
  { label: "Pet Groomer", value: "Pet_Groomer" },
  { label: "Pet Behaviourist", value: "Pet_Behaviourist" }
];

  const userTypes = [
    { id: 1, label: 'Client', icon: '👤', description: 'Pet owner seeking services' },
    { id: 2, label: 'Doctor', icon: '👨‍⚕️', description: 'Veterinary professional' },
    { id: 3, label: 'Service Provider', icon: '🐾', description: 'Pet Services' },
  ]

  const hasMultipleErrors = validationErrors.length > 1;

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
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md 
                    ${userType === type.id
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
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 🟢 CUSTOM SERVICE TYPE DROPDOWN - MANDATORY FOR SERVICE PROVIDER */}
          {userType === 3 && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Select your service type <span className="text-red-500">*</span>
              </label>
              <input type="hidden" {...register("serviceType")} value={selectedServiceType} />

              <div className="relative">
                <button
                  type="button"
                  className={`w-full px-3 py-2.5 border-2 rounded-lg text-left text-sm hover:border-primary/70 focus:border-primary focus:outline-none transition-all duration-200 ${serviceTypeError
                      ? 'border-red-400 bg-red-50'
                      : selectedServiceType
                        ? 'border-primary bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  onClick={() => setDropdownOpen(prev => !prev)}
                >
                  <span className={selectedServiceType ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedServiceType || "Choose a service"}
                  </span>
                </button>

                {dropdownOpen && (
                  <ul className="absolute z-20 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
    {serviceOptions.map(option => (
      <li
        key={option.value}
        onClick={() => {
          setSelectedServiceType(option.value);
          setValue("serviceType", option.value);
          setDropdownOpen(false);
          setServiceTypeError("");
         
        }}
        className="px-3 py-2 text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors"
      >
        {option.label}
      </li>
    ))}
  </ul>
                )}
              </div>

              {serviceTypeError && (
                <p className="text-red-500 text-sm">{serviceTypeError}</p>
              )}
            </div>
          )}

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
                  if (!/[a-zA-Z\s]/.test(e.key) &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Tab' &&
                    e.key !== 'ArrowLeft' &&
                    e.key !== 'ArrowRight' &&
                    e.key !== 'Delete') {
                    e.preventDefault();
                  }
                }}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg 
                  text-sm sm:text-base ${errors.firstName
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
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
                  if (!/[a-zA-Z\s]/.test(e.key) &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Tab' &&
                    e.key !== 'ArrowLeft' &&
                    e.key !== 'ArrowRight' &&
                    e.key !== 'Delete') {
                    e.preventDefault();
                  }
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                }}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base 
                  ${errors.lastName
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
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
              <div className="w-2/5 sm:w-1/3">
                <select
                  {...register('countryCode', { required: 'Country code is required' })}
                  className={`w-full px-2 sm:px-3 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base 
                    ${errors.countryCode
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
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
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) &&
                      e.key !== 'Backspace' &&
                      e.key !== 'Tab' &&
                      e.key !== 'ArrowLeft' &&
                      e.key !== 'ArrowRight' &&
                      e.key !== 'Delete') {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base 
                    ${errors.phoneNumber
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
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
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: 'Please enter a valid Gmail address (example@gmail.com)',
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = [
                  'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight',
                  'Delete', '.', '_', '-', '+',
                ];
                if (e.key === '@' && e.target.value.includes('@')) {
                  e.preventDefault();
                }
                if (
                  !/[a-zA-Z0-9@._+\-]/.test(e.key) &&
                  !allowedKeys.includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._+\-]/g, '');
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base 
                ${errors.email
                  ? 'border-red-400 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-primary hover:border-gray-300'
                } focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`}
              placeholder="Enter your Gmail address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {combinedErrorMsg && (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMsg('');
                setValidationErrors([]);
                setCurrentErrorIndex(0);
              }}
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