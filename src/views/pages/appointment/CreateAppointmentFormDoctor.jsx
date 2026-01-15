import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import useJwt from "../../../enpoints/jwt/useJwt";

/* ===================== SAFE LOCAL STORAGE PARSER ===================== */
const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};

/* ===================== DATE FORMATTER - FIX TIMEZONE ISSUE ===================== */
const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/* ===================== COMPONENT ===================== */
export default function BookAppointmentForm({
  onClose,
  onCreated,
}) {

  /* ===================== CONSTANTS ===================== */
  const DAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  /* ===================== STATE ===================== */
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [loadingDays, setLoadingDays] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const userInfo = getUserInfo();

  /* ===================== FETCH AVAILABLE DAYS ===================== */
  useEffect(() => {
    const fetchDays = async () => {
      try {
        setLoadingDays(true);

        const response = await useJwt.getDoctorOwnDays();

        const daysOnly = (response.data.days || []).map(
          (item) => item.dayOfWeek
        );

        console.log("ONLY DAYS", daysOnly);
        setAvailableDays(daysOnly);

        if (response.data.doctorId) {
          setDoctorId(response.data.doctorId);
          console.log("Doctor ID:", response.data.doctorId);
        }
      } catch (err) {
        console.error("Error fetching days:", err);
        setError("Failed to load available days");
      } finally {
        setLoadingDays(false);
      }
    };

    fetchDays();
  }, []);

  /* ===================== FETCH SLOTS ON DATE CHANGE ===================== */
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;

      try {
        setSlotsLoading(true);
        setSlotsError(null);
        setAvailableSlots([]);
        setSelectedSlot(null);

        const formattedDate = formatDateToYYYYMMDD(selectedDate);
        console.log("Fetching slots for date:", formattedDate);

        const response =
          await useJwt.getAvailableSlotByDoctortoDate(formattedDate);

        if (response?.data?.slots) {
          setAvailableSlots(response.data.slots);
          console.log("Slots fetched:", response.data.slots);
        } else {
          setAvailableSlots([]);
          setSlotsError("No slots available for this date");
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlotsError("There is no slot on this date");
        setAvailableSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  /* ===================== DATE AVAILABILITY ===================== */
  const isDateAvailable = (date) => {
    const dayName = DAYS[date.getDay()];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date >= today && availableDays.includes(dayName);
  };

  /* ===================== SLOT SELECT ===================== */
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setError(null);
  };

  /* ===================== VALIDATION ===================== */
  const validate = () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return false;
    }

    if (!selectedSlot) {
      setError("Please select a time slot.");
      return false;
    }

    if (!doctorId) {
      setError("Doctor information is missing. Please refresh the page.");
      return false;
    }

    return true;
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    const payload = {
      doctorId: doctorId,
      doctorDayId: selectedSlot.doctorDayId,
      slotId: selectedSlot.slotId || selectedSlot.id,
      appointmentDate: formatDateToYYYYMMDD(selectedDate),
    };

    console.log("FINAL PAYLOAD (OBJECT):", payload);
    console.log("Selected Date:", selectedDate);
    console.log("Formatted Date:", formatDateToYYYYMMDD(selectedDate));

    try {
      const response = await useJwt.bookOfflineAppointment(payload);
      console.log("Appointment created successfully:", response.data);

      onCreated && onCreated(response.data);
      onClose && onClose();
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===================== CALENDAR RENDER ===================== */
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isAvailable = isDateAvailable(date);
      const isSelected =
        selectedDate &&
        selectedDate.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => {
            if (isAvailable) {
              setSelectedDate(date);
              setCalendarOpen(false);
            }
          }}
          disabled={!isAvailable}
          className={`p-2 text-sm rounded-lg transition-all ${
            isSelected
              ? "bg-[#52B2AD] text-white font-semibold"
              : isAvailable
              ? "hover:bg-[#52B2AD]/10 text-gray-900"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  /* ===================== MONTH NAMES ===================== */
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  /* ===================== JSX ===================== */
  return (
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#52B2AD]">
          Book Appointment with Doctor
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <X size={16} />
        </button>
      </div>

      {loadingDays ? (
        <div className="text-center py-8 text-gray-500">
          Loading available days...
        </div>
      ) : (
        <div className="space-y-5">

          {/* DATE SELECTOR */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Select Date *
            </label>

            <div className="relative">
              <button
                type="button"
                className={`w-full px-3 py-2.5 border-2 rounded-lg text-left text-sm flex justify-between items-center ${
                  selectedDate
                    ? "border-[#52B2AD]"
                    : "border-gray-200 bg-gray-50"
                }`}
                onClick={() => setCalendarOpen((prev) => !prev)}
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
                <div className="absolute z-20 mt-1 w-full bg-white border-2 rounded-lg shadow-lg p-4">
                  <div className="flex justify-between mb-4">
                    <button onClick={goToPreviousMonth}>
                      <ChevronLeft />
                    </button>
                    <div>
                      {monthNames[currentMonth.getMonth()]}{" "}
                      {currentMonth.getFullYear()}
                    </div>
                    <button onClick={goToNextMonth}>
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

          {/* SLOTS */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                <Clock size={14} className="inline mr-1" />
                Select Time Slot *
              </label>

              {slotsLoading && <p>Loading slots...</p>}
              {slotsError && <p className="text-yellow-600">{slotsError}</p>}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableSlots.map((slot) => {
                  const slotId = slot.slotId || slot.id;
                  const displayTime = `${slot.startTime?.slice(
                    0,
                    5
                  )} - ${slot.endTime?.slice(0, 5)}`;
                  const isSelected =
                    selectedSlot &&
                    (selectedSlot.slotId === slotId ||
                      selectedSlot.id === slotId);

                  return (
                    <button
                      key={slotId}
                      onClick={() => handleSlotSelect(slot)}
                      className={`px-3 py-2 text-xs rounded-lg ${
                        isSelected
                          ? "bg-[#52B2AD] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {displayTime}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}


          {/* PAYMENT METHOD */}
<div className="relative">
  <label className="block text-sm font-semibold text-gray-800 mb-1">
    Select Payment Method *
  </label>

  {/* SELECT BOX */}
  <button
    type="button"
    onClick={() => setPaymentOpen(!paymentOpen)}
    className={`w-full px-3 py-2.5 border-2 rounded-lg text-sm text-left flex justify-between items-center
      transition-all duration-200 focus:outline-none
      ${
        paymentMethod
          ? "border-[#52B2AD] bg-white text-gray-900"
          : "border-gray-200 bg-gray-50 text-gray-500"
      }`}
  >
    {paymentMethod || "Choose payment method"}
    <span className="text-gray-400">▾</span>
  </button>

  {/* DROPDOWN */}
  {paymentOpen && (
    <div className="absolute z-30 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {["Card", "Cash"].map((method) => (
        <button
          key={method}
          type="button"
          onClick={() => {
            setPaymentMethod(method.toUpperCase());
            setPaymentOpen(false);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-[#52B2AD]/10 hover:text-[#52B2AD] transition"
        >
          {method}
        </button>
      ))}
    </div>
  )}
</div>



{/* CUSTOMER NAME */}
<div>
  <label className="block text-sm font-semibold text-gray-800 mb-1">
    Enter Customer Name *
  </label>

  <input
    type="text"
    // value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    placeholder="Enter full name"
    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm
               focus:outline-none focus:border-[#52B2AD]"
  />
</div>



          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 rounded-md text-white bg-[#52B2AD]"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}