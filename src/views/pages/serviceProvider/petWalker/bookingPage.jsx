import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import KycForm from "./../../kyc/walker-kyc/WalkerToClientKyc";
import useJwt from "../../../../enpoints/jwt/useJwt";
import { useWalkerAppointment } from "./../../../../context/WalkerAppointmentContext";

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
  const { bookingData, clearBookingData } = useWalkerAppointment();

  const [view, setView] = useState("kyc");

  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // KycForm success → go to review summary
  const handleKycSuccess = () => {
    setView("summary");
  };

  // ─── Confirm & Book API call ─────────────────────────────────────────────
  const handleConfirmBooking = async () => {
    setBooking(true);
    setBookingError("");

    try {
      const payload = {
        petWalkerUid: bookingData?.petWalkerUid,
        petWalkerDayUid: bookingData?.petWalkerDayUid,
        slotUid: bookingData?.slotUid?.uid,
        appointmentDate: bookingData?.appointmentDate,
        petUid: bookingData?.petUid?.uid,
        kycId: bookingData?.kycId,
      };

      console.log("📦 Final booking payload:", payload);

      const response = await useJwt.BookWalkerAppointment(payload);

      const checkoutUrl =
        response.data?.checkoutUrl || response.data?.data?.checkoutUrl;

      if (checkoutUrl) {
        clearBookingData();

        window.location.href = checkoutUrl;
      } else {
        setView("booked");
      }
    } catch (error) {
      console.error("Booking error:", error);
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
              Your walk has been successfully booked.
            </p>
          </div>
          <div className="px-8 py-8 flex flex-col gap-3">
            <button
              onClick={() => navigate("/service-provider/petWalker")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white font-semibold text-sm hover:opacity-90 transition shadow-md"
            >
              Browse More Walkers
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 ">
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
              walk.
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
              {/* <DetailRow label="Slot" value={bookingData?.slotUid} /> */}
              <DetailRow
                label="Day Schedule"
                // value={bookingData?.petWalkerDayUid}
              />
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#52B2AD]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Slot Detail
                </span>
              </div>
              <DetailRow
                label="Start time"
                value={bookingData?.slotUid?.startTime}
              />

              <DetailRow
                label="Slot Duration"
                value={
                  bookingData?.slotUid?.petWalkerDay?.slotDurationMinutes +
                  " Min"
                }
              />
              {/* <DetailRow label="Slot" value={bookingData?.slotUid} /> */}
            </div>

            {/* Walker */}
            {/* <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#52B2AD]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Walker
                </span>
              </div>
              <DetailRow label="Walker" value={bookingData?.petWalkerUid} />
            </div> */}

            {/* Pet */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🐾</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Pet
                </span>
              </div>
              <DetailRow
                label="Pet"
                value={
                  bookingData?.petUid?.petName +
                  " (" +
                  bookingData?.petUid?.petBreed +
                  ")"
                }
              />
            </div>
          </div>

          {/* Error */}
          {bookingError && (
            <div className="mx-8 mb-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
              {bookingError}
            </div>
          )}

          <div className="md:col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-200 mx-5 my-2">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-amber-700 font-medium">
                Appointments cannot be canceled if they are scheduled within
                less than 24 hours.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="px-8 pb-8 space-y-3">
            <p className="text-center text-sm text-gray-500">
              Ready to go? Tap below to confirm your walk booking.
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
                  Yes, Book My Walk
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

  // ─── Default: KYC Form ───────────────────────────────────────────────────
  return (
    <KycForm
      petUid={bookingData?.petUid?.uid}
      onKycSuccess={handleKycSuccess}
    />
  );
}

export default BookingPage;
