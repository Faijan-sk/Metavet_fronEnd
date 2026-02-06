import React, { useEffect, useState } from "react"
import useJwt from "./../../../enpoints/jwt/useJwt"
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function BookAppointmentModal({ doctor, onClose, initialValues }) {

  // ================= STATES =================
  const [doctorDays, setDoctorDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("")
  const petsLoading = false
  const petsError = null
  const isAddingPet = false

  const [doctorDayId, setDoctorDayId] = useState(null)

  const [availableSlots, setAvailableSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const doctorsLoading = false
  const visibleDoctors = [doctor]

  // ================= FETCH DOCTOR DAYS =================
  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await useJwt.getDoctorDaysFromDistance(
          doctor.doctorId
        )
        setDoctorDays(response.data)
      } catch (error) {
        console.error("Error fetching doctor days:", error)
      }
    }

    if (doctor?.doctorId) fetchDays()
  }, [doctor?.doctorId])

  useEffect(() => {
    const fetchPets = async () => {
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
      }
    };

    fetchPets()
  }, [])

  // ================= FETCH SLOTS =================
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !doctorDayId || !doctor?.doctorId) return

      setSlotsLoading(true)
      setSlotsError("")
      setAvailableSlots([])

      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]

        const response = await useJwt.getAvailableSlots(
          doctor.doctorId,
          doctorDayId,
          formattedDate
        )

        setAvailableSlots(response.data || [])
      } catch (error) {
        setAvailableSlots([])
        setSlotsError("Failed to load slots. Please try again.")
      } finally {
        setSlotsLoading(false)
      }
    }

    fetchSlots()
  }, [selectedDate, doctorDayId, doctor?.doctorId])

  // ================= HELPERS =================
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const resetForm = () => {
    setSelectedPet("")
    setSelectedDate(null)
    setSelectedSlot(null)
    setReason("")
    setDoctorDayId(null)
    setAvailableSlots([])
    setBookingError("")
    setBookingSuccess(false)
  }

  // ================= BOOK APPOINTMENT =================
  const handleBookAppointment = async (e) => {
    e.preventDefault()

    if (!selectedPet || !selectedDate || !selectedSlot || !doctorDayId) {
      setBookingError("Please fill all required fields")
      return
    }

    setLoading(true)
    setBookingError("")

    try {
      const payload = {
        petId: parseInt(selectedPet),
        doctorId: doctor.doctorId,
        doctorDayId: doctorDayId,
        slotId: selectedSlot.slotId,
        appointmentDate: selectedDate.toISOString().split("T")[0],
        reason: reason || undefined
      }

      console.log('Booking appointment with payload:', payload)

      const response = await useJwt.bookAppointment(payload)

      console.log('Booking response:', response)

      setBookingSuccess(true)
      
      setTimeout(() => {
        resetForm()
        if (onClose) onClose()
      }, 1500)

    } catch (error) {
      console.error("Error booking appointment:", error)
      setBookingError(error.response?.data?.message || "Failed to book appointment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ================= CALENDAR =================
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = []

    weekDays.forEach(day => {
      cells.push(
        <div key={day} className="text-xs text-center text-gray-500">
          {day}
        </div>
      )
    })

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day)
      dateObj.setHours(0, 0, 0, 0)

      const isPast = dateObj < today

      const dayName = dateObj
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase()

      const matchedDay = doctorDays.find(
        d => d.dayOfWeek === dayName
      )

      const isDoctorAvailable = !!matchedDay
      const isSelected = selectedDate?.getTime() === dateObj.getTime()
      const isDisabled = isPast || !isDoctorAvailable

      cells.push(
        <button
          key={day}
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              setSelectedDate(dateObj)
              setCalendarOpen(false)
              setDoctorDayId(matchedDay.doctorDayId)
              setSelectedSlot(null)
            }
          }}
          className={`text-sm h-9 rounded-md transition font-medium
            ${
              isSelected
                ? "bg-[#52B2AD] text-white"
                : isDoctorAvailable
                ? "bg-[#52B2AD]/15 text-[#2b8f8a] hover:bg-[#52B2AD]/25"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
            ${isPast ? "opacity-50" : ""}
          `}
        >
          {day}
        </button>
      )
    }

    return cells
  }

  // ================= JSX =================
  return (
    <form onSubmit={handleBookAppointment} className="space-y-4">

      {/* PET SELECT */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Select Pet *
        </label>

        {petsLoading ? (
          <div className="text-sm text-gray-600">Loading pets…</div>
        ) : petsError ? (
          <div className="text-sm text-red-600">{petsError}</div>
        ) : (
          <>
            {!isAddingPet ? (
              <select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black font-normal text-sm"
                required
              >
                <option value="">Select a pet</option>
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.petName} • {p.petSpecies} ({p.petBreed})
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-gray-600">
                Please add a pet first.
              </div>
            )}
          </>
        )}
      </div>

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
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
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
        <div>
          <label className="block text-sm font-semibold mb-2">
            Select Time Slot *
          </label>

          {slotsLoading && <div className="text-sm text-gray-600">Loading slots…</div>}

          {slotsError && (
            <div className="text-sm text-red-600">{slotsError}</div>
          )}

          {!slotsLoading && !slotsError && availableSlots.length === 0 && (
            <div className="text-sm text-gray-600">
              No slots available for this date
            </div>
          )}

          {!slotsLoading && !slotsError && availableSlots.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot.slotId}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-2.5 rounded-lg border-2 text-sm font-medium flex items-center justify-center gap-1.5 ${
                    selectedSlot?.slotId === slot.slotId
                      ? "bg-[#52B2AD] border-[#52B2AD] text-white"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}
                >
                  <Clock size={14} />
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reason */}
      <div className="md:col-span-2">
        <label
          htmlFor="reason"
          className="block text-xs font-semibold text-gray-600 mb-1"
        >
          Reason (Optional)
        </label>

        <input
          id="reason"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Vaccination, Checkup"
          className="
            w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD]
            placeholder:font-normal
            placeholder:text-gray-400
          "
        />
      </div>

      {/* Error Message */}
      {bookingError && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {bookingError}
        </div>
      )}

      {/* Success Message */}
      {bookingSuccess && (
        <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          Appointment booked successfully!
        </div>
      )}

    
      {/* Action Buttons */}
<div className="md:col-span-2 flex items-center justify-end gap-3 mt-2">
  <button
    type="button"
    onClick={() => {
      resetForm();
      onClose && onClose();
    }}
    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition font-normal"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading || doctorsLoading || visibleDoctors.length === 0 || !selectedSlot}
    className={`px-5 py-2 rounded-md text-white transition flex items-center font-normal ${
      loading || doctorsLoading || visibleDoctors.length === 0 || !selectedSlot
        ? "opacity-70 cursor-not-allowed bg-gray-400"
        : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.01] shadow-lg"
    }`}
  >
    {loading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Booking...
      </>
    ) : (
      <>
        <Plus size={16} className="inline-block mr-2 -mt-1" />
        {initialValues ? "Update Appointment" : "Book Appointment"}
      </>
    )}
  </button>
</div>


    </form>
  )
}

export default BookAppointmentModal