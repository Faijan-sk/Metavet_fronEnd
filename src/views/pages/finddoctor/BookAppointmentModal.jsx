import React, { useCallback, useEffect, useState } from "react";
import useJwt from "./../../../enpoints/jwt/useJwt";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  X,
} from "lucide-react";
import AddPetForm from "./../pets/AddPetForm";

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

function BookAppointmentModal({ doctor, onClose, initialValues }) {
  // ================= STATES =================
  const [doctorDays, setDoctorDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");

  const [petsLoading, setPetsLoading] = useState(false);
  const [petsError, setPetsError] = useState(null);
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  const [doctorDayId, setDoctorDayId] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const doctorsLoading = false;
  const visibleDoctors = [doctor];

  // ================= FETCH DOCTOR DAYS =================
  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await useJwt.getDoctorDaysFromDistance(
          doctor.doctorId,
        );
        setDoctorDays(response.data);
      } catch (error) {
        console.error("Error fetching doctor days:", error);
      }
    };
    if (doctor?.doctorId) fetchDays();
  }, [doctor?.doctorId]);

  const fetchPets = useCallback(async () => {
    setPetsLoading(true);
    setPetsError(null);
    try {
      const response = await useJwt.getAllPetsByOwner();
      const petsList = response.data.data.map((pet) => ({
        id: pet.id,
        petName: pet.petName,
        petSpecies: pet.petSpecies,
        petBreed: pet.petBreed,
      }));
      setPets(petsList);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setPetsError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch pets.",
      );
    } finally {
      setPetsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // ================= FETCH SLOTS =================
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !doctorDayId || !doctor?.doctorId) return;

      setSlotsLoading(true);
      setSlotsError("");
      setAvailableSlots([]);

      try {
        const formattedDate = [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-");
        const response = await useJwt.getAvailableSlots(
          doctor.doctorId,
          doctorDayId,
          formattedDate,
        );
        setAvailableSlots(response.data || []);
      } catch (error) {
        setAvailableSlots([]);
        setSlotsError("Failed to load slots. Please try again.");
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate, doctorDayId, doctor?.doctorId]);

  // ================= HELPERS =================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const resetForm = () => {
    setSelectedPet("");
    setSelectedDate(null);
    setSelectedSlot(null);
    setReason("");
    setDoctorDayId(null);
    setAvailableSlots([]);
    setBookingError("");
    setBookingSuccess(false);
    setShowAddPetModal(false);
  };

  const handlePetSelectChange = (e) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setSelectedPet("");
      setShowAddPetModal(true);
    } else {
      setSelectedPet(val);
    }
  };

  const handlePetAdded = async () => {
    setShowAddPetModal(false);
    await fetchPets();
  };

  // ================= BOOK APPOINTMENT =================
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!selectedPet || !selectedDate || !selectedSlot || !doctorDayId) {
      setBookingError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setBookingError("");

    try {
      const payload = {
        petId: parseInt(selectedPet),
        doctorId: doctor.doctorId,
        doctorDayId: doctorDayId,
        slotId: selectedSlot.slotId,
        appointmentDate: [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-"),
        note: reason || undefined,
      };

      const response = await useJwt.bookAppointment(payload);
      const redirectUrl = response.data.checkoutUrl;
      if (redirectUrl) window.location.href = redirectUrl;

      setBookingSuccess(true);
      setTimeout(() => {
        resetForm();
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      setBookingError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to book appointment.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= CALENDAR =================
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    weekDays.forEach((day) => {
      cells.push(
        <div key={day} className="text-xs text-center text-gray-500">
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
      const matchedDay = doctorDays.find((d) => d.dayOfWeek === dayName);
      const isDoctorAvailable = !!matchedDay;
      const isSelected = selectedDate?.getTime() === dateObj.getTime();
      const isDisabled = isPast || !isDoctorAvailable;

      cells.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              setSelectedDate(dateObj);
              setCalendarOpen(false);
              setDoctorDayId(matchedDay.doctorDayId);
              setSelectedSlot(null);
            }
          }}
          className={`text-sm h-9 rounded-md transition font-medium
            ${isSelected ? "bg-[#52B2AD] text-white" : isDoctorAvailable ? "bg-[#52B2AD]/15 text-[#2b8f8a] hover:bg-[#52B2AD]/25" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
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
      {/* Added dynamic min-height and padding to handle the small dropdown view */}
      <form
        onSubmit={handleBookAppointment}
        className={`space-y-6 transition-all duration-300 ${!selectedPet ? "min-h-[350px] flex flex-col justify-start pt-4" : ""}`}
      >
        {/* PET SELECT */}
        <div className={!selectedPet ? "mb-8" : ""}>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Select Pet *
          </label>

          {petsLoading ? (
            <div className="text-sm text-gray-600">Loading pets…</div>
          ) : petsError ? (
            <div className="text-sm text-red-600">{petsError}</div>
          ) : (
            <select
              value={selectedPet}
              onChange={handlePetSelectChange}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg bg-white text-black font-normal text-sm focus:border-[#52B2AD] outline-none transition"
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
          )}
          {!selectedPet && (
            <div className="mt-6 p-4 bg-[#52B2AD]/5 rounded-xl border border-[#52B2AD]/10">
              <p className="text-sm text-[#2b8f8a] text-center font-medium">
                Please select your pet first to view available dates and time
                slots.
              </p>
            </div>
          )}
        </div>

        {/* SHOW OTHERS ONLY IF PET IS SELECTED */}
        {selectedPet && (
          <div className="animate-fadeIn space-y-4">
            {/* DATE SELECTOR */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Select Date *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className={`w-full px-3 py-2.5 border-2 rounded-lg text-left text-sm flex justify-between items-center transition ${
                    selectedDate
                      ? "border-[#52B2AD] bg-[#52B2AD]/5"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span>
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Choose a date"}
                  </span>
                  <Calendar size={16} />
                </button>

                {calendarOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <button type="button" onClick={goToPreviousMonth}>
                        <ChevronLeft />
                      </button>
                      <div className="font-semibold">
                        {monthNames[currentMonth.getMonth()]}{" "}
                        {currentMonth.getFullYear()}
                      </div>
                      <button type="button" onClick={goToNextMonth}>
                        <ChevronRight />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TIME SLOTS */}
            {selectedDate && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-semibold mb-2">
                  Select Time Slot *
                </label>
                {slotsLoading && (
                  <div className="text-sm text-gray-600">Loading slots…</div>
                )}
                {slotsError && (
                  <div className="text-sm text-red-600">{slotsError}</div>
                )}
                {!slotsLoading &&
                  !slotsError &&
                  availableSlots.length === 0 && (
                    <div className="text-sm text-gray-600">
                      No slots available for this date
                    </div>
                  )}
                {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot.slotId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-lg border-2 text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                          selectedSlot?.slotId === slot.slotId
                            ? "bg-[#52B2AD] border-[#52B2AD] text-white"
                            : "bg-white border-gray-200 text-gray-700 hover:border-[#52B2AD]"
                        }`}
                      >
                        <Clock size={14} />
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* REASON */}
            <div>
              <label
                htmlFor="reason"
                className="block text-xs font-semibold text-gray-600 mb-1"
              >
                Reason (Optional)
              </label>
              <input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Vaccination, Checkup"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none"
              />
            </div>
            <div className="md:col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-amber-700 font-medium">
                  Cancellation within 24 hours of appointment will not be
                  eligible for a refund.
                </p>
              </div>
            </div>
            {bookingError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {bookingError}
              </div>
            )}
            {bookingSuccess && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                Appointment booked successfully!
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose && onClose();
                }}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !selectedSlot}
                className={`px-5 py-2 rounded-md text-white transition flex items-center text-sm font-medium ${
                  loading || !selectedSlot
                    ? "opacity-70 cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.01] shadow-lg"
                }`}
              >
                {loading ? (
                  "Booking..."
                ) : (
                  <>
                    <Plus size={16} className="mr-2" />{" "}
                    {initialValues ? "Update" : "Book"} Appointment
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* ADD PET MODAL */}
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

export default BookAppointmentModal;
