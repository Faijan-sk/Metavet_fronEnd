
import { Plus, Calendar, AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import AppointmentListing from "./AppointmentListing";
import CreateWalkerSlot from "./CreateAppointment";


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
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [userInfo, setUserInfo] = useState(getUserInfo());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "userInfo") setUserInfo(getUserInfo());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setDeleteConfirmModal(null);
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

  const handleConfirmDelete = () => {
    if (deleteConfirmModal) {
      setAppointments((prev) => prev.filter((a) => a.id !== deleteConfirmModal.id));
      setDeleteConfirmModal(null);
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-gradient-to-br from-[#52B2AD]/10 to-[#42948f]/10 rounded-full p-8 mb-6">
        <Calendar className="w-16 h-16 text-[#52B2AD]" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">No Appointments Yet!</h3>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Create your first slot to get started with your walker schedule.
      </p>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
      >
        <Plus className="w-5 h-5" />
        Create Appointment Slot
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pet Behaviourist Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your pet's walking schedule</p>
        </div>

        {userInfo ? (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create Appointment Slot
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/Signin")}
            className="bg-gray-400 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold cursor-pointer"
          >
            Login to Book Appointment
          </button>
        )}
      </div>

      {appointments.length === 0 ? (
        <EmptyState />
      ) : (
        <AppointmentListing
          appointments={appointments}
          onUpdate={(updated) => setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a))}
          onDelete={handleDeleteClick}
        />
      )}

      {/* FIXED MODAL STRUCTURE */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setModalOpen(false)} 
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Setup Schedule</h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Body - Scrollable only if content is too large */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <CreateWalkerSlot onClose={() => setModalOpen(false)} onCreated={() => { /* add refresh logic */ }} />
            </div>
          </div>
        </div>
      )}

      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirmModal(null)} />
           <div className="relative bg-white rounded-2xl p-8 max-w-md w-full z-10 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
              <div className="flex gap-4">
                <button className="flex-1 py-2 border rounded-full font-semibold" onClick={() => setDeleteConfirmModal(null)}>Cancel</button>
                <button className="flex-1 py-2 bg-red-500 text-white rounded-full font-semibold" onClick={handleConfirmDelete}>Delete</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;