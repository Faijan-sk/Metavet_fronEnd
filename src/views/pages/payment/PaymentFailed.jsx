import React from 'react';
import { XCircle, AlertTriangle, RotateCcw, Home, Mail } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  const handleRetry = () => {
    navigate('/book-appointment');
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-6 px-4">
      <div className="max-w-4xl w-full">
        
        {/* Failed Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-center relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full opacity-20 -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-800 rounded-full opacity-20 -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3">
                <XCircle className="w-10 h-10 text-red-500" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Payment Failed
              </h1>
              <p className="text-primary-100 text-sm">
                We couldn't process your payment
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            
            {/* Error Info */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-red-900 mb-1">
                    What Happened?
                  </h3>
                  <ul className="text-sm text-red-700 space-y-1 ml-4 list-disc">
                    <li>Insufficient funds</li>
                    <li>Incorrect card details</li>
                    <li>Card expired or blocked</li>
                    <li>Network issue</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Session Info */}
            {sessionId && (
              <div className="bg-primary-50 rounded-lg p-3 mb-4 border border-primary-100">
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium text-sm">Transaction ID</span>
                  <span className="text-primary-900 font-mono text-xs break-all">
                    {sessionId.substring(0, 30)}...
                  </span>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="bg-primary-600 bg-opacity-10 border border-primary-200 rounded-lg p-3 mb-4">
              <h3 className="text-sm font-semibold text-primary-900 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary-600" />
                Need Assistance?
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                <span className="text-primary-700">
                  Email: <a href="mailto:metavet@metavet.com" className="underline font-semibold">metavet@metavet.com</a>
                </span>
                <span className="text-primary-700">
                  Phone: <a href="tel:+1234000000" className="underline font-semibold">+1 (234) 000000</a>
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </button>

              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 font-semibold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-primary-600 text-xs">
                Your booking slot is still available.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-primary-600 text-xs">
            No amount has been deducted from your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
