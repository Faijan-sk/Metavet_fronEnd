import React from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  PawPrint,
  Zap,
  MapPin,
  CalendarDays,
  StickyNote,
  Heart,
  AlertTriangle,
  User,
  Phone,
  Activity,
  Navigation,
  ShieldCheck,
} from "lucide-react";

// ─── Helpers ───────────────────────────────────────────────────────────────

const formatLabel = (str) =>
  (str || "")
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

// comma-separated string → tag list
const splitTags = (str) =>
  str
    ? str
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

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

const TagList = ({ items = [] }) =>
  items.length === 0 ? null : (
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
    <span className="text-xs text-gray-400 font-medium w-44 flex-shrink-0">
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

const WalkerKycModal = ({ kycData, petName, onClose }) => {
  if (!kycData) return null;

  const { status, fullRecord: r } = kycData;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-[#52B2AD] to-[#387d79] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
              Walker KYC Record
            </p>
            <h2 className="text-white text-xl font-bold">
              {petName || r?.petNames || "Pet"}'s KYC
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* <StatusBadge status={status} /> */}
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
          {/* Record Info */}
          {/* <Section icon={<CalendarDays size={16} />} title="Record Info">
            <InfoRow label="KYC UID" value={r.kycUid?.slice(0, 18) + "…"} />
            <InfoRow label="Created At" value={formatDateTime(r.createdAt)} />
            <InfoRow label="Updated At" value={formatDateTime(r.updatedAt)} />
          </Section> */}

          {/* Pet Info */}
          <Section icon={<PawPrint size={16} />} title="Pet Details">
            <InfoRow label="Name" value={r.petNames} />
            <InfoRow label="Species" value={r.petSpecies} />
            <InfoRow label="Breed Type" value={r.breedType} />
            <InfoRow
              label="Age"
              value={r.age !== null ? `${r.age} yrs` : null}
            />
          </Section>

          {/* Walk Preferences */}
          <Section icon={<Navigation size={16} />} title="Walk Preferences">
            <InfoRow label="Energy Level" value={formatLabel(r.energyLevel)} />
            <InfoRow
              label="Walking Experience"
              value={formatLabel(r.walkingExperience)}
            />
            <InfoRow
              label="Preferred Walk Type"
              value={formatLabel(r.preferredWalkType)}
            />
            <InfoRow
              label="Walk Duration"
              value={
                r.customWalkDuration
                  ? `${r.customWalkDuration} min`
                  : r.preferredWalkDuration
                    ? `${r.preferredWalkDuration} min`
                    : null
              }
            />
            <InfoRow
              label="Frequency"
              value={r.frequencyOther || r.frequency}
            />
            <InfoRow label="Preferred Time" value={r.preferredTimeOfDay} />
            <InfoRow
              label="Preferred Start Date"
              value={formatDate(r.preferredStartDate)}
            />
          </Section>

          {/* Leash & Behavior */}
          <Section icon={<AlertTriangle size={16} />} title="Leash & Behavior">
            {splitTags(r.leashBehavior).length > 0 && (
              <>
                <p className="text-xs text-gray-400 mb-1">Leash Behavior</p>
                <TagList items={splitTags(r.leashBehavior)} />
              </>
            )}
            {r.leashBehaviorOther && (
              <p className="text-xs text-gray-500 mt-1 italic">
                Other: {r.leashBehaviorOther}
              </p>
            )}
            <div className="mt-3 space-y-1">
              <InfoRow label="Known Triggers" value={r.knownTriggers} />
              <InfoRow
                label="Social Compatibility"
                value={r.socialCompatibility}
              />
              <InfoRow label="Handling Notes" value={r.handlingNotes} />
              {r.handlingNotesOther && (
                <InfoRow
                  label="Handling (Other)"
                  value={r.handlingNotesOther}
                />
              )}
              <InfoRow label="Comforting Methods" value={r.comfortingMethods} />
            </div>
          </Section>

          {/* Health */}
          <Section icon={<Heart size={16} />} title="Health & Medical">
            <InfoRow
              label="Medical Conditions"
              value={r.medicalConditions ? "Yes" : "No"}
            />
            {r.medicalConditionsDetails && (
              <InfoRow
                label="Condition Details"
                value={r.medicalConditionsDetails}
              />
            )}
            <InfoRow
              label="On Medication"
              value={r.medications ? "Yes" : "No"}
            />
            {r.medicationsDetails && (
              <InfoRow
                label="Medication Details"
                value={r.medicationsDetails}
              />
            )}
            <InfoRow label="Emergency Vet Info" value={r.emergencyVetInfo} />
          </Section>

          {/* Location & Access */}
          <Section icon={<MapPin size={16} />} title="Location & Access">
            <InfoRow label="Starting Location" value={r.startingLocation} />
            <InfoRow
              label="Address / Meeting Point"
              value={r.addressMeetingPoint}
            />
            <InfoRow label="Access Instructions" value={r.accessInstructions} />
          </Section>

          {/* Post-Walk & Services */}
          <Section
            icon={<Zap size={16} />}
            title="Post-Walk & Additional Services"
          >
            {splitTags(r.postWalkPreferences).length > 0 && (
              <>
                <p className="text-xs text-gray-400 mb-1">
                  Post-Walk Preferences
                </p>
                <TagList items={splitTags(r.postWalkPreferences)} />
              </>
            )}
            {splitTags(r.additionalServices).length > 0 && (
              <>
                <p className="text-xs text-gray-400 mt-3 mb-1">
                  Additional Services
                </p>
                <TagList items={splitTags(r.additionalServices)} />
              </>
            )}
            {r.additionalServicesOther && (
              <p className="text-xs text-gray-500 mt-1 italic">
                Other: {r.additionalServicesOther}
              </p>
            )}
          </Section>

          {/* Emergency Contact */}
          <Section icon={<Phone size={16} />} title="Emergency Contact">
            <InfoRow label="Backup Contact" value={r.backupContact} />
          </Section>

          {/* Consent & Signature */}
          <Section icon={<ShieldCheck size={16} />} title="Consent & Signature">
            <InfoRow label="Consent Given" value={r.consent ? "Yes ✓" : "No"} />
            <InfoRow label="Signature" value={r.signature} />
            <InfoRow
              label="Signature Date"
              value={formatDate(r.signatureDate)}
            />
          </Section>
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

export default WalkerKycModal;
