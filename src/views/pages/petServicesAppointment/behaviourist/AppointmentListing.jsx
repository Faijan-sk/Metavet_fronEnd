import { Pencil, Save, Trash2, X, Calendar, Clock, Stethoscope, PawPrint, User, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Mock doctor image
const dr = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2352B2AD'/%3E%3C/svg%3E";

const AppointmentListing = ({ appointments, onUpdate, onDelete }) => {
  const [editAppointment, setEditAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const handleEdit = (appointment) => setEditAppointment({ ...appointment });

  const handleSaveEdit = () => {
    if (onUpdate) {
      onUpdate(editAppointment);
    }
    setEditAppointment(null);
  };

  const handleCancelEdit = () => setEditAppointment(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const isPastDate = (dateString) => {
    if (!dateString) return false;
    const appointmentDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  };

  const getActualStatus = (appointment) => {
    if (appointment.status?.toLowerCase() === 'cancelled') {
      return 'cancelled';
    }
    if (isPastDate(appointment.date)) {
      return 'completed';
    }
    return appointment.status?.toLowerCase() || 'booked';
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'booked':
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPetIcon = (petType) => {
    switch((petType || "").toLowerCase()) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐈';
      case 'rabbit':
        return '🐰';
      case 'bird':
        return '🐦';
      default:
        return '🐾';
    }
  };

  if (!appointments || appointments.length === 0) {
    return null;
  }

  // Calculate pagination
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div>
      {/* Appointments Grid */}
      <div className="space-y-6 mb-8">
        {currentAppointments.map((appointment, index) => {
          const actualStatus = getActualStatus(appointment);
          return (
          <div
            key={appointment.id || index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
          >
            {/* Colored Side Bar */}
            <div className={`h-2 ${actualStatus === 'completed' ? 'bg-green-500' : actualStatus === 'cancelled' ? 'bg-red-500' : 'bg-[#52B2AD]'}`} />
            
            {/* Card Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{getPetIcon(appointment.petType)}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    Appointment #{appointment.id}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {editAppointment?.id === appointment.id ? (
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
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="p-2.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all transform hover:scale-110"
                      title="Edit"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(appointment)}
                      className="p-2.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {editAppointment?.id === appointment.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Pet Name</label>
                      <input
                        type="text"
                        name="petName"
                        value={editAppointment.petName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Doctor</label>
                      <input
                        type="text"
                        name="doctor"
                        value={editAppointment.doctor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={editAppointment.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                      <input
                        type="text"
                        name="time"
                        value={editAppointment.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
                      <input
                        type="text"
                        name="reason"
                        value={editAppointment.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                      <input
                        type="text"
                        name="notes"
                        value={editAppointment.notes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start gap-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={dr}
                        alt={appointment.doctor}
                        className="w-20 h-20 rounded-full border-4 border-[#52B2AD] shadow-lg object-cover bg-white"
                      />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <User size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Doctor</span>
                      </div>
                      <p className="font-medium text-gray-800">{appointment.doctorName}</p>
                      <p className="text-xs text-gray-500">{appointment.fullDoctor?.specialization}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <PawPrint size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Pet Name</span>
                      </div>
                      <p className="font-medium text-gray-800">{appointment.petName}</p>
                      {appointment.petBreed && (
                        <p className="text-xs text-gray-500">{appointment.petBreed}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <span className="text-[#52B2AD]">🏥</span>
                        <span className="font-semibold">Hospital</span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm">{appointment.hospitalName}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Calendar size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Date</span>
                      </div>
                      <p className="font-medium text-gray-800">{appointment.date}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Clock size={14} className="text-[#52B2AD]" />
                        <span className="font-semibold">Time Slot</span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes/Additional Info Section */}
              {!editAppointment && (appointment.hospitalAddress || appointment.doctorBio) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appointment.hospitalAddress && (
                      <div className="flex items-start gap-2">
                        <FileText size={16} className="text-[#52B2AD] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">Hospital Address</p>
                          <p className="text-sm text-gray-700">{appointment.hospitalAddress}</p>
                        </div>
                      </div>
                    )}
                    {appointment.doctorBio && (
                      <div className="flex items-start gap-2">
                        <User size={16} className="text-[#52B2AD] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">Doctor Bio</p>
                          <p className="text-sm text-gray-700">{appointment.doctorBio}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>

      {/* Carousel Controls - Only show if more than 3 appointments */}
      {appointments.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-[#52B2AD] text-white hover:bg-[#42948f] transition-all transform hover:scale-110 shadow-lg"
            title="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === index
                    ? 'w-10 h-3 bg-[#52B2AD]'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Page ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-[#52B2AD] text-white hover:bg-[#42948f] transition-all transform hover:scale-110 shadow-lg"
            title="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Page Counter */}
      {appointments.length > itemsPerPage && (
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, appointments.length)} of {appointments.length} appointments
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentListing;