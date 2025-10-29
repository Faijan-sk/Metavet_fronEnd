import React from "react";
import { useForm } from "react-hook-form";
import useJwt from "../../../enpoints/jwt/useJwt";

const AddPetForm = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  const submitHandler = (data) => {
    console.log('data coming from the form ', data)
    const formattedPet = {
      ...data,
      petAge: Number(data.petAge),
      petHeight: parseFloat(data.petHeight),
      petWeight: parseFloat(data.petWeight),
    };
    
    console.log('this is frmated', formattedPet)

    const response = useJwt.createPetWithoutImage(formattedPet)

    onSubmit(formattedPet);
    onClose();
    reset();
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
            {...register("petName", { required: "Pet name is required" })}
            placeholder="Enter pet name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
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
            {...register("petSpecies", { required: "Species is required" })}
            placeholder="e.g., Dog, Cat, Bird"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
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
            {...register("petBreed", { required: "Breed is required" })}
            placeholder="Enter breed"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition"
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

      {/* Row 4: Height (Full Width) */}
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

      {/* Medical Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical Notes
        </label>
        <textarea
          {...register("medicalNotes")}
          placeholder="Enter any medical notes"
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52B2AD] outline-none transition resize-none"
        />
      </div>

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
          Save Pet
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;