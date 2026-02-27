import React, { useEffect, useState } from "react"
import useJwt from "./../../../../enpoints/jwt/useJwt"
import { Plus, X, ChevronLeft, ChevronRight, Calendar, Clock, Scissors } from "lucide-react"

function GroomerBookingModal({ groomer, isOpen, onClose }) {

  // ================= STATES =================
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const [availableDays, setAvailableDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [slotsData, setSlotsData] = useState(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedService, setSelectedService] = useState("")
  const [selectedStartTime, setSelectedStartTime] = useState("")

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  // ================= FETCH PETS =================
  useEffect(() => {
    if (!isOpen) return
    const fetchPets = async () => {
      try {
        const response = await useJwt.getAllPetsByOwner()
        const petsList = response.data.data.map((pet) => ({
          id: pet.id,
          uid: pet.uid,
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
  }, [isOpen])

  // ================= FETCH AVAILABLE DAYS =================
  useEffect(() => {
    if (!isOpen || !groomer?.id) return
    const fetchAvailableDays = async () => {
      try {
        const response = await useJwt.getAvailableGroomerDays(groomer.id)
        setAvailableDays(response.data.availableDays || [])
      } catch (error) {
        console.error("Error fetching available days:", error)
      }
    }
    fetchAvailableDays()
  }, [isOpen, groomer?.uid])

  // ================= FETCH SLOTS & SERVICES WHEN DATE SELECTED =================
  useEffect(() => {
    if (!selectedDate || !groomer?.id) return

    const fetchSlotsAndServices = async () => {
      setSlotsLoading(true)
      setSlotsData(null)
      setSelectedSlot(null)
      setSelectedService("")
      setSelectedStartTime("")
      try {
        const dateStr = [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0")
        ].join("-")
        const response = await useJwt.getGroomerAvailableSlotServices(dateStr, groomer.id)
        setSlotsData(response.data)
      } catch (error) {
        console.error("Error fetching slots:", error)
      } finally {
        setSlotsLoading(false)
      }
    }

    fetchSlotsAndServices()
  }, [selectedDate, groomer?.uid])

  if (!groomer || !isOpen) return null

  // ================= HELPERS =================
  const resetForm = () => {
    setSelectedPet("")
    setSelectedDate(null)
    setCalendarOpen(false)
    setBookingError("")
    setBookingSuccess(false)
    setSlotsData(null)
    setSelectedSlot(null)
    setSelectedService("")
    setSelectedStartTime("")
  }

  const handleClose = () => {
    resetForm()
    onClose && onClose()
  }

  const jsToIso = (jsDay) => jsDay === 0 ? 7 : jsDay

  const isAvailableDay = (date) => {
    const isoDay = jsToIso(date.getDay())
    return availableDays.some((d) => d.dayOfWeek === isoDay)
  }

  const isDateSelectable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today && isAvailableDay(date)
  }

  const formatTime = (time) => time?.slice(0, 5)

  // ================= CALENDAR =================
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const goToPreviousMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    const today = new Date()
    today.setDate(1)
    today.setHours(0,0,0,0)
    if (prev >= today) setCurrentMonth(prev)
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const today = new Date()
    today.setHours(0,0,0,0)

    const dayLabels = ["Mo","Tu","We","Th","Fr","Sa","Su"]
    const cells = []

    dayLabels.forEach((d) =>
      cells.push(
        <div key={`lbl-${d}`} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
      )
    )

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const selectable = isDateSelectable(date)
      const isSelected = selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day
      const isPast = date < today

      cells.push(
        <button
          type="button"
          key={day}
          disabled={!selectable}
          onClick={() => {
            if (selectable) {
              setSelectedDate(date)
              setCalendarOpen(false)
            }
          }}
          className={`
            aspect-square rounded-lg text-sm font-medium transition-all
            ${isSelected
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
        </button>
      )
    }

    return cells
  }

  // ================= BOOK SESSION =================
  const handleBookSession = async (e) => {
    e.preventDefault()

    if (!selectedPet)       { setBookingError("Please select a pet");        return }
    if (!selectedDate)      { setBookingError("Please select a date");        return }
    if (!selectedSlot)      { setBookingError("Please select a time slot");   return }
    if (!selectedStartTime) { setBookingError("Please select a start time");  return }
    if (!selectedService)   { setBookingError("Please select a service");     return }

    setLoading(true)
    setBookingError("")

    try {
      const payload = {
        petUid:             selectedPet.uid,
        serviceProviderUid: groomer.id,
        appointmentDate: [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0")
        ].join("-"),
        startTime:          selectedStartTime + ":00",
        serviceUid:         selectedService,
        notes:              "",
        platForm : "IOS"
      }
      debugger

      console.log("Booking payload:", payload)

      const response = await useJwt.BookGroomerAppointment(payload)

      console.log("Booking response:", response)

      if (response.data?.checkoutUrl) {
        setBookingSuccess(true)
        setTimeout(() => {
          window.location.href = response.data.checkoutUrl
        }, 800)
      } else {
        setBookingError("Payment session could not be created. Please try again.")
      }

    } catch (error) {
      console.error("Error booking session:", error)

      if (error.response?.status === 409) {
        const errData = error.response.data
        let msg = errData?.error || "This slot is already booked."
        if (errData?.details?.availableSlots?.length > 0) {
          const slots = errData.details.availableSlots
            .map(s => `${s.startTime} – ${s.endTime}`)
            .join(", ")
          msg += ` Available slots: ${slots}`
        }
        setBookingError(msg)
      } else {
        setBookingError(
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to book session. Please try again."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  // ================= JSX =================
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Book a Session</h2>
            <p className="text-sm text-[#52B2AD] font-medium mt-0.5">with {groomer.name}</p>
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
              value={selectedPet?.id || ""}
              onChange={(e) => {
                const pet = pets.find(p => p.id === parseInt(e.target.value))
                setSelectedPet(pet || "")
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD]"
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
            <label className="block text-sm font-semibold text-gray-800 mb-1">Select Date *</label>

            {availableDays.length > 0 && (
              <p className="text-xs text-gray-400 mb-2">
                Available on:{" "}
                {availableDays.map((d) => (
                  <span key={d.dayOfWeek} className="inline-block bg-[#52B2AD]/10 text-[#2d7a75] rounded px-2 py-0.5 mr-1 font-medium">
                    {d.dayName.charAt(0) + d.dayName.slice(1).toLowerCase()}
                  </span>
                ))}
              </p>
            )}

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className={`w-full px-3 py-2.5 border-2 rounded-xl text-left text-sm flex justify-between items-center transition ${
                selectedDate ? "border-[#52B2AD] bg-[#52B2AD]/5" : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <span className={selectedDate ? "text-gray-900 font-medium" : "text-gray-400"}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB", { weekday:"short", day:"numeric", month:"short", year:"numeric" })
                  : "Choose a date"}
              </span>
              <Calendar size={16} className="text-[#52B2AD]" />
            </button>

            {/* ✅ Inline Calendar - BookWalkModal jaisa */}
            {calendarOpen && (
              <div className="mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-inner p-4">
                {/* Month Navigation */}
                <div className="flex justify-between items-center mb-3">
                  <button type="button" onClick={goToPreviousMonth} className="p-1 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft size={18} />
                  </button>
                  <div className="font-semibold text-sm text-gray-800">
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

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1.5">{renderCalendar()}</div>
              </div>
            )}
          </div>

          {/* SLOTS & SERVICES */}
          {selectedDate && (
            <>
              {slotsLoading ? (
                <div className="flex items-center justify-center py-6 gap-2 text-[#52B2AD] text-sm">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Loading available slots…
                </div>
              ) : slotsData ? (
                <>
                  {/* Working hours info */}
                  <div className="text-sm text-gray-400 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2">
                    <Clock size={14} />
                    Working hours: <span className="font-semibold text-gray-600">
                      {formatTime(slotsData.workingHours?.startTime)} – {formatTime(slotsData.workingHours?.endTime)}
                    </span>
                  </div>

                  {/* TIME SLOT SELECTION */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      <Clock size={14} className="inline mr-1" />
                      Select Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {slotsData.availableSlots?.map((slot, idx) => {
                        const isActive = selectedSlot?.slotStartTime === slot.slotStartTime
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => {
                              setSelectedSlot(slot)
                              setSelectedService("")
                              setSelectedStartTime("")
                            }}
                            className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                              isActive
                                ? "border-[#52B2AD] bg-[#52B2AD] text-white shadow-md"
                                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#52B2AD]/50 hover:bg-[#52B2AD]/5"
                            }`}
                          >
                            <div className="font-semibold text-xs">{formatTime(slot.slotStartTime)} – {formatTime(slot.slotEndTime)}</div>
                            <div className={`text-xs mt-0.5 ${isActive ? "text-white/80" : "text-gray-400"}`}>
                              {slot.availableDurationMinutes} min
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* START TIME INPUT */}
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
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] bg-gray-50"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Choose between {formatTime(selectedSlot.slotStartTime)} – {formatTime(selectedSlot.slotEndTime)}
                      </p>
                    </div>
                  )}

                  {/* SERVICE SELECTION */}
                  {selectedSlot && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        <Scissors size={14} className="inline mr-1" />
                        Select Service *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSlot.compatibleServices?.map((svc) => {
                          const isActive = selectedService === svc.uid
                          return (
                            <button
                              type="button"
                              key={svc.uid}
                              onClick={() => setSelectedService(svc.uid)}
                              className={`px-3 py-3 rounded-xl border-2 text-left transition-all ${
                                isActive
                                  ? "border-[#52B2AD] bg-[#52B2AD]/10 shadow-sm"
                                  : "border-gray-200 bg-gray-50 hover:border-[#52B2AD]/40 hover:bg-[#52B2AD]/5"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-semibold ${isActive ? "text-[#2d7a75]" : "text-gray-800"}`}>
                                  {svc.serviceName}
                                </span>
                                <span className={`text-sm font-bold ${isActive ? "text-[#52B2AD]" : "text-gray-700"}`}>
                                  ${svc.price.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={11} className="text-gray-400" />
                                <span className="text-xs text-gray-400">{svc.durationMinutes} min</span>
                                {svc.description && (
                                  <span className="text-xs text-gray-400 ml-1">• {svc.description}</span>
                                )}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
                  Could not load slots for this date. Please try another date.
                </div>
              )}
            </>
          )}

          {/* ERROR */}
          {bookingError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{bookingError}</div>
          )}

          {/* SUCCESS */}
          {bookingSuccess && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-xl flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Redirecting to payment…
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
              disabled={loading || bookingSuccess || !selectedPet || !selectedDate || !selectedSlot || !selectedStartTime || !selectedService}
              className={`px-6 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 transition ${
                loading || bookingSuccess || !selectedPet || !selectedDate || !selectedSlot || !selectedStartTime || !selectedService
                  ? "opacity-60 cursor-not-allowed bg-gray-400"
                  : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.02] shadow-lg"
              }`}
            >
              {loading || bookingSuccess ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  {bookingSuccess ? "Redirecting…" : "Processing…"}
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Book & Pay
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default GroomerBookingModal