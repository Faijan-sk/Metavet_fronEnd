import React, { useEffect, useState } from "react"
import useJwt from "./../../../../enpoints/jwt/useJwt"
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus, X } from "lucide-react"

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function BookingModal({ behaviourist, isOpen, onClose }) {

  // ================= STATES =================
  const [behaviouristDays, setBehaviouristDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState({})
  const [behaviouristDayId, setBehaviouristDayId] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // ================= FETCH PETS =================
  useEffect(() => {
    if (!isOpen) return

    const fetchPets = async () => {
      try {
        const response = await useJwt.getAllPetsByOwner()
        setPets(response.data.data)
      } catch (error) {
        console.error("Error fetching pets:", error)
      }
    }

    const fetchDays = async () => {
      try {
        const response = await useJwt.getBehaviouristAvailableDay(behaviourist.uid)
        setBehaviouristDays(response.data?.data || response.data || [])
      } catch (error) {
        console.error("Error fetching days:", error)
      }
    }

    fetchPets()
    fetchDays()
  }, [isOpen])

  // ================= FETCH SLOTS =================
  useEffect(() => {
    if (!selectedDate || !behaviouristDayId || !behaviourist?.uid) return

    const fetchSlots = async () => {
      setSlotsLoading(true)
      setSlotsError("")
      setAvailableSlots([])

      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]
        const response = await useJwt.getBehaviouristAvailableSlot(
          behaviourist.uid,
          behaviouristDayId,
          formattedDate
        )
        setAvailableSlots(response.data?.data || response.data || [])
      } catch (error) {
        setAvailableSlots([])
        setSlotsError("Failed to load slots. Please try again.")
      } finally {
        setSlotsLoading(false)
      }
    }

    fetchSlots()
  }, [selectedDate, behaviouristDayId, behaviourist?.uid])

  if (!behaviourist || !isOpen) return null

  // ================= HELPERS =================
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const goToPreviousMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))

  const goToNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const resetForm = () => {
    setSelectedPet(null)
    setSelectedDate(null)
    setSelectedSlot(null)
    setNotes("")
    setBehaviouristDayId(null)
    setAvailableSlots([])
    setBookingError("")
    setBookingSuccess(false)
    setCalendarOpen(false)
  }

  const handleClose = () => {
    resetForm()
    onClose && onClose()
  }

  // ================= BOOK SESSION =================
  const handleBookSession = async (e) => {
    e.preventDefault()

    if (!selectedPet || !selectedDate || !selectedSlot || !behaviouristDayId) {
      setBookingError("Please fill all required fields")
      return
    }

    setLoading(true)
    setBookingError("")

    try {
      const payload = {
        petUid: selectedPet?.uid,
        serviceProviderUid: selectedSlot?.serviceProviderDay?.serviceProviderUid,
        behaviouristDayUid: selectedSlot?.serviceProviderDay?.uid,
        slotUid: selectedSlot?.uid,
        appointmentDate: selectedDate.toISOString().split("T")[0],
        notes: notes || undefined,
      }

      const response = await useJwt.bookBehaviouristAppointment(payload)
      const { checkoutUrl } = response.data

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }

      setBookingSuccess(true)

      setTimeout(() => {
        resetForm()
        onClose && onClose()
      }, 1500)
    } catch (error) {
      console.error("Error booking session:", error)
      setBookingError(
        error.response?.data?.message || "Failed to book session. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= CALENDAR (inline, not absolute) =================
  const renderCalendarCells = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []

    weekDays.forEach((day) => {
      cells.push(
        <div key={day} className="text-xs text-center text-gray-500 font-medium py-1">{day}</div>
      )
    })

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day)
      dateObj.setHours(0, 0, 0, 0)

      const isPast = dateObj < today
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
      const matchedDay = behaviouristDays.find((d) => d.dayOfWeek === dayName)
      const isAvailable = !!matchedDay
      const isSelected = selectedDate?.getTime() === dateObj.getTime()
      const isDisabled = isPast || !isAvailable

      cells.push(
        <button
          key={day}
          disabled={isDisabled}
          type="button"
          onClick={() => {
            if (!isDisabled) {
              setSelectedDate(dateObj)
              setBehaviouristDayId(matchedDay.uid)
              setSelectedSlot(null)
            }
          }}
          className={`text-sm h-10 rounded-md transition font-medium
            ${isSelected
              ? "bg-[#52B2AD] text-white"
              : isAvailable
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Modal — wider & taller to fit calendar inline */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Book a Session</h2>
            <p className="text-sm text-[#52B2AD] font-medium mt-0.5">with {behaviourist.fullName}</p>
          </div>
          <button type="button" onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleBookSession} className="px-6 py-5 space-y-5">

          {/* PET SELECT */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Select Pet *</label>
            <select
              value={selectedPet?.uid || ""}
              onChange={(e) => {
                const pet = pets.find((p) => p.uid === e.target.value)
                setSelectedPet(pet || null)
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD]"
              required
            >
              <option value="">Select a pet</option>
              {pets.map((p) => (
                <option key={p.uid} value={p.uid}>
                  {p.petName} • {p.petSpecies} ({p.petBreed})
                </option>
              ))}
            </select>
          </div>

          {/* DATE SELECTOR — two-column layout: toggle button + inline calendar */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Select Date *</label>

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className={`w-full px-3 py-2.5 border-2 rounded-xl text-left text-sm flex justify-between items-center transition ${
                selectedDate ? "border-[#52B2AD] bg-[#52B2AD]/5" : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
                  : "Choose a date"}
              </span>
              <Calendar size={16} className="text-[#52B2AD]" />
            </button>

            {/* Inline calendar — renders in document flow, no absolute positioning */}
            {calendarOpen && (
              <div className="mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-inner p-4">
                {/* Month navigation */}
                <div className="flex justify-between items-center mb-3">
                  <button type="button" onClick={goToPreviousMonth} className="p-1 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft size={18} />
                  </button>
                  <div className="font-semibold text-sm">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  <button type="button" onClick={goToNextMonth} className="p-1 hover:bg-gray-100 rounded-lg">
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#52B2AD]/20 inline-block" /> Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#52B2AD] inline-block" /> Selected
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-gray-100 inline-block" /> Unavailable
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1">{renderCalendarCells()}</div>
              </div>
            )}
          </div>

          {/* TIME SLOTS */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Select Time Slot *</label>

              {slotsLoading && <div className="text-sm text-gray-500">Loading available slots…</div>}
              {slotsError && <div className="text-sm text-red-600">{slotsError}</div>}
              {!slotsLoading && !slotsError && availableSlots.length === 0 && (
                <div className="text-sm text-gray-500">No slots available for this date.</div>
              )}
              {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot.slotId}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium flex items-center justify-center gap-1.5 transition ${
                        selectedSlot?.slotId === slot.slotId
                          ? "bg-[#52B2AD] border-[#52B2AD] text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:border-[#52B2AD]/50"
                      }`}
                    >
                      <Clock size={14} />
                      {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* NOTES */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Notes <span className="font-normal text-gray-400">(Optional)</span>
            </label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. My pet has anxiety issues, prefers calm environment"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] placeholder:text-gray-400 text-sm"
            />
          </div>

          {bookingError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{bookingError}</div>
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
              disabled={loading || !selectedSlot}
              className={`px-6 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 transition ${
                loading || !selectedSlot
                  ? "opacity-60 cursor-not-allowed bg-gray-400"
                  : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.02] shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Booking…
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Pay Now and Book
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default BookingModal