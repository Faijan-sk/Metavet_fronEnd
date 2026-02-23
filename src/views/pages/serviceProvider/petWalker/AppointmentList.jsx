import {
  Save, X, Calendar, Clock, ChevronLeft, ChevronRight,
  Footprints, User, Pencil, Trash2, XCircle, Timer
} from "lucide-react";
import { useEffect, useState } from "react";
import useJwt from "../../../../enpoints/jwt/useJwt";

// Helper: format time "15:00:00" → "3:00 PM"
const formatTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
};

// Helper: format date "2026-02-22" → "Sun, 22 Feb 2026"
const formatDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
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

// Only primary color #52B2AD and its shades used
// upcoming  → full primary
// completed → light primary
// cancelled → lighter primary / muted
const STATUS_CONFIG = {
  upcoming:  {
    label: "Upcoming",
    barStyle:   { background: "#52B2AD" },
    badgeStyle: { background: "#EAF6F5", color: "#52B2AD", border: "1px solid #52B2AD" },
  },
  completed: {
    label: "Completed",
    barStyle:   { background: "#A8D8D6" },
    badgeStyle: { background: "#F0FAF9", color: "#3D8F8A", border: "1px solid #A8D8D6" },
  },
  cancelled: {
    label: "Cancelled",
    barStyle:   { background: "#D4EDEB" },
    badgeStyle: { background: "#F5F5F5", color: "#888", border: "1px solid #ddd" },
  },
};

// Map raw API appointment → display shape
const mapAppointment = (appt) => ({
  uid: appt.uid,
  id: appt.id,
  appointmentDate: appt.appointmentDate,
  status: appt.status,
  walkerServiceType: appt.petWalker?.serviceType?.replace("_", " ") || "Pet Walker",
  slotStart: appt.slot?.startTime,
  slotEnd: appt.slot?.endTime,
  dayOfWeek: appt.slot?.petWalkerDay?.dayOfWeek,
  userName: `${appt.user?.firstName?.trim() || ""} ${appt.user?.lastName?.trim() || ""}`.trim(),
  userEmail: appt.user?.email,
  userPhone: appt.user?.fullPhoneNumber,
  petUid: appt.petUid,
  petWalkerUid: appt.petWalkerUid,
  editDate: appt.appointmentDate,
  editSlotStart: appt.slot?.startTime,
  editSlotEnd: appt.slot?.endTime,
});

const STATIC = { appointments: [], totalAppointments: 0 };
const ITEMS_PER_PAGE = 3;
const PRIMARY = "#52B2AD";
const PRIMARY_LIGHT = "#EAF6F5";
const PRIMARY_MID = "#A8D8D6";

export default function WalkerAppointmentListing() {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useJwt.getWalkerBookedAppointment();
        const data = response?.data || STATIC;
        setRaw((data.appointments || []).map(mapAppointment));
      } catch (e) {
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(raw.length / ITEMS_PER_PAGE);
  const visible = raw.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  const startEdit = (appt) => {
    setEditId(appt.uid);
    setEditData({ editDate: appt.editDate, editSlotStart: appt.editSlotStart, editSlotEnd: appt.editSlotEnd });
  };

  const saveEdit = (uid) => {
    setRaw((prev) =>
      prev.map((a) =>
        a.uid === uid
          ? { ...a, ...editData, appointmentDate: editData.editDate, slotStart: editData.editSlotStart, slotEnd: editData.editSlotEnd }
          : a
      )
    );
    setEditId(null);
  };

  const deleteAppt = (uid) => {
    setRaw((prev) => prev.filter((a) => a.uid !== uid));
    const newPages = Math.ceil((raw.length - 1) / ITEMS_PER_PAGE);
    if (page >= newPages && page > 0) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ── Header ── */}
      <div className="mb-8 flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: PRIMARY }}
        >
          <Footprints size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Walker Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {raw.length > 0
              ? `${raw.length} appointment${raw.length !== 1 ? "s" : ""} booked`
              : "No appointments yet"}
          </p>
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
            style={{ borderColor: PRIMARY_MID, borderTopColor: PRIMARY }}
          />
          <p className="text-gray-500">Fetching appointments…</p>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div
          className="text-center py-20 rounded-2xl border"
          style={{ background: PRIMARY_LIGHT, borderColor: PRIMARY_MID, color: "#3D8F8A" }}
        >
          <XCircle size={36} className="mx-auto mb-3 opacity-60" />
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && raw.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Footprints size={48} className="mx-auto mb-4" style={{ color: PRIMARY_MID }} />
          <p className="text-gray-500 font-medium">No walker appointments found.</p>
        </div>
      )}

      {/* ── Cards ── */}
      {!loading && !error && visible.length > 0 && (
        <div className="space-y-5">
          {visible.map((appt) => {
            const status = getStatus(appt);
            const cfg = STATUS_CONFIG[status];
            const isEditing = editId === appt.uid;

            return (
              <div
                key={appt.uid}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
              >
                {/* Top color bar */}
                <div className="h-1.5" style={cfg.barStyle} />

                <div className="p-5">
                  {/* Row 1: Date block + status badge + action buttons */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">

                      {/* Date block */}
                      <div
                        className="flex-shrink-0 w-14 text-center rounded-xl py-2 border"
                        style={{ background: PRIMARY_LIGHT, borderColor: PRIMARY_MID }}
                      >
                        <p className="text-xs uppercase tracking-wider leading-none" style={{ color: PRIMARY }}>
                          {new Date(appt.appointmentDate).toLocaleDateString("en-IN", { month: "short" })}
                        </p>
                        <p className="text-2xl font-bold text-gray-800 leading-tight">
                          {new Date(appt.appointmentDate).getDate()}
                        </p>
                        <p className="text-xs text-gray-400 leading-none">
                          {new Date(appt.appointmentDate).getFullYear()}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={cfg.badgeStyle}
                          >
                            {cfg.label}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">#{appt.id}</span>
                        </div>
                        <p className="text-gray-700 font-semibold text-base">{appt.walkerServiceType}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                          <Calendar size={11} />
                          {formatDate(appt.appointmentDate)}
                          {appt.dayOfWeek && (
                            <span className="ml-1 font-medium" style={{ color: PRIMARY }}>
                              · {appt.dayOfWeek.charAt(0) + appt.dayOfWeek.slice(1).toLowerCase()}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEdit(appt.uid)}
                            className="p-2 rounded-xl transition-colors"
                            style={{ background: PRIMARY_LIGHT, color: PRIMARY }}
                            onMouseEnter={(e) => e.currentTarget.style.background = PRIMARY_MID}
                            onMouseLeave={(e) => e.currentTarget.style.background = PRIMARY_LIGHT}
                            title="Save"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="p-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          {/* <button
                            onClick={() => startEdit(appt)}
                            className="p-2 rounded-xl transition-colors"
                            style={{ background: PRIMARY_LIGHT, color: PRIMARY }}
                            onMouseEnter={(e) => e.currentTarget.style.background = PRIMARY_MID}
                            onMouseLeave={(e) => e.currentTarget.style.background = PRIMARY_LIGHT}
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button> */}
                          <button
                            onClick={() => deleteAppt(appt.uid)}
                            className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-100 mb-4" />

                  {/* Row 2: Edit form OR Info pills */}
                  {isEditing ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Appointment Date", key: "editDate",      type: "date", val: editData.editDate || "",                  fmt: (v) => v },
                        { label: "Slot Start",       key: "editSlotStart", type: "time", val: editData.editSlotStart?.slice(0, 5) || "", fmt: (v) => v + ":00" },
                        { label: "Slot End",         key: "editSlotEnd",   type: "time", val: editData.editSlotEnd?.slice(0, 5)   || "", fmt: (v) => v + ":00" },
                      ].map(({ label, key, type, val, fmt }) => (
                        <div key={key}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
                          <input
                            type={type}
                            value={val}
                            onChange={(e) => setEditData((p) => ({ ...p, [key]: fmt(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"
                            onFocus={(e) => { e.target.style.borderColor = PRIMARY; e.target.style.boxShadow = `0 0 0 2px ${PRIMARY_MID}`; }}
                            onBlur={(e)  => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { icon: <Clock size={15} style={{ color: PRIMARY }} />, label: "Slot", value: `${formatTime(appt.slotStart)} – ${formatTime(appt.slotEnd)}` },
                        { icon: <Footprints size={15} style={{ color: PRIMARY }} />, label: "Service", value: appt.walkerServiceType },
                        { icon: <User size={15} style={{ color: PRIMARY }} />, label: "Client", value: appt.userName, truncate: true },
                        {
                          icon: <Timer size={15} style={{ color: PRIMARY }} />,
                          label: "Duration",
                          value: (() => {
                            if (!appt.slotStart || !appt.slotEnd) return "—";
                            const [sh, sm] = appt.slotStart.split(":").map(Number);
                            const [eh, em] = appt.slotEnd.split(":").map(Number);
                            const diff = (eh * 60 + em) - (sh * 60 + sm);
                            return diff >= 60 ? `${diff / 60}h` : `${diff}m`;
                          })(),
                        },
                      ].map(({ icon, label, value, truncate }) => (
                        <div key={label} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: PRIMARY_LIGHT }}
                          >
                            {icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-400">{label}</p>
                            <p className={`text-sm font-semibold text-gray-700 ${truncate ? "truncate" : ""}`}>
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Row 3: Contact strip */}
                  {/* {!isEditing && (appt.userEmail || appt.userPhone) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-4">
                      {appt.userEmail && (
                        <p className="text-xs text-gray-400">
                          📧 <span className="text-gray-600">{appt.userEmail}</span>
                        </p>
                      )}
                      {appt.userPhone && (
                        <p className="text-xs text-gray-400">
                          📞 <span className="text-gray-600">{appt.userPhone}</span>
                        </p>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = PRIMARY_LIGHT; e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; }}}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#4b5563"; }}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2 items-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === page ? "2rem" : "0.625rem",
                    height: "0.625rem",
                    background: i === page ? PRIMARY : PRIMARY_MID,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = PRIMARY_LIGHT; e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; }}}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#4b5563"; }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-3">
            Showing {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, raw.length)} of {raw.length}
          </p>
        </>
      )}
    </div>
  );
}