import React, { useEffect, useState } from "react";
import useJwt from "./../../../../enpoints/jwt/useJwt";
import { useWalkerAppointment } from "./../../../../context/WalkerAppointmentContext";

const initialFormData = {
  petUid: "",
  petNames: "",
  breedType: "",
  age: "",
  petSpecies: "",
  energyLevel: "",
  walkingExperience: "",
  preferredWalkType: "",
  preferredWalkDuration: "",
  customWalkDuration: "",
  frequency: "",
  frequencyOther: "",
  preferredTimeOfDay: "",
  preferredStartDate: "",
  leashBehavior: [],
  leashBehaviorOther: "",
  knownTriggers: "",
  socialCompatibility: "",
  handlingNotes: [],
  handlingNotesOther: "",
  comfortingMethods: "",
  medicalConditions: null,
  medicalConditionsDetails: "",
  medications: null,
  medicationsDetails: "",
  emergencyVetInfo: "",
  startingLocation: "",
  addressMeetingPoint: "",
  accessInstructions: "",
  backupContact: "",
  postWalkPreferences: [],
  additionalServices: [],
  additionalServicesOther: "",
  consent: false,
  signature: "",
  signatureDate: "",
};

const parseArrayField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

// ─── Backend se aaya enum value directly use karo (already uppercase) ────────
const mapKycToFormData = (fullRecord) => {
  if (!fullRecord) return null;
  return {
    petUid: fullRecord.petUid ?? "",
    petNames: fullRecord.petNames ?? "",
    breedType: fullRecord.breedType ?? "",
    age:
      fullRecord.age !== null && fullRecord.age !== undefined
        ? String(fullRecord.age)
        : "",
    petSpecies: fullRecord.petSpecies ?? "",
    // ✅ Backend enum values as-is: LOW, MEDIUM, HIGH
    energyLevel: fullRecord.energyLevel ?? "",
    // ✅ Backend enum values as-is: BEGINNER, INTERMEDIATE, WELL_TRAINED, REACTIVE
    walkingExperience: fullRecord.walkingExperience ?? "",
    // ✅ Backend enum values as-is: SOLO, GROUP, EITHER
    preferredWalkType: fullRecord.preferredWalkType ?? "",
    preferredWalkDuration: fullRecord.preferredWalkDuration ?? "",
    customWalkDuration:
      fullRecord.customWalkDuration !== null &&
      fullRecord.customWalkDuration !== undefined
        ? String(fullRecord.customWalkDuration)
        : "",
    frequency: fullRecord.frequency ?? "",
    frequencyOther: fullRecord.frequencyOther ?? "",
    preferredTimeOfDay: fullRecord.preferredTimeOfDay ?? "",
    preferredStartDate: fullRecord.preferredStartDate ?? "",
    leashBehavior: parseArrayField(fullRecord.leashBehavior),
    leashBehaviorOther: fullRecord.leashBehaviorOther ?? "",
    knownTriggers: fullRecord.knownTriggers ?? "",
    socialCompatibility: fullRecord.socialCompatibility ?? "",
    handlingNotes: parseArrayField(fullRecord.handlingNotes),
    handlingNotesOther: fullRecord.handlingNotesOther ?? "",
    comfortingMethods: fullRecord.comfortingMethods ?? "",
    medicalConditions:
      fullRecord.medicalConditions !== null &&
      fullRecord.medicalConditions !== undefined
        ? Boolean(fullRecord.medicalConditions)
        : null,
    medicalConditionsDetails: fullRecord.medicalConditionsDetails ?? "",
    medications:
      fullRecord.medications !== null && fullRecord.medications !== undefined
        ? Boolean(fullRecord.medications)
        : null,
    medicationsDetails: fullRecord.medicationsDetails ?? "",
    emergencyVetInfo: fullRecord.emergencyVetInfo ?? "",
    startingLocation: fullRecord.startingLocation ?? "",
    addressMeetingPoint: fullRecord.addressMeetingPoint ?? "",
    accessInstructions: fullRecord.accessInstructions ?? "",
    backupContact: fullRecord.backupContact ?? "",
    postWalkPreferences: parseArrayField(fullRecord.postWalkPreferences),
    additionalServices: parseArrayField(fullRecord.additionalServices),
    additionalServicesOther: fullRecord.additionalServicesOther ?? "",
    consent: Boolean(fullRecord.consent),
    signature: fullRecord.signature ?? "",
    signatureDate: fullRecord.signatureDate ?? "",
  };
};

