import React, { useState, useEffect } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import useJwt from "../../../enpoints/jwt/useJwt";

// const getUserInfo = () => {
//   try {
//     const userInfo = localStorage.getItem("userInfo");
//     return userInfo ? JSON.parse(userInfo) : null;
//   } catch (error) {
//     console.error("Error parsing userInfo:", error);
//     return null;
//   }
// };

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

  const slotOptions = [15, 30, 45, 60, "CUSTOM"];

  const [selectedDay, setSelectedDay] = useState("");
  const [daysList, setDaysList] = useState([]);
  const [dayDropdownOpen, setDayDropdownOpen] = useState(false);

  // slot selection
  const [slotType, setSlotType] = useState(""); // dropdown value
  const [slotDurationMinutes, setSlotDurationMinutes] = useState(""); // input if custom
  const [slotDropdownOpen, setSlotDropdownOpen] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const userInfo = getUserInfo();

  // prefill if editing
  useEffect(() => {
    if (initialValues?.days) {
      setDaysList(initialValues.days);
    }
    if (initialValues?.slotDurationMinutes) {
      // if matches dropdown, select option, else mark custom
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

    if (!slotType) return setError("Select slot duration."), false;

    if (slotType === "CUSTOM" && (!slotDurationMinutes || slotDurationMinutes <= 0))
      return setError("Enter valid custom duration (minutes)."), false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    const duration =
      slotType === "CUSTOM" ? Number(slotDurationMinutes) : Number(slotType);

    const payload = daysList.map((day) => ({
      dayOfWeek: day.day,
      startTime: day.startTime + ":00",
      endTime: day.endTime + ":00",
      slotDurationMinutes: duration,
    }));

    try {
      debugger
      // const response = await useJwt.createAppintment(userInfo.userId, payload);
            const response = await useJwt.createAppintment( payload);

      console.log("Appointment created:", response.data);

      onCreated && onCreated(payload);
      onClose && onClose();
    } catch (err) {
      console.error("Error creating appointment:", err);

      const backendDetails = err.response?.data?.details;

      if (backendDetails && backendDetails.includes("already assigned")) {
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

  const getDayLabel = (day) => {
    return day ? day.charAt(0) + day.slice(1).toLowerCase() : "Choose a day";
  };

  const getSlotLabel = (slot) => {
    if (!slot) return "Select Slot Duration";
    if (slot === "CUSTOM") return "Custom";
    return `${slot} minutes`;
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
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Select Day
            </label>

            <div className="relative">
              <button
                type="button"
                className={`w-full px-3 py-2.5 border-2 rounded-lg text-left text-sm hover:border-[#52B2AD]/70 focus:border-[#52B2AD] focus:outline-none transition-all duration-200 flex items-center justify-between ${
                  selectedDay
                    ? "border-[#52B2AD] bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
                onClick={() => setDayDropdownOpen((prev) => !prev)}
              >
                <span className={selectedDay ? "text-gray-900" : "text-gray-500"}>
                  {getDayLabel(selectedDay)}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {dayDropdownOpen && (
                <ul className="absolute z-20 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {DAYS.map((d) => (
                    <li
                      key={d}
                      onClick={() => {
                        setSelectedDay(d);
                        setDayDropdownOpen(false);
                      }}
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-[#52B2AD] hover:text-white transition-colors"
                    >
                      {getDayLabel(d)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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

        {/* Slot duration dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Duration of Slot (in minutes)
          </label>

          <div className="relative">
            <button
              type="button"
              className={`w-full px-3 py-2.5 border-2 rounded-lg text-left text-sm hover:border-[#52B2AD]/70 focus:border-[#52B2AD] focus:outline-none transition-all duration-200 flex items-center justify-between ${
                slotType
                  ? "border-[#52B2AD] bg-white"
                  : "border-gray-200 bg-gray-50"
              }`}
              onClick={() => setSlotDropdownOpen((prev) => !prev)}
            >
              <span className={slotType ? "text-gray-900" : "text-gray-500"}>
                {getSlotLabel(slotType)}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {slotDropdownOpen && (
              <ul className="absolute z-20 mt-1 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {slotOptions.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setSlotType(opt);
                      setSlotDropdownOpen(false);
                    }}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-[#52B2AD] hover:text-white transition-colors"
                  >
                    {opt === "CUSTOM" ? "Custom" : `${opt} minutes`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* custom input visible only when "CUSTOM" selected */}
          {slotType === "CUSTOM" && (
            <input
              type="number"
              value={slotDurationMinutes}
              onChange={(e) => setSlotDurationMinutes(e.target.value)}
              placeholder="Enter custom duration e.g. 120"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD]"
              min="1"
            />
          )}
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