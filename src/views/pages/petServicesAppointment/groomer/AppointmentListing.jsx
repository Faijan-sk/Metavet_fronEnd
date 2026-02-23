import React from "react";
import { Calendar, Clock, Check, Phone, MessageCircle } from "lucide-react";

// Status ke liye color mapping
const statusConfig = {
  PENDING:   { label: "Pending",   className: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-700" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-700" },
};

// "13:00:00" → "01:00 PM"
const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minute} ${ampm}`;
};

// "2026-02-23" → "23 Feb 2026"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const AppointmentCard = ({ item }) => {
  const status = statusConfig[item.status] || { label: item.status, className: "bg-gray-100 text-gray-600" };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-transparent hover:border-[#52B2AD]/20">
      <div className="flex items-center gap-4">

        {/* Avatar - client naam ka pehla letter */}
        <div className="w-16 h-16 bg-gradient-to-br from-[#52B2AD] to-[#387d79] rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-inner flex-shrink-0">
          {item.client?.name?.charAt(0).toUpperCase() || "?"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
           <h3 className="font-bold text-lg text-gray-800">
        Pet Name : {item?.pet?.name} ({item?.pet?.species})
      </h3>
            <br/>
            <h1 className="font-bold text-lg text-gray-400">Pet Parent : {item.client?.name}</h1>

            
            <span className="bg-[#52B2AD]/10 text-[#52B2AD] px-4 py-1 rounded-full font-bold text-sm">
              ₹{item.service?.price}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-2 truncate">
            {item.service?.serviceName} • {item.service?.durationMinutes} min
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(item.appointmentDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatTime(item.startTime)} – {formatTime(item.endTime)}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status.className}`}>
              {status.label}
            </span>
          </div>

          {item.notes && (
            <p className="text-xs text-gray-400 mt-2 italic">📝 {item.notes}</p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 flex-shrink-0">
          <button className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition shadow-sm" title="Confirm">
            <Check size={20} />
          </button>
          <a
            href={`tel:${item.client?.phone}`}
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition shadow-sm"
            title="Call Client"
          >
            <Phone size={20} />
          </a>
          <button className="bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition shadow-sm" title="Message">
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;