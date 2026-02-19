import React, { useState, useEffect } from "react";
import { Plus, ChevronDown, X } from "lucide-react";
import useJwt from "../../../../enpoints/jwt/useJwt";

const BookAppointmentForm = ({ onClose, onCreated, initialValues = null }) => {
  const DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const slotOptions = [15, 30, 45, 60, "CUSTOM"];

  const [selectedDay, setSelectedDay] = useState("");
  const [daysList, setDaysList] = useState([]);
  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
  const [slotType, setSlotType] = useState("");
  const [slotDurationMinutes, setSlotDurationMinutes] = useState("");
  const [slotDropdownOpen, setSlotDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ❌ REMOVE: useJwt.createSlotDay() — ye yahan call nahi honi chahiye

  useEffect(() => {
    if (initialValues?.days) setDaysList(initialValues.days);
    if (initialValues?.slotDurationMinutes) {
      if ([15, 30, 45, 60].includes(initialValues.slotDurationMinutes)) {
        setSlotType(initialValues.slotDurationMinutes);
      } else {
        setSlotType("CUSTOM");
        setSlotDurationMinutes(initialValues.slotDurationMinutes);
      }
    }
  }, [initialValues]);

  const addDay = () => {
    setError(null);
    if (!selectedDay) return setError("Please select a day.");
    if (daysList.some((d) => d.day === selectedDay)) return setError(`${selectedDay} already added.`);
    setDaysList((prev) => [...prev, { day: selectedDay, startTime: "", endTime: "" }]);
    setSelectedDay("");
  };

  const updateDayTime = (i, patch) => {
    setDaysList((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], ...patch };
      return updated;
    });
  };

  const removeDay = (i) => setDaysList((prev) => prev.filter((_, idx) => idx !== i));

  const validate = () => {
    if (daysList.length === 0) { setError("Please add at least one day."); return false; }
    for (const d of daysList) {
      if (!d.startTime || !d.endTime) { setError(`Set both times for ${d.day}.`); return false; }
      if (d.startTime >= d.endTime) { setError(`Start time must be before end for ${d.day}.`); return false; }
    }
    if (!slotType) { setError("Select slot duration."); return false; }
    if (slotType === "CUSTOM" && !slotDurationMinutes) { setError("Enter custom slot duration."); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);

    const duration = slotType === "CUSTOM" ? Number(slotDurationMinutes) : Number(slotType);

    // ✅ API ke format mein payload
    const payload = daysList.map((day) => ({
      dayOfWeek: day.day,
      startTime: day.startTime + ":00",
      endTime: day.endTime + ":00",
      slotDurationMinutes: duration,
    }));

    try {
      // ✅ Sahi function name: createDayAndSlot
      const response = await useJwt.createDayAndSlot(payload);
      if (onCreated) onCreated(response.data);
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selection Area */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <label className="block text-sm font-bold text-gray-700 mb-2">Select Availability Day</label>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <button
              type="button"
              className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-lg flex justify-between items-center"
              onClick={() => setDayDropdownOpen(!dayDropdownOpen)}
            >
              <span className={selectedDay ? "text-gray-900" : "text-gray-400"}>
                {selectedDay || "Choose a day..."}
              </span>
              <ChevronDown size={18} />
            </button>
            {dayDropdownOpen && (
              <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {DAYS.map((d) => (
                  <li
                    key={d}
                    onClick={() => { setSelectedDay(d); setDayDropdownOpen(false); }}
                    className="px-4 py-2 hover:bg-[#52B2AD] hover:text-white cursor-pointer transition-colors"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={addDay}
            className="px-6 py-3 bg-[#52B2AD] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={20} /> Add Day
          </button>
        </div>
      </div>

      {/* List Area */}
      <div className="space-y-3">
        {daysList.map((d, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-gray-100 rounded-xl items-center shadow-sm">
            <div className="font-bold text-[#52B2AD] w-full md:w-32">{d.day}</div>
            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <input
                  type="time"
                  value={d.startTime}
                  onChange={(e) => updateDayTime(i, { startTime: e.target.value })}
                  className="w-full border rounded-lg p-2 outline-[#52B2AD]"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="time"
                  value={d.endTime}
                  onChange={(e) => updateDayTime(i, { endTime: e.target.value })}
                  className="w-full border rounded-lg p-2 outline-[#52B2AD]"
                  required
                />
              </div>
            </div>
            <button type="button" onClick={() => removeDay(i)} className="text-red-400 hover:text-red-600 p-1">
              <X size={20} />
            </button>
          </div>
        ))}
        {daysList.length === 0 && (
          <p className="text-center text-gray-400 py-4 italic">No days added to the schedule yet.</p>
        )}
      </div>

      {/* Duration Area */}
      <div className="border-t pt-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">Slot Duration (Minutes)</label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {slotOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { setSlotType(opt); setSlotDurationMinutes(""); }}
              className={`py-2 px-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                slotType === opt
                  ? "border-[#52B2AD] bg-[#52B2AD]/10 text-[#52B2AD]"
                  : "border-gray-100 text-gray-400 hover:border-gray-200"
              }`}
            >
              {opt === "CUSTOM" ? "Custom" : `${opt}m`}
            </button>
          ))}
        </div>
        {slotType === "CUSTOM" && (
          <input
            type="number"
            min={1}
            value={slotDurationMinutes}
            onChange={(e) => setSlotDurationMinutes(e.target.value)}
            placeholder="Enter minutes..."
            className="mt-3 w-full p-3 border-2 border-[#52B2AD] rounded-lg outline-none"
          />
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-2.5 bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Schedule"}
        </button>
      </div>
    </form>
  );
};

export default BookAppointmentForm;