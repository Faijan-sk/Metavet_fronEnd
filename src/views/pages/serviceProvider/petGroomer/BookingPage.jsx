import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, ArrowRight, Sparkles } from "lucide-react";

import KycForm from "./../../kyc/groomer-kyc/GroomerToClientKyc";
import useJwt from "../../../../enpoints/jwt/useJwt";
import { useGroomerAppointment } from "./../../../../context/GroomerAppointmentContext"; // <-- apna context import karo

// ─── Summary detail row ───────────────────────────────────────────────────────
const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-800 text-right">
        {value}
      </span>
    </div>
  );
};

function BookingPage() {
  const navigate = useNavigate();
  const { bookingData, clearBookingData } = useGroomerAppointment(); // <-- apna context use karo

  // "kyc" → KYC form dikhao
  // "summary" → Review & Confirm screen
  // "booked" → Success screen
  const [view, setView] = useState("kyc");

  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // KycForm ne successfully create/update kiya → summary dikhao
  const handleKycSuccess = () => {
    setView("summary");
  };

  // ─── Confirm & Book API call ─────────────────────────────────────────────
  const handleConfirmBooking = async () => {
    setBooking(true);
    setBookingError("");

    try {
      const payload = {
        serviceProviderUid: bookingData?.serviceProviderUid,
        serviceUid: bookingData?.serviceUid?.uid,
        appointmentDate: bookingData?.appointmentDate,
        startTime: bookingData?.startTime,
        petUid: bookingData?.petUid?.uid,
        kycId: bookingData?.kycId,
        platForm: "WEB",
      };

      console.log("📦 Final groomer booking payload:", payload);

      const response = await useJwt.BookGroomerAppointment(payload);
      // <-- apna booking API method use karo

      const checkoutUrl =
        response.data?.checkoutUrl || response.data?.data?.checkoutUrl;

      if (checkoutUrl) {
        clearBookingData();
        window.location.href = checkoutUrl;
      } else {
        setView("booked");
      }
    } catch (error) {
      console.error("Groomer booking error:", error);
      setBookingError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setBooking(false);
    }
  };

  // ─── Booking Confirmed screen ────────────────────────────────────────────
  if (view === "booked") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden text-center">
          <div className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] px-8 py-10 text-white">
            <div className="flex justify-center mb-4">
              <span className="bg-white/20 rounded-full p-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </span>
            </div>
            <h1 className="text-2xl font-bold">You're All Set!</h1>
            <p className="text-white/80 text-sm mt-2">
              Your grooming appointment has been successfully booked.
            </p>
          </div>
          <div className="px-8 py-8 flex flex-col gap-3">
            <button
              onClick={() => navigate("/service-provider/petGroomer")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white font-semibold text-sm hover:opacity-90 transition shadow-md"
            >
              Browse More Groomers
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Review & Confirm Summary ────────────────────────────────────────────
  if (view === "summary") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] px-8 py-8 text-white">
            <div className="flex items-center gap-3 mb-1">
              <Sparkles className="w-5 h-5 text-white/80" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Almost there
              </span>
            </div>
            <h1 className="text-2xl font-bold leading-tight">
              Review Your Booking
            </h1>
            <p className="text-white/75 text-sm mt-1">
              Take a moment to confirm the details below before we lock in your
              grooming appointment.
            </p>
          </div>

          {/* Detail cards */}
          <div className="px-8 py-6 space-y-4">
            {/* Appointment */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#52B2AD]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Appointment
                </span>
              </div>
              <DetailRow label="Date" value={bookingData?.appointmentDate} />
              <DetailRow label="Start Time" value={bookingData?.startTime} />
              <DetailRow
                label="Selected Service"
                value={bookingData?.serviceUid?.serviceName}
              />
            </div>

            {/* Pet */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🐾</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Pet
                </span>
              </div>
              <DetailRow label="Name" value={bookingData?.petUid?.petName} />
              <DetailRow label="Breed" value={bookingData?.petUid?.petBreed} />
              <DetailRow
                label="Species"
                value={bookingData?.petUid?.petSpecies}
              />
            </div>
          </div>

          {/* Error */}
          {bookingError && (
            <div className="mx-8 mb-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
              {bookingError}
            </div>
          )}

          {/* CTA */}
          <div className="px-8 pb-8 space-y-3">
            <p className="text-center text-sm text-gray-500">
              Ready to go? Tap below to confirm your grooming appointment.
            </p>

            <button
              onClick={handleConfirmBooking}
              disabled={booking}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition shadow-md
                ${
                  booking
                    ? "opacity-60 cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:opacity-90 hover:scale-[1.01]"
                }`}
            >
              {booking ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Confirming your booking…
                </>
              ) : (
                <>
                  Yes, Book My Grooming
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              disabled={booking}
              onClick={() => setView("kyc")}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium text-sm transition"
            >
              ← Go Back & Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Default: KYC Form (view === "kyc") ──────────────────────────────────
  // KycForm ko petUid pass karo (context se) aur onKycSuccess callback do
  // KycForm ke andar pet dropdown locked rahega — sirf context wala pet dikhega
  return (
    <KycForm
      petUid={bookingData?.petUid?.uid}
      onKycSuccess={handleKycSuccess}
    />
  );
}

export default BookingPage;
