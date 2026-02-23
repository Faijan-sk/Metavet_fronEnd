import {
  Trash2,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  PawPrint,
} from "lucide-react";
import { useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
};

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isPast = (dateStr) => {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

const getStatus = (appt) => {
  if (appt.status?.toLowerCase() === "cancelled") return "cancelled";
  if (isPast(appt.appointmentDate)) return "completed";
  return "upcoming";
};

const getPetIcon = (species) => {
  switch ((species || "").toLowerCase()) {
    case "dog":    return "🐕";
    case "cat":    return "🐈";
    case "rabbit": return "🐰";
    case "bird":   return "🐦";
    default:       return "🐾";
  }
};

// ── Constants ─────────────────────────────────────────────────────────────────

const PRIMARY       = "#52B2AD";
const PRIMARY_LIGHT = "#EAF6F5";
const PRIMARY_MID   = "#A8D8D6";
const ITEMS_PER_PAGE = 3;

const STATUS_CONFIG = {
  upcoming:  {
    label: "Upcoming",
    barStyle:   { background: PRIMARY },
    badgeStyle: { background: "#EAF6F5", color: PRIMARY, border: "1px solid #52B2AD" },
  },
  completed: {
    label: "Completed",
    barStyle:   { background: PRIMARY_MID },
    badgeStyle: { background: "#F0FAF9", color: "#3D8F8A", border: "1px solid #A8D8D6" },
  },
  cancelled: {
    label: "Cancelled",
    barStyle:   { background: "#D4EDEB" },
    badgeStyle: { background: "#F5F5F5", color: "#888", border: "1px solid #ddd" },
  },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-sm font-semibold text-gray-700">{value || "—"}</span>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────

const AppointmentListing = ({ appointments, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);

  if (!appointments || appointments.length === 0) return null;

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const current    = appointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="space-y-6 mb-8">
        {current.map((appt, index) => {
          const status = getStatus(appt);
          const cfg    = STATUS_CONFIG[status];

          return (
            <div
              key={appt.id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              {/* Top color bar */}
              <div className="h-2" style={cfg.barStyle} />

              {/* Card Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {appt.petSpecies ? getPetIcon(appt.petSpecies) : "🐾"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {appt.petName || appt.serviceType?.replace(/_/g, " ") || "Walker Appointment"}
                    </h3>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1"
                      style={cfg.badgeStyle}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    #{appt.id?.slice(0, 8) || index + 1}
                  </span>
                  {/* <button
                    onClick={() => onDelete && onDelete(appt)}
                    className="p-2.5 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all transform hover:scale-110"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button> */}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ── Pet Details ── */}
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: PRIMARY_LIGHT, borderColor: PRIMARY_MID }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                    style={{ color: "#42948f" }}
                  >
                    <PawPrint size={13} /> Pet Details
                  </p>
                  {appt.petName ? (
                    <div className="space-y-2">
                      <InfoRow label="Name"    value={appt.petName} />
                      <InfoRow label="Species" value={appt.petSpecies} />
                      <InfoRow label="Breed"   value={appt.petBreed} />
                      <InfoRow
                        label="Gender / Age"
                        value={
                          [
                            appt.petGender,
                            appt.petAge !== null ? `${appt.petAge} yrs` : "",
                          ]
                            .filter(Boolean)
                            .join(" · ") || "—"
                        }
                      />
                      {appt.healthStatus && (
                        <div
                          className="pt-2 border-t mt-1"
                          style={{ borderColor: PRIMARY_MID }}
                        >
                          <span className="text-xs text-gray-500 block mb-0.5">Health Status</span>
                          <span className="text-xs text-gray-700">{appt.healthStatus}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No pet information provided.</p>
                  )}
                </div>

                {/* ── Client Details ── */}
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: PRIMARY_LIGHT, borderColor: PRIMARY_MID }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                    style={{ color: "#42948f" }}
                  >
                    <User size={13} /> Client Details
                  </p>
                  <div className="space-y-2">
                    <InfoRow label="Name"  value={appt.userName} />
                    <InfoRow label="Email" value={appt.userEmail} />
                    <InfoRow label="Phone" value={appt.userPhone} />
                  </div>
                </div>
              </div>

              {/* ── Slot Footer ── */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: `linear-gradient(to right, ${PRIMARY_LIGHT}, #f0faf9)` }}
                  >
                    <div className="rounded-lg p-2 flex-shrink-0" style={{ background: PRIMARY }}>
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Appointment Date</p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatDate(appt.appointmentDate)}
                      </p>
                      {appt.dayOfWeek && (
                        <p className="text-xs font-medium capitalize" style={{ color: "#42948f" }}>
                          {appt.dayOfWeek.charAt(0) + appt.dayOfWeek.slice(1).toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: `linear-gradient(to right, ${PRIMARY_LIGHT}, #f0faf9)` }}
                  >
                    <div className="rounded-lg p-2 flex-shrink-0" style={{ background: "#42948f" }}>
                      <Clock size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Time Slot</p>
                      <p className="text-sm font-bold text-gray-800">
                        {appt.slotStart && appt.slotEnd
                          ? `${formatTime(appt.slotStart)} – ${formatTime(appt.slotEnd)}`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Provider Address */}
                {appt.providerAddress && (
                  <div className="mt-3 flex items-start gap-2">
                    <MapPin size={13} style={{ color: PRIMARY }} className="mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-500 leading-relaxed">
                      {appt.providerAddress}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Pagination ── */}
      {appointments.length > ITEMS_PER_PAGE && (
        <>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-3 rounded-full text-white transition-all transform hover:scale-110 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: PRIMARY }}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width:      i === currentPage ? "2.5rem" : "0.75rem",
                    height:     "0.75rem",
                    background: i === currentPage ? PRIMARY : PRIMARY_MID,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-3 rounded-full text-white transition-all transform hover:scale-110 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: PRIMARY }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, appointments.length)} of{" "}
              {appointments.length} appointments
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentListing;