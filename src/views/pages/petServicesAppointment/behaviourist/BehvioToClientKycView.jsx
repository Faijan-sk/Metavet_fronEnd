import React from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  PawPrint,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Brain,
  Home,
  Target,
  Wrench,
  MessageSquare,
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
      icon: <CheckCircle size={13} />,
      label: "Approved",
      cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    PENDING: {
      icon: <Clock size={13} />,
      label: "Pending Review",
      cls: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    },
    REJECTED: {
      icon: <XCircle size={13} />,
      label: "Rejected",
      cls: "bg-red-50 text-red-700 border border-red-200",
    },
  };
  const cfg = map[status?.toUpperCase()] || {
    icon: null,
    label: status || "Unknown",
    cls: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.cls}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
};

const TagList = ({ items = [] }) =>
  items.length === 0 ? (
    <span className="text-xs text-gray-400">—</span>
  ) : (
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
  <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0 gap-4">
    <span className="text-xs text-gray-400 font-medium flex-shrink-0 w-40">
      {label}
    </span>
    <span className="text-sm text-gray-700 text-right font-medium">
      {value !== null && value !== undefined && value !== ""
        ? String(value)
        : "—"}
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

const BehaviouristKycModal = ({ kycData, petName, onClose }) => {
  if (!kycData) return null;

  const { kycStatus, fullRecord: r } = kycData;

  if (!r) return null;

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
              Behaviourist KYC Record
            </p>
            <h2 className="text-white text-xl font-bold">
              {petName || "Pet"}'s Behaviour Profile
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
          {/* Record Meta */}
          {/* <Section icon={<ShieldCheck size={16} />} title="Record Info">
            <InfoRow
              label="KYC UID"
              value={r.kycUid ? r.kycUid.slice(0, 18) + "…" : "—"}
            />
            <InfoRow label="Created At" value={formatDateTime(r.createdAt)} />
            <InfoRow label="Updated At" value={formatDateTime(r.updatedAt)} />
            <InfoRow
              label="Consent Given"
              value={r.consentAccuracy ? "Yes ✓" : "No"}
            />
          </Section> */}

          {/* Behavioral Challenges */}
          <Section icon={<Brain size={16} />} title="Behavioral Challenges">
            {splitTags(r.behavioralChallenges).length > 0 ? (
              <>
                <p className="text-xs text-gray-400 mb-2">
                  Reported Challenges
                </p>
                <TagList items={splitTags(r.behavioralChallenges)} />
              </>
            ) : (
              <InfoRow label="Challenges" value="None reported" />
            )}
            {r.otherBehaviorDescription && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Other Description</p>
                <p className="text-sm text-gray-700">
                  {r.otherBehaviorDescription}
                </p>
              </div>
            )}
            {r.aggressionBiteDescription && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">
                  Aggression / Bite History
                </p>
                <p className="text-sm text-gray-700">
                  {r.aggressionBiteDescription}
                </p>
              </div>
            )}
          </Section>

          {/* Behavior Timeline */}
          <Section icon={<Activity size={16} />} title="Behavior History">
            <InfoRow label="When Did It Start" value={r.behaviorStartTime} />
            <InfoRow label="How Often" value={r.behaviorFrequency} />
            <InfoRow label="Progress" value={r.behaviorProgress} />
            {r.behaviorProgressContext && (
              <div className="pt-2 border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-1">Context</p>
                <p className="text-sm text-gray-700">
                  {r.behaviorProgressContext}
                </p>
              </div>
            )}
            <InfoRow label="Known Triggers" value={r.knownTriggers} />
            {r.specificSituationsDescription && (
              <InfoRow
                label="Specific Situations"
                value={r.specificSituationsDescription}
              />
            )}
          </Section>

          {/* Aggression Details */}
          {(r.aggressiveBehaviors || r.seriousIncidents) && (
            <Section
              icon={<AlertTriangle size={16} />}
              title="Aggression Details"
            >
              <InfoRow
                label="Aggressive Behaviors"
                value={r.aggressiveBehaviors}
              />
              <InfoRow label="Serious Incidents" value={r.seriousIncidents} />
            </Section>
          )}

          {/* Training */}
          <Section icon={<Target size={16} />} title="Training Background">
            <InfoRow
              label="Worked With Trainer"
              value={r.workedWithTrainer ? "Yes" : "No"}
            />
            {r.trainerApproaches && (
              <InfoRow label="Trainer Approaches" value={r.trainerApproaches} />
            )}
            {splitTags(r.currentTrainingTools).length > 0 && (
              <>
                <p className="text-xs text-gray-400 mt-3 mb-1">
                  Current Training Tools
                </p>
                <TagList items={splitTags(r.currentTrainingTools)} />
              </>
            )}
            {r.otherTrainingTool && (
              <p className="text-xs text-gray-500 mt-1 italic">
                Other: {r.otherTrainingTool}
              </p>
            )}
            <InfoRow label="Pet Motivation" value={r.petMotivation} />
            {r.favoriteRewards && (
              <InfoRow label="Favorite Rewards" value={r.favoriteRewards} />
            )}
          </Section>

          {/* Daily Routine */}
          <Section icon={<Wrench size={16} />} title="Daily Routine">
            <InfoRow label="Walks Per Day" value={r.walksPerDay} />
            <InfoRow label="Off-Leash Time (hrs)" value={r.offLeashTime} />
            <InfoRow label="Time Alone (hrs)" value={r.timeAlone} />
            <InfoRow
              label="Exercise / Stimulation (hrs)"
              value={r.exerciseStimulation}
            />
          </Section>

          {/* Home Environment */}
          <Section icon={<Home size={16} />} title="Home Environment">
            <InfoRow label="Environment Type" value={r.homeEnvironment} />
            {r.homeEnvironmentOther && (
              <InfoRow label="Other Details" value={r.homeEnvironmentOther} />
            )}
            <InfoRow label="Other Pets" value={r.otherPets ? "Yes" : "No"} />
            {r.otherPetsDetails && (
              <InfoRow label="Other Pets Details" value={r.otherPetsDetails} />
            )}
            <InfoRow
              label="Children in Home"
              value={r.childrenInHome ? "Yes" : "No"}
            />
            {r.childrenAges && (
              <InfoRow label="Children Ages" value={r.childrenAges} />
            )}
            {r.petResponseWithChildren && (
              <InfoRow
                label="Pet Response (Children)"
                value={r.petResponseWithChildren}
              />
            )}
          </Section>

          {/* Goals & Session Preferences */}
          <Section
            icon={<MessageSquare size={16} />}
            title="Goals & Preferences"
          >
            <InfoRow label="Success Outcome" value={r.successOutcome} />
            <InfoRow label="Open to Adjustments" value={r.openToAdjustments} />
            <InfoRow
              label="Preferred Session Type"
              value={formatLabel(r.preferredSessionType)}
            />
            {r.additionalNotes && (
              <div className="pt-2 border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-1">Additional Notes</p>
                <p className="text-sm text-gray-700">{r.additionalNotes}</p>
              </div>
            )}
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

export default BehaviouristKycModal;
