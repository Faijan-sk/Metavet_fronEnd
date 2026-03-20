import {
  X,
  Calendar,
  Clock,
  PawPrint,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useState } from "react";
import AddPriscriptionForm from "./AddPrescriptionForm";
import MedicalHistory from "./MedicalHistoryTable";

// ─── Pet Avatar ───────────────────────────────────────────────────────────────

const getPetEmoji = (petSpecies) => {
  switch ((petSpecies || "").toLowerCase()) {
    case "dog":
      return "🐕";
    case "cat":
      return "🐈";
    case "rabbit":
      return "🐰";
    case "bird":
      return "🐦";
    case "mouse":
      return "🐭";
    default:
      return "🐾";
  }
};

const PetAvatar = ({ petImage, petName, petSpecies }) => {
  const [imgError, setImgError] = useState(false);

  if (petImage && !imgError) {
    return (
      <img
        src={`data:image/webp;base64,${petImage}`}
        alt={petName}
        className="w-20 h-20 rounded-full border-4 border-[#52B2AD] shadow-lg object-cover bg-white"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-full border-4 border-[#52B2AD] shadow-lg bg-[#52B2AD]/10 flex items-center justify-center text-3xl">
      {getPetEmoji(petSpecies)}
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
      return "bg-[#52B2AD]/20 text-[#2d7a76]";
    case "completed":
      return "bg-[#42948f]/20 text-[#42948f]";
    case "cancelled":
      return "bg-[#52B2AD]/10 text-[#52B2AD]";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ─── Medical History Modal ────────────────────────────────────────────────────

const MedicalHistoryModal = ({ appointment, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    aria-modal="true"
    role="dialog"
  >
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal shell */}
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <button
          onClick={onClose}
          className="ml-auto p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1">
        <MedicalHistory appointment={appointment} />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AppointmentListing = ({ appointments, onUpdate, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modal, setModal] = useState(null); // { type: 'history' | 'prescription', appointment }
  const itemsPerPage = 3;

  if (!appointments || appointments.length === 0) return null;

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  const handlePrevious = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  const goToPage = (pageIndex) => setCurrentPage(pageIndex);

  return (
    <div>
      {/* Appointments List */}
      <div className="space-y-6 mb-8">
        {currentAppointments.map((appointment, index) => {
          const actualStatus = getActualStatus(appointment);
          const petImage = appointment.fullPet?.petImage ?? null;

          return (
            <div
              key={appointment.id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              {/* Colored Top Bar */}
              <div
                className={`h-2 ${
                  actualStatus === "completed"
                    ? "bg-[#42948f]"
                    : actualStatus === "cancelled"
                      ? "bg-[#52B2AD]/40"
                      : "bg-[#52B2AD]"
                }`}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {getPetEmoji(appointment.petSpecies)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      Appointment #{appointment.id}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(actualStatus)}`}
                    >
                      {actualStatus.charAt(0).toUpperCase() +
                        actualStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Pet Image Circle */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <PetAvatar
                        petImage={petImage}
                        petName={appointment.petName}
                        petSpecies={appointment.petSpecies}
                      />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#42948f] rounded-full border-2 border-white flex items-center justify-center">
                        <PawPrint className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Owner */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <User size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Owner</span>
                      </div>
                      <p className="font-medium text-gray-800">
                        {appointment.userName || "—"}
                      </p>
                      {appointment.userEmail && (
                        <p className="text-xs text-gray-500">
                          {appointment.userEmail} {appointment.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Pet */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <PawPrint size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Pet Name</span>
                      </div>
                      <p className="font-medium text-gray-800">
                        {appointment.petName}
                      </p>
                      {appointment.petSpecies && (
                        <p className="text-xs text-gray-500">
                          {appointment.petSpecies}
                        </p>
                      )}
                      {appointment.petBreed && (
                        <p className="text-xs text-gray-400">
                          {appointment.petBreed}
                        </p>
                      )}
                      {appointment.petAge != null && (
                        <p className="text-xs text-gray-400">
                          {appointment.petAge} yrs
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Calendar size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Date</span>
                      </div>
                      <p className="font-medium text-gray-800">
                        {appointment.date}
                      </p>
                    </div>

                    {/* Time Slot */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Clock size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Time Slot</span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm">
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setModal({ type: "history", appointment })}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#52B2AD] border border-[#52B2AD] rounded-lg hover:bg-[#52B2AD] hover:text-white transition-colors"
                    >
                      <FileText size={15} />
                      View Medical History
                    </button>

                    <button
                      onClick={() =>
                        setModal({ type: "prescription", appointment })
                      }
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#52B2AD] rounded-lg hover:bg-[#3d9a95] transition-colors"
                    >
                      <Plus size={15} />
                      Add Prescription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Controls */}
      {appointments.length > itemsPerPage && (
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
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
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
      )}

      {appointments.length > itemsPerPage && (
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, appointments.length)}{" "}
            of {appointments.length} appointments
          </p>
        </div>
      )}

      {/* ── Medical History Modal ── */}
      {modal?.type === "history" && (
        <MedicalHistoryModal
          appointment={modal.appointment}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Add Prescription Modal ── */}
      {modal?.type === "prescription" && (
        <AddPriscriptionForm
          appointment={modal.appointment}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default AppointmentListing;
