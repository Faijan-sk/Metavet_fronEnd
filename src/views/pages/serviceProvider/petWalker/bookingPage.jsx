import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWalkerAppointment } from "../../../../context/WalkerAppointmentContext";
import useJwt from "../../../../enpoints/jwt/useJwt";
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import KycFrom from "./../../kyc/walker-kyc/WalkerToClientKyc";

const WalkerAppointmentPage = () => {
  const navigate = useNavigate();
  const {
    walkerInfo,
    selectedDate,
    walkerDayUid,
    selectedSlot,
    selectedPet,
    clearAppointmentData,
  } = useWalkerAppointment();

  // ─── Guard ────────────────────────────────────────────────────
  useEffect(() => {
    if (!walkerInfo || !selectedSlot || !selectedPet) {
      navigate("/walker-appointment");
    }
  }, []);

  // ─── KYC State ────────────────────────────────────────────────
  const [kycStatus, setKycStatus] = useState("idle"); // "idle" | "loading" | "found" | "not_found"
  const [kycRecord, setKycRecord] = useState(null);
  const [showSummary, setShowSummary] = useState(false); // summary accordion

  // ─── Booking State ────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // ─── Fetch KYC ────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedPet?.uid) return;
    const fetchKyc = async () => {
      setKycStatus("loading");
      try {
        const response = await useJwt.getWalkerToClientKycByPet(
          selectedPet.uid,
        );
        if (response.data?.success) {
          setKycStatus("found");
          setKycRecord(response.data.data);
        } else {
          setKycStatus("not_found");
        }
      } catch (error) {
        setKycStatus("not_found");
      }
    };
    fetchKyc();
  }, [selectedPet?.uid]);

  // ─── Book Walk ────────────────────────────────────────────────
  const handleBookWalk = async () => {
    if (!selectedPet?.uid || !selectedDate || !selectedSlot) return;

    setLoading(true);
    setBookingError("");
    try {
      const payload = {
        petWalkerUid: selectedSlot.petWalker.uid,
        petWalkerDayUid: selectedSlot.petWalkerDayUid,
        slotUid: selectedSlot.slotUid,
        kycId: kycRecord?.kycUid,
        appointmentDate: [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-"),
        petUid: selectedPet.uid,
      };

      const response = await useJwt.BookWalkerAppointment(payload);
      const checkoutUrl =
        response.data?.checkoutUrl || response.data?.data?.checkoutUrl;

      setBookingSuccess(true);
      clearAppointmentData();

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setLoading(false);
        navigate("/appointments");
      }
    } catch (error) {
      setBookingError(
        error.response?.data?.message ||
          "Failed to book walk. Please try again.",
      );
      setLoading(false);
    }
  };

  // ─── Format helpers ───────────────────────────────────────────
  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!walkerInfo || !selectedSlot || !selectedPet) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* ── Header ── */}
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Book a Walk</h1>
          <p className="text-sm text-[#52B2AD] font-medium mt-1">
            with {walkerInfo.name}
          </p>
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* ══════════════════════════════════════
              SECTION 1 — KYC
          ══════════════════════════════════════ */}
          <section>
            <SectionLabel step="1" title="KYC Verification" />

            {kycStatus === "loading" && (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mt-3">
                <svg
                  className="animate-spin h-4 w-4 text-[#52B2AD]"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-sm text-gray-500">Checking KYC status…</p>
              </div>
            )}

            {kycStatus === "not_found" && (
              <div className="mt-3 bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 leading-tight">
                      KYC Verification Required
                    </p>
                    <p className="text-xs text-amber-600 mt-0.5">
                      Please complete your KYC before booking.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/walkerTo-client-Kyc")}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-xl transition"
                >
                  Complete KYC →
                </button>
              </div>
            )}

            {kycStatus === "found" && (
              <div className="mt-3 bg-green-50 border border-green-300 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        KYC Verified ✓
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Your details are confirmed
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/walkerTo-client-Kyc", {
                        state: { kycData: kycRecord },
                      })
                    }
                    className="shrink-0 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ══════════════════════════════════════
              SECTION 2 — Booking Summary
          ══════════════════════════════════════ */}
          <section>
            <SectionLabel step="2" title="Booking Summary" />

            {/* Accordion toggle */}
            <button
              type="button"
              onClick={() => setShowSummary((p) => !p)}
              className="mt-3 w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 transition"
            >
              <span className="text-sm font-medium text-gray-700">
                {selectedPet.petName} · {formatDate(selectedDate)}
              </span>
              {showSummary ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {showSummary && (
              <div className="mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3">
                <SummaryRow label="Walker" value={walkerInfo.name} />
                <Divider />
                <SummaryRow label="Date" value={formatDate(selectedDate)} />
                <Divider />
                <SummaryRow
                  label="Time"
                  value={`${formatTime(selectedSlot?.startTime)} – ${formatTime(selectedSlot?.endTime)}`}
                />
                <Divider />
                <SummaryRow
                  label="Pet"
                  value={`${selectedPet.petName} (${selectedPet.petSpecies} · ${selectedPet.petBreed})`}
                />
              </div>
            )}

            {/* Always-visible compact summary (when accordion closed) */}
            {!showSummary && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <InfoChip
                  label="Time"
                  value={`${formatTime(selectedSlot?.startTime)} – ${formatTime(selectedSlot?.endTime)}`}
                />
                <InfoChip label="Pet" value={`${selectedPet.petName}`} />
              </div>
            )}
          </section>

          {/* ══════════════════════════════════════
              SECTION 3 — Errors / Success
          ══════════════════════════════════════ */}
          {bookingError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
              {bookingError}
            </div>
          )}
          {bookingSuccess && (
            <div className="text-sm text-green-600 bg-green-50 border border-green-200 p-3 rounded-xl">
              Walk booked! Redirecting to payment…
            </div>
          )}

          {/* ══════════════════════════════════════
              SECTION 4 — Actions
          ══════════════════════════════════════ */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={loading || kycStatus !== "found"}
              onClick={handleBookWalk}
              className={`flex-1 py-3 rounded-xl text-white text-sm font-semibold transition ${
                loading || kycStatus !== "found"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#52B2AD] to-[#3a9490] hover:scale-[1.02] shadow-md shadow-[#52B2AD]/30"
              }`}
            >
              {loading
                ? bookingSuccess
                  ? "Redirecting…"
                  : "Booking…"
                : kycStatus !== "found"
                  ? "Complete KYC First"
                  : "Confirm & Pay →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Helper components ────────────────────────────────────────────────────────

const SectionLabel = ({ step, title }) => (
  <div className="flex items-center gap-2.5">
    <span className="w-6 h-6 rounded-full bg-[#52B2AD] text-white text-xs font-bold flex items-center justify-center shrink-0">
      {step}
    </span>
    <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
      {title}
    </span>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-xs text-gray-500 font-medium shrink-0">{label}</span>
    <span className="text-sm text-gray-800 font-medium text-right">
      {value}
    </span>
  </div>
);

const Divider = () => <hr className="border-gray-200" />;

const InfoChip = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl px-3 py-2">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
  </div>
);

export default WalkerAppointmentPage;
