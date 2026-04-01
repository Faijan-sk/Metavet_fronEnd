import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../../../enpoints/jwt/useJwt";

//============import context
import { useGroomerAppointment } from "./../../../../context/GroomerAppointmentContext";

const HEALTH_CONDITION_MAP = {
  "Skin issues": "SKIN_ISSUES",
  "Ear infections": "EAR_INFECTION",
  Arthritis: "ARTHRITIS",
  Allergies: "ALLERGIES",
  None: "NONE",
  Other: "OTHER",
};
const HEALTH_CONDITION_REVERSE_MAP = Object.fromEntries(
  Object.entries(HEALTH_CONDITION_MAP).map(([k, v]) => [v, k]),
);

const BEHAVIOR_ISSUE_MAP = {
  "Nervousness/anxiety": "NERVOUSNESS_ANXIETY",
  "Difficulty standing still": "DIFFICULTY_STANDING_STILL",
  "Fear of loud tools (clippers, dryers)": "FEAR_OF_LOUD_TOOLS",
  "Growling or snapping": "GROWLING_OR_SNAPPING",
  "None of the above": "NONE_OF_THE_ABOVE",
};
const BEHAVIOR_ISSUE_REVERSE_MAP = Object.fromEntries(
  Object.entries(BEHAVIOR_ISSUE_MAP).map(([k, v]) => [v, k]),
);

const SERVICE_MAP = {
  "Full groom (bath + cut)": "FULL_GROOM",
  "Bath + brush only": "BATH_BRUSH_ONLY",
  "Nail trim": "NAIL_TRIM",
  "Ear cleaning": "EAR_CLEANING",
  Deshedding: "DESHEDDING",
  "Specialty/creative cut": "SPECIALITY_CREATIVE_CUT",
  Other: "OTHER",
};
const SERVICE_REVERSE_MAP = Object.fromEntries(
  Object.entries(SERVICE_MAP).map(([k, v]) => [v, k]),
);

const ADDON_MAP = {
  "Scented finish": "SCENTED_FINISH",
  "De-matting": "DE_MATTING",
  "Seasonal accessories": "SEASONAL_ACCESSORIES",
};
const ADDON_REVERSE_MAP = Object.fromEntries(
  Object.entries(ADDON_MAP).map(([k, v]) => [v, k]),
);

const initialFormState = {
  groomingFrequency: "",
  lastGroomingDate: "",
  preferredStyle: "",
  avoidFocusAreas: "",
  healthConditions: [],
  otherHealthCondition: "",
  onMedication: null,
  medicationDetails: "",
  hadInjuriesSurgery: null,
  injurySurgeryDetails: "",
  behaviorIssues: [],
  calmingMethods: "",
  triggers: "",
  services: [],
  otherService: "",
  groomingLocation: "",
  appointmentDate: "",
  appointmentTime: "",
  additionalNotes: "",
  addOns: [],
};

const reverseMapArray = (enumArray = [], reverseMap) =>
  enumArray.map((e) => reverseMap[e]).filter(Boolean);

const buildFormFromRecord = (record) => ({
  groomingFrequency: record.groomingFrequency || "",
  lastGroomingDate: record.lastGroomingDate || "",
  preferredStyle: record.preferredStyle || "",
  avoidFocusAreas: record.avoidFocusAreas || "",
  healthConditions: reverseMapArray(
    record.healthConditions,
    HEALTH_CONDITION_REVERSE_MAP,
  ),
  otherHealthCondition: record.otherHealthCondition || "",
  onMedication: record.onMedication ?? null,
  medicationDetails: record.medicationDetails || "",
  hadInjuriesSurgery: record.hadInjuriesSurgery ?? null,
  injurySurgeryDetails: record.injurySurgeryDetails || "",
  behaviorIssues: reverseMapArray(
    record.behaviorIssues,
    BEHAVIOR_ISSUE_REVERSE_MAP,
  ),
  calmingMethods: record.calmingMethods || "",
  triggers: record.triggers || "",
  services: reverseMapArray(record.services, SERVICE_REVERSE_MAP),
  otherService: record.otherService || "",
  groomingLocation: record.groomingLocation || "",
  appointmentDate: record.appointmentDate || "",
  appointmentTime: record.appointmentTime
    ? record.appointmentTime.slice(0, 5)
    : "",
  additionalNotes: record.additionalNotes || "",
  addOns: reverseMapArray(record.addOns, ADDON_REVERSE_MAP),
});

