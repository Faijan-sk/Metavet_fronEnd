import {
  Calendar,
  Clock,
  PawPrint,
  User,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const AppointmentListing = ({ appointments, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const isPastDate = (dateString) => {
    if (!dateString) return false;
    const appointmentDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  };

  const getActualStatus = (appointment) => {
    if (appointment.status?.toLowerCase() === "cancelled") return "cancelled";
    if (isPastDate(appointment.date)) return "completed";
    return appointment.status?.toLowerCase() || "booked";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "booked":
      case "upcoming":
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

  const getPetIcon = (petType) => {
    switch ((petType || "").toLowerCase()) {
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
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!appointments || appointments.length === 0) return null;

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  const goToPage = (pageIndex) => setCurrentPage(pageIndex);

  return (
    <div>
      <div className="space-y-6 mb-8">
        {currentAppointments.map((appointment, index) => {
          const actualStatus = getActualStatus(appointment);

          return (
            <div
              key={appointment.id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              {/* Colored Top Bar */}
              <div className={`h-2 ${getStatusBarColor(actualStatus)}`} />

              {/* Card Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {getPetIcon(appointment.petType)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {appointment.petName || "Unknown Pet"}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(
                        actualStatus
                      )}`}
                    >
                      {actualStatus.charAt(0).toUpperCase() +
                        actualStatus.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Appointment ID badge */}
                <span className="text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  #{appointment.id?.slice(0, 8) || index + 1}
                </span>
              </div>

              {/* Card Body — two columns: Pet | Pet Parent */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ── Pet Info ── */}
                <div className="bg-[#52B2AD]/5 rounded-xl p-4 border border-[#52B2AD]/10">
                  <p className="text-xs font-bold text-[#42948f] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <PawPrint size={13} />
                    Pet Details
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Name</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {appointment.petName || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Species</span>
                      <span className="text-sm font-medium text-gray-700">
                        {appointment.petType || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Breed</span>
                      <span className="text-sm font-medium text-gray-700">
                        {appointment.petBreed || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Gender / Age</span>
                      <span className="text-sm font-medium text-gray-700">
                        {[appointment.petGender, appointment.petAge ? `${appointment.petAge} yrs` : ""].filter(Boolean).join(" · ") || "—"}
                      </span>
                    </div>
                    {appointment.petHealthStatus && (
                      <div className="pt-2 border-t border-[#52B2AD]/10 mt-1">
                        <span className="text-xs text-gray-500 block mb-0.5">Health Status</span>
                        <span className="text-xs text-gray-700">
                          {appointment.petHealthStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Pet Parent Info ── */}
                <div className="bg-[#52B2AD]/5 rounded-xl p-4 border border-[#52B2AD]/10">
                  <p className="text-xs font-bold text-[#42948f] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <User size={13} />
                    Pet Parent
                  </p>
                  {(() => {
                    const u = appointment.fullUser || {};
                    const name = appointment.ownerName ||
                      [u.firstName, u.lastName].map(s => (s||"").trim()).filter(Boolean).join(" ");
                    const email = appointment.ownerEmail || u.email || "";
                    const phone = appointment.ownerPhone || u.fullPhoneNumber || "";
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Name</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {name || "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail size={13} className="text-[#52B2AD] flex-shrink-0" />
                          <span className="truncate">{email || "—"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone size={13} className="text-[#52B2AD] flex-shrink-0" />
                          <span>{phone || "—"}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* ── Slot & Date Footer ── */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#52B2AD]/10 to-[#42948f]/5 rounded-xl px-4 py-3">
                    <div className="bg-[#52B2AD] rounded-lg p-2 flex-shrink-0">
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Appointment Date
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatDate(appointment.date)}
                      </p>
                      {appointment.dayOfWeek && (
                        <p className="text-xs text-[#42948f] capitalize font-medium">
                          {appointment.dayOfWeek.charAt(0) +
                            appointment.dayOfWeek.slice(1).toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#52B2AD]/10 to-[#42948f]/5 rounded-xl px-4 py-3">
                    <div className="bg-[#42948f] rounded-lg p-2 flex-shrink-0">
                      <Clock size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Time Slot
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {appointment.time || "—"}
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
                  onClick={() => goToPage(index)}
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

export default AppointmentListing;