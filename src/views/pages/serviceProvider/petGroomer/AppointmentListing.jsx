import {
  Pencil, Save, Trash2, X, Calendar, Clock,
  PawPrint, User, FileText, ChevronLeft, ChevronRight,
  Scissors, MapPin, Star, Package
} from "lucide-react";
import { useEffect, useState } from "react";
import useJwt from "../../../../enpoints/jwt/useJwt";

const AppointmentListing = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editAppointment, setEditAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // ── helpers ──────────────────────────────────────────────────────────────

  /** Format "10:30:00" → "10:30 AM" */
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  /** Map raw API object → display-friendly shape */
  const mapApiAppointment = (appt) => ({
    id: appt.id,
    uid: appt.uid,
    groomerName:
      `${appt.serviceProvider?.owner?.firstName ?? ""} ${appt.serviceProvider?.owner?.lastName ?? ""}`.trim(),
    groomerEmail: appt.serviceProvider?.owner?.email ?? "",
    petName: appt.pet?.petName ?? "—",
    petType: appt.pet?.petSpecies ?? "",
    petBreed: appt.pet?.petBreed ?? "",
    serviceName: appt.service?.serviceName ?? "—",
    serviceDuration: appt.service?.durationMinutes ?? null,
    servicePrice: appt.service?.price ?? null,
    date: appt.appointmentDate ?? "",
    startTime: appt.startTime ?? "",
    endTime: appt.endTime ?? "",
    status: appt.status ?? "PENDING",
    notes: appt.notes ?? "",
    // keep raw for edits
    _raw: appt,
  });

  const isPastDate = (dateString) => {
    if (!dateString) return false;
    const d = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const getActualStatus = (appt) => {
    const s = appt.status?.toUpperCase();
    if (s === "CANCELLED") return "cancelled";
    if (isPastDate(appt.date) && s !== "CANCELLED") return "completed";
    if (s === "CONFIRMED") return "confirmed";
    return "pending";
  };

  const statusStyle = (status) => {
    switch (status) {
      case "confirmed":  return "bg-[#d0ecea] text-[#2a8a85]";
      case "completed":  return "bg-[#52B2AD] text-white";
      case "cancelled":  return "bg-[#f0fafa] text-[#52B2AD] border border-[#52B2AD]";
      case "pending":
      default:           return "bg-[#e8f7f6] text-[#3a9e99]";
    }
  };

  const statusLabel = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const getPetIcon = (petType) => {
    switch ((petType || "").toLowerCase()) {
      case "dog":    return "🐕";
      case "cat":    return "🐈";
      case "rabbit": return "🐰";
      case "bird":   return "🐦";
      default:       return "🐾";
    }
  };

  const barColor = (status) => {
    switch (status) {
      case "completed": return "bg-[#52B2AD]";
      case "cancelled": return "bg-[#2a8a85]";
      case "confirmed": return "bg-[#7ececa]";
      default:          return "bg-[#a8dcda]";
    }
  };

  const avatarSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2352B2AD'/%3E%3C/svg%3E";

  // ── data fetching ─────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await useJwt.getGroomerBookedAppointmentForClient();
        const data = response?.data ?? [];
        setAppointments(data.map(mapApiAppointment));
      } catch (err) {
        console.error("Failed to fetch groomer appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // ── edit handlers ─────────────────────────────────────────────────────────

  const handleEdit = (appt) => setEditAppointment({ ...appt });
  const handleCancelEdit = () => setEditAppointment(null);

  const handleSaveEdit = () => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === editAppointment.id ? editAppointment : a))
    );
    setEditAppointment(null);
  };

  const handleDelete = (appt) => {
    setAppointments((prev) => prev.filter((a) => a.id !== appt.id));
    const newTotal = appointments.length - 1;
    const newTotalPages = Math.ceil(newTotal / itemsPerPage);
    if (currentPage >= newTotalPages && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // ── pagination ────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () =>
    setCurrentPage((p) => (p > 0 ? p - 1 : totalPages - 1));
  const handleNext = () =>
    setCurrentPage((p) => (p < totalPages - 1 ? p + 1 : 0));

  // ── render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#52B2AD] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading appointments…</p>
        </div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 text-gray-400">
        <Scissors size={48} className="text-[#52B2AD] opacity-40" />
        <p className="text-xl font-semibold">No grooming appointments found.</p>
        <p className="text-sm">Book your first session to get started!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Scissors className="text-[#52B2AD]" size={32} />
          Pet Groomer Appointments
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your pet's grooming sessions
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6 mb-8">
        {currentAppointments.map((appointment, index) => {
          const actualStatus = getActualStatus(appointment);
          const isEditing = editAppointment?.id === appointment.id;

          return (
            <div
              key={appointment.id ?? index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              {/* Colored top bar */}
              <div className={`h-2 ${barColor(actualStatus)}`} />

              {/* Card header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getPetIcon(appointment.petType)}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      Appointment #{appointment.id}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${statusStyle(actualStatus)}`}
                    >
                      {statusLabel(actualStatus)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="p-2.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all transform hover:scale-110"
                        title="Save"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all transform hover:scale-110"
                        title="Cancel"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all transform hover:scale-110"
                        title="Edit"
                      >
                        <Pencil size={20} />
                      </button> */}
                      {/* <button
                        onClick={() => handleDelete(appointment)}
                        className="p-2.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button> */}
                    </>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                {isEditing ? (
                  /* ── Edit mode ── */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Pet Name",     name: "petName",     type: "text" },
                        { label: "Groomer Name", name: "groomerName", type: "text" },
                        { label: "Date",         name: "date",        type: "date" },
                        { label: "Start Time",   name: "startTime",   type: "time" },
                        { label: "End Time",     name: "endTime",     type: "time" },
                        { label: "Notes",        name: "notes",       type: "text" },
                      ].map(({ label, name, type }) => (
                        <div key={name}>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            {label}
                          </label>
                          <input
                            type={type}
                            name={name}
                            value={editAppointment[name] ?? ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ── View mode ── */
                  <div className="flex items-start gap-6">
                    {/* Groomer avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={avatarSvg}
                          alt={appointment.groomerName}
                          className="w-20 h-20 rounded-full border-4 border-[#52B2AD] shadow-lg object-cover bg-white"
                        />
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                          <Scissors className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {/* Groomer */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <User size={14} className="text-[#52B2AD]" />
                          <span className="font-semibold">Groomer</span>
                        </div>
                        <p className="font-medium text-gray-800">{appointment.groomerName}</p>
                        <p className="text-xs text-gray-500">{appointment.groomerEmail}</p>
                      </div>

                      {/* Pet */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <PawPrint size={14} className="text-[#52B2AD]" />
                          <span className="font-semibold">Pet</span>
                        </div>
                        <p className="font-medium text-gray-800">{appointment.petName}</p>
                        {appointment.petBreed && (
                          <p className="text-xs text-gray-500">{appointment.petBreed}</p>
                        )}
                      </div>

                      {/* Service */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Package size={14} className="text-[#52B2AD]" />
                          <span className="font-semibold">Service</span>
                        </div>
                        <p className="font-medium text-gray-800">{appointment.serviceName}</p>
                        {appointment.serviceDuration && (
                          <p className="text-xs text-gray-500">{appointment.serviceDuration} min</p>
                        )}
                        {appointment.servicePrice != null && (
                          <p className="text-xs font-semibold text-[#52B2AD]">
                            ${appointment.servicePrice}
                          </p>
                        )}
                      </div>

                      {/* Date */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Calendar size={14} className="text-[#52B2AD]" />
                          <span className="font-semibold">Date</span>
                        </div>
                        <p className="font-medium text-gray-800">{appointment.date}</p>
                      </div>

                      {/* Time */}
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                          <Clock size={14} className="text-[#52B2AD]" />
                          <span className="font-semibold">Time</span>
                        </div>
                        <p className="font-medium text-gray-800 text-sm">
                          {formatTime(appointment.startTime)} – {formatTime(appointment.endTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes row */}
                {!isEditing && appointment.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <FileText size={16} className="text-[#52B2AD] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{appointment.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
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
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === i
                      ? "w-10 h-3 bg-[#52B2AD]"
                      : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#52B2AD] text-white hover:bg-[#42948f] transition-all transform hover:scale-110 shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, appointments.length)} of{" "}
              {appointments.length} appointments
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentListing;