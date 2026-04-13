import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "./../../../../enpoints/jwt/useJwt";
import AddPetForm from "./../../pets/AddPetForm";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Scissors,
  ArrowRight,
} from "lucide-react";

import { useGroomerAppointment } from "./../../../../context/GroomerAppointmentContext";

function GroomerBookingModal({ groomer, isOpen, onClose }) {
  const navigate = useNavigate();

  const {
    setSerivceUid,
    setServicetime,
    setAppointmentData,
    setServiceProviderUid,
    setPetUid,
    bookingData,
  } = useGroomerAppointment();

  useEffect(() => {
    console.log("Groomer context  ---- >", bookingData);
  }, [bookingData]);

  // ================= STATES =================
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [slotsData, setSlotsData] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");

  const [showAddPetModal, setShowAddPetModal] = useState(false);

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

  // ================= FETCH PETS =================
  const fetchPets = useCallback(async () => {
    try {
      const response = await useJwt.getAllPetsByOwner();
      const petsList = response.data.data.map((pet) => ({
        id: pet.id,
        uid: pet.uid,
        petName: pet.petName,
        petSpecies: pet.petSpecies,
        petBreed: pet.petBreed,
      }));
      setPets(petsList);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }, []);

  // ================= FETCH PETS ON OPEN =================
  useEffect(() => {
    if (!isOpen) return;
    fetchPets();
  }, [isOpen, fetchPets]);

  // ================= FETCH AVAILABLE DAYS =================
  useEffect(() => {
    if (!isOpen || !groomer?.id) return;
    const fetchAvailableDays = async () => {
      try {
        const response = await useJwt.getAvailableGroomerDays(groomer.id);
        setAvailableDays(response.data.availableDays || []);
      } catch (error) {
        console.error("Error fetching available days:", error);
      }
    };
    fetchAvailableDays();
  }, [isOpen, groomer?.id]);

  // ================= FETCH SLOTS & SERVICES WHEN DATE SELECTED =================
  useEffect(() => {
    if (!selectedDate || !groomer?.id) return;

    const fetchSlotsAndServices = async () => {
      setSlotsLoading(true);
      setSlotsData(null);
      setSelectedSlot(null);
      setSelectedService("");
      setSelectedStartTime("");
      try {
        const dateStr = [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-");
        setAppointmentData(dateStr);

        const response = await useJwt.getGroomerAvailableSlotServices(
          dateStr,
          groomer.id,
        );
        setServiceProviderUid(groomer.id);
        setSlotsData(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlotsAndServices();
  }, [selectedDate, groomer?.id]);

  if (!groomer || !isOpen) return null;

  // ================= HELPERS =================
  const resetForm = () => {
    setSelectedPet("");
    setSelectedDate(null);
    setCalendarOpen(false);
    setBookingError("");
    setSlotsData(null);
    setSelectedSlot(null);
    setSelectedService("");
    setSelectedStartTime("");
    setShowAddPetModal(false);
  };

  const handleClose = () => {
    resetForm();
    onClose && onClose();
  };

  const handlePetSelectChange = (e) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setSelectedPet("");
      setShowAddPetModal(true);
    } else {
      const pet = pets.find((p) => p.id === parseInt(val));
      setSelectedPet(pet || "");
      setPetUid(pet || null);
    }
  };

  const handlePetAdded = async () => {
    setShowAddPetModal(false);
    await fetchPets();
  };

  const jsToIso = (jsDay) => (jsDay === 0 ? 7 : jsDay);

  const isAvailableDay = (date) => {
    const isoDay = jsToIso(date.getDay());
    return availableDays.some((d) => d.dayOfWeek === isoDay);
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && isAvailableDay(date);
  };

  const formatTime = (time) => time?.slice(0, 5);

  // ================= CALENDAR =================
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const goToPreviousMonth = () => {
    const prev = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    if (prev >= today) setCurrentMonth(prev);
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const cells = [];

    dayLabels.forEach((d) =>
      cells.push(
        <div
          key={`lbl-${d}`}
          className="text-center text-xs font-semibold text-gray-400 py-1"
        >
          {d}
        </div>,
      ),
    );

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const selectable = isDateSelectable(date);
      const isSelected =
        selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day;
      const isPast = date < today;

      cells.push(
        <button
          type="button"
          key={day}
          disabled={!selectable}
          onClick={() => {
            if (selectable) {
              setSelectedDate(date);
              setCalendarOpen(false);
            }
          }}
          className={`
            aspect-square rounded-lg text-sm font-medium transition-all
            ${
              isSelected
                ? "bg-[#52B2AD] text-white shadow-md scale-105"
                : selectable
                  ? "bg-[#52B2AD]/10 text-[#2d7a75] hover:bg-[#52B2AD]/25 hover:scale-105 cursor-pointer"
                  : isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-300 cursor-not-allowed opacity-40"
            }
          `}
        >
          {day}
        </button>,
      );
    }

    return cells;
  };

  // ================= SUBMIT =================
  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!selectedDate) return setBookingError("Please select a date");
    if (!selectedSlot) return setBookingError("Please select a time slot");
    if (!selectedStartTime)
      return setBookingError("Please select a start time");
    if (!selectedService) return setBookingError("Please select a service");
    if (!selectedPet) return setBookingError("Please select a pet");

    setLoading(true);
    setBookingError("");

    setTimeout(() => {
      navigate("/groomer-appoinment");
    }, 1000);
  };

  const isSubmitDisabled =
    loading ||
    !selectedDate ||
    !selectedSlot ||
    !selectedStartTime ||
    !selectedService ||
    !selectedPet;

  // ================= JSX =================
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Book a Session
              </h2>
              <p className="text-sm text-[#52B2AD] font-medium mt-0.5">
                with {groomer.name}
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

          {/* Body */}
          <form onSubmit={handleBookSession} className="px-6 py-5 space-y-5">
            {/* ===== 1. PET SELECT — ALWAYS VISIBLE ===== */}
            <div className={!selectedPet ? "min-h-[250px]" : ""}>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Select Pet *
              </label>
              <select
                value={selectedPet?.id || ""}
                onChange={handlePetSelectChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD]"
                required
              >
                <option value="">Select a pet</option>
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.petName} • {p.petSpecies} ({p.petBreed})
                  </option>
                ))}
                <option value="__add_new__">➕ Add New Pet</option>
              </select>

              {/* Hint message jab pet select nahi kiya */}
              {!selectedPet && (
                <div className="mt-6 p-4 bg-[#52B2AD]/5 rounded-xl border border-[#52B2AD]/10">
                  <p className="text-sm text-[#2b8f8a] text-center font-medium">
                    Please select your pet first to view available dates and
                    time slots.
                  </p>
                </div>
              )}
            </div>

            {/* ===== BAAKI SAARA FORM — SIRF TAB DIKHAO JAB PET SELECT HO ===== */}
            {selectedPet && (
              <div className="space-y-5">
                {/* ===== 2. DATE SELECTOR ===== */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Select Date *
                  </label>

                  {availableDays.length > 0 && (
                    <p className="text-xs text-gray-400 mb-2">
                      Available on:{" "}
                      {availableDays.map((d) => (
                        <span
                          key={d.dayOfWeek}
                          className="inline-block bg-[#52B2AD]/10 text-[#2d7a75] rounded px-2 py-0.5 mr-1 font-medium"
                        >
                          {d.dayName.charAt(0) +
                            d.dayName.slice(1).toLowerCase()}
                        </span>
                      ))}
                    </p>
                  )}

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
                        selectedDate
                          ? "text-gray-900 font-medium"
                          : "text-gray-400"
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
                        <div className="font-semibold text-sm text-gray-800">
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

                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-[#52B2AD]/20 inline-block" />{" "}
                          Available
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-[#52B2AD] inline-block" />{" "}
                          Selected
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-gray-100 inline-block" />{" "}
                          Unavailable
                        </span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5">
                        {renderCalendar()}
                      </div>
                    </div>
                  )}
                </div>

                {/* ===== 3. SLOTS & SERVICES ===== */}
                {selectedDate && (
                  <>
                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-6 gap-2 text-[#52B2AD] text-sm">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Loading available slots…
                      </div>
                    ) : slotsData ? (
                      <>
                        <div className="text-sm text-gray-400 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2">
                          <Clock size={14} />
                          Working hours:{" "}
                          <span className="font-semibold text-gray-600">
                            {formatTime(slotsData.workingHours?.startTime)} –{" "}
                            {formatTime(slotsData.workingHours?.endTime)}
                          </span>
                        </div>

                        {/* Time Slot */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">
                            <Clock size={14} className="inline mr-1" />
                            Select Time Slot *
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {slotsData.availableSlots?.map((slot, idx) => {
                              const isActive =
                                selectedSlot?.slotStartTime ===
                                slot.slotStartTime;
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => {
                                    setSelectedSlot(slot);
                                    setSelectedService("");
                                    setSelectedStartTime("");
                                  }}
                                  className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                                    isActive
                                      ? "border-[#52B2AD] bg-[#52B2AD] text-white shadow-md"
                                      : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#52B2AD]/50 hover:bg-[#52B2AD]/5"
                                  }`}
                                >
                                  <div className="font-semibold text-xs">
                                    {formatTime(slot.slotStartTime)} –{" "}
                                    {formatTime(slot.slotEndTime)}
                                  </div>
                                  <div
                                    className={`text-xs mt-0.5 ${isActive ? "text-white/80" : "text-gray-400"}`}
                                  >
                                    {slot.availableDurationMinutes} min
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Start Time */}
                        {selectedSlot && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                              <Clock size={14} className="inline mr-1" />
                              Select Start Time *
                            </label>
                            <input
                              type="time"
                              value={selectedStartTime}
                              min={selectedSlot.slotStartTime?.slice(0, 5)}
                              max={selectedSlot.slotEndTime?.slice(0, 5)}
                              onChange={(e) => {
                                setSelectedStartTime(e.target.value);
                                setServicetime(e.target.value + ":00");
                              }}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] bg-gray-50"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                              Choose between{" "}
                              {formatTime(selectedSlot.slotStartTime)} –{" "}
                              {formatTime(selectedSlot.slotEndTime)}
                            </p>
                          </div>
                        )}

                        {/* Service */}
                        {selectedSlot && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                              <Scissors size={14} className="inline mr-1" />
                              Select Service *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedSlot.compatibleServices?.map((svc) => {
                                const isActive = selectedService === svc.uid;
                                return (
                                  <button
                                    type="button"
                                    key={svc.uid}
                                    onClick={() => {
                                      setSelectedService(svc.uid);
                                      setSerivceUid(svc);
                                    }}
                                    className={`px-3 py-3 rounded-xl border-2 text-left transition-all ${
                                      isActive
                                        ? "border-[#52B2AD] bg-[#52B2AD]/10 shadow-sm"
                                        : "border-gray-200 bg-gray-50 hover:border-[#52B2AD]/40 hover:bg-[#52B2AD]/5"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span
                                        className={`text-sm font-semibold ${isActive ? "text-[#2d7a75]" : "text-gray-800"}`}
                                      >
                                        {svc.serviceName}
                                      </span>
                                      <span
                                        className={`text-sm font-bold ${isActive ? "text-[#52B2AD]" : "text-gray-700"}`}
                                      >
                                        ${svc.price.toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock
                                        size={11}
                                        className="text-gray-400"
                                      />
                                      <span className="text-xs text-gray-400">
                                        {svc.durationMinutes} min
                                      </span>
                                      {svc.description && (
                                        <span className="text-xs text-gray-400 ml-1">
                                          • {svc.description}
                                        </span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
                        Could not load slots for this date. Please try another
                        date.
                      </div>
                    )}
                  </>
                )}

                {/* ERROR */}
                {bookingError && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    {bookingError}
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`px-6 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 transition ${
                      isSubmitDisabled
                        ? "opacity-60 cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.02] shadow-lg"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting…
                      </>
                    ) : (
                      <>
                        <ArrowRight size={16} />
                        Next
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
                aria-label="Close"
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

export default GroomerBookingModal;
