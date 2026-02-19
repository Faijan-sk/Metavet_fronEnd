import React, { useEffect, useState } from "react";
import { Package, Plus, X } from "lucide-react";
import useJwt from "../../../../enpoints/jwt/useJwt";

// Components Import
import CreateServices from "./CreateServices";
import CreateSlot from "./Createslot";
import AppointmentCard from "./AppointmentListing";

export default function SplitDashboard() {
  const [modalType, setModalType] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await useJwt.getGroomerAppointment();
      if (response?.data?.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">

        {/* LEFT SIDEBAR */}
        <div className="bg-gradient-to-br from-[#52B2AD] to-[#387d79] p-8 text-white relative flex flex-col">
          <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>

          <div className="space-y-4 mb-8">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold">{appointments.length}</p>
                </div>
                <Package size={32} className="text-white/60" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8">
            <h3 className="font-bold mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold">{appointments.filter(d => d.status === "PENDING").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmed</span>
                <span className="font-bold">{appointments.filter(d => d.status === "CONFIRMED").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="font-bold">{appointments.filter(d => d.status === "COMPLETED").length}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <button onClick={() => setModalType("slot")} className="w-full bg-white text-[#387d79] px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 font-bold">
              <Plus className="w-6 h-6" /> Create Appointment Slot
            </button>
            <button onClick={() => setModalType("service")} className="w-full bg-[#2d6662] text-white px-6 py-4 rounded-2xl shadow-xl border border-white/10 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 font-bold">
              <Plus className="w-6 h-6" /> Create Services
            </button>
          </div>
          <div className="mt-auto"></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Today's Appointments</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-center py-10">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No appointments found.</p>
            ) : (
              appointments.map((item) => (
                <AppointmentCard key={item.appointmentUid} item={item} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL SECTION */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalType(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl z-10 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {modalType === "slot" ? "Create Appointment Slot" : "Create New Service"}
                </h3>
              </div>
              <button onClick={() => setModalType(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "80vh" }}>
              {modalType === "slot" ? <CreateSlot onClose={() => setModalType(null)} /> : <CreateServices onClose={() => setModalType(null)} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}