const PetWalkerKYC = ({ petUid, onKycSuccess }) => {
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [petsError, setPetsError] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState("");

  const [kycUid, setKycUid] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);
  const [petManuallyChanged, setPetManuallyChanged] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const { setKycId, bookingData } = useWalkerAppointment();

  useEffect(() => {
    async function fetchPetsByOwner() {
      try {
        setLoadingPets(true);
        setPetsError(null);
        const response = await useJwt.getAllPetsByOwner();
        const items = response?.data?.data ?? response?.data ?? response ?? [];
        const arr = Array.isArray(items)
          ? items
          : Array.isArray(items.data)
            ? items.data
            : [];
        setPets(arr);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
        setPetsError(err?.message ?? "Failed to load pets");
        setPets([]);
      } finally {
        setLoadingPets(false);
      }
    }
    fetchPetsByOwner();
  }, []);

  useEffect(() => {
    if (!petUid || petManuallyChanged) return;
    const uid = typeof petUid === "object" ? petUid.uid : petUid;
    setSelectedPetId(uid);
    fetchKycForPet(uid);
  }, [petUid]);

  useEffect(() => {
    if (!petUid || pets.length === 0) return;
    const uid = typeof petUid === "object" ? petUid.uid : petUid;
    populatePetFields(uid);
  }, [pets, petUid]);

  const fetchKycForPet = async (uid) => {
    if (!uid) return;
    setKycLoading(true);
    try {
      const response = await useJwt.getWalkerToClientKycByPet(uid);
      if (response.data?.success && response.data?.data) {
        const data = response.data.data;
        setKycUid(data.kycUid ?? null);
        setKycId(data.kycUid ?? null);
        setIsUpdateMode(true);
        if (data.fullRecord) {
          const mapped = mapKycToFormData(data.fullRecord);
          if (mapped) setFormData(mapped);
        }
      } else {
        setIsUpdateMode(false);
        setKycUid(null);
        setFormData((prev) => ({ ...initialFormData, petUid: uid }));
      }
    } catch (err) {
      const errorCode = err.response?.data?.errorCode;
      if (err.response?.status === 404 || errorCode === "KYC_NOT_FOUND") {
        setIsUpdateMode(false);
        setKycUid(null);
        setFormData((prev) => ({ ...initialFormData, petUid: uid }));
      } else {
        console.error("KYC fetch error:", err);
        setIsUpdateMode(false);
        setKycUid(null);
      }
    } finally {
      setKycLoading(false);
    }
  };

  const populatePetFields = (identifier) => {
    const pet = pets.find(
      (p) =>
        (p.uid && String(p.uid) === String(identifier)) ||
        (p.id && String(p.id) === String(identifier)),
    );
    if (!pet) return;
    setFormData((prev) => ({
      ...prev,
      petNames: pet.petName ?? prev.petNames ?? "",
      breedType: pet.petBreed ?? prev.breedType ?? "",
      age:
        pet.petAge !== undefined && pet.petAge !== null
          ? String(pet.petAge)
          : (prev.age ?? ""),
      petSpecies: pet.petSpecies ?? prev.petSpecies ?? "",
      petUid: pet.uid ?? String(pet.id ?? identifier),
    }));
  };

  const handlePetSelect = (petIdentifier) => {
    setPetManuallyChanged(true);
    setSelectedPetId(petIdentifier);
    if (!petIdentifier) {
      setFormData({ ...initialFormData });
      setIsUpdateMode(false);
      setKycUid(null);
      return;
    }
    populatePetFields(petIdentifier);
    fetchKycForPet(petIdentifier);
  };

  const setIfValid = (field, value, regex) => {
    if (value === "" || regex.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleCheckboxArray = (field, value) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[field]) ? prev[field] : [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((i) => i !== value)
          : [...current, value],
      };
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayloadForBackend = (raw) => {
    const ageNum = raw.age === "" || raw.age === null ? null : Number(raw.age);
    const customDurNum =
      raw.customWalkDuration === "" || raw.customWalkDuration === null
        ? null
        : Number(raw.customWalkDuration);
    return {
      petUid: raw.petUid || null,
      petNames: raw.petNames || null,
      breedType: raw.breedType || null,
      age: ageNum,
      petSpecies: raw.petSpecies || null,
      energyLevel: raw.energyLevel || null,
      walkingExperience: raw.walkingExperience || null,
      preferredWalkType: raw.preferredWalkType || null,
      preferredWalkDuration: raw.preferredWalkDuration || null,
      customWalkDuration: customDurNum,
      frequency: raw.frequency || null,
      frequencyOther: raw.frequencyOther || null,
      preferredTimeOfDay: raw.preferredTimeOfDay || null,
      preferredStartDate: raw.preferredStartDate || null,
      leashBehavior: raw.leashBehavior || [],
      leashBehaviorOther: raw.leashBehaviorOther || null,
      knownTriggers: raw.knownTriggers || null,
      socialCompatibility: raw.socialCompatibility || null,
      handlingNotes: raw.handlingNotes || [],
      handlingNotesOther: raw.handlingNotesOther || null,
      comfortingMethods: raw.comfortingMethods || null,
      medicalConditions:
        raw.medicalConditions === null ? null : !!raw.medicalConditions,
      medicalConditionsDetails: raw.medicalConditionsDetails || null,
      medications: raw.medications === null ? null : !!raw.medications,
      medicationsDetails: raw.medicationsDetails || null,
      emergencyVetInfo: raw.emergencyVetInfo || null,
      startingLocation: raw.startingLocation || null,
      addressMeetingPoint: raw.addressMeetingPoint || null,
      accessInstructions: raw.accessInstructions || null,
      backupContact: raw.backupContact || null,
      postWalkPreferences: raw.postWalkPreferences || [],
      additionalServices: raw.additionalServices || [],
      additionalServicesOther: raw.additionalServicesOther || null,
      consent: !!raw.consent,
      signature: raw.signature || null,
      signatureDate: raw.signatureDate || null,
    };
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.petUid) errors.push("Please select your pet.");
    if (!formData.consent) errors.push("Consent is required to proceed.");
    if (!formData.signature || formData.signature.trim() === "")
      errors.push("Signature is required.");
    if (!formData.signatureDate) errors.push("Signature date is required.");
    if (formData.preferredWalkDuration === "Custom") {
      if (
        !formData.customWalkDuration ||
        Number(formData.customWalkDuration) <= 0
      )
        errors.push("Custom walk duration must be greater than 0.");
    }
    if (formData.frequency === "Other") {
      if (!formData.frequencyOther || formData.frequencyOther.trim() === "")
        errors.push("Please specify the frequency when 'Other' is selected.");
    }
    if (formData.leashBehavior.includes("Other")) {
      if (
        !formData.leashBehaviorOther ||
        formData.leashBehaviorOther.trim() === ""
      )
        errors.push(
          "Please specify leash behavior details when 'Other' is selected.",
        );
    }
    if (formData.handlingNotes.includes("Other")) {
      if (
        !formData.handlingNotesOther ||
        formData.handlingNotesOther.trim() === ""
      )
        errors.push("Please specify handling notes when 'Other' is selected.");
    }
    if (formData.medicalConditions === true) {
      if (
        !formData.medicalConditionsDetails ||
        formData.medicalConditionsDetails.trim() === ""
      )
        errors.push("Please provide medical condition details.");
    }
    if (formData.medications === true) {
      if (
        !formData.medicationsDetails ||
        formData.medicationsDetails.trim() === ""
      )
        errors.push("Please provide medication details.");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);
    const errors = validateForm();
    if (errors.length > 0) {
      setApiError(errors.join(" "));
      return;
    }
    const payload = buildPayloadForBackend(formData);
    setSubmitting(true);
    try {
      const res = await useJwt.walkerToClientKyc(payload);
      const data = res?.data ?? res;
      const kycIdFromRes = data?.data?.kycUid || data?.kycUid;
      if (kycIdFromRes) setKycId(kycIdFromRes);
      if (data && data.success === false) {
        setApiError(data.details || data.message || "Submission failed.");
        return;
      }
      setSuccessMessage("Walker KYC submitted successfully.");
      setTimeout(() => {
        onKycSuccess && onKycSuccess();
      }, 800);
    } catch (err) {
      const backend = err?.response?.data;
      let message = err?.message ?? "Unknown error.";
      if (backend) message = backend.details || backend.message || message;
      setApiError(`Submission failed: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("🔥 CONTEXT UPDATED:", bookingData);
  }, [bookingData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);
    const errors = validateForm();
    if (errors.length > 0) {
      setApiError(errors.join(" "));
      return;
    }
    if (!kycUid) {
      setApiError("KYC UID is missing. Cannot update.");
      return;
    }
    const payload = buildPayloadForBackend(formData);
    setSubmitting(true);
    try {
      const res = await useJwt.updateWalkerToClientKyc(kycUid, payload);
      const data = res?.data ?? res;
      if (data && data.success === false) {
        setApiError(data.details || data.message || "Update failed.");
        return;
      }
      const kycIdFromRes = data?.data?.kycUid || data?.kycUid || kycUid;
      if (kycIdFromRes) setKycId(kycIdFromRes);
      setSuccessMessage("Walker KYC updated successfully.");
      setTimeout(() => {
        onKycSuccess && onKycSuccess();
      }, 800);
    } catch (err) {
      const backend = err?.response?.data;
      let message = err?.message ?? "Unknown error.";
      if (backend) message = backend.details || backend.message || message;
      setApiError(`Update failed: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (kycLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <svg
          className="animate-spin h-8 w-8 text-primary"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="ml-3 text-gray-500">Loading KYC data…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🚶‍♂️ Pet Walker → Client KYC Summary
        </h1>
        <p className="text-center text-gray-600 mb-1">
          Metavet Pet Walking Services
        </p>

        {successMessage && (
          <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">
            {successMessage}
          </div>
        )}
        {apiError && (
          <div className="mb-4 text-red-700 bg-red-50 p-3 rounded">
            {apiError}
          </div>
        )}

        <form
          onSubmit={isUpdateMode ? handleUpdate : handleSubmit}
          className="space-y-8"
        >
          {/* ── Pet & Routine Overview ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Pet & Routine Overview
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Your selected pet:
                </label>
                {loadingPets ? (
                  <div className="text-sm text-gray-500">Loading pets...</div>
                ) : petsError ? (
                  <div className="text-sm text-red-500">
                    Error loading pets: {petsError}
                  </div>
                ) : (
                  <select
                    value={selectedPetId}
                    onChange={(e) => handlePetSelect(e.target.value)}
                    disabled={!!petUid}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${petUid ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}`}
                  >
                    <option value="">— Select your pet —</option>
                    {pets.map((p) => (
                      <option key={p.uid ?? p.id} value={p.uid ?? p.id}>
                        {p.petName} {p.petSpecies ? `(${p.petSpecies})` : ""}{" "}
                        {p.petBreed ? `— ${p.petBreed}` : ""}
                      </option>
                    ))}
                    {isUpdateMode &&
                      selectedPetId &&
                      !pets.find(
                        (p) => String(p.uid ?? p.id) === String(selectedPetId),
                      ) && (
                        <option value={selectedPetId}>
                          {formData.petNames || selectedPetId}
                        </option>
                      )}
                  </select>
                )}
                {petUid && (
                  <p className="text-xs text-gray-400 mt-1">
                    Pet cannot be changed as it was selected from the previous
                    step.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* ✅ Energy Level — exact enum values: LOW, MEDIUM, HIGH */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Energy Level:
                  </label>
                  <select
                    value={formData.energyLevel}
                    onChange={(e) =>
                      handleInputChange("energyLevel", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* ✅ Walking Experience — exact enum values: BEGINNER, INTERMEDIATE, WELL_TRAINED, REACTIVE */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Walking Experience:
                  </label>
                  <select
                    value={formData.walkingExperience}
                    onChange={(e) =>
                      handleInputChange("walkingExperience", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>

                    <option value="Well Trained">Well-trained</option>
                    <option value="Reactive">Reactive</option>
                  </select>
                </div>

                {/* ✅ Preferred Walk Type — exact enum values: SOLO, GROUP, EITHER */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Preferred Walk Type:
                  </label>
                  <select
                    value={formData.preferredWalkType}
                    onChange={(e) =>
                      handleInputChange("preferredWalkType", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="Solo">Solo</option>
                    <option value="Group">Group</option>
                    <option value="Either">Either</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Preferred Walk Duration:
                  </label>
                  <div className="space-y-2">
                    {["15", "30", "60", "Custom"].map((d) => (
                      <label
                        key={d}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="preferredWalkDuration"
                          value={d}
                          checked={formData.preferredWalkDuration === d}
                          onChange={(e) =>
                            handleInputChange(
                              "preferredWalkDuration",
                              e.target.value,
                            )
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-gray-700">
                          {d === "Custom"
                            ? "Custom → Please specify"
                            : d + " minutes"}
                        </span>
                      </label>
                    ))}
                    {formData.preferredWalkDuration === "Custom" && (
                      <input
                        type="text"
                        value={formData.customWalkDuration}
                        onChange={(e) =>
                          setIfValid(
                            "customWalkDuration",
                            e.target.value,
                            /^[0-9]*$/u,
                          )
                        }
                        placeholder="e.g., 45"
                        inputMode="numeric"
                        className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Frequency:
                  </label>
                  <div className="space-y-2">
                    {["Daily", "Weekly", "As needed", "Other"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={opt}
                          checked={formData.frequency === opt}
                          onChange={(e) =>
                            handleInputChange("frequency", e.target.value)
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-gray-700">
                          {opt}
                          {opt === "Other" ? " → Please specify" : ""}
                        </span>
                      </label>
                    ))}
                    {formData.frequency === "Other" && (
                      <input
                        type="text"
                        value={formData.frequencyOther}
                        onChange={(e) =>
                          setIfValid(
                            "frequencyOther",
                            e.target.value,
                            /^[A-Za-z0-9 ,.'-]*$/u,
                          )
                        }
                        placeholder="Please specify frequency"
                        className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                </div>

                {/* ✅ Preferred Time of Day — string field, no enum, values same as before */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Preferred Time of Day:
                  </label>
                  <select
                    value={formData.preferredTimeOfDay}
                    onChange={(e) =>
                      handleInputChange("preferredTimeOfDay", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="Morning">Morning</option>
                    <option value="Midday">Midday</option>
                    <option value="Evening">Evening</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Preferred Start Date:
                </label>
                <input
                  type="date"
                  value={formData.preferredStartDate}
                  min={today}
                  onChange={(e) =>
                    handleInputChange("preferredStartDate", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* ── Behavior & Handling ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Behavior & Handling
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Leash Behavior:
                </label>
                <div className="space-y-2">
                  {[
                    "Pulls",
                    "Walks nicely",
                    "Lunges at other dogs",
                    "Reactive",
                    "Other",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.leashBehavior.includes(opt)}
                        onChange={() =>
                          handleCheckboxArray("leashBehavior", opt)
                        }
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                  {formData.leashBehavior.includes("Other") && (
                    <input
                      type="text"
                      value={formData.leashBehaviorOther}
                      onChange={(e) =>
                        setIfValid(
                          "leashBehaviorOther",
                          e.target.value,
                          /^[A-Za-z0-9 ,.'-]*$/u,
                        )
                      }
                      placeholder="Please specify..."
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Known Triggers:
                </label>
                <textarea
                  value={formData.knownTriggers}
                  onChange={(e) =>
                    setIfValid(
                      "knownTriggers",
                      e.target.value,
                      /^[A-Za-z0-9\s,.'"-]*$/u,
                    )
                  }
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., skateboards, kids yelling..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ✅ Social Compatibility — string field, values same as before */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Social Compatibility:
                  </label>
                  <select
                    value={formData.socialCompatibility}
                    onChange={(e) =>
                      handleInputChange("socialCompatibility", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Solo only">Solo only</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Handling Notes:
                  </label>
                  <div className="space-y-2">
                    {[
                      "Needs harness",
                      "Wears muzzle",
                      "Prefers calm approach",
                      "Avoids stairs",
                      "Other",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.handlingNotes.includes(opt)}
                          onChange={() =>
                            handleCheckboxArray("handlingNotes", opt)
                          }
                          className="w-4 h-4 text-primary rounded"
                        />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                    {formData.handlingNotes.includes("Other") && (
                      <input
                        type="text"
                        value={formData.handlingNotesOther}
                        onChange={(e) =>
                          setIfValid(
                            "handlingNotesOther",
                            e.target.value,
                            /^[A-Za-z0-9 ,.'-]*$/u,
                          )
                        }
                        placeholder="Please specify..."
                        className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Comforting Methods or Cues:
                </label>
                <textarea
                  value={formData.comfortingMethods}
                  onChange={(e) =>
                    setIfValid(
                      "comfortingMethods",
                      e.target.value,
                      /^[A-Za-z0-9\s,.'"-]*$/u,
                    )
                  }
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., treats, cue words, favorite toy..."
                />
              </div>
            </div>
          </section>

          {/* ── Health & Safety ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Health & Safety
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Medical Conditions:
                </label>
                <div className="space-y-2">
                  {[true, false].map((val) => (
                    <label
                      key={String(val)}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="medicalConditions"
                        checked={formData.medicalConditions === val}
                        onChange={() =>
                          handleInputChange("medicalConditions", val)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">
                        {val ? "Yes" : "No"}
                      </span>
                    </label>
                  ))}
                  {formData.medicalConditions === true && (
                    <textarea
                      value={formData.medicalConditionsDetails}
                      onChange={(e) =>
                        setIfValid(
                          "medicalConditionsDetails",
                          e.target.value,
                          /^[A-Za-z0-9\s,.'"-]*$/u,
                        )
                      }
                      rows="2"
                      placeholder="Please describe medical conditions..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Medications:
                </label>
                <div className="space-y-2">
                  {[true, false].map((val) => (
                    <label
                      key={String(val)}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="medications"
                        checked={formData.medications === val}
                        onChange={() => handleInputChange("medications", val)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">
                        {val ? "Yes" : "No"}
                      </span>
                    </label>
                  ))}
                  {formData.medications === true && (
                    <textarea
                      value={formData.medicationsDetails}
                      onChange={(e) => {
                        const allowed = e.target.value.replace(
                          /[^A-Za-z0-9\s.,]/g,
                          "",
                        );
                        setIfValid(
                          "medicationsDetails",
                          allowed,
                          /^[A-Za-z0-9\s.,]*$/,
                        );
                      }}
                      rows="2"
                      placeholder="Name, dosage, timing..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Emergency Pet Info:
                </label>
                <input
                  type="text"
                  value={formData.emergencyVetInfo}
                  onChange={(e) =>
                    setIfValid(
                      "emergencyVetInfo",
                      e.target.value,
                      /^[A-Za-z0-9\s,()+\-.#]*$/u,
                    )
                  }
                  placeholder="Vet name, phone, address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* ── Access & Logistics ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Access & Logistics
            </h2>
            <div className="space-y-4">
              {/* ✅ Starting Location — string field, values same */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Starting Location:
                </label>
                <select
                  value={formData.startingLocation}
                  onChange={(e) =>
                    handleInputChange("startingLocation", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="Home">Home</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Workplace">Workplace</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Address or Meeting Point:
                </label>
                <input
                  type="text"
                  value={formData.addressMeetingPoint}
                  onChange={(e) =>
                    setIfValid(
                      "addressMeetingPoint",
                      e.target.value,
                      /^[A-Za-z0-9\s,.'#\/ -]*$/u,
                    )
                  }
                  placeholder="Full address or meetup spot"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {(formData.startingLocation === "Home" ||
                formData.startingLocation === "Apartment") && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Access Instructions:
                  </label>
                  <textarea
                    value={formData.accessInstructions}
                    onChange={(e) =>
                      setIfValid(
                        "accessInstructions",
                        e.target.value,
                        /^[A-Za-z0-9\s,.'"#:\/ -]*$/u,
                      )
                    }
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., gate code, leave key with neighbor..."
                  />
                </div>
              )}

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Backup Contact (optional):
                </label>
                <input
                  type="text"
                  value={formData.backupContact}
                  onChange={(e) =>
                    setIfValid(
                      "backupContact",
                      e.target.value,
                      /^[0-9+\-\s]*$/u,
                    )
                  }
                  placeholder="Name & phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Post-Walk Preferences:
                </label>
                <div className="space-y-2">
                  {["Text update", "Photo update", "Walk summary in app"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.postWalkPreferences.includes(opt)}
                          onChange={() =>
                            handleCheckboxArray("postWalkPreferences", opt)
                          }
                          className="w-4 h-4 text-primary rounded"
                        />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Services & Add-ons ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Services & Add-ons
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Additional Services:
                </label>
                <div className="space-y-2">
                  {["Feeding", "Water", "Towel Dry", "Medication", "Other"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.additionalServices.includes(opt)}
                          onChange={() =>
                            handleCheckboxArray("additionalServices", opt)
                          }
                          className="w-4 h-4 text-primary rounded"
                        />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ),
                  )}
                  {formData.additionalServices.includes("Other") && (
                    <input
                      type="text"
                      value={formData.additionalServicesOther}
                      onChange={(e) =>
                        setIfValid(
                          "additionalServicesOther",
                          e.target.value,
                          /^[A-Za-z0-9 ,.'-]*$/u,
                        )
                      }
                      placeholder="Please describe..."
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Consent & Signature ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              ✅ Consent & Signature
            </h2>
            <div className="space-y-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    handleInputChange("consent", e.target.checked)
                  }
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">
                  I confirm that the information provided is accurate and
                  consent to share it with my assigned walker through the
                  Metavet platform.
                </span>
              </label>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Signature (type full name):
                </label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) =>
                    setIfValid("signature", e.target.value, /^[A-Za-z\s.'-]*$/u)
                  }
                  placeholder="Full name as signature"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  min={today}
                  onChange={(e) =>
                    handleInputChange("signatureDate", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          {successMessage && (
            <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">
              {successMessage}
            </div>
          )}
          {apiError && (
            <div className="mb-4 text-red-700 bg-red-50 p-3 rounded">
              {apiError}
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${submitting ? "opacity-60 cursor-not-allowed" : "bg-primary hover:opacity-90"} text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary`}
            >
              {submitting
                ? isUpdateMode
                  ? "Updating..."
                  : "Submitting..."
                : isUpdateMode
                  ? "Update Walker KYC"
                  : "Submit Walker KYC"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetWalkerKYC;
