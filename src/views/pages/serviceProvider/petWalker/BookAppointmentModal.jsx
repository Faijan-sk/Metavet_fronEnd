import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "./../../../../enpoints/jwt/useJwt";
import AddPetForm from "./../../pets/AddPetForm";

import { useWalkerAppointment } from "./../../../../context/WalkerAppointmentContext";

import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  X,
} from "lucide-react";

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

function BookWalkModal({ walker, onClose }) {
  if (!walker) return null;

  // ================= CONTEXT =================
  const {
    bookingData,
    setPetUid,
    setAppointmentDate,
    setSlotUid,
    setPetWalkerDayUid,
    setPetWalkerUid,
  } = useWalkerAppointment();

  useEffect(() => {
    console.log("🔥 CONTEXT UPDATED:", bookingData);
  }, [bookingData]);

  // ================= STATES =================
  const [walkerDays, setWalkerDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [walkerDayUid, setWalkerDayUid] = useState(null);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  const [bookingError, setBookingError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ================= FETCH WALKER DAYS =================
  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await useJwt.getWalkerAvailableDays(walker.id);
        setWalkerDays(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching walker days:", error);
      }
    };
    if (walker?.id) fetchDays();
  }, [walker?.id]);

  // ================= FETCH SLOTS =================
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !walkerDayUid) return;

      setSlotsLoading(true);
      setSlotsError("");
      setAvailableSlots([]);
      setSelectedSlot(null);

      try {
        const formattedDate = [
          selectedDate.getFullYear(),
          String(selectedDate.getMonth() + 1).padStart(2, "0"),
          String(selectedDate.getDate()).padStart(2, "0"),
        ].join("-");

        const response = await useJwt.getWalkerAvailableSlot(
          formattedDate,
          walkerDayUid,
          walker.id,
        );

        setAvailableSlots(response.data?.data || response.data || []);

        // Store in context
        setPetWalkerDayUid(walkerDayUid);
        setAppointmentDate(formattedDate);
        setPetWalkerUid(walker.id);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots([]);
        setSlotsError("Failed to load slots. Please try again.");
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate, walkerDayUid]);

  // ================= FETCH PETS (only after slot selected) =================
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

  useEffect(() => {
    if (selectedSlot) {
      fetchPets();
    }
  }, [selectedSlot, fetchPets]);

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
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedPet(null);
    setWalkerDayUid(null);
    setAvailableSlots([]);
    setPets([]);
    setBookingError("");
    setLoading(false);
    setShowAddPetModal(false);
  };

  // ================= PET HANDLERS =================
  const handlePetSelectChange = (e) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setSelectedPet(null);
      setShowAddPetModal(true);
    } else {
      const pet = pets.find((p) => p.id === parseInt(val));
      setSelectedPet(pet || null);
      if (pet) setPetUid(pet);
    }
  };

  const handlePetAdded = async () => {
    setShowAddPetModal(false);
    await fetchPets();
  };

  // ================= SUBMIT =================
  const handleBookWalk = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlot || !selectedPet?.uid) {
      setBookingError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setBookingError("");

    const formattedDate = [
      selectedDate.getFullYear(),
      String(selectedDate.getMonth() + 1).padStart(2, "0"),
      String(selectedDate.getDate()).padStart(2, "0"),
    ].join("-");

    // Store everything in context
    setPetUid(selectedPet);
    setSlotUid(selectedSlot);
    setPetWalkerUid(selectedSlot.petWalker.uid);
    setPetWalkerDayUid(selectedSlot.petWalkerDayUid);
    setAppointmentDate(formattedDate);

    console.log("📦 Booking Data stored in context:", {
      petUid: selectedPet.uid,
      slotUid: selectedSlot.slotUid,
      petWalkerUid: selectedSlot.petWalker.uid,
      petWalkerDayUid: selectedSlot.petWalkerDayUid,
      appointmentDate: formattedDate,
    });

    // 1 second delay then redirect
    setTimeout(() => {
      setLoading(false);
      resetForm();
      onClose && onClose();
      navigate("/walker-appointment");
    }, 1000);
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
        <div
          key={day}
          className="text-xs text-center text-gray-500 font-medium py-1"
        >
          {day}
        </div>,
      );
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      dateObj.setHours(0, 0, 0, 0);

      const isPast = dateObj < today;
      const dayName = dateObj
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
      const matchedDay = walkerDays.find((d) => d.dayOfWeek === dayName);
      const isWalkerAvailable = !!matchedDay;
      const isSelected = selectedDate?.getTime() === dateObj.getTime();
      const isDisabled = isPast || !isWalkerAvailable;

      cells.push(
        <button
          key={day}
          disabled={isDisabled}
          type="button"
          onClick={() => {
            if (!isDisabled) {
              setSelectedDate(dateObj);
              setCalendarOpen(false);
              setWalkerDayUid(matchedDay.petWalkerDayUid);
              // Reset downstream when date changes
              setSelectedSlot(null);
              setSelectedPet(null);
              setPets([]);
            }
          }}
          className={`text-sm h-10 rounded-md transition font-medium
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
        </button>,
      );
    }

    return cells;
  };

  // ================= JSX =================
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (!loading && e.target === e.currentTarget) {
            resetForm();
            onClose && onClose();
          }
        }}
      >
        {/* Modal */}
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book a Walk</h2>
              <p className="text-sm text-[#52B2AD] font-medium mt-0.5">
                with {walker.name}
              </p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                if (!loading) {
                  resetForm();
                  onClose && onClose();
                }
              }}
              className={`p-2 rounded-full hover:bg-gray-100 transition ${loading ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleBookWalk} className="px-6 py-5 space-y-5">
            {/* STEP 1 — DATE SELECTOR */}
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
                  className={selectedDate ? "text-gray-900" : "text-gray-400"}
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

                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2 — TIME SLOTS (shows after date selected) */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Select Time Slot *
                </label>

                {slotsLoading && (
                  <div className="text-sm text-gray-500">
                    Loading available slots…
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
                {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot.slotId}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setSlotUid(slot);
                          setPetWalkerUid(slot?.petWalker?.uid);
                          // Reset pet when slot changes
                          setSelectedPet(null);
                        }}
                        className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium flex items-center justify-center gap-1.5 transition ${
                          selectedSlot?.slotId === slot.slotId
                            ? "bg-[#52B2AD] border-[#52B2AD] text-white"
                            : "bg-white border-gray-200 text-gray-700 hover:border-[#52B2AD]/50"
                        }`}
                      >
                        <Clock size={14} />
                        {formatTime(slot.startTime)} –{" "}
                        {formatTime(slot.endTime)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 — PET SELECT (shows after slot selected) */}
            {selectedSlot && (
              <div>
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
              </div>
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
                disabled={loading}
                onClick={() => {
                  if (!loading) {
                    resetForm();
                    onClose && onClose();
                  }
                }}
                className={`px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-700 ${loading ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !selectedSlot || !selectedPet}
                className={`px-6 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-2 transition ${
                  loading || !selectedSlot || !selectedPet
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

export default BookWalkModal;
/*

yaha mai pahale pet select karta hu then vo pet kyc form ko send karta hu ye mera context ka data he pet kaise store ho raha he 

appointmentDate
: 
"2026-03-31"
kycId
: 
"0b15abfe-08b5-4e88-835e-ed4c2718693b"
petUid
: 
id
: 
2
petBreed
: 
"Marsh"
petName
: 
"Croco"
petSpecies
: 
"Crocodile"
uid
: 
"c9c4466a-3758-4e27-ae5c-1d6b35651c69"
[[Prototype]]
: 
Object
petWalkerDayUid
: 
"e8522c01-07d4-4782-b8cc-bb9fe4dbc44c"
petWalkerUid
: 
"70c91f7c-556a-4545-91f0-78129812558f"
slotUid
: 
{id: 13, uid: 'ceea83d7-b717-46c0-994d-73005012395a', createdAt: '2026-03-25T16:54:16.276025', updatedAt: '2026-03-25T16:54:16.276025', petWalker: {…}, …}


then kyc me uid se fetch karta hu kyc mai sirf itna chahta hu pet prefil dikhna chahiye tumhe koi or code chahoiye baki koi flow change mat karo kya tumhe get petka response du

ye mere get pet byu owner ka responose he 


{
    "data": [
        {
            "id": 2,
            "uid": "c9c4466a-3758-4e27-ae5c-1d6b35651c69",
            "petName": "Croco",
            "petSpecies": "Crocodile",
            "petAge": 20,
            "petBreed": "Marsh",
            "petGender": "Male",
            "petHeight": 20.00,
            "petWeight": 20.00,
            "isVaccinated": false,
            "isNeutered": false,
            "petImage": " yaha base64 aata he "
            "petImageFilePath": "E:\\New-Metavet-Backend-Copy\\pet_images\\Croco\\pet_image_1774437996978_ab354356-f5da-4252-ac50-b7faca1a117c.jpeg"
        },


        or ye mera kyc ka code he pure code me change mat kao sirf batao koan koan se line me vhange karna he 
*/
