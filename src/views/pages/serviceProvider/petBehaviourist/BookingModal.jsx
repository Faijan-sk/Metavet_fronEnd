import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "./../../../../enpoints/jwt/useJwt";
import AddPetForm from "./../../pets/AddPetForm";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  X,
} from "lucide-react";

import { useBehaviouristAppointment } from "./../../../../context/BehaviouristAppointmentContext";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function BookingModal({ behaviourist, isOpen, onClose }) {
  // ================= STATES =================
  const [behaviouristDays, setBehaviouristDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [behaviouristDayId, setBehaviouristDayId] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  const {
    setPetuid,
    setServiceProviderUid,
    setBehaviouristDayUid,
    setSlotUid,
    setAppointmentData,
    bookingData,
  } = useBehaviouristAppointment();

  const navigate = useNavigate();

  // ================= FETCH PETS =================
  const fetchPets = useCallback(async () => {
    try {
      const response = await useJwt.getAllPetsByOwner();
      setPets(response.data.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }, []);

  // ================= FETCH PETS & DAYS on open =================
  useEffect(() => {
    if (!isOpen) return;
    fetchPets();
    const fetchDays = async () => {
      try {
        const response = await useJwt.getBehaviouristAvailableDay(
          behaviourist.uid,
        );
        setBehaviouristDays(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching days:", error);
      }
    };
    fetchDays();
  }, [isOpen, fetchPets, behaviourist?.uid]);

  // ================= FETCH SLOTS on date select =================
  useEffect(() => {
    if (!selectedDate || !behaviouristDayId || !behaviourist?.uid) return;

    const fetchSlots = async () => {
      setSlotsLoading(true);
      setSlotsError("");
      setAvailableSlots([]);

      try {
        const formattedDate = formatLocalDate(selectedDate);
        const response = await useJwt.getBehaviouristAvailableSlot(
          behaviourist.uid,
          behaviouristDayId,
          formattedDate,
        );
        setAvailableSlots(response.data?.data || response.data || []);
      } catch (error) {
        setAvailableSlots([]);
        setSlotsError("Failed to load slots. Please try again.");
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate, behaviouristDayId, behaviourist?.uid]);

  if (!behaviourist || !isOpen) return null;

  // ================= HELPERS =================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const goToPreviousMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  const goToNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );

  const resetForm = () => {
    setSelectedPet(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setBehaviouristDayId(null);
    setAvailableSlots([]);
    setCalendarOpen(false);
    setShowAddPetModal(false);
  };

  const handleClose = () => {
    resetForm();
    onClose && onClose();
  };

  const handlePetSelectChange = (e) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setSelectedPet(null);
      setShowAddPetModal(true);
    } else {
      const pet = pets.find((p) => p.uid === val);
      setSelectedPet(pet || null);
      setPetuid(pet || null);
    }
  };

  const handlePetAdded = async () => {
    setShowAddPetModal(false);
    await fetchPets();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPet || !selectedDate || !selectedSlot || !behaviouristDayId)
      return;

    setLoading(true);
    setPetuid(selectedPet);
    setServiceProviderUid(selectedSlot?.serviceProviderUid);
    setBehaviouristDayUid(selectedSlot?.serviceProviderDay?.uid);
    setSlotUid(selectedSlot);
    setAppointmentData(formatLocalDate(selectedDate));

    setTimeout(() => {
      setLoading(false);
      resetForm();
      onClose && onClose();
      navigate("/behaviourist-appointment");
    }, 1000);
  };

  const renderCalendarCells = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    weekDays.forEach((day) => {
      cells.push(
        <div
          key={day}
          className="text-xs text-center text-gray-500 font-medium py-1"
        >
          {day}
        </div>,
      );
    });

    for (let i = 0; i < firstDayOfMonth; i++)
      cells.push(<div key={`empty-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      dateObj.setHours(0, 0, 0, 0);
      const isPast = dateObj < today;
      const dayName = dateObj
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
      const matchedDay = behaviouristDays.find((d) => d.dayOfWeek === dayName);
      const isAvailable = !!matchedDay;
      const isSelected = selectedDate?.getTime() === dateObj.getTime();
      const isDisabled = isPast || !isAvailable;

      cells.push(
        <button
          key={day}
          disabled={isDisabled}
          type="button"
          onClick={() => {
            if (!isDisabled) {
              setSelectedDate(dateObj);
              setBehaviouristDayId(matchedDay.uid);
              setSelectedSlot(null);
              setBehaviouristDayUid(matchedDay.uid);
            }
          }}
          className={`text-sm h-10 rounded-md transition font-medium
            ${isSelected ? "bg-[#52B2AD] text-white" : isAvailable ? "bg-[#52B2AD]/15 text-[#2b8f8a] hover:bg-[#52B2AD]/25" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
            ${isPast ? "opacity-50" : ""}
          `}
        >
          {day}
        </button>,
      );
    }
    return cells;
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Book a Session
              </h2>
              <p className="text-sm text-[#52B2AD] font-medium mt-0.5">
                with {behaviourist.fullName}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
            {/* PET SELECT - Always Visible */}
            <div className={!selectedPet ? "min-h-[250px]" : ""}>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Select Pet *
              </label>
              <select
                value={selectedPet?.uid || ""}
                onChange={handlePetSelectChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black text-sm focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none transition"
                required
              >
                <option value="">Select a pet</option>
                {pets.map((p) => (
                  <option key={p.uid} value={p.uid}>
                    {p.petName} • {p.petSpecies} ({p.petBreed})
                  </option>
                ))}
                <option value="__add_new__">➕ Add New Pet</option>
              </select>
              {!selectedPet && (
                <div className="mt-6 p-4 bg-[#52B2AD]/5 rounded-xl border border-[#52B2AD]/10">
                  <p className="text-sm text-[#2b8f8a] text-center font-medium">
                    Please select your pet first to view available dates and
                    time slots.
                  </p>
                </div>
              )}
            </div>

            {/* CONDITIONAL RENDERING: Only show when pet is selected */}
            {selectedPet && (
              <div className="animate-fadeIn space-y-5">
                {/* DATE SELECTOR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Select Date *
                  </label>
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(!calendarOpen)}
                    className={`w-full px-3 py-2.5 border-2 rounded-xl text-left text-sm flex justify-between items-center transition ${
                      selectedDate
                        ? "border-[#52B2AD] bg-[#52B2AD]/5"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={
                        selectedDate ? "text-gray-900" : "text-gray-400"
                      }
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Choose a date"}
                    </span>
                    <Calendar size={16} className="text-[#52B2AD]" />
                  </button>

                  {calendarOpen && (
                    <div className="mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-inner p-4">
                      <div className="flex justify-between items-center mb-3">
                        <button
                          type="button"
                          onClick={goToPreviousMonth}
                          className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <div className="font-semibold text-sm">
                          {monthNames[currentMonth.getMonth()]}{" "}
                          {currentMonth.getFullYear()}
                        </div>
                        <button
                          type="button"
                          onClick={goToNextMonth}
                          className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendarCells()}
                      </div>
                    </div>
                  )}
                </div>

                {/* TIME SLOTS */}
                {selectedDate && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Select Time Slot *
                    </label>
                    {slotsLoading && (
                      <div className="text-sm text-gray-500">
                        Loading slots…
                      </div>
                    )}
                    {slotsError && (
                      <div className="text-sm text-red-600">{slotsError}</div>
                    )}
                    {!slotsLoading &&
                      !slotsError &&
                      availableSlots.length === 0 && (
                        <div className="text-sm text-gray-500">
                          No slots available for this date.
                        </div>
                      )}
                    {!slotsLoading &&
                      !slotsError &&
                      availableSlots.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map((slot) => (
                            <button
                              type="button"
                              key={slot.slotId}
                              onClick={() => {
                                setSelectedSlot(slot);
                                setSlotUid(slot);
                                setBehaviouristDayUid(
                                  slot?.serviceProviderDay?.uid,
                                );
                                setServiceProviderUid(slot?.serviceProviderUid);
                              }}
                              className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium flex items-center justify-center gap-1.5 transition ${
                                selectedSlot?.slotId === slot.slotId
                                  ? "bg-[#52B2AD] border-[#52B2AD] text-white"
                                  : "bg-white border-gray-200 text-gray-700 hover:border-[#52B2AD]/50"
                              }`}
                            >
                              <Clock size={14} />
                              {formatTime(slot.startTime)}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 text-sm font-medium text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !selectedSlot}
                    className={`px-6 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 transition ${
                      loading || !selectedSlot
                        ? "opacity-60 cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.02] shadow-lg"
                    }`}
                  >
                    {loading ? (
                      "Submitting…"
                    ) : (
                      <>
                        <ArrowRight size={16} /> Next
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Add Pet Modal */}
      {showAddPetModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Pet
              </h3>
              <button
                type="button"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => setShowAddPetModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <AddPetForm
              onClose={() => setShowAddPetModal(false)}
              onSubmit={handlePetAdded}
              editPetData={null}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BookingModal;
