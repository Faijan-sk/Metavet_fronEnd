import React, { useState } from "react";
import { User, Calendar, PawPrint, Phone, Edit, Copy, Heart, Award, Activity } from "lucide-react";

export default function PetProfileOne({ pet }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!pet) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No pet selected.</p>
      </div>
    );
  }

  const ownerName =
    typeof pet.owner === "object"
      ? `${pet.owner?.firstName || ""} ${pet.owner?.lastName || ""}`.trim()
      : pet.owner || "N/A";

  const handleCopy = () => {
    navigator.clipboard?.writeText(JSON.stringify(pet, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-6">
      <div 
        className="bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#52B2AD] to-[#3d8a86] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="flex gap-6 items-center relative z-10">
            <div 
              className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl flex items-center justify-center bg-white transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <img
                src={pet.photoUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2352B2AD'/%3E%3C/svg%3E"}
                alt={pet.petName || "Pet"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                    {pet.petName || "Unnamed Pet"}
                    <Heart size={24} className="text-red-300 fill-red-300 animate-pulse" />
                  </h2>
                  <p className="text-teal-100 text-sm">{pet.petInfo || `${pet.petSpecies || ""} ${pet.petBreed ? `• ${pet.petBreed}` : ""}`}</p>
                </div>

                <div className="text-right bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="text-xs text-teal-100 uppercase tracking-wide">Pet ID</div>
                  <div className="font-bold text-white text-lg">{pet.pid}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="p-6 -mt-4 relative z-20">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <PawPrint size={20} className="text-[#52B2AD]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Species</div>
                  <div className="font-semibold text-gray-800">{pet.petSpecies || "Unknown"}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar size={20} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Age</div>
                  <div className="font-semibold text-gray-800">
                    {pet.birthDate ? new Date(pet.birthDate).toLocaleDateString() : (pet.petAge ? `${pet.petAge} yrs` : "Unknown")}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Owner</div>
                  <div className="font-semibold text-gray-800 truncate">{ownerName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-5">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={18} className="text-[#52B2AD]" />
                <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-teal-50 to-white p-3 rounded-lg border border-teal-100">
                  <div className="text-xs text-gray-500 mb-1">Breed</div>
                  <div className="font-semibold text-gray-800">{pet.petBreed || "Unknown"}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-3 rounded-lg border border-blue-100">
                  <div className="text-xs text-gray-500 mb-1">Gender</div>
                  <div className="font-semibold text-gray-800">{pet.petGender || "Unknown"}</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white p-3 rounded-lg border border-purple-100">
                  <div className="text-xs text-gray-500 mb-1">Weight</div>
                  <div className="font-semibold text-gray-800">{pet.petWeight ? `${pet.petWeight} kg` : "N/A"}</div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-white p-3 rounded-lg border border-pink-100">
                  <div className="text-xs text-gray-500 mb-1">Height</div>
                  <div className="font-semibold text-gray-800">{pet.petHeight ? `${pet.petHeight} cm` : "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Health Status */}
            <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-[#52B2AD]" />
                <h3 className="text-lg font-bold text-gray-800">Health Status</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border-2 transition-all ${pet.isVaccinated ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
                  <div className="text-xs text-gray-600 mb-1">Vaccinated</div>
                  <div className={`font-bold ${pet.isVaccinated ? 'text-green-700' : 'text-gray-700'}`}>
                    {pet.isVaccinated ? "✓ Yes" : "✗ No"}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border-2 transition-all ${pet.isNeutered ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'}`}>
                  <div className="text-xs text-gray-600 mb-1">Neutered</div>
                  <div className={`font-bold ${pet.isNeutered ? 'text-blue-700' : 'text-gray-700'}`}>
                    {pet.isNeutered ? "✓ Yes" : "✗ No"}
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 bg-gradient-to-br from-teal-50 to-white border-teal-300">
                  <div className="text-xs text-gray-600 mb-1">Overall Status</div>
                  <div className="font-bold text-teal-700">{pet.healthStatus || "Good"}</div>
                </div>
              </div>
            </div>

            {/* Medical Notes */}
            <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Medical Notes</h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                {pet.medicalNotes || "No medical notes available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={`tel:${pet.owner?.fullPhoneNumber || pet.owner?.phoneNumber || ""}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#52B2AD] to-[#3d8a86] text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
              >
                <Phone size={18} />
                Call Owner
              </a>

              {/* <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
              >
                <Copy size={18} />
                {copied ? "Copied!" : "Copy JSON"}
              </button> */}

              <button
                onClick={() => alert('Open edit modal (implement as needed)')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-[#52B2AD] text-[#52B2AD] font-semibold shadow-md hover:shadow-lg hover:bg-teal-50 transform transition-all duration-200 hover:scale-105"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}