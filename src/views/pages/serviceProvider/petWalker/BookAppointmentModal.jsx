import React, { useEffect, useState } from "react"
import useJwt from "./../../../../enpoints/jwt/useJwt"
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

function BookWalkModal({ walker, onClose }) {
  if (!walker) return null

  // ================= STATES =================
  const [walkerDays, setWalkerDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState("")

  const [walkerDayUid, setWalkerDayUid] = useState(null)

  const [availableSlots, setAvailableSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState("")
  const [selectedSlot, setSelectedSlot] = useState(null)

  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // ================= FETCH WALKER DAYS =================
  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await useJwt.getWalkerAvailableDays(walker.id)
        setWalkerDays(response.data?.data || response.data || [])
      } catch (error) {
        console.error("Error fetching walker days:", error)
      }
    }

    if (walker?.id) fetchDays()
  }, [walker?.id])

  // ================= FETCH PETS =================
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await useJwt.getAllPetsByOwner()
        const petsList = response.data.data.map((pet) => ({
          id: pet.id,
          petName: pet.petName,
          petSpecies: pet.petSpecies,
          petBreed: pet.petBreed,
        }))
        setPets(petsList)
      } catch (error) {
        console.error("Error fetching pets:", error)
      }
    }

    fetchPets()
  }, [])

  // ================= FETCH SLOTS =================
 useEffect(() => {
  const fetchSlots = async () => {
    if (!selectedDate || !walkerDayUid) return  // walker.uid check hata diya

    setSlotsLoading(true)
    setSlotsError("")
    setAvailableSlots([])
    setSelectedSlot(null)

    try {
      const formattedDate = selectedDate.toISOString().split("T")[0]
      const response = await useJwt.getWalkerAvailableSlot(
        formattedDate,
        walkerDayUid,
        walker.id  // yahan bhi check karo — agar undefined hai toh walker.id use karo
      )
      setAvailableSlots(response.data?.data || response.data || [])
    } catch (error) {
      console.error("Error fetching slots:", error)
      setAvailableSlots([])
      setSlotsError("Failed to load slots. Please try again.")
    } finally {
      setSlotsLoading(false)
    }
  }

  fetchSlots()
}, [selectedDate, walkerDayUid])  // walker?.uid dependency hata di

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
    setNotes("")
    setWalkerDayUid(null)
    setAvailableSlots([])
    setBookingError("")
    setBookingSuccess(false)
  }

  // ================= BOOK WALK =================
  const handleBookWalk = async (e) => {
    e.preventDefault()

    if (!selectedPet || !selectedDate || !selectedSlot || !walkerDayUid) {
      setBookingError("Please fill all required fields")
      return
    }

    setLoading(true)
    setBookingError("")

    try {
      const payload = {
        petId: parseInt(selectedPet),
        walkerUid: walker.uid,
        walkerDayUid: walkerDayUid,
        slotId: selectedSlot.slotId,
        walkDate: selectedDate.toISOString().split("T")[0],
        notes: notes || undefined,
      }

      console.log("Booking walk with payload:", payload)

      const response = await useJwt.bookWalk(payload)

      console.log("Booking response:", response)

      setBookingSuccess(true)

      setTimeout(() => {
        resetForm()
        if (onClose) onClose()
      }, 1500)
    } catch (error) {
      console.error("Error booking walk:", error)
      setBookingError(
        error.response?.data?.message || "Failed to book walk. Please try again."
      )
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

    weekDays.forEach((day) => {
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

      const matchedDay = walkerDays.find((d) => d.dayOfWeek === dayName)

      const isWalkerAvailable = !!matchedDay
      const isSelected = selectedDate?.getTime() === dateObj.getTime()
      const isDisabled = isPast || !isWalkerAvailable

      cells.push(
        <button
          key={day}
          disabled={isDisabled}
          type="button"
          onClick={() => {
            if (!isDisabled) {
              setSelectedDate(dateObj)
              setCalendarOpen(false)
              // ✅ petWalkerDayUid set kar rahe hain ab
              setWalkerDayUid(matchedDay.petWalkerDayUid)
              setSelectedSlot(null)
            }
          }}
          className={`text-sm h-9 rounded-md transition font-medium
            ${
              isSelected
                ? "bg-[#52B2AD] text-white"
                : isWalkerAvailable
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
    <form onSubmit={handleBookWalk} className="space-y-4">

      {/* PET SELECT */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Select Pet *
        </label>
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

              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
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

          {slotsLoading && (
            <div className="text-sm text-gray-600">Loading slots…</div>
          )}

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

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-semibold text-gray-600 mb-1"
        >
          Notes (Optional)
        </label>
        <input
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. My dog is friendly, needs a leash"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] placeholder:font-normal placeholder:text-gray-400 text-sm"
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
          Walk booked successfully!
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={() => {
            resetForm()
            onClose && onClose()
          }}
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition font-normal"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !selectedSlot}
          className={`px-5 py-2 rounded-md text-white transition flex items-center font-normal ${
            loading || !selectedSlot
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Booking...
            </>
          ) : (
            <>
              <Plus size={16} className="inline-block mr-2 -mt-1" />
              Book Walk
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default BookWalkModal