import React, { useEffect, useState } from 'react';
import { CheckCircle, Calendar, DollarSign, User, Clock, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await fetch(
        `http://192.168.29.199:8080/api/appointments/verify-payment/${sessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        setPaymentData(result);
      } else {
        navigate('/appointment/failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      navigate('/appointment/failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
          <p className="text-primary-700 font-medium text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Section with Animated Checkmark */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500 rounded-full opacity-20 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-800 rounded-full opacity-20 -ml-16 -mb-16"></div>
            
            {/* Animated Success Icon */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 animate-bounce">
                <CheckCircle className="w-16 h-16 text-primary-600" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Payment Successful!
              </h1>
              <p className="text-primary-100 text-lg">
                Your appointment has been confirmed
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            
            {/* Appointment Details Card */}
            <div className="bg-primary-50 rounded-2xl p-6 mb-6 border border-primary-100">
              <h2 className="text-xl font-semibold text-primary-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                Appointment Details
              </h2>
              
              <div className="space-y-4">
                {/* Appointment ID */}
                <div className="flex justify-between items-center pb-3 border-b border-primary-200">
                  <span className="text-primary-600 font-medium">Appointment ID</span>
                  <span className="text-primary-900 font-semibold">
                    #{paymentData?.appointmentId || 'N/A'}
                  </span>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center pb-3 border-b border-primary-200">
                  <span className="text-primary-600 font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </span>
                  <span className="text-primary-900 font-semibold">
                    {paymentData?.appointmentDate 
                      ? new Date(paymentData.appointmentDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'
                    }
                  </span>
                </div>

                {/* Amount Paid */}
                <div className="flex justify-between items-center pb-3 border-b border-primary-200">
                  <span className="text-primary-600 font-medium flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Amount Paid
                  </span>
                  <span className="text-2xl text-primary-900 font-bold">
                    ${paymentData?.amount || '0.00'}
                  </span>
                </div>

                {/* Payment Status */}
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium">Payment Status</span>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-600 text-white">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    {paymentData?.paymentStatus || 'PAID'}
                  </span>
                </div>
              </div>
            </div>

            {/* Success Message Box */}
            <div className="bg-primary-600 bg-opacity-10 border border-primary-200 rounded-xl p-5 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-600 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-primary-900 mb-1">
                    What's Next?
                  </h3>
                  <p className="text-sm text-primary-700">
                    A confirmation email has been sent to your registered email address. 
                    Please arrive 10 minutes before your scheduled appointment time.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/my-appointments')}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
              >
                View My Appointments
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-primary-600 text-sm">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@petcare.com" className="font-semibold hover:text-primary-800 underline">
              support@petcare.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;