// ─── Props:
//   petUid       → context se aaya hua selected pet ka uid (required)
//   onKycSuccess → KYC create/update hone ke baad call hoga (BookingPage me summary dikhane ke liye)
// ────────────────────────────────────────────────────────────────────────────
const GroomerToClientKyc = ({ petUid, onKycSuccess }) => {
  const navigate = useNavigate();

  // "loading" | "create" | "update" | "error"
  const [pageStatus, setPageStatus] = useState("loading");
  const [existingKycUid, setExistingKycUid] = useState(null);

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const { setKycId, bookingData } = useGroomerAppointment();
  useEffect(() => {
    console.log("Groomer context  ---- >", bookingData);
  }, [bookingData]);

  // ─── Auto-fetch KYC on mount using petUid prop ────────────────────────────
  useEffect(() => {
    // petUid prop nahi aaya → error
    if (!petUid) {
      setPageStatus("error");
      return;
    }

    const fetchKyc = async () => {
      setPageStatus("loading");
      try {
        const response = await useJwt.getGroomerKycByPetUid(petUid);
        const data = response?.data;

        if (data?.success && data?.data?.fullRecord) {
          // KYC mili → pre-fill form, update mode
          setExistingKycUid(data.data.kycUid);
          setKycId(data.data.kycUid);

          setFormData(buildFormFromRecord(data.data.fullRecord));
          setPageStatus("update");
        } else {
          // KYC nahi mili → create mode
          setPageStatus("create");
        }
      } catch (error) {
        const status = error?.response?.status;
        const errorCode = error?.response?.data?.errorCode;
        if (status === 404 || errorCode === "KYC_NOT_FOUND") {
          setPageStatus("create");
        } else {
          setPageStatus("error");
          setApiError(
            "Could not fetch KYC details. Please go back and try again.",
          );
        }
      }
    };

    fetchKyc();
  }, [petUid]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((i) => i !== value)
          : [...prev[field], value],
      };
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const mapEnumArray = (selected, map) =>
    (selected || []).map((label) => map[label]).filter(Boolean);

  const buildPayload = () => ({
    petUid: petUid,
    groomingFrequency: formData.groomingFrequency || null,
    lastGroomingDate: formData.lastGroomingDate || null,
    preferredStyle: formData.preferredStyle || null,
    avoidFocusAreas: formData.avoidFocusAreas || null,
    healthConditions: mapEnumArray(
      formData.healthConditions,
      HEALTH_CONDITION_MAP,
    ),
    otherHealthCondition: formData.otherHealthCondition || null,
    onMedication: formData.onMedication !== null ? formData.onMedication : null,
    medicationDetails: formData.medicationDetails || null,
    hadInjuriesSurgery:
      formData.hadInjuriesSurgery !== null ? formData.hadInjuriesSurgery : null,
    injurySurgeryDetails: formData.injurySurgeryDetails || null,
    behaviorIssues: mapEnumArray(formData.behaviorIssues, BEHAVIOR_ISSUE_MAP),
    calmingMethods: formData.calmingMethods || null,
    triggers: formData.triggers || null,
    services: mapEnumArray(formData.services, SERVICE_MAP),
    otherService: formData.otherService || null,
    groomingLocation: formData.groomingLocation || null,
    appointmentDate: formData.appointmentDate || null,
    appointmentTime: formData.appointmentTime || null,
    additionalNotes: formData.additionalNotes || null,
    addOns: mapEnumArray(formData.addOns, ADDON_MAP),
  });

  // ─── Validation ────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};
    if (!formData.groomingFrequency)
      newErrors.groomingFrequency = "Please select grooming frequency.";
    if (!formData.healthConditions || formData.healthConditions.length === 0)
      newErrors.healthConditions =
        "Please select at least one health condition (or None).";
    if (
      formData.healthConditions.includes("Other") &&
      !formData.otherHealthCondition.trim()
    )
      newErrors.otherHealthCondition = "Please specify other health condition.";
    if (formData.onMedication === null)
      newErrors.onMedication = "Please specify if your pet is on medication.";
    else if (
      formData.onMedication === true &&
      !formData.medicationDetails.trim()
    )
      newErrors.medicationDetails = "Please provide medication details.";
    if (formData.hadInjuriesSurgery === null)
      newErrors.hadInjuriesSurgery =
        "Please specify if your pet had injuries/surgeries.";
    else if (
      formData.hadInjuriesSurgery === true &&
      !formData.injurySurgeryDetails.trim()
    )
      newErrors.injurySurgeryDetails = "Please provide injury/surgery details.";
    if (!formData.behaviorIssues || formData.behaviorIssues.length === 0)
      newErrors.behaviorIssues =
        "Please select at least one behavior option (or None of the above).";
    if (!formData.services || formData.services.length === 0)
      newErrors.services = "Please select at least one service.";
    if (formData.services.includes("Other") && !formData.otherService.trim())
      newErrors.otherService = "Please specify other service.";
    if (!formData.groomingLocation)
      newErrors.groomingLocation =
        "Please choose grooming location preference.";
    if (!formData.appointmentDate)
      newErrors.appointmentDate = "Please choose an appointment date.";
    if (!formData.appointmentTime)
      newErrors.appointmentTime = "Please choose an appointment time.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess("");
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const payload = buildPayload();

      if (pageStatus === "update" && existingKycUid) {
        // KYC mili thi → UPDATE
        const response = await useJwt.updateGroomerToClientKyc(
          existingKycUid,
          payload,
        );
        setApiSuccess("KYC updated successfully!");

        setKycId(response?.data?.data?.kycUid);
      } else {
        // KYC nahi mili thi → CREATE
        const response = await useJwt.groomerToClientKyc(payload);
        setApiSuccess("KYC submitted successfully!");

        setKycId(response?.data?.data?.kycUid);
      }

      setErrors({});

      // Success ke baad → BookingPage ko batao ki KYC ho gayi (summary dikhao)
      setTimeout(() => {
        if (typeof onKycSuccess === "function") {
          onKycSuccess(); // parent BookingPage ka callback → view = "summary"
        } else {
          navigate("/service-provider/petGroomer"); // fallback agar standalone use ho
        }
      }, 800);
    } catch (error) {
      console.error("Submission error:", error);
      const apiRes = error?.response?.data;
      setApiError(
        apiRes?.message ||
          apiRes?.details ||
          error?.message ||
          "Error submitting the form.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Loading screen ────────────────────────────────────────────────────────
  if (pageStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
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
          <p className="text-sm">Fetching KYC details…</p>
        </div>
      </div>
    );
  }

  // ─── Error screen (petUid prop nahi aaya) ─────────────────────────────────
  if (pageStatus === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No Pet Selected
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please go back and select a pet first before accessing KYC.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // ─── Main Form ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🧼 Pet Groomer → Client KYC
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Metavet Pet Grooming Services
        </p>

        {pageStatus === "create" && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-sm flex items-center gap-2">
            <span className="text-base">📋</span>
            <span>
              <strong>No KYC found for this pet.</strong> Please fill the form
              below to create one.
            </span>
          </div>
        )}

        {apiSuccess && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-300 text-green-800 text-sm">
            {apiSuccess}
          </div>
        )}
        {apiError && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-sm whitespace-pre-wrap">
            {apiError}
          </div>
        )}

        {/* ── Selected Pet Display (locked — context se aaya, change nahi kar sakte) ── */}
        {/* <div className="mb-6 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm flex items-center gap-2">
          <span className="text-base">🐾</span>
          <span>
            <strong>Selected Pet:</strong> This KYC is being filled for the pet
            you selected during booking. To change the pet, please go back.
          </span>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ── Step 1: Grooming Preferences ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 1: Grooming Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. How often does your pet get groomed? *
                </label>
                <div className="space-y-2">
                  {[
                    "Every 4 weeks",
                    "Every 6–8 weeks",
                    "Occasionally / As needed",
                    "First-time groom",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="groomingFrequency"
                        value={option}
                        checked={formData.groomingFrequency === option}
                        onChange={(e) =>
                          handleInputChange("groomingFrequency", e.target.value)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.groomingFrequency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.groomingFrequency}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. When was their last grooming session?
                </label>
                <input
                  type="date"
                  value={formData.lastGroomingDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleInputChange("lastGroomingDate", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Preferred grooming style or outcome:
                </label>
                <input
                  type="text"
                  value={formData.preferredStyle}
                  onChange={(e) => {
                    if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                      handleInputChange("preferredStyle", e.target.value);
                  }}
                  placeholder="e.g., short trim, breed cut, deshedding, puppy cut"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. Are there any areas you'd like us to avoid or focus on?
                </label>
                <textarea
                  value={formData.avoidFocusAreas}
                  onChange={(e) => {
                    if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                      handleInputChange("avoidFocusAreas", e.target.value);
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Please describe any specific areas..."
                />
              </div>
            </div>
          </section>

          {/* ── Step 2: Health & Safety ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 2: Health & Safety
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  5. Does your pet have any health conditions we should know
                  about? *
                </label>
                <div className="space-y-2">
                  {[
                    "Skin issues",
                    "Ear infections",
                    "Arthritis",
                    "Allergies",
                    "None",
                    "Other",
                  ].map((condition) => (
                    <label
                      key={condition}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.healthConditions.includes(condition)}
                        onChange={() =>
                          handleCheckboxChange("healthConditions", condition)
                        }
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{condition}</span>
                    </label>
                  ))}
                  {formData.healthConditions.includes("Other") && (
                    <input
                      type="text"
                      value={formData.otherHealthCondition}
                      onChange={(e) =>
                        handleInputChange(
                          "otherHealthCondition",
                          e.target.value,
                        )
                      }
                      placeholder="Please specify..."
                      className={`ml-6 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.otherHealthCondition
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
                {errors.healthConditions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.healthConditions}
                  </p>
                )}
                {errors.otherHealthCondition && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otherHealthCondition}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  6. Is your pet currently on any medications or treatments? *
                </label>
                <div className="space-y-2">
                  {[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ].map(({ label, value }) => (
                    <label
                      key={label}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="onMedication"
                        checked={formData.onMedication === value}
                        onChange={() =>
                          handleInputChange("onMedication", value)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                  {formData.onMedication === true && (
                    <textarea
                      value={formData.medicationDetails}
                      onChange={(e) => {
                        if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                          handleInputChange(
                            "medicationDetails",
                            e.target.value,
                          );
                      }}
                      rows="2"
                      placeholder="Please describe the medications..."
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.medicationDetails
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
                {errors.onMedication && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.onMedication}
                  </p>
                )}
                {errors.medicationDetails && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.medicationDetails}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  7. Has your pet had any injuries or surgeries in the past
                  year? *
                </label>
                <div className="space-y-2">
                  {[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ].map(({ label, value }) => (
                    <label
                      key={label}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="hadInjuriesSurgery"
                        checked={formData.hadInjuriesSurgery === value}
                        onChange={() =>
                          handleInputChange("hadInjuriesSurgery", value)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                  {formData.hadInjuriesSurgery === true && (
                    <textarea
                      value={formData.injurySurgeryDetails}
                      onChange={(e) => {
                        if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                          handleInputChange(
                            "injurySurgeryDetails",
                            e.target.value,
                          );
                      }}
                      rows="2"
                      placeholder="Please describe the injuries or surgeries..."
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.injurySurgeryDetails
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
                {errors.hadInjuriesSurgery && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hadInjuriesSurgery}
                  </p>
                )}
                {errors.injurySurgeryDetails && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.injurySurgeryDetails}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ── Step 3: Behavior & Handling ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 3: Behavior & Handling
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  8. Has your pet shown any of the following during grooming? *
                </label>
                <div className="space-y-2">
                  {[
                    "Nervousness/anxiety",
                    "Difficulty standing still",
                    "Fear of loud tools (clippers, dryers)",
                    "Growling or snapping",
                    "None of the above",
                  ].map((behavior) => (
                    <label
                      key={behavior}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.behaviorIssues.includes(behavior)}
                        onChange={() =>
                          handleCheckboxChange("behaviorIssues", behavior)
                        }
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{behavior}</span>
                    </label>
                  ))}
                </div>
                {errors.behaviorIssues && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.behaviorIssues}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  9. What helps calm or comfort your pet?
                </label>
                <textarea
                  value={formData.calmingMethods}
                  onChange={(e) => {
                    if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                      handleInputChange("calmingMethods", e.target.value);
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., treats, soft voice, gentle petting..."
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  10. Does your pet have any triggers or dislikes we should know
                  about?
                </label>
                <textarea
                  value={formData.triggers}
                  onChange={(e) => {
                    if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                      handleInputChange("triggers", e.target.value);
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., nail trims, paws touched, loud noises..."
                />
              </div>
            </div>
          </section>

          {/* ── Step 4: Services & Scheduling ── */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 4: Services & Scheduling
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  11. What services are you looking for? *
                </label>
                <div className="space-y-2">
                  {[
                    "Full groom (bath + cut)",
                    "Bath + brush only",
                    "Nail trim",
                    "Ear cleaning",
                    "Deshedding",
                    "Specialty/creative cut",
                    "Other",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() =>
                          handleCheckboxChange("services", service)
                        }
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                  {formData.services.includes("Other") && (
                    <input
                      type="text"
                      value={formData.otherService}
                      onChange={(e) =>
                        handleInputChange("otherService", e.target.value)
                      }
                      placeholder="Please specify..."
                      className={`ml-6 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.otherService
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
                {errors.services && (
                  <p className="text-red-500 text-sm mt-1">{errors.services}</p>
                )}
                {errors.otherService && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otherService}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  12. Do you prefer: *
                </label>
                <div className="space-y-2">
                  {[
                    {
                      label: "Mobile / in-home grooming",
                      value: "Mobile/in-home grooming",
                    },
                    {
                      label: "I'll bring my pet to the groomer (salon)",
                      value: "Grooming salon",
                    },
                    { label: "Either is fine", value: "Either is Fine" },
                  ].map(({ label, value }) => (
                    <label
                      key={value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="groomingLocation"
                        value={value}
                        checked={formData.groomingLocation === value}
                        onChange={(e) =>
                          handleInputChange("groomingLocation", e.target.value)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.groomingLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.groomingLocation}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  13. Preferred appointment window: *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={formData.appointmentDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) =>
                        handleInputChange("appointmentDate", e.target.value)
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.appointmentDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.appointmentDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.appointmentDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) =>
                        handleInputChange("appointmentTime", e.target.value)
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.appointmentTime
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.appointmentTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.appointmentTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  14. Any other notes or requests?
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => {
                    if (/^[A-Za-z0-9 ]*$/.test(e.target.value))
                      handleInputChange("additionalNotes", e.target.value);
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  ✅ Optional Add-ons:
                </label>
                <div className="space-y-2">
                  {["Scented finish", "De-matting", "Seasonal accessories"].map(
                    (addon) => (
                      <label
                        key={addon}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.addOns.includes(addon)}
                          onChange={() => handleCheckboxChange("addOns", addon)}
                          className="w-4 h-4 text-primary rounded"
                        />
                        <span className="text-gray-700">{addon}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {apiSuccess && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-300 text-green-800 text-sm">
              {apiSuccess}
            </div>
          )}
          {apiError && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-sm whitespace-pre-wrap">
              {apiError}
            </div>
          )}

          {/* ── Submit ── */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${
                submitting
                  ? "opacity-70 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              } text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center gap-2`}
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  {pageStatus === "update" ? "Updating…" : "Submitting…"}
                </>
              ) : pageStatus === "update" ? (
                "✏️ Update KYC"
              ) : (
                "📋 Submit KYC Form"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroomerToClientKyc;
