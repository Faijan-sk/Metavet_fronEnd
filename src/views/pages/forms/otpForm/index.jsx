import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';
import { handleLogin } from "../../../../store/userSlice";
import JwtService from "./../../../../@core/auth/jwt/jwtService";

const jwt = new JwtService();

const OTPVerification = ({ onSubmit, onBack, userInfo, formType }) => {
  
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const response = useSelector((state) => state.user.data);
  const location = useLocation();

  // ** hooks
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const {state} = useLocation();
  const otpDr = state?.otp;
  
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });

  const watchedOtp = watch(["otp0", "otp1", "otp2", "otp3"]);

  // Handle toast close
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (otpDr) {
      const otpString = String(otpDr);
      reset({
        otp0: otpString[0] || "",
        otp1: otpString[1] || "",
        otp2: otpString[2] || "",
        otp3: otpString[3] || "",
      });
    } 
    console.log('the token inside the otp verification from url :', token)
  }, [otpDr, reset]);

  // Timer for resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Auto-focus first input on component mount
  useEffect(() => {
    const firstInput = document.getElementById("otp-0");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  // Handle OTP input change
  const handleOtpChange = (index, value, onChange) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    onChange(value);
    clearErrors(); // Clear error when user types

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 4);

    if (!/^\d+$/.test(pastedData)) {
      setError("root", {
        type: "manual",
        message: "Please paste only numbers",
      });
      return;
    }

    // Set each digit to the corresponding field
    for (let i = 0; i < Math.min(pastedData.length, 4); i++) {
      setValue(`otp${i}`, pastedData[i] || "");
    }

    // Clear remaining fields if paste is shorter than 4 digits
    for (let i = pastedData.length; i < 4; i++) {
      setValue(`otp${i}`, "");
    }

    clearErrors();

    // Focus the next empty input or last input
    const nextEmptyIndex = pastedData.length >= 4 ? 3 : pastedData.length;
    const inputToFocus = document.getElementById(`otp-${nextEmptyIndex}`);
    if (inputToFocus) inputToFocus.focus();
  };

  // Handle backspace and arrow keys
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !watchedOtp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Updated handleOtpSubmit method with dashboard redirect
  const handleOtpSubmit = async (data) => {
    const otpValue = `${data.otp0}${data.otp1}${data.otp2}${data.otp3}`;

    if (otpValue.length !== 4) {
      setError("root", {
        type: "manual",
        message: "Please enter complete 4-digit OTP",
      });
      return;
    }

    setIsSubmitting(true);
    clearErrors();

    try {
      const apiPayload = {
        otp: otpValue,
      };

      const { data: apiResponse } = await jwt.verifyOtp(apiPayload, token);
      const { data: user, accessToken, refreshToken, success } = apiResponse;

      dispatch(handleLogin({ user, accessToken, refreshToken }));

      // Check backend success
      if (success) {
        console.log("✅ OTP Verified Successfully:", otpValue);
        
        // Show success toast
        console.log('Setting success alert to open');
        setAlertType('success');
        setAlertMessage('User Registration Successfully!');
        setOpen(true);

        // Add delay before navigation to allow toast to show
        setTimeout(() => {
          navigate("/", {
            state: {
              verified: true,
              phone: formatPhoneNumber(),
              verificationTime: new Date().toISOString(),
            },
            replace: true,
          });
        }, 1500); // 1.5 second delay
      } else {
        setError("root", {
          type: "manual",
          message: apiResponse?.data?.message || "Invalid OTP. Please try again.",
        });
        reset();
        document.getElementById("otp-0")?.focus();
      }
    } catch (error) {
      console.error("❌ OTP Verification Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Verification failed. Please try again.";

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
      
      // Show error alert as well
      console.log('Setting error alert to open');
      setAlertType('error');
      setAlertMessage(errorMessage);
      setOpen(true);
      
      reset();
      document.getElementById("otp-0")?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setTimeLeft(60);
    setCanResend(false);
    reset();
    clearErrors();

    const phoneNumber =
      response?.data?.phoneNumber || response?.data?.phone_number;
    console.log("Resending OTP to:", formatPhoneNumber());
    const loginPayload = {
      phone_number: response?.data?.phoneNumber || response?.data?.phone_number,
      countryCode: response?.data?.countryCode
    }

    try {
      const res = await jwt.login(loginPayload);
      console.log("resend otp", res);
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("OTP resent successfully");
      
      // Show success message for resend
      setAlertType('info');
      setAlertMessage('OTP resent successfully!');
      setOpen(true);
    } catch (error) {
      console.error("Resend OTP Error:", error);
      setError("root", {
        type: "manual",
        message: "Failed to resend OTP. Please try again.",
      });
      
      // Show error message for resend failure
      setAlertType('error');
      setAlertMessage('Failed to resend OTP. Please try again.');
      setOpen(true);
    }

    document.getElementById("otp-0")?.focus();
  };

  // Format phone number for display
  const formatPhoneNumber = () => {
    const countryCode =
      response?.data?.countryCode || response?.countryCode || "+91";
    const phoneNumber =
      response?.data?.phoneNumber ||
      response?.data?.phone_number ||
      response?.phone_number;
    return `${countryCode} ${phoneNumber}`;
  };

  // Get OTP from redux for display
  const getOtpFromRedux = () => {
    return response?.data?.otp || response?.otp;
  };

  useEffect(() => {
    if (response) {
      getOtpFromRedux();
    }
  }, [response]);

  // Get error message
  const errorMessage = errors.root?.message || "";
  const hasError = !!errorMessage;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Card Wrapper with Shadow */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 w-full max-w-xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-primary"
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
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verify Your Phone Number
            </h2>
            <p className="text-gray-600 text-sm mb-1">
              We've sent a 4-digit verification code to
            </p>
            <p className="text-primary font-medium text-lg">
              {state?.phone}
            </p>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit(handleOtpSubmit)} className="space-y-6">
            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((index) => (
                <Controller
                  key={index}
                  name={`otp${index}`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <input
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={value}
                      onChange={(e) =>
                        handleOtpChange(index, e.target.value, onChange)
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all duration-200
              ${
                hasError
                  ? "border-red-500 bg-red-50"
                  : value
                  ? "border-primary bg-primary bg-opacity-5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
                      placeholder="0"
                    />
                  )}
                />
              ))}
            </div>

            {/* Error Message */}
            {hasError && (
              <div className="text-center">
                <p className="text-red-500 text-sm font-medium">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Timer and Resend */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-gray-600 text-sm">
                  Resend code in{" "}
                  <span className="text-primary font-medium">{timeLeft}s</span> 
                </p>
              ) : (
                <div>
                  <p className="text-gray-500 text-sm mb-2">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-primary font-medium hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 rounded px-2 py-1"
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      ></circle>
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        className="opacity-75"
                      ></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="text-center border-t border-gray-100 pt-4">
            <p className="text-gray-500 text-xs leading-relaxed">
              Enter the 4-digit code sent to your phone number.
              <br />
              Code expires in 5 minutes.
            </p>
          </div>

          {/* Debug Info (Remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <div className="text-center border-t border-gray-100 pt-4">
              <p className="text-gray-400 text-xs">
                Debug: Use OTP <strong>{getOtpFromRedux()}</strong> for testing
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Success/Error Toast */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OTPVerification;