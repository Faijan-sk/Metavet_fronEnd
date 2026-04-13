import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import KycForm from "./../../kyc/behaviourist-kyc/behaviouristToClient";
import useJwt from "../../../../enpoints/jwt/useJwt";
import { useBehaviouristAppointment } from "./../../../../context/BehaviouristAppointmentContext";

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
  const { bookingData, clearBookingData } = useBehaviouristAppointment();

  const [view, setView] = useState("kyc");
  const [kycRecord, setKycRecord] = useState(null); // fullRecord object
  const [kycUid, setKycUid] = useState(null); // kycUid string
  const [kycFetched, setKycFetched] = useState(false); // fetch done?
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // ─── Pet ka KYC fetch karo on mount ─────────────────────────────────────
  useEffect(() => {
    const petUid = bookingData?.petUid?.uid;

    if (!petUid) return;

    const fetchKyc = async () => {
      try {
        const response = await useJwt.getBehavioToClientKycByPet(petUid);
        if (response.data?.success && response.data?.data) {
          const data = response.data.data;
          // fullRecord contains the actual KYC fields
          setKycRecord(data.fullRecord || null);
          setKycUid(data.kycUid || data.fullRecord?.kycUid || null);
        }
      } catch (error) {
        const status = error.response?.status;
        const errorCode = error.response?.data?.errorCode;
        if (status === 404 || errorCode === "KYC_NOT_FOUND") {
          setKycRecord(null);
          setKycUid(null);
        } else {
          console.error("KYC fetch error:", error);
        }
      } finally {
        setKycFetched(true);
      }
    };

    fetchKyc();
  }, [bookingData?.petUid?.uid]);

  // ─── KYC submit success → summary ───────────────────────────────────────
  const handleKycSuccess = (savedKycUid) => {
    if (savedKycUid) setKycUid(savedKycUid);
    setView("summary");
  };

  // ─── Confirm & Pay ───────────────────────────────────────────────────────
  const handleConfirmBooking = async () => {
    setBooking(true);
    setBookingError("");

    try {
      const payload = {
        petUid: bookingData?.petUid?.uid,
        serviceProviderUid: bookingData?.serviceProviderUid,
        behaviouristDayUid: bookingData?.behaviouristDayUid,
        slotUid: bookingData?.slotUid?.uid,
        appointmentDate: bookingData?.appointmentDate,
        kycId: kycUid,
      };

      console.log("📦 Behaviourist booking payload:", payload);

      const response = await useJwt.bookBehaviouristAppointment(payload);
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

  // ─── Format time helper ──────────────────────────────────────────────────
  const formatTime = (time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // ─── Booked screen ───────────────────────────────────────────────────────
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
              Your session has been successfully booked.
            </p>
          </div>
          <div className="px-8 py-8 flex flex-col gap-3">
            <button
              onClick={() => navigate("/service-provider/petBehaviourist")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white font-semibold text-sm hover:opacity-90 transition shadow-md"
            >
              Browse More Behaviourists
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

  // ─── Summary screen ──────────────────────────────────────────────────────
  if (view === "summary") {
    const slot = bookingData?.slotUid;
    const pet = bookingData?.petUid;

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
              session.
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
            </div>

            {/* Slot */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-[#52B2AD]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Slot Detail
                </span>
              </div>
              <DetailRow
                label="Start Time"
                value={formatTime(slot?.startTime)}
              />
              <DetailRow label="End Time" value={formatTime(slot?.endTime)} />
            </div>

            {/* Pet */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🐾</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Pet
                </span>
              </div>
              <DetailRow label="Name" value={pet?.petName || null} />
              <DetailRow label="Species" value={pet?.petSpecies || null} />
              <DetailRow label="Breed" value={pet?.petBreed || null} />
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
                Cancellation within 24 hours of appointment will not be eligible
                for a refund.
              </p>
            </div>
          </div>
          {/* CTA */}
          <div className="px-8 pb-8 space-y-3">
            <p className="text-center text-sm text-gray-500">
              Ready to go? Tap below to confirm your session booking.
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
                  Yes, Book My Session
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              disabled={booking}
              onClick={() => setView("kyc")}
              className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium text-sm transition"
            >
              ← Go Back & Edit KYC
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Default: KYC Form ───────────────────────────────────────────────────
  // Wait until KYC fetch is done (only if petUid exists)
  const petUid = bookingData?.petUid?.uid;

  if (petUid && !kycFetched) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <KycForm
      lockedPetUid={petUid}
      // existingKycData={kycRecord}
      existingKycUid={kycUid}
      onKycSuccess={handleKycSuccess}
    />
  );
}

export default BookingPage;
