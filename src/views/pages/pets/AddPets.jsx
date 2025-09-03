import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useJwt from "../../../enpoints/jwt/useJwt";

export default function AddPetModal({ isAddOpen, setIsAddOpen, onSubmitPet }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {
    petName: "dog",
    petSpecies: "as",
    petBreed: "dsa",
    petAge: "121",
    petGender: "Female",
    petHeight: "32",
    petWeight: "32",
    isNeutered: "false",
    isVaccinated: "true",
    image: null, // optional file input
  }},);

  const queryClient = useQueryClient();
   const addPetMutation = useMutation({
  mutationFn: async (newPet) => {
    // ✅ Make sure to send newPet to your API
    const res = await useJwt.createPets(newPet);

    
    return res.data;
  },
  onSuccess: () => {
    // ✅ Refresh pets list after adding
    queryClient.invalidateQueries(["pets"]);
    reset(); // clear form
    setIsAddOpen(false); // close modal
  },
});
  const handleFormSubmit = (data) => {
    addPetMutation.mutate(data); // ✅ send to API
    reset();
    setIsAddOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsAddOpen(true)}
        className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-4 py-2 rounded-lg shadow-md transition text-sm font-medium"
      >
        ➕ Add Pet
      </button>

      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
            {/* Close */}
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🐾 Add New Pet
            </h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-5"
            >
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="block w-full text-sm text-gray-600 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-[#52B2AD] file:text-white 
                  hover:file:bg-[#42948f] cursor-pointer"
                />
                
              </div>

              {/* Pet Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name
                </label>
                <input
                  type="text"
                  {...register("petName", { required: "Pet name is required" })}
                  placeholder="Enter pet name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
                {errors.petName && (
                  <p className="text-red-500 text-xs">
                    {errors.petName.message}
                  </p>
                )}
              </div>

              {/* Owner UID */}
             
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  {...register("petAge", {
                    required: "Age is required",
                    min: { value: 0, message: "Age must be positive" },
                  })}
                  placeholder="Enter pet age"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
                {errors.petAge && (
                  <p className="text-red-500 text-xs">
                    {errors.petAge.message}
                  </p>
                )}
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("petHeight", { required: "Height is required" })}
                  placeholder="Enter height"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
                {errors.petHeight && (
                  <p className="text-red-500 text-xs">
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
                  step="0.1"
                  {...register("petWeight", { required: "Weight is required" })}
                  placeholder="Enter weight"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
                {errors.petWeight && (
                  <p className="text-red-500 text-xs">
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
                  type="text"
                  {...register("petSpecies", {
                    required: "Species is required",
                  })}
                  placeholder="e.g. Dog, Cat, Cow"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
                {errors.petSpecies && (
                  <p className="text-red-500 text-xs">
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.petGender && (
                  <p className="text-red-500 text-xs">
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
                  type="text"
                  {...register("petBreed", { required: "Breed is required" })}
                  placeholder="Enter breed"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
                {errors.petBreed && (
                  <p className="text-red-500 text-xs">
                    {errors.petBreed.message}
                  </p>
                )}
              </div>

              {/* Vaccinated */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccinated
                </label>
                <select
                  {...register("isVaccinated", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.isVaccinated && (
                  <p className="text-red-500 text-xs">
                    {errors.isVaccinated.message}
                  </p>
                )}
              </div>

              {/* Neutered */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Neutered
                </label>
                <select
                  {...register("isNeutered", {
                    required: "This field is required",
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.isNeutered && (
                  <p className="text-red-500 text-xs">
                    {errors.isNeutered.message}
                  </p>
                )}
              </div>

              {/* Medical Notes */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Notes
                </label>
                <textarea
                  {...register("medicalNotes")}
                  placeholder="Enter any medical notes"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                />
              </div> */}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#52B2AD] hover:bg-[#42948f] text-white py-2.5 rounded-lg shadow-md font-medium transition"
              >
                ➕ Add Pet
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
