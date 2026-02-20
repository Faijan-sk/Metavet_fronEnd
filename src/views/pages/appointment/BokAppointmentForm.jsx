import React, { useState, useEffect, useCallback } from "react";
import { X, Plus, Clock } from "lucide-react";
import useJwt from "../../../enpoints/jwt/useJwt";
import { useNavigate } from "react-router-dom";

export default function BookAppointmentForm({
  onClose,
  onCreated,
  initialValues = null,
}) {
  const emptyForm = {
    petId: "",
    doctorId: "",
    doctorDayId: "",
    slotId: "",
    appointmentDate: "",
    reason: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentDay, setAppointmentDay] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [doctorsError, setDoctorsError] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  // Available time slots
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
const [bookingResponse, setBookingResponse] = useState(null);
  // pets
  const [pets, setPets] = useState([]);
  const [petsLoading, setPetsLoading] = useState(false);
  const [petsError, setPetsError] = useState(null);
  const [isAddingPet, setIsAddingPet] = useState(false);

  const upd = useCallback((patch) => setForm((p) => ({ ...p, ...patch })), []);

  // prefill when editing
  useEffect(() => {
    if (!initialValues) return;
    setForm((p) => ({ ...p, ...initialValues }));
    if (initialValues.appointmentDate) setAppointmentDate(initialValues.appointmentDate);
  }, [initialValues]);

  // fetch pets on mount
  useEffect(() => {
    let mounted = true;
    const fetchPets = async () => {
      setPetsLoading(true);
      setPetsError(null);
      try {
        const resp = await useJwt.getAllPetsByOwner();
        let data = [];
        if (Array.isArray(resp?.data?.data)) data = resp.data.data;
        else if (Array.isArray(resp?.data)) data = resp.data;
        else if (Array.isArray(resp?.data?.results)) data = resp.data.results;
        
        setPets(data || []);

        if (initialValues?.petId && mounted) {
          const initPetId = initialValues.petId;
          const matched = data.find((p) => String(p.pid) === String(initPetId));
          if (matched) {
            upd({ petId: matched.pid });
            setIsAddingPet(false);
          }
        }
      } catch (err) {
        console.error("Error fetching pets:", err);
        const message = err?.response?.data?.message || err?.message || "Failed to fetch pets.";
        setPetsError(message);
      } finally {
        setPetsLoading(false);
      }
    };

    fetchPets();
    return () => {
      mounted = false;
    };
  }, []);

  // compute weekday and fetch doctors when appointmentDate changes
  useEffect(() => {
    if (!appointmentDate) {
      setAppointmentDay("");
      upd({ appointmentDate: "" });
      setDoctors([]);
      setVisibleDoctors([]);
      setSpecializations([]);
      setSelectedSpecialization("");
      setDoctorsError(null);
      setDoctorsLoading(false);
      setAvailableSlots([]);
      setSlotsError(null);
      return;
    }

    const [y, m, d] = appointmentDate.split("-").map(Number);
    const dateObj = new Date(y, (m || 1) - 1, d || 1);
    const dayName = dateObj.toLocaleDateString(undefined, { weekday: "long" }).toUpperCase();
    setAppointmentDay(dayName);
    upd({ appointmentDate: appointmentDate });

    const fetchDoctors = async () => {
      setDoctors([]);
      setVisibleDoctors([]);
      setSpecializations([]);
      setDoctorsError(null);
      setDoctorsLoading(true);
      setAvailableSlots([]);
      try {
        const resp = await useJwt.getDoctorByDay(dayName);
        // normalize response structure
        const rawData = Array.isArray(resp?.data) ? resp.data : resp?.data?.results || [];
        // filter only APPROVED doctors
        const approved = (rawData || []).filter(
          (r) => (r.doctor && String(r.doctor.doctorProfileStatus || "").toUpperCase() === "APPROVED")
        );

        if (!approved.length) {
          // no approved doctors for the selected day
          setDoctors([]);
          setVisibleDoctors([]);
          setSpecializations([]);
          setSelectedSpecialization("");
          setDoctorsError(`No approved doctors available for ${dayName}. Please choose another date.`);
          setDoctorsLoading(false);
          return;
        }

        setDoctors(approved || []);

        // extract unique specializations from approved doctors
        const specs = Array.from(
          new Set((approved || []).map((r) => (r.doctor?.specialization || "").trim()).filter(Boolean))
        );
        setSpecializations(specs);

        // if initialValues doctor is present, try to select it only if it's in approved list
        if (initialValues?.doctorId) {
          const initialDoctorId = Number(initialValues.doctorId) || initialValues.doctorId;
          const matched = (approved || []).find(
            (doc) => doc.doctorId === initialDoctorId || String(doc.doctorId) === String(initialDoctorId)
          );
          if (matched) {
            const spec = matched.doctor?.specialization || "";
            setSelectedSpecialization(spec);
            setVisibleDoctors((approved || []).filter((d) => (spec ? d.doctor?.specialization === spec : true)));
            upd({ doctorId: matched.doctorId, doctorDayId: matched.doctorDayId });
            setDoctorsLoading(false);
            return;
          }
        }

        // otherwise show all approved doctors
        setVisibleDoctors(approved || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        const message = err?.response?.data?.message || err?.message || "Failed to fetch doctors.";
        setDoctorsError(message);
      } finally {
        setDoctorsLoading(false);
      }
    };

    fetchDoctors();
  }, [appointmentDate, upd]);

  // filter doctors by specialization
  useEffect(() => {
    if (!selectedSpecialization) {
      setVisibleDoctors(doctors);
    } else {
      setVisibleDoctors(doctors.filter((d) => {
        const spec = d.doctor?.specialization || "";
        return spec === selectedSpecialization;
      }));
      if (form.doctorId) {
        const belongs = visibleDoctors.some((vd) => String(vd.doctorId) === String(form.doctorId));
        if (!belongs) {
          upd({ doctorId: "", doctorDayId: "", slotId: "" });
          setAvailableSlots([]);
        }
      }
    }
  }, [selectedSpecialization, doctors]);

  const doctorLabel = (d) => {
    const doc = d.doctor || d;
    return doc?.user?.firstName || doc?.user?.fullName || doc?.user?.username || 
           `${doc?.user?.firstName || ""} ${doc?.user?.lastName || ""}`.trim() || 
           `Dr.${doc?.doctorId || d?.doctorId}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "specialization") {
      setSelectedSpecialization(value);
      upd({ doctorId: "", doctorDayId: "", slotId: "" });
      setAvailableSlots([]);
      return;
    }
    upd({ [name]: value });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setAppointmentDate(value);
    upd({ appointmentDate: value, slotId: "" });
    setAvailableSlots([]);
  };

  const handlePetSelectChange = (e) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setIsAddingPet(true);
      upd({ petId: "" });
    } else {
      setIsAddingPet(false);
      upd({ petId: val });
    }
  };

  // Handle doctor selection and fetch available slots
  const handleDoctorChange = async (e) => {
    const selectedDoctorId = e.target.value;
    
    // Clear previous slots
    setAvailableSlots([]);
    setSlotsError(null);
    upd({ doctorId: "", doctorDayId: "", slotId: "" });

    if (!selectedDoctorId) return;

    // Find the selected doctor's complete data from the fetched doctors list
    const selectedDoctor = doctors.find(d => String(d.doctorId) === String(selectedDoctorId));
    
    if (!selectedDoctor) {
      console.error("Selected doctor not found in doctors list");
      return;
    }

    const doctorDayId = selectedDoctor.doctorDayId;
    
    // Update form with doctorId and doctorDayId
    upd({ 
      doctorId: selectedDoctorId, 
      doctorDayId: doctorDayId 
    });

    console.log("Selected Doctor:", {
      doctorId: selectedDoctorId,
      doctorDayId: doctorDayId,
      appointmentDate: form.appointmentDate
    });

    // Fetch available slots if we have all required data
    if (selectedDoctorId && doctorDayId && form.appointmentDate) {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const response = await useJwt.getAvailableSlots(
          selectedDoctorId,
          doctorDayId,
          form.appointmentDate
        );
        
        console.log("Available Slots Response:", response.data);
        
        // Handle different response structures
        const slots = Array.isArray(response?.data) 
          ? response.data 
          : Array.isArray(response?.data?.slots) 
            ? response.data.slots 
            : [];
        
        setAvailableSlots(slots);
        
        if (slots.length === 0) {
          setSlotsError("No available slots for this doctor on selected date.");
        }
      } catch (err) {
        console.error("Error fetching available slots:", err);
        const message = err?.response?.data?.message || err?.message || "Failed to fetch available slots.";
        setSlotsError(message);
        setAvailableSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    }
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    const slotId = slot.slotId || slot.id;
    upd({ slotId: slotId });
    console.log("Selected Slot ID:", slotId);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setAppointmentDate("");
    setAppointmentDay("");
    setDoctors([]);
    setVisibleDoctors([]);
    setSpecializations([]);
    setSelectedSpecialization("");
    setDoctorsError(null);
    setDoctorsLoading(false);
    setPetsError(null);
    setPetsLoading(false);
    setIsAddingPet(false);
    setError(null);
    setAvailableSlots([]);
    setSlotsError(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  // Validate required fields
  if (!form.petId || !form.doctorId || !form.doctorDayId || !form.slotId || !form.appointmentDate) {
    setError("Please select Pet, Doctor, Date and Time slot.");
    return;
  }

  setLoading(true);
  try {
    // Prepare payload for backend
    const payload = {
      petId: Number(form.petId),
      doctorId: Number(form.doctorId),
      doctorDayId: Number(form.doctorDayId),
      slotId: Number(form.slotId),
      appointmentDate: form.appointmentDate,
    };

    console.log("Booking Appointment with payload:", payload);

    // Call backend API to create Stripe checkout session
    const response = await useJwt.bookAppointment(payload);
    
    console.log("Payment Session Created:", response.data);

    // Check if checkout URL exists in response
    
    if (response.data.checkoutUrl) {
      // Optional: Save booking details for reference
      localStorage.setItem('pendingBooking', JSON.stringify({
        sessionId: response.data.sessionId,
        appointmentDate: form.appointmentDate,
        doctorName: response.data.doctorName,
        amount: response.data.amount
      }));

      // Redirect user to Stripe payment page
      window.location.href = response.data.checkoutUrl;
      
    } else {
      setError("Failed to create payment session. Please try again.");
    }

  } catch (err) {
    console.error("Error booking appointment:", err);
    const message = err?.response?.data?.error || 
                   err?.response?.data?.message || 
                   err?.message || 
                   "Failed to book appointment.";
    setError(message);

  } finally {
    
    setLoading(false);

  }
};


return (
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 p-6 transform transition-all animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-[#52B2AD]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 7h18M8 3v4M16 3v4" stroke="#52B2AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Book Appointment
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm text-gray-500 px-3 py-1 rounded-md hover:bg-gray-100"
            onClick={() => {
              resetForm();
              onClose && onClose();
            }}
            title="Cancel"
          >
            Cancel
          </button>

          <button
            type="button"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              resetForm();
              onClose && onClose();
            }}
            title="Close"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Field */}
        <div>
  <label
    htmlFor="appointmentDate"
    className="block text-xs font-semibold text-gray-600 mb-1"
  >
    Date *
  </label>

  <input
    id="appointmentDate"
    name="appointmentDate"
    value={form.appointmentDate}
    onChange={handleDateChange}
    type="date"
    min={new Date().toISOString().split("T")[0]}   // ⬅ prevents selecting older dates
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD]"
    required
  />

  {appointmentDay && (
    <div className="mt-1 text-xs text-gray-600">Day: {appointmentDay}</div>
  )}
</div>


        {/* Doctors Loading State */}
        {doctorsLoading && (
          <div className="md:col-span-2 text-sm text-gray-600">Loading available doctors for {appointmentDay}…</div>
        )}

        {!doctorsLoading && doctorsError && (
          <div className="md:col-span-2 text-sm text-primary-600" role="alert">
            {/* Error loading doctors:  */}
            {doctorsError}
          </div>
        )}

        {!doctorsLoading && !doctorsError && !doctors.length && appointmentDate && (
          <div className="md:col-span-2 text-sm text-yellow-700">
            No doctors available for {appointmentDay}. Please choose another date.
          </div>
        )}

        {/* Specialization Dropdown */}
        {/* {specializations.length > 0 && (
          <div className="md:col-span-2">
            <label htmlFor="specialization" className="block text-xs font-semibold text-gray-600 mb-1">
              Select Specialization (Optional - filter doctors)
            </label>
            <select
              id="specialization"
              name="specialization"
              value={selectedSpecialization}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] bg-white"
            >
              <option value="">All specializations ({doctors.length} doctors)</option>
              {specializations.map((s) => {
                const count = doctors.filter(d => d.doctor?.specialization === s).length;
                return (
                  <option key={s} value={s}>
                    {s} ({count} {count === 1 ? 'doctor' : 'doctors'})
                  </option>
                );
              })}
            </select>
            {selectedSpecialization && (
              <div className="mt-1 text-xs text-gray-600">
                Showing {visibleDoctors.length} doctor(s) with specialization: <span className="font-semibold">{selectedSpecialization}</span>
              </div>
            )}
          </div>
        )} */}

        {/* Rest of the form - only show when doctors are available */}
        {!doctorsLoading && visibleDoctors.length > 0 && (
          <>
            {/* Pet Select */}
            <div>
              <label htmlFor="petId" className="block text-xs font-semibold text-gray-600 mb-1">Select Pet *</label>
              {petsLoading ? (
                <div className="text-sm text-gray-600">Loading pets…</div>
              ) : petsError ? (
                <div className="text-sm text-red-600">{petsError}</div>
              ) : (
                <>
                  {!isAddingPet ? (
                    <select
                      id="petId"
                      name="petId"
                      value={form.petId}
                      onChange={handlePetSelectChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] bg-white"
                      required
                    >
                      <option value="">Select a pet</option>
                      {pets.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.petName} {p.petSpecies ? `• ${p.petSpecies}` : ""} {p.petBreed ? `(${p.petBreed})` : ""}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-sm text-gray-600">
                      Please add a pet first from Pet Management section.
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Doctor Select */}
            <div>
              <label htmlFor="doctorId" className="block text-xs font-semibold text-gray-600 mb-1">Doctor *</label>
              <select
                id="doctorId"
                name="doctorId"
                value={form.doctorId}
                onChange={handleDoctorChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] bg-white"
              >
                <option value="">Select a doctor</option>
                {visibleDoctors.map((d) => {
                  const doc = d.doctor || d;
                  return (
                    <option key={d.doctorId} value={d.doctorId}>
                      {doctorLabel(d)} {doc?.experienceYears ? `• ${doc.experienceYears} yrs` : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Time Slots - Show when doctor is selected */}
            {form.doctorId && (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  <Clock size={14} className="inline mr-1" />
                  Select Time Slot *
                </label>
                
                {slotsLoading && (
                  <div className="text-sm text-gray-600 py-2">Loading available time slots...</div>
                )}

                {!slotsLoading && slotsError && (
                  <div className="text-sm text-yellow-600 py-2">{slotsError}</div>
                )}

                {!slotsLoading && !slotsError && availableSlots.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {availableSlots.map((slot) => {
                      const slotId = slot.slotId || slot.id;
                      const startTime = slot.startTime || slot.time || "";
                      const endTime = slot.endTime || "";
                      const displayTime = endTime ? `${startTime} - ${endTime}` : startTime;
                      const isSelected = Number(form.slotId) === Number(slotId);
                      
                      return (
                        <button
                          key={slotId}
                          type="button"
                          onClick={() => handleSlotSelect(slot)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                            isSelected
                              ? "bg-[#52B2AD] text-white ring-2 ring-[#52B2AD] ring-offset-2"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {displayTime}
                        </button>
                      );
                    })}
                  </div>
                )}

                {!slotsLoading && !slotsError && availableSlots.length === 0 && form.doctorId && (
                  <div className="text-sm text-gray-500 py-2">No available slots found.</div>
                )}
              </div>
            )}

            {/* Reason */}
            <div className="md:col-span-2">
              <label htmlFor="reason" className="block text-xs font-semibold text-gray-600 mb-1">Reason (Optional)</label>
              <input
                id="reason"
                name="reason"
                value={form.reason}
                onChange={(e) => upd({ reason: e.target.value })}
                placeholder="e.g. Vaccination, Checkup"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD]"
              />
            </div>
          </>
        )}

        {error && (
          <div className="md:col-span-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg" role="alert">
            {error}
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
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || doctorsLoading || visibleDoctors.length === 0 || !form.slotId}
            className={`px-5 py-2 rounded-md text-white font-semibold transition flex items-center ${
              loading || doctorsLoading || visibleDoctors.length === 0 || !form.slotId
                ? "opacity-70 cursor-not-allowed bg-gray-400"
                : "bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:scale-[1.01] shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
    </div>
  );
}
