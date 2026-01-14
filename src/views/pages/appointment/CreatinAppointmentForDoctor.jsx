import { Pencil, Save, Trash2, X, Calendar, Clock, Stethoscope, PawPrint, Plus, FileText, User, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import BookAppointmentForm from "./BokAppointmentForm";
import useJwt from "../../../enpoints/jwt/useJwt";
import CreateAppointment from "./CreateAppointment";

// Mock doctor image
const dr = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2352B2AD'/%3E%3C/svg%3E";

// const getUserInfo = () => {
//   try {
//     const userInfo = localStorage.getItem("userInfo");
//     return userInfo ? JSON.parse(userInfo) : null;
//   } catch (error) {
//     console.error('Error parsing userInfo:', error);
//     return null;
//   }
// };

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editAppointment, setEditAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // replaces showAddModal
  const [modalType, setModalType] = useState(null); // 'book' or 'create'
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // keep userInfo in state so it can change if localStorage is updated elsewhere
  const [userInfo, setUserInfo] = useState(getUserInfo());

  useEffect(() => {
    // optional: listen for storage changes (other tabs) to keep userInfo fresh
    const onStorage = (e) => {
      if (e.key === "userInfo") setUserInfo(getUserInfo());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Fetch appointments from API
  useEffect(() => {
    let cancelled = false;

    async function fetchAppointments() {
      try {
        setLoading(true);
        console.log('Fetching user appointments...');

        // Ensure we have userInfo; if not, redirect to signin (or handle gracefully)
        if (!userInfo) {
          console.warn("No userInfo found in localStorage. Redirecting to Signin.");
          // you can change behavior if you don't want to redirect
          window.location.href = "/Signin";
          return;
        }

        // declare response variable in outer scope so it's accessible after branches
        let response;

        // call correct API based on userType but handle both responses the same way
        try {
          if (userInfo.userType === 2) {
            response = await useJwt.getBookedAppointment();
          } else {
            response = await useJwt.getMyAppointments();
          }
        } catch (apiErr) {
          console.error("API call failed:", apiErr);
          // Try fallback: if one endpoint fails, try the other (optional)
          try {
            response = await useJwt.getMyAppointments();
          } catch (fallbackErr) {
            console.error("Fallback API call failed:", fallbackErr);
            response = null;
          }
        }

        console.log('Appointments response:', response?.data ?? response);

        if (cancelled) return;

        // Normalize response data shape
        // Expected server shape (from your note): { userId, totalAppointments, appointments: [...] }
        // But we'll handle variations robustly.
        const data = response?.data ?? response;
        const rawAppointments = Array.isArray(data) ? data : (data?.appointments ?? []);

        if (!rawAppointments || rawAppointments.length === 0) {
          setAppointments([]);
          return;
        }

        // Transform backend data to match UI structure
        const transformedAppointments = rawAppointments.map(apt => {
          // defensive accessors
          const doctor = apt.doctor ?? apt.doctorDetail ?? null;
          const slot = apt.slot ?? apt.timeSlot ?? null;
          const user = apt.user ?? apt.patient ?? null;
          const pet = apt.pet ?? null;
          const appointmentDate = apt.appointmentDate ?? apt.date ?? apt.dateOfAppointment ?? apt.date_time ?? null;

          return {
            id: apt.id ?? apt.appointmentId ?? Math.random().toString(36).slice(2,9),
            petId: apt.petId ?? apt.pet_id ?? apt.petRef ?? "N/A",
            petName: pet?.petName ?? "Unknown Pet",
            doctor: doctor ? `${doctor.qualification ?? 'Dr.'} (${doctor.specialization ?? 'General'})` : 'Unknown',
            doctorName: doctor?.name ?? doctor?.qualification ?? 'Doctor',
            petType: apt.petType ?? pet?.petSpecies ?? "Pet",
            petBreed: pet?.petBreed ?? "",
            petAge: pet?.petAge ?? null,
            date: appointmentDate,
            time: slot ? `${slot.startTime ?? slot.from} - ${slot.endTime ?? slot.to}` : (apt.time ?? 'N/A'),
            startTime: slot?.startTime ?? slot?.from,
            endTime: slot?.endTime ?? slot?.to,
            reason: doctor?.specialization ?? apt.reason ?? 'Consultation',
            notes: apt.notes ?? `Consultation Fee: $${doctor?.consultationFee ?? apt.consultationFee ?? 0}`,
            status: (apt.status ?? 'unknown').toString().toLowerCase(),
            // Store full objects for reference
            fullDoctor: doctor,
            fullSlot: slot,
            fullUser: user,
            fullPet: pet,
            hospitalName: doctor?.hospitalClinicName ?? doctor?.hospital ?? apt.hospitalName ?? '',
            hospitalAddress: doctor?.hospitalClinicAddress ?? apt.hospitalAddress ?? '',
            doctorBio: doctor?.bio ?? '',
            consultationFee: doctor?.consultationFee ?? apt.consultationFee ?? 0,
            // keep original raw for debugging if needed
            _raw: apt
          };
        });

        setAppointments(transformedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAppointments();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.userType]); // refetch if user type changes

  // Simple focus management: trap ESC to close modals
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setDeleteConfirmModal(null);
        setModalType(null);
      }
    };
    if (modalOpen || deleteConfirmModal) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, deleteConfirmModal]);

  const handleEdit = (appointment) => setEditAppointment({ ...appointment });

  const handleSaveEdit = () => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === editAppointment.id ? editAppointment : a))
    );
    setEditAppointment(null);
  };

  const handleCancelEdit = () => setEditAppointment(null);

  const handleDeleteClick = (appointment) => {
    setDeleteConfirmModal(appointment);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmModal) return;
    
    setIsDeleting(true);
    try {
      console.log('Cancelling appointment:', deleteConfirmModal.id);
      await useJwt.cancelAppointment(deleteConfirmModal.id);
      
      // Remove from state
      setAppointments((prev) => prev.filter((a) => a.id !== deleteConfirmModal.id));
      
      // Close modal
      setDeleteConfirmModal(null);
      
      console.log('Appointment cancelled successfully');
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      // you may want to show toast here
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment((prev) => ({ ...prev, [name]: value }));
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
      case 'dog': return '🐕';
      case 'cat': return '🐈';
      case 'rabbit': return '🐰';
      case 'bird': return '🐦';
      default: return '🐾';
    }
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
          <Calendar size={64} className="text-white" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <Plus size={24} className="text-white font-bold" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Appointments Yet!</h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Schedule your first appointment to keep your pet healthy and happy.
      </p>
      
       
          <button
            onClick={() => { setModalType('create'); setModalOpen(true); }}
            className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Create Your Appointments
          </button>
 
    
      
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-md w-full">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <div className="text-3xl mb-2">💉</div>
          <p className="text-xs text-gray-600">Vaccinations</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <div className="text-3xl mb-2">🏥</div>
          <p className="text-xs text-gray-600">Check-ups</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <div className="text-3xl mb-2">🦷</div>
          <p className="text-xs text-gray-600">Dental Care</p>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteConfirmationModal = ({ appointment, onConfirm, onCancel, isDeleting }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Cancel Appointment?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to cancel this appointment? This action cannot be undone.
        </p>

        {/* Appointment Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Appointment ID:</span>
            <span className="font-semibold text-gray-900">#{appointment.id}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pet Name:</span>
            <span className="font-semibold text-gray-900">{appointment.petName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Doctor:</span>
            <span className="font-semibold text-gray-900">{appointment.doctorName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Specialization:</span>
            <span className="font-semibold text-gray-900">{appointment.reason}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Date:</span>
            <span className="font-semibold text-gray-900">{appointment.date}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Time:</span>
            <span className="font-semibold text-gray-900">{appointment.time}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Hospital:</span>
            <span className="font-semibold text-gray-900">{appointment.hospitalName}</span>
          </div>
          
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            Keep Appointment
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Cancelling...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Yes, Cancel
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#52B2AD] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-[#52B2AD]" />
              Pet Appointments
            </h1>
            <p className="text-gray-600">Manage your pet's healthcare schedule</p>
          </div>
       {userInfo ? (
  <div>
    <button
      onClick={() => { setModalType(userInfo.userType === 2 ? 'create' : 'book'); setModalOpen(true); }}
      className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold"
    >
      <Plus size={20} />
      "Book Appointment"
    </button>
  </div>
) : (
  <button
    onClick={() => (window.location.href = "/Signin")}
    className="bg-gray-400 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold cursor-pointer"
  >
    <Plus size={20} />
    Login to Book Appointment
  </button>
)}


          
        </div>

        {/* Stats Cards */}
        {appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Booked/Upcoming</p>
                  <p className="text-3xl font-bold">
                    {appointments.filter(a => a.status === 'booked' || a.status === 'upcoming').length}
                  </p>
                </div>
                <Calendar className="w-12 h-12 opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completed</p>
                  <p className="text-3xl font-bold">
                    {appointments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
                <Clock className="w-12 h-12 opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-2xl p-4 text-white shadow-lg">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-teal-100 text-sm">Total Appointments</p>
      <p className="text-3xl font-bold">{appointments.length}</p>
    </div>

    <PawPrint className="w-12 h-12 opacity-80" />
  </div>
</div>

          </div>
        )}

        {/* Appointment Cards */}
        {appointments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {appointments.map((appointment, index) => (
              <div
                key={appointment.id}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Colored Side Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#52B2AD] to-[#42948f]"></div>

                {/* Card Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getPetIcon(appointment.petType)}</span>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">
                        Appointment #{appointment.id}
                      </span>
                      <span className={`ml-3 text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {editAppointment?.id === appointment.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="p-2.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all transform hover:scale-110"
                          title="Save"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all transform hover:scale-110"
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDeleteClick(appointment)}
                          className="p-2.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {editAppointment?.id === appointment.id ? (
                    // Edit Mode
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Pet Name</label>
                        <input
                          type="text"
                          name="petName"
                          value={editAppointment.petName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Doctor</label>
                        <input
                          type="text"
                          name="doctor"
                          value={editAppointment.doctor}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={editAppointment.date}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Time</label>
                        <input
                          type="text"
                          name="time"
                          value={editAppointment.time}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Reason</label>
                        <input
                          type="text"
                          name="reason"
                          value={editAppointment.reason}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition"
                        />
                      </div>
                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
                        <textarea
                          name="notes"
                          value={editAppointment.notes}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition"
                        />
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
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { setModalOpen(false); setModalType(null); }}
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-3xl mx-auto">
            {modalType === 'book' && (
              <BookAppointmentForm
                onClose={() => { setModalOpen(false); setModalType(null); }}
                onCreated={(newAppointment) => {
                  if (newAppointment && newAppointment.id) {
                    setAppointments(prev => [newAppointment, ...prev]);
                  } else {
                    window.location.reload();
                  }
                  setModalOpen(false);
                  setModalType(null);
                }}
              />
            )}

            {modalType === 'create' && (
              <CreateAppointment
                onClose={() => { setModalOpen(false); setModalType(null); }}
                onCreated={(newAppointment) => {
                  if (newAppointment && newAppointment.id) {
                    setAppointments(prev => [newAppointment, ...prev]);
                  } else {
                    window.location.reload();
                  }
                  setModalOpen(false);
                  setModalType(null);
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && (
        <DeleteConfirmationModal
          appointment={deleteConfirmModal}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirmModal(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Appointment;