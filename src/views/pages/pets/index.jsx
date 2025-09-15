import { Calendar, Hash, PawPrint, User } from "lucide-react";
import { useEffect, useState } from "react";

import useJwt from "../../../enpoints/jwt/useJwt";
import AddPets from "./AddPets";
import PetProfile from "./../../../assets/MetavetImages/pets/DemoProfile.png";

export default function PetDetailsCard() {
  const [open, setOpen] = useState(false); // Profile modal
  const [isAddOpen, setIsAddOpen] = useState(false); // Add Pet modal
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unAuthorisedError, setUnAuthorisedError] = useState();

  const [selectedPet, setSelectedPet] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await useJwt.getAllPetsByOwner();
      const data = response.data;

      setPetList(data.data || []);
    } catch (error) {
      console.error("Error fetching Pets:", error.status);
      setUnAuthorisedError(error.status);
      setError(error.message || "Failed to fetch Pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

      fetchPets();
  }, []);

  const handleViewProfile = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">🐾 Pet Record</h1>
            <p className="text-gray-600 text-sm">Manage and know more about your pets</p>
          </div>

          <AddPets setIsAddOpen={setIsAddOpen} isAddOpen={isAddOpen} />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row animate-pulse"
              >
                {/* Left Side (Image + Pet Info) */}
                <div className="bg-gray-300 flex flex-col items-center justify-center p-4 md:w-1/4 space-y-2">
                  <div className="w-28 h-28 rounded-full bg-gray-400 shadow-md"></div>
                  <div className="h-4 w-20 bg-gray-400 rounded"></div>
                  <div className="h-3 w-16 bg-gray-400 rounded"></div>
                </div>

                {/* Right Side (Details) */}
                <div className="flex-1 p-4 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-1">
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    </div>
                  ))}

                  {/* Buttons */}
                  <div className="pt-3 flex gap-2 justify-end">
                    <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
                    <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          unAuthorisedError === 401 ? (
            <p className="text-center text-red-500">
              Please Login to see your Pets{" "}
              <a className="text-primary font-bold" href="/signin">
                Login
              </a>
            </p>
          ) : (
            <p className="text-red-500">{error}</p>
          )
        ) : petList.length === 0 ? (
          <p>No pets found. Add some!</p>
        ) : (
          petList.map((pet) => (
            <div
              key={pet.pid}
              className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row mb-4"
            >
              {/* Left Side (Image + Pet Info) */}
              <div className="bg-gradient-to-br from-[#52B2AD] to-[#42948f] text-white flex flex-col items-center justify-center p-4 md:w-1/4">
                <img
                  src={PetProfile}
                  alt="Pet"
                  className="w-28 h-28 rounded-full shadow-lg border-4 border-white shadow-md mb-2 object-cover bg-white"
                />

                <h2 className="text-lg font-semibold leading-tight">{pet.petName}</h2>
                <p className="text-xs opacity-90">{pet.petSpecies}</p>
              </div>

              {/* Right Side (Details) */}
              <div className="flex-1 p-4 space-y-2">
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="flex items-center text-gray-500 gap-1 text-sm">
                    <Hash size={14} /> ID
                  </span>
                  <span className="font-medium text-gray-800 text-sm">#PET-{pet.pid}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-1">
                  <span className="flex items-center text-gray-500 gap-1 text-sm">
                    <User size={14} /> Owner
                  </span>
                  <span className="font-medium text-gray-800 text-sm">{pet.owner}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-1">
                  <span className="flex items-center text-gray-500 gap-1 text-sm">
                    <PawPrint size={14} /> Species
                  </span>
                  <span className="font-medium text-gray-800 text-sm">{pet.petSpecies}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-1">
                  <span className="flex items-center text-gray-500 gap-1 text-sm">
                    <Calendar size={14} /> Next Appointment
                  </span>
                  <span className="font-medium text-gray-800 text-sm">Sep 10, 2025</span>
                </div>

                {/* Buttons */}
                <div className="pt-3 flex gap-2 justify-end">
                  <button
                    onClick={() => handleViewProfile(pet)}
                    className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-3 py-1.5 rounded-md shadow-md transition text-sm font-medium"
                  >
                    View Profile
                  </button>
                  <button className="border border-[#52B2AD] text-[#52B2AD] hover:bg-[#52B2AD] hover:text-white px-3 py-1.5 rounded-md shadow-md transition text-sm font-medium">
                    Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Profile Modal */}
      {open && selectedPet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)} // Close when clicking outside modal
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✖
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              <img
                src={PetProfile}
                alt="Pet"
                className="w-28 h-28 rounded-full border-4 border-[#52B2AD] shadow-md mb-3 object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-900">{selectedPet.petName}</h2>
              <p className="text-gray-500 mb-4">Owner ID: {selectedPet.owner}</p>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">ID</span>
                <span className="font-medium">#PET-{selectedPet.pid}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Owner UID</span>
                <span className="font-medium">{selectedPet.owner}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Pet Name</span>
                <span className="font-medium">{selectedPet.petName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Species</span>
                <span className="font-medium">{selectedPet.petSpecies}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Breed</span>
                <span className="font-medium">{selectedPet.petBreed}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Gender</span>
                <span className="font-medium">{selectedPet.petGender}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Age</span>
                <span className="font-medium">{selectedPet.petAge} Years</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Height</span>
                <span className="font-medium">{selectedPet.petHeight} cm</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Weight</span>
                <span className="font-medium">{selectedPet.petWeight} kg</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Vaccinated</span>
                <span className="font-medium">{selectedPet.isVaccinated ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Neutered</span>
                <span className="font-medium">{selectedPet.isNeutered ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Diseases</span>
                <span className="font-medium">{selectedPet.petDisease || "None"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Food Preference</span>
                <span className="font-medium">{selectedPet.petFoodPreference}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Allergies</span>
                <span className="font-medium">{selectedPet.petAllergies || "None"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Notes</span>
                <span className="font-medium">{selectedPet.petNotes || "None"}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-md bg-[#52B2AD] text-white hover:bg-[#42948f] text-sm">
                Edit Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
