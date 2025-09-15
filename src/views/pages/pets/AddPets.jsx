  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useForm } from "react-hook-form";
  import useJwt from "../../../enpoints/jwt/useJwt";

  export default function AddPetModal({ isAddOpen, setIsAddOpen, onSubmitPet }) {
    const queryClient = useQueryClient();

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
    } = useForm({
      defaultValues: {
        petName: "",
        petSpecies: "",
        petBreed: "",
        petAge: "",
        petGender: "",
        petHeight: "",
        petWeight: "",
        isNeutered: "false",
        isVaccinated: "false",
        medicalNotes: "",
        doctorId: "",
        petImage: null,
      },
    });

    // Watch the image field to show preview
    const watchedImage = watch("petImage");

    const createPetMutation = useMutation({
      mutationFn: async (formData) => {
        const token = getToken();
        const response = await fetch("/api/pets/create-with-image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create pet");
        }

        return response.json();
      },  


      onSuccess: (data) => {
        console.log("Pet created successfully:", data);
        queryClient.invalidateQueries(["pets"]);
        if (onSubmitPet) {
          onSubmitPet(data.data);
        }
        reset();
        setIsAddOpen(false);
      },
      
      onError: (error) => {
        console.error("Error creating pet:", error);
        alert(`Error: ${error.message}`);
      
      },

    });

    const handleFormSubmit = (data) => {
      console.log("Add Pet Form data", data);

      // Validate required fields
      if (!data.petName || !data.petAge || !data.petHeight || !data.petWeight || 
          !data.petSpecies || !data.petGender || !data.isVaccinated || !data.isNeutered) {
        alert("Please fill in all required fields");
        return;
      }

      // Create FormData object for multipart form submission
      const formData = new FormData();
      
      // Append all the required fields (ensure they're strings/numbers)
      formData.append("petName", data.petName.trim());
      formData.append("petAge", parseInt(data.petAge));
      formData.append("petHeight", parseFloat(data.petHeight));
      formData.append("petWeight", parseFloat(data.petWeight));
      formData.append("petSpecies", data.petSpecies.trim());
      formData.append("petGender", data.petGender);
      
      // Optional fields (only append if they have values)
      if (data.petBreed && data.petBreed.trim()) {
        formData.append("petBreed", data.petBreed.trim());
      }
      if (data.medicalNotes && data.medicalNotes.trim()) {
        formData.append("medicalNotes", data.medicalNotes.trim());
      }
      if (data.doctorId && data.doctorId.toString().trim()) {
        formData.append("doctorId", parseInt(data.doctorId));
      }
      
      // Boolean fields (convert string to actual boolean)
      formData.append("isVaccinated", data.isVaccinated === "true");
      formData.append("isNeutered", data.isNeutered === "true");
      
      // Handle image file
      if (data.petImage && data.petImage[0]) {
        formData.append("petImage", data.petImage[0]);
      }

      createPetMutation.mutate(formData);
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
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsAddOpen(false)}
          >
            <div
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAddOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                disabled={createPetMutation.isLoading}
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🐾 Add New Pet
              </h2>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                {/* Image Upload with Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("petImage")}
                    className="block w-full text-sm text-gray-600 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-[#52B2AD] file:text-white 
                    hover:file:bg-[#42948f] cursor-pointer"
                  />
                  {/* Image Preview */}
                  {watchedImage && watchedImage[0] && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(watchedImage[0])}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                {/* Pet Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    {...register("petName", { 
                      required: "Pet name is required",
                      minLength: { value: 2, message: "Pet name must be at least 2 characters" },
                      maxLength: { value: 50, message: "Pet name cannot exceed 50 characters" },
                      pattern: { 
                        value: /^[A-Za-z\s]{2,50}$/, 
                        message: "Pet name must contain only letters and spaces" 
                      }
                    })}
                    placeholder="Enter pet name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  />
                  {errors.petName && (
                    <p className="text-red-500 text-xs mt-1">{errors.petName.message}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    {...register("petAge", {
                      required: "Age is required",
                      min: { value: 0, message: "Age cannot be negative" },
                      max: { value: 30, message: "Age cannot exceed 30 years" },
                    })}
                    placeholder="Enter pet age"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  />
                  {errors.petAge && (
                    <p className="text-red-500 text-xs mt-1">{errors.petAge.message}</p>
                  )}
                </div>

                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("petHeight", { 
                      required: "Height is required",
                      min: { value: 0.1, message: "Height must be at least 0.1 cm" },
                      max: { value: 300.0, message: "Height cannot exceed 300 cm" }
                    })}
                    placeholder="Enter height"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  />
                  {errors.petHeight && (
                    <p className="text-red-500 text-xs mt-1">{errors.petHeight.message}</p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("petWeight", { 
                      required: "Weight is required",
                      min: { value: 0.1, message: "Weight must be at least 0.1 kg" },
                      max: { value: 500.0, message: "Weight cannot exceed 500 kg" }
                    })}
                    placeholder="Enter weight"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  />
                  {errors.petWeight && (
                    <p className="text-red-500 text-xs mt-1">{errors.petWeight.message}</p>
                  )}
                </div>

                {/* Species */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Species *
                  </label>
                  <input
                    type="text"
                    {...register("petSpecies", { 
                      required: "Species is required",
                      minLength: { value: 3, message: "Species must be at least 3 characters" },
                      maxLength: { value: 30, message: "Species cannot exceed 30 characters" },
                      pattern: { 
                        value: /^[A-Za-z\s]{3,30}$/, 
                        message: "Species must contain only letters and spaces" 
                      }
                    })}
                    placeholder="e.g. Dog, Cat, Bird"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  />
                  {errors.petSpecies && (
                    <p className="text-red-500 text-xs mt-1">{errors.petSpecies.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
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
                    <p className="text-red-500 text-xs mt-1">{errors.petGender.message}</p>
                  )}
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Breed
                  </label>
                  <input
                    type="text"
                    {...register("petBreed", { 
                      maxLength: { value: 50, message: "Breed cannot exceed 50 characters" },
                      pattern: { 
                        value: /^[A-Za-z\s]*$/, 
                        message: "Breed must contain only letters and spaces" 
                      }
                    })}
                    placeholder="Enter breed (optional)"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  />
                  {errors.petBreed && (
                    <p className="text-red-500 text-xs mt-1">{errors.petBreed.message}</p>
                  )}
                </div>

                {/* Vaccinated */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vaccinated *
                  </label>
                  <select
                    {...register("isVaccinated", { required: "Vaccination status is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  >
                    <option value="">Select vaccination status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.isVaccinated && (
                    <p className="text-red-500 text-xs mt-1">{errors.isVaccinated.message}</p>
                  )}
                </div>

                {/* Neutered */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Neutered *
                  </label>
                  <select
                    {...register("isNeutered", { required: "Neutered status is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] outline-none"
                  >
                    <option value="">Select neutered status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.isNeutered && (
                    <p className="text-red-500 text-xs mt-1">{errors.isNeutered.message}</p>
                  )}
                </div>

              

                {/* Submit */}
                <button
                  type="submit"
                  disabled={createPetMutation.isLoading}
                  className="w-full bg-[#52B2AD] hover:bg-[#42948f] text-white py-2.5 rounded-lg shadow-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createPetMutation.isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "➕ Add Pet"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }