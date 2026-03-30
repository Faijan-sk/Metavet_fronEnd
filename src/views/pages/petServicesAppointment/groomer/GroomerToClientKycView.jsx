import React from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  Heart,
  Scissors,
  AlertTriangle,
  Pill,
  Zap,
  MapPin,
  CalendarDays,
  StickyNote,
  Sparkles,
} from "lucide-react";

// ─── Helpers ───────────────────────────────────────────────────────────────

const formatLabel = (str) =>
  str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Sub-components ────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    APPROVED: {
      icon: <CheckCircle size={14} />,
      label: "Approved",
      cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    PENDING: {
      icon: <Clock size={14} />,
      label: "Pending",
      cls: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    },
    REJECTED: {
      icon: <XCircle size={14} />,
      label: "Rejected",
      cls: "bg-red-50 text-red-700 border border-red-200",
    },
  };
  const cfg = map[status] || {
    icon: null,
    label: status,
    cls: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
};

const TagList = ({ items = [] }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {items.map((item) => (
      <span
        key={item}
        className="bg-[#52B2AD]/10 text-[#387d79] text-xs font-medium px-3 py-1 rounded-full border border-[#52B2AD]/20"
      >
        {formatLabel(item)}
      </span>
    ))}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
    <span className="text-xs text-gray-400 font-medium w-40 flex-shrink-0">
      {label}
    </span>
    <span className="text-sm text-gray-700 text-right font-medium">
      {value ?? "—"}
    </span>
  </div>
);

const Section = ({ icon, title, children }) => (
  <div className="bg-gray-50 rounded-2xl p-4 space-y-1">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[#52B2AD]">{icon}</span>
      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
        {title}
      </h4>
    </div>
    {children}
  </div>
);

// ─── Main Modal ────────────────────────────────────────────────────────────

const PetKycModal = ({ kycData, petName, onClose }) => {
  if (!kycData) return null;

  const { kycStatus, fullRecord } = kycData;
  const r = fullRecord;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal Panel */}
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-[#52B2AD] to-[#387d79] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
              Pet KYC Record
            </p>
            <h2 className="text-white text-xl font-bold">
              {petName || "Pet"}'s KYC
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* <StatusBadge status={kycStatus} /> */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Meta */}

          {/* Grooming Preferences */}
          <Section icon={<Scissors size={16} />} title="Grooming Preferences">
            <InfoRow label="Frequency" value={r.groomingFrequency} />
            <InfoRow
              label="Last Groomed"
              value={formatDate(r.lastGroomingDate)}
            />
            <InfoRow label="Preferred Style" value={r.preferredStyle} />
            <InfoRow label="Avoid Focus Areas" value={r.avoidFocusAreas} />
            <InfoRow label="Location" value={r.groomingLocation} />
          </Section>

          {/* Services Requested */}
          {r.services?.length > 0 && (
            <Section icon={<Sparkles size={16} />} title="Services Requested">
              <TagList items={r.services} />
              {r.otherService && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  Other: {r.otherService}
                </p>
              )}
            </Section>
          )}

          {/* Add-Ons */}
          {r.addOns?.length > 0 && (
            <Section icon={<Zap size={16} />} title="Add-Ons">
              <TagList items={r.addOns} />
            </Section>
          )}

          {/* Health */}
          <Section icon={<Heart size={16} />} title="Health Conditions">
            {r.healthConditions?.length > 0 ? (
              <TagList items={r.healthConditions} />
            ) : (
              <p className="text-sm text-gray-400">None reported</p>
            )}
            {r.otherHealthCondition && (
              <p className="text-xs text-gray-500 mt-2 italic">
                Other: {r.otherHealthCondition}
              </p>
            )}
            <div className="mt-3 space-y-1">
              <InfoRow
                label="On Medication"
                value={r.onMedication ? "Yes" : "No"}
              />
              {r.medicationDetails && (
                <InfoRow
                  label="Medication Details"
                  value={r.medicationDetails}
                />
              )}
              <InfoRow
                label="Injuries / Surgery"
                value={r.hadInjuriesSurgery ? "Yes" : "No"}
              />
              {r.injurySurgeryDetails && (
                <InfoRow
                  label="Injury Details"
                  value={r.injurySurgeryDetails}
                />
              )}
            </div>
          </Section>

          {/* Behavior */}
          <Section icon={<AlertTriangle size={16} />} title="Behavior">
            {r.behaviorIssues?.length > 0 && (
              <TagList items={r.behaviorIssues} />
            )}
            <div className="mt-3 space-y-1">
              <InfoRow label="Calming Methods" value={r.calmingMethods} />
              <InfoRow label="Triggers" value={r.triggers} />
            </div>
          </Section>

          {/* Appointment Preference */}
          <Section icon={<MapPin size={16} />} title="Appointment Preference">
            <InfoRow
              label="Preferred Date"
              value={formatDate(r.appointmentDate)}
            />
            <InfoRow
              label="Preferred Time"
              value={r.appointmentTime?.slice(0, 5)}
            />
          </Section>

          {/* Notes */}
          {r.additionalNotes && (
            <Section icon={<StickyNote size={16} />} title="Additional Notes">
              <p className="text-sm text-gray-600 leading-relaxed">
                {r.additionalNotes}
              </p>
            </Section>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-[#52B2AD] hover:bg-[#387d79] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetKycModal;
