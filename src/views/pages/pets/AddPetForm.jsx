import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useJwt from "../../../enpoints/jwt/useJwt";

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

  // Pre-fill form when editing
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
    } else {
      setIsEditMode(false);
      reset();
    }
  }, [editPetData, setValue, reset]);

  const submitHandler = async (data) => {
    console.log("data coming from the form ", data);
    setBackendError("");

    const formattedPet = {
      ...data,
      petAge: Number(data.petAge),
      petHeight: parseFloat(data.petHeight),
      petWeight: parseFloat(data.petWeight),
    };

    console.log("this is formatted", formattedPet);

    try {
      let response;
      
      if (isEditMode && editPetData?.uid) {
        // Update existing pet using UID
        console.log("Updating pet with UID:", editPetData.uid);
        response = await useJwt.updatePet(editPetData.uid, formattedPet);
        console.log("Update API Response:", response);
      } else {
        // Create new pet
        response = await useJwt.createPetWithoutImage(formattedPet);
        console.log("Create API Response:", response);
      }

      // Success case — close modal and refresh
      if (response && (response.status === 200 || response.status === 201)) {
        onSubmit(formattedPet);
        reset();
        onClose();
        // window.location.reload();
        return;
      }

      // Handle backend validation errors
      if (response?.data?.status === "error" && response?.data?.errors?.length > 0) {
        const backendMsg = response.data.errors[0]?.defaultMessage || "Validation failed";
        setBackendError(backendMsg);
      } else {
        setBackendError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving pet:", error);

      // Handle backend validation message from catch
      if (error.response?.data?.errors?.length > 0) {
        const backendMsg = error.response.data.errors[0]?.defaultMessage;
        setBackendError(backendMsg);
      } else if (error.response?.data?.message) {
        setBackendError(error.response.data.message);
      } else {
        setBackendError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* Row 1: Pet Name & Species */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Pet Name
  </label>
  <input
    {...register("petName", {
      required: "Pet name is required",
      // ensure only alphabets and spaces are saved in react-hook-form
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
      // Live restriction: block all non-alphabet characters
      e.target.value = e.target.value.replace(/[^A-Za-z ]+/g, "");
    }}
    onPaste={(e) => {
      // Sanitize paste
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData("text");
      const cleaned = pasted.replace(/[^A-Za-z ]+/g, "");
      e.target.value = cleaned;

      // Notify react-hook-form after sanitizing
      e.target.dispatchEvent(new Event("input", { bubbles: true }));
    }}
  />

  {errors.petName && (
    <p className="text-red-500 text-sm mt-1">{errors.petName.message}</p>
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
      // Live restrict: remove anything except alphabets & space
      e.target.value = e.target.value.replace(/[^A-Za-z ]+/g, "");
    }}
    onPaste={(e) => {
      // Sanitize pasted text
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData("text");
      const cleaned = pasted.replace(/[^A-Za-z ]+/g, "");
      e.target.value = cleaned;

      // Trigger form update
      e.target.dispatchEvent(new Event("input", { bubbles: true }));
    }}
  />

  {errors.petSpecies && (
    <p className="text-red-500 text-sm mt-1">{errors.petSpecies.message}</p>
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
        // live restrict
        e.target.value = e.target.value.replace(/[^A-Za-z ]+/g, "");
      }}
      onPaste={(e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData("text");
        const cleaned = pasted.replace(/[^A-Za-z ]+/g, "");
        e.target.value = cleaned;

        // update react-hook-form
        e.target.dispatchEvent(new Event("input", { bubbles: true }));
      }}
    />
    {errors.petBreed && (
      <p className="text-red-500 text-sm mt-1">{errors.petBreed.message}</p>
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
      <p className="text-red-500 text-sm mt-1">{errors.petGender.message}</p>
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



      {/* Backend Validation Message */}
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