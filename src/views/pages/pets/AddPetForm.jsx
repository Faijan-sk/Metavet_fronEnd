import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useJwt from "../../../enpoints/jwt/useJwt";

// ─── Helper: base64 string → data URI ────────────────────────────────────────
const base64ToDataUri = (base64) => {
  if (!base64) return null;
  let mime = "image/jpeg"; // default fallback
  if (base64.startsWith("UklG")) mime = "image/webp";
  else if (base64.startsWith("iVBO")) mime = "image/png";
  else if (base64.startsWith("/9j/")) mime = "image/jpeg";
  return `data:${mime};base64,${base64}`;
};
// ─────────────────────────────────────────────────────────────────────────────

const AddPetForm = ({ onClose, onSubmit, editPetData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      petName: "",
      petAge: "",
      petHeight: "",
      petWeight: "",
      petSpecies: "",
      petGender: "",
      petBreed: "",
      isVaccinated: false,
      isNeutered: false,
      medicalNotes: "",
    },
  });

  const [backendError, setBackendError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // ============ IMAGE STATE ============
  const [selectedImage, setSelectedImage] = useState(null); // actual File object
  const [imagePreview, setImagePreview] = useState(null); // new image preview URL
  const [existingImageUrl, setExistingImageUrl] = useState(null); // edit mode mein purani image (data URI)
  const fileInputRef = useRef(null);
  // =====================================

  useEffect(() => {
    if (editPetData) {
      setIsEditMode(true);
      setValue("petName", editPetData.petName || "");
      setValue("petAge", editPetData.petAge || "");
      setValue("petHeight", editPetData.petHeight || "");
      setValue("petWeight", editPetData.petWeight || "");
      setValue("petSpecies", editPetData.petSpecies || "");
      setValue("petGender", editPetData.petGender || "");
      setValue("petBreed", editPetData.petBreed || "");
      setValue("isVaccinated", editPetData.isVaccinated || false);
      setValue("isNeutered", editPetData.isNeutered || false);
      setValue("medicalNotes", editPetData.medicalNotes || "");

      // ✅ FIX 1: API response mein petImage base64 string hai, petImageURL nahi
      // base64 → data URI convert karke existing image preview set karo
      if (editPetData.petImage) {
        const dataUri = base64ToDataUri(editPetData.petImage);
        setExistingImageUrl(dataUri);
      } else {
        setExistingImageUrl(null);
      }

      // Naya image select nahi hua abhi
      setSelectedImage(null);
      setImagePreview(null);
    } else {
      setIsEditMode(false);
      reset();
      // Image state reset
      setSelectedImage(null);
      setImagePreview(null);
      setExistingImageUrl(null);
    }
  }, [editPetData, setValue, reset]);

  // ============ IMAGE HANDLERS ============
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allowed types check
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setBackendError("Only JPG, JPEG, PNG, WEBP images are allowed.");
      return;
    }

    // Size check (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setBackendError("Image size must be less than 5MB.");
      return;
    }

    setBackendError("");
    setSelectedImage(file);

    // Preview banana
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // ========================================

  const submitHandler = async (data) => {
    console.log("data coming from the form ", data);
    setBackendError("");

    // ============ FormData banao (multipart ke liye) ============
    const formData = new FormData();
    formData.append("petName", data.petName);
    formData.append("petAge", Number(data.petAge));
    formData.append("petHeight", parseFloat(data.petHeight));
    formData.append("petWeight", parseFloat(data.petWeight));
    formData.append("petSpecies", data.petSpecies);
    formData.append("petGender", data.petGender);
    formData.append("petBreed", data.petBreed || "");
    formData.append("isVaccinated", data.isVaccinated);
    formData.append("isNeutered", data.isNeutered);
    formData.append("medicalNotes", data.medicalNotes || "");

    // ✅ FIX 2: Image sirf tab append karo jab user ne NAYA image select kiya ho
    // Agar selectedImage null hai → purani image server pe safe rahegi (backend ne handle kiya hai)
    if (selectedImage) {
      formData.append("petImage", selectedImage);
    }
    // ===========================================================

    try {
      let response;

      if (isEditMode && editPetData?.uid) {
        console.log("Updating pet with UID:", editPetData.uid);
        // ✅ useJwt.updatePet multipart/form-data ke saath call hona chahiye
        response = await useJwt.updatePet(editPetData.uid, formData);
        console.log("Update API Response:", response);
      } else {
        response = await useJwt.createPetWithoutImage(formData);
        console.log("Create API Response:", response);
      }

      if (response && (response.status === 200 || response.status === 201)) {
        onSubmit(data);
        reset();
        setSelectedImage(null);
        setImagePreview(null);
        setExistingImageUrl(null);
        onClose();
        return;
      }

      if (
        response?.data?.status === "error" &&
        response?.data?.errors?.length > 0
      ) {
        const backendMsg =
          response.data.errors[0]?.defaultMessage || "Validation failed";
        setBackendError(backendMsg);
      } else {
        setBackendError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving pet:", error);
      if (error.response?.data?.errors?.length > 0) {
        setBackendError(error.response.data.errors[0]?.defaultMessage);
      } else if (error.response?.data?.message) {
        setBackendError(error.response.data.message);
      } else {
        setBackendError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Display kya dikhana hai preview mein:
  // 1. Naya selected image preview (imagePreview) — highest priority
  // 2. Existing image from API (existingImageUrl) — edit mode mein
  // 3. Kuch nahi — upload box dikhao
  const displayImage = imagePreview || existingImageUrl;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* ============ IMAGE UPLOAD FIELD ============ */}
      <div className="text-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pet Image{" "}
          <span className="text-gray-400 text-xs">
            (Optional — JPG, PNG, WEBP, max 5MB)
          </span>
        </label>

        {/* Center container */}
        <div className="flex justify-center">
          {displayImage ? (
            // Image selected ya existing — show preview
            <div className="relative w-32 h-32">
              <img
                src={displayImage}
                alt="Pet Preview"
                className="w-32 h-32 object-cover rounded-xl border-2 border-[#52B2AD] shadow"
              />

              {/* Remove button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          ) : (
            // Upload box
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 border-2 border-dashed border-[#52B2AD] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0fafa] transition"
            >
              <span className="text-3xl text-[#52B2AD]">📷</span>
              <span className="text-xs text-gray-500 mt-1 text-center px-1">
                Click to upload
              </span>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Change button — sirf tab dikhao jab koi image show ho rahi ho */}
        {displayImage && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-sm text-[#52B2AD] underline hover:text-[#42948f]"
          >
            Change Image
          </button>
        )}
      </div>
      {/* ========================================== */}

      {/* Row 1: Pet Name & Species */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pet Name
          </label>
          <input
            {...register("petName", {
              required: "Pet name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabets and spaces are allowed",
              },
              setValueAs: (val) =>
                typeof val === "string" ? val.replace(/[^A-Za-z ]+/g, "") : val,
            })}
            placeholder="Enter pet name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^A-Za-z ]+/g, "");
            }}
            onPaste={(e) => {
              e.preventDefault();
              const cleaned = (e.clipboardData || window.clipboardData)
                .getData("text")
                .replace(/[^A-Za-z ]+/g, "");
              e.target.value = cleaned;
              e.target.dispatchEvent(new Event("input", { bubbles: true }));
            }}
          />
          {errors.petName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.petName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Species
          </label>
          <input
            {...register("petSpecies", {
              required: "Species is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabets and spaces are allowed",
              },
              setValueAs: (val) =>
                typeof val === "string" ? val.replace(/[^A-Za-z ]+/g, "") : val,
            })}
            placeholder="e.g., Dog, Cat, Bird"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^A-Za-z ]+/g, "");
            }}
            onPaste={(e) => {
              e.preventDefault();
              const cleaned = (e.clipboardData || window.clipboardData)
                .getData("text")
                .replace(/[^A-Za-z ]+/g, "");
              e.target.value = cleaned;
              e.target.dispatchEvent(new Event("input", { bubbles: true }));
            }}
          />
          {errors.petSpecies && (
            <p className="text-red-500 text-sm mt-1">
              {errors.petSpecies.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Breed & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Breed
          </label>
          <input
            {...register("petBreed", {
              required: "Breed is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only alphabets and spaces are allowed",
              },
              setValueAs: (val) =>
                typeof val === "string" ? val.replace(/[^A-Za-z ]+/g, "") : val,
            })}
            placeholder="Enter breed"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^A-Za-z ]+/g, "");
            }}
            onPaste={(e) => {
              e.preventDefault();
              const cleaned = (e.clipboardData || window.clipboardData)
                .getData("text")
                .replace(/[^A-Za-z ]+/g, "");
              e.target.value = cleaned;
              e.target.dispatchEvent(new Event("input", { bubbles: true }));
            }}
          />
          {errors.petBreed && (
            <p className="text-red-500 text-sm mt-1">
              {errors.petBreed.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            {...register("petGender", { required: "Gender is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.petGender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.petGender.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Age & Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age (in years)
          </label>
          <input
            type="number"
            {...register("petAge", {
              required: "Age is required",
              min: { value: 0, message: "Age cannot be negative" },
            })}
            placeholder="Enter pet age"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
          />
          {errors.petAge && (
            <p className="text-red-500 text-sm mt-1">{errors.petAge.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("petWeight", { required: "Weight is required" })}
            placeholder="Enter weight"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
          />
          {errors.petWeight && (
            <p className="text-red-500 text-sm mt-1">
              {errors.petWeight.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 4: Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Height (cm)
        </label>
        <input
          type="number"
          step="0.01"
          {...register("petHeight", { required: "Height is required" })}
          placeholder="Enter height"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
        />
        {errors.petHeight && (
          <p className="text-red-500 text-sm mt-1">
            {errors.petHeight.message}
          </p>
        )}
      </div>

      {/* Vaccinated & Neutered */}
      <div className="flex gap-6 items-center bg-gray-50 p-3 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("isVaccinated")}
            className="w-4 h-4 text-[#52B2AD] border-gray-300 rounded focus:ring-[#52B2AD]"
          />
          <span className="text-sm font-medium text-gray-700">Vaccinated</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("isNeutered")}
            className="w-4 h-4 text-[#52B2AD] border-gray-300 rounded focus:ring-[#52B2AD]"
          />
          <span className="text-sm font-medium text-gray-700">Neutered</span>
        </label>
      </div>

      {/* Backend Error */}
      {backendError && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm font-medium">
          {backendError}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="border border-gray-300 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-5 py-2 rounded-lg shadow-md transition font-medium"
        >
          {isEditMode ? "Update Pet" : "Save Pet"}
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
