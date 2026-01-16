import React, { useEffect, useState } from "react"
import useJwt from "./../../../enpoints/jwt/useJwt"
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function BookAppointmentModal({ doctor }) {

  // ================= STATES =================
  const [doctorDays, setDoctorDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [doctorDayId, setDoctorDayId] = useState(null)

  const [availableSlots, setAvailableSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [selectedSlot, setSelectedSlot] = useState(null)

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

  // ================= FETCH SLOTS =================
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !doctorDayId || !doctor?.doctorId) return

      setSlotsLoading(true)
      setSlotsError("")
      setAvailableSlots([])

      try {
        const formattedDate = selectedDate
          .toISOString()
          .split("T")[0]

        const response = await useJwt.getSlotByDoctor(
          doctor.doctorId,
          doctorDayId,
          formattedDate
        )

        setAvailableSlots(response.data || [])
      } catch (error) {
        console.error("Error fetching slots:", error)
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

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  // ================= CALENDAR RENDER =================
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = []

    weekDays.forEach(day => {
      cells.push(
        <div key={day} className="text-xs font-semibold text-center text-gray-500">
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
                ? "bg-[#52B2AD]/15 text-[#2b8f8a] font-semibold hover:bg-[#52B2AD]/25"
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
    <div className="space-y-4">

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
            <span className={selectedDate ? "text-gray-900 font-medium" : "text-gray-500"}>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Choose a date"}
            </span>
            <Calendar size={16} className={selectedDate ? "text-[#52B2AD]" : "text-gray-400"} />
          </button>

          {calendarOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-1 hover:bg-gray-100 rounded-md transition"
                >
                  <ChevronLeft className="text-gray-600" />
                </button>

                <div className="font-semibold text-gray-800">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </div>

                <button 
                  onClick={goToNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-md transition"
                >
                  <ChevronRight className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                * Green dates are doctor available • Grey dates are unavailable
              </p>
            </div>
          )}
        </div>
      </div>

      {/* TIME SLOTS SECTION */}
      {selectedDate && (
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Select Time Slot *
          </label>

          {slotsLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#52B2AD]"></div>
            </div>
          )}

          {slotsError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {slotsError}
            </div>
          )}

          {!slotsLoading && !slotsError && availableSlots.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 text-gray-600 px-4 py-3 rounded-lg text-sm text-center">
              No slots available for this date
            </div>
          )}

          {!slotsLoading && !slotsError && availableSlots.length > 0 && (
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
              {availableSlots.map((slot) => (
                <button
                  key={slot.slotId}
                  onClick={() => handleSlotSelect(slot)}
                  className={`px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition flex items-center justify-center gap-1.5 ${
                    selectedSlot?.slotId === slot.slotId
                      ? "bg-[#52B2AD] border-[#52B2AD] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#52B2AD] hover:bg-[#52B2AD]/5"
                  }`}
                >
                  <Clock size={14} />
                <span>
  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
</span>

                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default BookAppointmentModal