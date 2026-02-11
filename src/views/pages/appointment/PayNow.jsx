import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useJwt from '../../../enpoints/jwt/useJwt';

export default function PaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if no booking data
  React.useEffect(() => {
    if (!bookingData) {
      alert('No booking data found. Please start from the appointment booking page.');
      navigate('/appointments');
    }
  }, [bookingData, navigate]);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    return formatted;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiryDate(formatExpiryDate(value));
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    
    // Logic updated: If card is not the test card, redirect to failed page
    if (cleanedCardNumber !== '4111111111111111') {
      setTimeout(() => {
        setProcessing(false);
        navigate('/payment-failed');
      }, 1500); // Small delay to simulate processing
      return;
    }

    try {
      const response = await useJwt.dummyAppointmentBook(bookingData);

      if (response.data) {
        navigate('/payment-sucess', { 
          state: { 
            success: true, 
            appointment: response.data.appointment 
          } 
        });
      }
    } catch (err) {
      console.error('Booking error:', err);
      navigate('/payment-failed');
    } finally {
      setProcessing(false);
    }
  };

  const displayCardNumber = cardNumber || '•••• •••• •••• ••••';
  const displayCardHolder = cardHolder.toUpperCase() || 'YOUR NAME HERE';
  const displayExpiry = expiryDate || 'MM/YY';

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Card Preview & Summary */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Review & Pay</h2>
            <p className="text-gray-600">Complete your booking by providing payment details.</p>
          </div>

          {/* Card UI */}
          <div className="perspective-1000">
            <div className="bg-gradient-to-br from-primary to-white rounded-2xl p-8 shadow-2xl text-black relative overflow-hidden transform hover:rotate-1 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="w-14 h-11 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg mb-10 relative z-10 shadow-inner"></div>

              <div className="text-2xl font-mono tracking-widest mb-10 relative z-10">
                {displayCardNumber}
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div className="flex-1">
                  <div className="text-[10px] uppercase opacity-80 mb-1">Card Holder</div>
                  <div className="text-sm font-semibold tracking-wide truncate pr-4">{displayCardHolder}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase opacity-80 mb-1">Expires</div>
                  <div className="text-sm font-semibold">{displayExpiry}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold text-gray-800">{bookingData.appointmentDate}</span>
              </div>
              {bookingData.reason && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">Reason</span>
                  <span className="font-semibold text-gray-800">{bookingData.reason}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Details</h1>
            <p className="text-gray-500 text-sm">Use primary test card for successful booking.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                required
                disabled={processing}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">
                Card Holder Name
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Enter Name here"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
                disabled={processing}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                  disabled={processing}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className={`w-full font-bold py-4 rounded-xl shadow-lg mt-4 transition-all duration-300 ${
                processing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95'
              }`}
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Confirm Payment & Book'}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure SSL Encrypted Connection</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}