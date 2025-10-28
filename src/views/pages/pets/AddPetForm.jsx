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
      petName: "mangu",
      petAge: "25",
      petHeight: "10",
      petWeight: "23",
      petSpecies: "abc",
      petGender: "Male",
      petBreed: "XYZ",
      isVaccinated: false,
      isNeutered: false,
      medicalNotes: "nothing",
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
      {/* Pet Name */}
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

      {/* Age */}
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

      {/* Height */}
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

      {/* Weight */}
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

      {/* Species */}
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

      {/* Gender */}
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

      {/* Breed */}
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

      {/* Vaccinated & Neutered */}
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isVaccinated")}
            className="w-4 h-4 text-[#52B2AD] border-gray-300 rounded"
          />
          Vaccinated
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isNeutered")}
            className="w-4 h-4 text-[#52B2AD] border-gray-300 rounded"
          />
          Neutered
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
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Save Pet
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
