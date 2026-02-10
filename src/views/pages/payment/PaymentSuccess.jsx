import React, { useEffect, useState } from 'react';
import { CheckCircle, Calendar, DollarSign, User, Clock, ArrowRight, Download, Share2, Mail, Phone, MapPin, Sparkles, Star, Gift, Bell } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useJwt from '../../../enpoints/jwt/useJwt';


// ==================== VARIANT 2: Timeline Card ====================
export const PaymentSuccessV2 = () => {
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
      const response = await useJwt.veriFyAppointmentPayment(sessionId);
      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        setPaymentData(result);
      } else {
        navigate('/payment-failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      navigate('/payment-failed');
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
    <div className="min-h-screen bg-primary-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-6 ">
          
          {/* Left Panel - Success Message */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden  bg-primary">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-700 rounded-full opacity-10 -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <CheckCircle className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-semibold">Payment Confirmed</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                All Set!
              </h1>
              <p className="text-primary-100 text-xl mb-8">
                Your appointment booking is complete. We've sent a confirmation to your email.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <p className="text-primary-100 text-sm mb-2">Total Paid</p>
                <p className="text-5xl font-bold text-white">
                  ${paymentData?.amount || '0.00'}
                </p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="bg-white hover:bg-primary-50 text-primary-700 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Back to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Right Panel - Timeline & Details */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-primary-900 mb-8">Booking Timeline</h2>
            
            {/* Timeline */}
            <div className="space-y-6 mb-8">
              {/* Step 1 */}
              <div className="flex items-start group">
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-12 left-6 w-0.5 h-12 bg-primary-200"></div>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-bold text-primary-900">Payment Received</h3>
                  <p className="text-primary-600 text-sm">Payment processed successfully</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start group">
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-12 left-6 w-0.5 h-12 bg-primary-200"></div>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-bold text-primary-900">Appointment Confirmed</h3>
                  <p className="text-primary-600 text-sm">
                    {paymentData?.appointmentDate 
                      ? new Date(paymentData.appointmentDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start group">
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-bold text-primary-900">Confirmation Sent</h3>
                  <p className="text-primary-600 text-sm">Check your email for details</p>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-primary-50 rounded-2xl p-6 mb-6 border-2 border-primary-100">
              <h3 className="text-sm font-semibold text-primary-600 mb-4">BOOKING DETAILS</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary-700">Appointment ID</span>
                  <span className="font-bold text-primary-900">#{paymentData?.appointmentId || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600 text-white text-sm font-semibold">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/my-appointments')}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
            >
              View Appointment Details
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentSuccessV2;