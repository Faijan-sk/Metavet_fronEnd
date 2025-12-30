import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import useJwt from "../../../enpoints/jwt/useJwt";

const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};

export default function BookAppointmentForm({
  onClose,
  onCreated,
  initialValues = null,
}) {
  const DAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const [selectedDay, setSelectedDay] = useState("");
  const [daysList, setDaysList] = useState([]);
  const [slotDurationMinutes, setSlotDurationMinutes] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userInfo = getUserInfo();

  // prefill if editing
  useEffect(() => {
    if (initialValues?.days) {
      setDaysList(initialValues.days);
    }
    if (initialValues?.slotDurationMinutes) {
      setSlotDurationMinutes(initialValues.slotDurationMinutes);
    }
  }, [initialValues]);

  const addDay = () => {
    setError(null);
    if (!selectedDay) return setError("Please select a day.");
    if (daysList.some((d) => d.day === selectedDay))
      return setError(`${selectedDay} already added.`);

    setDaysList((prev) => [
      ...prev,
      { day: selectedDay, startTime: "", endTime: "" },
    ]);
    setSelectedDay("");
  };

  const updateDayTime = (i, patch) => {
    setDaysList((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], ...patch };
      return updated;
    });
  };

  const removeDay = (i) => {
    setDaysList((prev) => prev.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    if (daysList.length === 0)
      return setError("Please add at least one day."), false;

    for (const d of daysList) {
      if (!d.startTime || !d.endTime)
        return setError(`Set both times for ${d.day}.`), false;
      if (d.startTime >= d.endTime)
        return setError(`Start time must be before end for ${d.day}.`), false;
    }

    if (!slotDurationMinutes || slotDurationMinutes <= 0)
      return setError("Please enter valid slot duration (minutes)."), false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    // payload
    const payload = daysList.map((day) => ({
      dayOfWeek: day.day,
      startTime: day.startTime + ":00",
      endTime: day.endTime + ":00",
      slotDurationMinutes: Number(slotDurationMinutes),
    }));

    try {
      const response = await useJwt.createAppintment(userInfo.userId, payload);
      console.log("Appointment created:", response.data);

      onCreated && onCreated(payload);
      onClose && onClose();
    } catch (err) {
      console.error("Error creating appointment:", err);

      // ====== CUSTOM ERROR MESSAGE ======
      const backendDetails = err.response?.data?.details;

      if (backendDetails && backendDetails.includes("already assigned")) {
        // Extract day from backendDetails -> "Day SATURDAY is already assigned..."
        const matched = backendDetails.match(/Day (\w+)/i);
        const dayName = matched ? matched[1].toUpperCase() : "this day";
        setError(`slot for the Day ${dayName} is already created`);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to create appointment. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#52B2AD]">
          Select Days & Times
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Day selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Select Day
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD]"
            >
              <option value="">-- Choose day --</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0) + d.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={addDay}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white flex items-center gap-2 font-semibold"
          >
            <Plus size={16} /> Add Day
          </button>
        </div>

        {/* Days list */}
        {daysList.length > 0 ? (
          daysList.map((d, i) => (
            <div
              key={d.day}
              className="p-3 border rounded-lg flex flex-col md:flex-row gap-3 items-center"
            >
              <div className="font-semibold w-32">
                {d.day.charAt(0) + d.day.slice(1).toLowerCase()}
              </div>
              <div className="flex gap-3 w-full">
                <input
                  type="time"
                  value={d.startTime}
                  onChange={(e) =>
                    updateDayTime(i, { startTime: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="time"
                  value={d.endTime}
                  onChange={(e) => updateDayTime(i, { endTime: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeDay(i)}
                className="px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">
            No days added. Add a day above.
          </div>
        )}

        {/* Slot duration */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Duration of Slot (in minutes)
          </label>
          <input
            type="number"
            value={slotDurationMinutes}
            onChange={(e) => setSlotDurationMinutes(e.target.value)}
            placeholder="e.g. 30, 45, 60"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD]"
            required
            min="1"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#52B2AD] to-[#42948f]"
            }`}
          >
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
}
