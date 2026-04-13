import {
  Calendar,
  Clock,
  PawPrint,
  MapPin,
  Brain,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useJwt from "../../../../enpoints/jwt/useJwt";
import CancelAppointmentModal from "./../../petServicesAppointment/CancelAppointmentModal";

// ─── Three Dot Menu Component ────────────────────────────────────────────────
const ThreeDotMenu = ({ onCancelClick }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: open ? "#f0faf9" : "transparent",
          border: "1px solid",
          borderColor: open ? "#52B2AD" : "#e5e7eb",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#52B2AD",
          transition: "all 0.2s",
        }}
        title="Options"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "42px",
            right: "0",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 100,
            minWidth: "180px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => {
              setOpen(false);
              onCancelClick();
            }}
            style={{
              width: "100%",
              padding: "10px 16px",
              border: "none",
              background: "white",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              color: "#dc2626",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <Trash2 size={15} color="#dc2626" />
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Main AppointmentListing Component ──────────────────────────────────────
const AppointmentListing = ({ onDelete }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [cancelTarget, setCancelTarget] = useState(null);
  const itemsPerPage = 3;

  const mapAppointment = (appt) => ({
    ...appt,
    id: appt.appointmentId,
    appointmentDate: appt.appointmentDate || "—",
    status: appt.status?.toLowerCase() || "booked",
    startTime: appt.slot?.startTime?.slice(0, 5) || "",
    endTime: appt.slot?.endTime?.slice(0, 5) || "",
    dayOfWeek: appt.slot?.dayOfWeek || "",
    petName: appt.pet?.petName || "—",
    petSpecies: appt.pet?.petSpecies || "—",
    petBreed: appt.pet?.petBreed || "—",
    petGender: appt.pet?.petGender || "",
    petAge: appt.pet?.petAge ?? "",
    healthStatus: appt.pet?.healthStatus || "",
    providerName: appt.serviceProvider?.name || "—",
    serviceType: appt.serviceProvider?.serviceType || "—",
    providerAddress: appt.serviceProvider?.address || "",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await useJwt.getBehavioBookedAppoin();
        const list = response?.data?.appointments || [];
        setAppointments(list.map(mapAppointment));
      } catch (err) {
        console.error("Failed to fetch behaviourist appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const isPastDate = (dateString) => {
    if (!dateString) return false;
    const d = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const getActualStatus = (appointment) => {
    if (appointment.status === "cancelled") return "cancelled";
    if (isPastDate(appointment.appointmentDate)) return "completed";
    return appointment.status || "booked";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-[#52B2AD]/10 text-[#42948f]";
      case "completed":
        return "bg-[#52B2AD]/20 text-[#2d7a76]";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBarColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-[#42948f]";
      case "cancelled":
        return "bg-red-400";
      default:
        return "bg-[#52B2AD]";
    }
  };

  const getPetIcon = (species) => {
    switch ((species || "").toLowerCase()) {
      case "dog":
        return "🐕";
      case "cat":
        return "🐈";
      case "rabbit":
        return "🐰";
      case "bird":
        return "🐦";
      default:
        return "🐾";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "—") return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePrevious = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));

  // ── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <PageHeader />
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-[#52B2AD] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading appointments...</p>
        </div>
      </div>
    );
  }

  // ── Empty ────────────────────────────────────────────────────
  if (!appointments.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <PageHeader />
        <div className="text-center py-20 text-gray-400">
          <Brain size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-xl font-semibold">No appointments found.</p>
          <p className="text-sm mt-2">
            Book a session with a pet behaviourist to get started.
          </p>
        </div>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Cancel Modal */}
      {cancelTarget && (
        <CancelAppointmentModal
          appointmentType={"BEHAVIOURIST"}
          appointment={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirmCancel={(appt, reason) => {
            if (onDelete) onDelete(appt, reason);
            // Locally mark as cancelled
            setAppointments((prev) =>
              prev.map((a) =>
                a.id === appt.id ? { ...a, status: "cancelled" } : a,
              ),
            );
            setCancelTarget(null);
          }}
        />
      )}

      <PageHeader />

      <div className="space-y-6 mb-8">
        {currentAppointments.map((appointment, index) => {
          const actualStatus = getActualStatus(appointment);

          return (
            <div
              key={appointment.id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              {/* Status Bar */}
              <div className={`h-2 ${getStatusBarColor(actualStatus)}`} />

              {/* Card Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {getPetIcon(appointment.petSpecies)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {appointment.petName}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(actualStatus)}`}
                    >
                      {actualStatus.charAt(0).toUpperCase() +
                        actualStatus.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Right side — ID badge + Three Dot Menu */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    #{appointment.id?.slice(0, 8) || index + 1}
                  </span>

                  {/* Three Dot — only for non-cancelled appointments */}
                  {actualStatus !== "cancelled" && (
                    <ThreeDotMenu
                      onCancelClick={() => setCancelTarget(appointment)}
                    />
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pet Details */}
                <div className="bg-[#52B2AD]/5 rounded-xl p-4 border border-[#52B2AD]/10">
                  <p className="text-xs font-bold text-[#42948f] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <PawPrint size={13} />
                    Pet Details
                  </p>
                  <div className="space-y-2">
                    <InfoRow label="Name" value={appointment.petName} />
                    <InfoRow label="Species" value={appointment.petSpecies} />
                    <InfoRow label="Breed" value={appointment.petBreed} />
                    <InfoRow
                      label="Gender / Age"
                      value={
                        [
                          appointment.petGender,
                          appointment.petAge !== ""
                            ? `${appointment.petAge} yrs`
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" · ") || "—"
                      }
                    />
                    {appointment.healthStatus && (
                      <div className="pt-2 border-t border-[#52B2AD]/10 mt-1">
                        <span className="text-xs text-gray-500 block mb-0.5">
                          Health Status
                        </span>
                        <span className="text-xs text-gray-700">
                          {appointment.healthStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Provider Details */}
                <div className="bg-[#52B2AD]/5 rounded-xl p-4 border border-[#52B2AD]/10">
                  <p className="text-xs font-bold text-[#42948f] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Brain size={13} />
                    Service Provider
                  </p>
                  <div className="space-y-2">
                    <InfoRow label="Name" value={appointment.providerName} />
                    <InfoRow
                      label="Service"
                      value={appointment.serviceType?.replace(/_/g, " ") || "—"}
                    />
                    {appointment.providerAddress && (
                      <div className="flex items-start gap-2 pt-1">
                        <MapPin
                          size={13}
                          className="text-[#52B2AD] mt-0.5 flex-shrink-0"
                        />
                        <span className="text-xs text-gray-600 leading-relaxed">
                          {appointment.providerAddress}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Slot Footer */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#52B2AD]/10 to-[#42948f]/5 rounded-xl px-4 py-3">
                    <div className="bg-[#52B2AD] rounded-lg p-2 flex-shrink-0">
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Appointment Date
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatDate(appointment.appointmentDate)}
                      </p>
                      {appointment.dayOfWeek && (
                        <p className="text-xs text-[#42948f] capitalize font-medium">
                          {appointment.dayOfWeek.charAt(0) +
                            appointment.dayOfWeek.slice(1).toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#52B2AD]/10 to-[#42948f]/5 rounded-xl px-4 py-3">
                    <div className="bg-[#42948f] rounded-lg p-2 flex-shrink-0">
                      <Clock size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Time Slot
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {appointment.startTime && appointment.endTime
                          ? `${appointment.startTime} – ${appointment.endTime}`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {appointments.length > itemsPerPage && (
        <>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-[#52B2AD] text-white hover:bg-[#42948f] transition-all transform hover:scale-110 shadow-lg"
              title="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === index
                      ? "w-10 h-3 bg-[#52B2AD]"
                      : "w-3 h-3 bg-gray-300 hover:bg-[#52B2AD]/50"
                  }`}
                  title={`Page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#52B2AD] text-white hover:bg-[#42948f] transition-all transform hover:scale-110 shadow-lg"
              title="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, appointments.length)} of{" "}
              {appointments.length} appointments
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const PageHeader = () => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
      <Brain className="text-[#52B2AD]" size={32} />
      Pet Behaviourist Appointments
    </h1>
    <p className="text-gray-500 mt-1">
      Manage your pet's behaviour consultation sessions
    </p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-700">{value || "—"}</span>
  </div>
);

export default AppointmentListing;
