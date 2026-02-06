import React from 'react';
import { XCircle, AlertTriangle, RotateCcw, Home, Mail } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  const handleRetry = () => {
    // Navigate back to booking page
    navigate('/book-appointment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* Failed Animation Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500 rounded-full opacity-20 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-800 rounded-full opacity-20 -ml-16 -mb-16"></div>
            
            {/* Animated Failed Icon */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 animate-pulse">
                <XCircle className="w-16 h-16 text-red-500" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Payment Failed
              </h1>
              <p className="text-primary-100 text-lg">
                We couldn't process your payment
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            
            {/* Error Information */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-red-900 mb-2">
                    What Happened?
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    Your payment could not be processed. This might be due to:
                  </p>
                  <ul className="text-sm text-red-700 space-y-1.5 ml-4 list-disc">
                    <li>Insufficient funds in your account</li>
                    <li>Incorrect card details entered</li>
                    <li>Card expired or blocked by your bank</li>
                    <li>Network connection issues</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Session Info (if available) */}
            {sessionId && (
              <div className="bg-primary-50 rounded-xl p-5 mb-6 border border-primary-100">
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium text-sm">Transaction ID</span>
                  <span className="text-primary-900 font-mono text-sm break-all">
                    {sessionId.substring(0, 30)}...
                  </span>
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-primary-600 bg-opacity-10 border border-primary-200 rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold text-primary-900 mb-3 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary-600" />
                Need Assistance?
              </h3>
              <p className="text-sm text-primary-700 mb-3">
                Our support team is here to help you complete your booking.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                <div className="flex items-center text-primary-700">
                  <span className="font-medium">Email:</span>
                  <a 
                    href="mailto:support@petcare.com" 
                    className="ml-2 text-primary-600 hover:text-primary-800 underline font-semibold"
                  >
                    support@petcare.com
                  </a>
                </div>
                <div className="hidden sm:block text-primary-300">|</div>
                <div className="flex items-center text-primary-700">
                  <span className="font-medium">Phone:</span>
                  <a 
                    href="tel:+1234567890" 
                    className="ml-2 text-primary-600 hover:text-primary-800 underline font-semibold"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Dashboard
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-primary-600 text-sm">
                Your booking slot is still available. You can try booking again.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-primary-600 text-sm">
            No amount has been deducted from your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;