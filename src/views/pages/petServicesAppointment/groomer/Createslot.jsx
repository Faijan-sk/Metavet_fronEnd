import React, { useState } from "react";
import { Plus, ChevronDown, X, Calendar } from "lucide-react";
import useJwt from "../../../../enpoints/jwt/useJwt";

const GroomerSimpleScheduleForm = ({ onClose, onCreated }) => {
  // API mapping for days (Monday=1, Tuesday=2... Sunday=7)
  const DAYS_MAP = {
    "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, 
    "FRIDAY": 5, "SATURDAY": 6, "SUNDAY": 7
  };

  const [selectedDay, setSelectedDay] = useState("");
  const [daysList, setDaysList] = useState([]);
  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addDay = () => {
    setError(null);
    if (!selectedDay) return setError("Please select a day.");
    if (daysList.some((d) => d.dayName === selectedDay)) return setError(`${selectedDay} is already in the list.`);
    
    setDaysList((prev) => [...prev, { 
      dayName: selectedDay, 
      dayOfWeek: DAYS_MAP[selectedDay], 
      startTime: "", 
      endTime: "" 
    }]);
    setSelectedDay("");
  };

  const updateTime = (index, field, value) => {
    const updated = [...daysList];
    updated[index][field] = value;
    setDaysList(updated);
  };

  const removeDay = (index) => setDaysList(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (daysList.length === 0) return setError("Add at least one day.");
    
    // Validation: Check if times are filled
    for (const d of daysList) {
      if (!d.startTime || !d.endTime) return setError(`Please set times for ${d.dayName}`);
      if (d.startTime >= d.endTime) return setError(`End time must be after start time for ${d.dayName}`);
    }

    setLoading(true);
    setError(null);

    // Exact Body Format as per your requirement
    const payload = daysList.map(({ dayOfWeek, startTime, endTime }) => ({
      dayOfWeek,
      startTime,
      endTime
    }));

    try {
      await useJwt.createDaysForGroomer(payload);
      if (onCreated) onCreated(payload);
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Day Selector */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-700 mb-2">Select Day</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setDayDropdownOpen(!dayDropdownOpen)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg flex justify-between items-center text-sm"
            >
              {selectedDay || "Choose a day..."}
              <ChevronDown size={16} />
            </button>
            {dayDropdownOpen && (
              <ul className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                {Object.keys(DAYS_MAP).map((day) => (
                  <li 
                    key={day} 
                    onClick={() => { setSelectedDay(day); setDayDropdownOpen(false); }}
                    className="px-4 py-2 hover:bg-[#52B2AD] hover:text-white cursor-pointer text-sm"
                  >
                    {day}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button 
            type="button" 
            onClick={addDay}
            className="px-4 py-2 bg-[#52B2AD] text-white rounded-lg font-bold flex items-center gap-2 hover:bg-[#439692] transition-all"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {daysList.map((d, i) => (
          <div key={i} className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className="w-24 font-bold text-[#52B2AD] text-sm">{d.dayName}</div>
            <div className="flex-1 flex gap-2">
              <input 
                type="time" 
                value={d.startTime}
                onChange={(e) => updateTime(i, 'startTime', e.target.value)}
                className="flex-1 border rounded-md p-1.5 text-sm outline-[#52B2AD]"
              />
              <span className="text-slate-400 self-center">-</span>
              <input 
                type="time" 
                value={d.endTime}
                onChange={(e) => updateTime(i, 'endTime', e.target.value)}
                className="flex-1 border rounded-md p-1.5 text-sm outline-[#52B2AD]"
              />
            </div>
            <button type="button" onClick={() => removeDay(i)} className="text-slate-300 hover:text-red-500">
              <X size={18} />
            </button>
          </div>
        ))}
        {daysList.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
            No days added yet.
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold border border-red-100">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button type="button" onClick={onClose} className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg">
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-8 py-2 bg-[#52B2AD] text-white font-bold rounded-lg shadow-md hover:bg-[#439692] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Schedule"}
        </button>
      </div>
    </form>
  );
};

export default GroomerSimpleScheduleForm;