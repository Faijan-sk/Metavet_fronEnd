import { Plus, Calendar, AlertTriangle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import BookAppointmentForm from "./BokAppointmentForm";
import CreateAppointment from "./CreateAppointment";
import AppointmentListing from "./AppointmentListing";
import useJwt from "../../../enpoints/jwt/useJwt";
import CreateDoctorAppointment from "./CreateAppointmentFormDoctor"
const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error parsing userInfo:', error);
    return null;
  }
};

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'book' or 'create' or 'doctorBook'
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserInfo());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "userInfo") setUserInfo(getUserInfo());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Utility function to check if date is in the past
  const isPastDate = (dateString) => {
    if (!dateString) return false;
    const appointmentDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  };

  // Get actual status considering past dates
  const getActualStatus = (appointment) => {
    if (appointment.status?.toLowerCase() === 'cancelled') {
      return 'cancelled';
    }
    if (isPastDate(appointment.date)) {
      return 'completed';
    }
    return appointment.status?.toLowerCase() || 'booked';
  };

  // Calculate stats using actual status
  const appointmentStats = useMemo(() => {
    const bookedUpcoming = appointments.filter(a => {
      const actualStatus = getActualStatus(a);
      return actualStatus === 'booked' || actualStatus === 'upcoming';
    }).length;

    const completed = appointments.filter(a => {
      const actualStatus = getActualStatus(a);
      return actualStatus === 'completed';
    }).length;

    const cancelled = appointments.filter(a => {
      const actualStatus = getActualStatus(a);
      return actualStatus === 'cancelled';
    }).length;

    return { bookedUpcoming, completed, cancelled, total: appointments.length };
  }, [appointments]);

  // Fetch appointments from API
  useEffect(() => {
    let cancelled = false;
    async function fetchAppointments() {
      try {
        setLoading(true);
        console.log('Fetching user appointments...');

        if (!userInfo) {
          console.warn("No userInfo found in localStorage. Redirecting to Signin.");
          window.location.href = "/Signin";
          return;
        }

        let response;
        try {
          if (userInfo.userType === 2) {
            response = await useJwt.getBookedAppointment();
          } else {
            response = await useJwt.getMyAppointments();
          }
        } catch (apiErr) {
          console.error("API call failed:", apiErr);
          try {
            response = await useJwt.getMyAppointments();
          } catch (fallbackErr) {
            console.error("Fallback API call failed:", fallbackErr);
            response = null;
          }
        }

        console.log('Appointments response:', response?.data ?? response);
        if (cancelled) return;

        const data = response?.data ?? response;
        const rawAppointments = Array.isArray(data) ? data : (data?.appointments ?? []);

        if (!rawAppointments || rawAppointments.length === 0) {
          setAppointments([]);
          return;
        }

        // Transform backend data to match UI structure
        const transformedAppointments = rawAppointments.map(apt => {
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
            fullDoctor: doctor,
            fullSlot: slot,
            fullUser: user,
            fullPet: pet,
            hospitalName: doctor?.hospitalClinicName ?? doctor?.hospital ?? apt.hospitalName ?? '',
            hospitalAddress: doctor?.hospitalClinicAddress ?? apt.hospitalAddress ?? '',
            doctorBio: doctor?.bio ?? '',
            consultationFee: doctor?.consultationFee ?? apt.consultationFee ?? 0,
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
  }, [userInfo?.userType]);

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

  const handleDeleteClick = (appointment) => {
    setDeleteConfirmModal(appointment);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmModal) return;
    setIsDeleting(true);
    try {
      console.log('Cancelling appointment:', deleteConfirmModal.id);
      await useJwt.cancelAppointment(deleteConfirmModal.id);
      setAppointments((prev) => prev.filter((a) => a.id !== deleteConfirmModal.id));
      setDeleteConfirmModal(null);
      console.log('Appointment cancelled successfully');
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-gradient-to-br from-[#52B2AD]/10 to-[#52B2AD]/5 rounded-full p-8 mb-6">
        <Calendar size={80} className="text-[#52B2AD]" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No Appointments Yet!</h3>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Schedule your first appointment to keep your pet healthy and happy.
      </p>



{(userInfo?.userType == 2)&& <button
        onClick={() => {
          setModalType('create');
          setModalOpen(true);
        }}
        className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
      >
        <Plus size={20} />
        Create Your Appointmentsdaas
      </button> }
      










      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="text-center p-4">
          <div className="text-4xl mb-2">💉</div>
          <p className="text-gray-700 font-medium">Vaccinations</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🏥</div>
          <p className="text-gray-700 font-medium">Check-ups</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🦷</div>
          <p className="text-gray-700 font-medium">Dental Care</p>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteConfirmationModal = ({ appointment, onConfirm, onCancel, isDeleting }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Cancel Appointment?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </p>

          {/* Appointment Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Appointment ID:</span>
              <span className="font-semibold text-gray-800">#{appointment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pet Name:</span>
              <span className="font-semibold text-gray-800">{appointment.petName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-semibold text-gray-800">{appointment.doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Specialization:</span>
              <span className="font-semibold text-gray-800">{appointment.reason}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold text-gray-800">{appointment.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold text-gray-800">{appointment.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Hospital:</span>
              <span className="font-semibold text-gray-800">{appointment.hospitalName}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Keep Appointment
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  Yes, Cancel
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#52B2AD] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Calendar className="text-[#52B2AD]" size={40} />
                Pet Appointments
              </h1>
              <p className="text-gray-600">Manage your pet's healthcare schedule</p>
            </div>
            {userInfo ? (
              <div className="flex gap-4">
                {userInfo.userType === 2 && (
                  <button
                    onClick={() => {
                      setModalType('doctorBook');
                      setModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold"
                  >
                    <Plus size={20} />
                    Book Appointment
                  </button>
                )}

                <button
                  onClick={() => {
                    setModalType(userInfo.userType === 2 ? 'create' : 'book');
                    setModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold"
                >
                  <Plus size={20} />
                  {userInfo.userType === 2 ? "Create Slot" : "Book Appointment"}
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
        </div>

        {/* Stats Cards */}
        {appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Booked/Upcoming</h3>
              <p className="text-4xl font-bold">{appointmentStats.bookedUpcoming}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Completed</h3>
              <p className="text-4xl font-bold">{appointmentStats.completed}</p>
            </div>
            <div className="bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Total Appointments</h3>
              <p className="text-4xl font-bold">{appointmentStats.total}</p>
            </div>
          </div>
        )}

        {/* Appointment Cards */}
        {appointments.length === 0 ? (
          <EmptyState />
        ) : (
          <AppointmentListing
            appointments={appointments}
            onUpdate={(updatedAppointment) => {
              setAppointments((prev) =>
                prev.map((a) => (a.id === updatedAppointment.id ? updatedAppointment : a))
              );
            }}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setModalOpen(false);
              setModalType(null);
            }}
          />
          {/* Modal Panel */}
          <div className="relative w-full max-w-3xl mx-auto">
            {modalType === 'book' && (
              <BookAppointmentForm
                onClose={() => {
                  setModalOpen(false);
                  setModalType(null);
                }}
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
            {(modalType === 'doctorBook') && (
              <CreateDoctorAppointment
                onClose={() => {
                  setModalOpen(false);
                  setModalType(null);
                }}
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
             {(modalType === 'create') && (
              <CreateAppointment
                onClose={() => {
                  setModalOpen(false);
                  setModalType(null);
                }}
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