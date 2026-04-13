import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Footprints,
  MapPin,
  XCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useJwt from "../../../../enpoints/jwt/useJwt";
import CancelAppointmentModal from "./../../petServicesAppointment/CancelAppointmentModal";

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
  if (appt.status?.toUpperCase() === "CANCELLED") return "cancelled";
  if (isPast(appt.appointmentDate)) return "completed";
  return "upcoming";
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

// ── Constants ─────────────────────────────────────────────────────────────────

const PRIMARY = "#52B2AD";
const PRIMARY_LIGHT = "#EAF6F5";
const PRIMARY_MID = "#A8D8D6";
const ITEMS_PER_PAGE = 3;

const STATUS_CONFIG = {
  upcoming: {
    label: "Upcoming",
    barStyle: { background: PRIMARY },
    badgeStyle: {
      background: "#EAF6F5",
      color: PRIMARY,
      border: "1px solid #52B2AD",
    },
  },
  completed: {
    label: "Completed",
    barStyle: { background: PRIMARY_MID },
    badgeStyle: {
      background: "#F0FAF9",
      color: "#3D8F8A",
      border: "1px solid #A8D8D6",
    },
  },
  cancelled: {
    label: "Cancelled",
    barStyle: { background: "#D4EDEB" },
    badgeStyle: {
      background: "#F5F5F5",
      color: "#888",
      border: "1px solid #ddd",
    },
  },
};

// ── Map API response → display shape ─────────────────────────────────────────

const mapAppointment = (appt) => ({
  ...appt,
  uid: appt.appointmentId,
  id: appt.appointmentId,
  appointmentDate: appt.appointmentDate,
  status: appt.status,
  slotStart: appt.slot?.startTime,
  slotEnd: appt.slot?.endTime,
  dayOfWeek: appt.slot?.dayOfWeek,
  petName: appt.pet?.petName || null,
  petSpecies: appt.pet?.petSpecies || null,
  petBreed: appt.pet?.petBreed || null,
  petGender: appt.pet?.petGender || null,
  petAge: appt.pet?.petAge ?? null,
  healthStatus: appt.pet?.healthStatus || null,
  providerName: appt.serviceProvider?.name || "—",
  serviceType: appt.serviceProvider?.serviceType || "—",
  providerAddress: appt.serviceProvider?.address || "",
  // For CancelAppointmentModal compatibility
  doctorFirstName: appt.serviceProvider?.name || "—",
  doctorLastName: "",
  time: appt.slot?.startTime ? formatTime(appt.slot.startTime) : "—",
  date: appt.appointmentDate,
});

// ── Three Dot Menu Component ──────────────────────────────────────────────────

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
          borderColor: open ? PRIMARY : "#e5e7eb",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: PRIMARY,
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

// ── Sub-components ────────────────────────────────────────────────────────────

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-sm font-semibold text-gray-700">{value || "—"}</span>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function WalkerAppointmentListing({ onDelete }) {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useJwt.getWalkerBookedAppointment();
        const data = response?.data || {};
        setRaw((data.appointments || []).map(mapAppointment));
      } catch {
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(raw.length / ITEMS_PER_PAGE);
  const visible = raw.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Cancel Modal */}
      {cancelTarget && (
        <CancelAppointmentModal
          appointmentType={"WALKER"}
          appointment={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirmCancel={(appt, reason) => {
            if (onDelete) onDelete(appt, reason);
            // Locally mark as cancelled
            setRaw((prev) =>
              prev.map((a) =>
                a.id === appt.id ? { ...a, status: "CANCELLED" } : a,
              ),
            );
            setCancelTarget(null);
          }}
        />
      )}

      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Footprints style={{ color: PRIMARY }} size={32} />
          Walker Appointments
        </h1>
        <p className="text-gray-500 mt-1">
          {raw.length > 0
            ? `${raw.length} appointment${raw.length !== 1 ? "s" : ""} booked`
            : "Manage your pet walker sessions"}
        </p>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
            style={{ borderColor: PRIMARY_MID, borderTopColor: PRIMARY }}
          />
          <p className="text-gray-500 text-sm">Loading appointments…</p>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div
          className="text-center py-20 rounded-2xl border"
          style={{
            background: PRIMARY_LIGHT,
            borderColor: PRIMARY_MID,
            color: "#3D8F8A",
          }}
        >
          <XCircle size={36} className="mx-auto mb-3 opacity-60" />
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && raw.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Footprints
            size={48}
            className="mx-auto mb-4"
            style={{ color: PRIMARY_MID }}
          />
          <p className="text-gray-500 font-medium text-xl">
            No walker appointments found.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Book a session with a pet walker to get started.
          </p>
        </div>
      )}

      {/* ── Cards ── */}
      {!loading && !error && visible.length > 0 && (
        <div className="space-y-6 mb-8">
          {visible.map((appt, index) => {
            const status = getStatus(appt);
            const cfg = STATUS_CONFIG[status];

            return (
              <div
                key={appt.uid || index}
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
                        {appt.petName || appt.serviceType?.replace(/_/g, " ")}
                      </h3>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1"
                        style={cfg.badgeStyle}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Right side — ID badge + Three Dot Menu */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                      #{appt.id?.slice(0, 8) || index + 1}
                    </span>

                    {/* Three Dot — only for non-cancelled appointments */}
                    {status !== "cancelled" && (
                      <ThreeDotMenu
                        onCancelClick={() => setCancelTarget(appt)}
                      />
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pet Details */}
                  <div
                    className="rounded-xl p-4 border"
                    style={{
                      background: PRIMARY_LIGHT,
                      borderColor: PRIMARY_MID,
                    }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                      style={{ color: "#42948f" }}
                    >
                      <span>🐾</span> Pet Details
                    </p>
                    {appt.petName ? (
                      <div className="space-y-2">
                        <InfoRow label="Name" value={appt.petName} />
                        <InfoRow label="Species" value={appt.petSpecies} />
                        <InfoRow label="Breed" value={appt.petBreed} />
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
                            <span className="text-xs text-gray-500 block mb-0.5">
                              Health Status
                            </span>
                            <span className="text-xs text-gray-700">
                              {appt.healthStatus}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        No pet information provided.
                      </p>
                    )}
                  </div>

                  {/* Service Provider Details */}
                  <div
                    className="rounded-xl p-4 border"
                    style={{
                      background: PRIMARY_LIGHT,
                      borderColor: PRIMARY_MID,
                    }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                      style={{ color: "#42948f" }}
                    >
                      <Footprints size={13} /> Service Provider
                    </p>
                    <div className="space-y-2">
                      <InfoRow label="Name" value={appt.providerName} />
                      <InfoRow
                        label="Service"
                        value={appt.serviceType?.replace(/_/g, " ")}
                      />
                      {appt.providerAddress && (
                        <div className="flex items-start gap-2 pt-1">
                          <MapPin
                            size={13}
                            style={{ color: PRIMARY }}
                            className="mt-0.5 flex-shrink-0"
                          />
                          <span className="text-xs text-gray-600 leading-relaxed">
                            {appt.providerAddress}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Slot Footer */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: `linear-gradient(to right, ${PRIMARY_LIGHT}, #f0faf9)`,
                      }}
                    >
                      <div
                        className="rounded-lg p-2 flex-shrink-0"
                        style={{ background: PRIMARY }}
                      >
                        <Calendar size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Appointment Date
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {formatDate(appt.appointmentDate)}
                        </p>
                        {appt.dayOfWeek && (
                          <p
                            className="text-xs font-medium capitalize"
                            style={{ color: "#42948f" }}
                          >
                            {appt.dayOfWeek.charAt(0) +
                              appt.dayOfWeek.slice(1).toLowerCase()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: `linear-gradient(to right, ${PRIMARY_LIGHT}, #f0faf9)`,
                      }}
                    >
                      <div
                        className="rounded-lg p-2 flex-shrink-0"
                        style={{ background: "#42948f" }}
                      >
                        <Clock size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Time Slot
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {appt.slotStart && appt.slotEnd
                            ? `${formatTime(appt.slotStart)} – ${formatTime(appt.slotEnd)}`
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
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-3 rounded-full text-white transition-all transform hover:scale-110 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: PRIMARY }}
              title="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === page ? "2.5rem" : "0.75rem",
                    height: "0.75rem",
                    background: i === page ? PRIMARY : PRIMARY_MID,
                  }}
                  title={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-3 rounded-full text-white transition-all transform hover:scale-110 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: PRIMARY }}
              title="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              Showing {page * ITEMS_PER_PAGE + 1}–
              {Math.min((page + 1) * ITEMS_PER_PAGE, raw.length)} of{" "}
              {raw.length} appointments
            </p>
          </div>
        </>
      )}
    </div>
  );
}
