import { Calendar, Hash, PawPrint, User, Plus, Lock, ShieldAlert, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddPetForm from "./AddPetForm";
import useJwt from "../../../enpoints/jwt/useJwt";
import PetProfileOne from "./PetProfile";

const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error parsing userInfo:', error);
    return null;
  }
};

const AddPets = ({ setIsAddOpen, isAddOpen }) => {
  const userInfo = getUserInfo();
  if (!userInfo) return null;

  return (
    <button 
      onClick={() => setIsAddOpen(true)}
      className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-4 py-2 rounded-lg shadow-md transition flex items-center gap-2"
    >
      <Plus size={20} />
      Add Pet
    </button>
  );
};

const PetProfile = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2352B2AD'/%3E%3C/svg%3E";

const AddPetModal = ({ isAddOpen, setIsAddOpen, onAddPet, editPetData, onUpdatePet }) => {
  if (!isAddOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsAddOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {editPetData ? "Edit Pet" : "Add New Pet"}
        </h2>

        <AddPetForm
          onClose={() => setIsAddOpen(false)}
          onSubmit={editPetData ? onUpdatePet : onAddPet}
          editPetData={editPetData}
        />
      </div>
    </div>
  );
};

// Compact Profile Modal with proper height
const ProfileModal = ({ open, onClose, pet, onEditClick, onDeleteSuccess }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative animate-fadeIn max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-700 transition bg-white rounded-full p-1.5 shadow-md"
        >
          <X size={20} />
        </button>

        <div className="p-4">
          <PetProfileOne 
            pet={pet} 
            onEditClick={onEditClick}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
    </div>
  );
};

// Error State Components
const ErrorState400 = ({ setIsAddOpen }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
        <PawPrint size={64} className="text-white" strokeWidth={1.5} />
      </div>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
        <Plus size={24} className="text-white font-bold" />
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Pets Yet!</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      Your pet family is waiting to be created. Start by adding your first furry friend!
    </p>
    
    <button
      onClick={() => setIsAddOpen(true)}
      className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
    >
      <Plus size={20} />
      Add Your First Pet
    </button>
    
    <div className="mt-8 grid grid-cols-3 gap-4 max-w-md w-full">
      <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
        <div className="text-3xl mb-2">🐕</div>
        <p className="text-xs text-gray-600">Dogs</p>
      </div>
      <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
        <div className="text-3xl mb-2">🐈</div>
        <p className="text-xs text-gray-600">Cats</p>
      </div>
      <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
        <div className="text-3xl mb-2">🐦</div>
        <p className="text-xs text-gray-600">Birds</p>
      </div>
    </div>
  </div>
);

const ErrorState401 = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl animate-shake">
        <Lock size={64} className="text-white" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 w-32 h-32 bg-red-500 rounded-full animate-ping opacity-20"></div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Session Expired</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      Your session has timed out for security reasons. Please log in again to access your pets.
    </p>
    
    <a
      href="/signin"
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
    >
      <Lock size={20} />
      Login Again
    </a>
    
    <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
      <p className="text-sm text-red-800 text-center">
        <span className="font-semibold">Security Tip:</span> Always log out when using shared devices
      </p>
    </div>
  </div>
);

const ErrorState403 = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
        <ShieldAlert size={64} className="text-white" strokeWidth={1.5} />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-white text-xl font-bold">!</span>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Access Denied</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      You don't have permission to view this information. Please contact support if you believe this is an error.
    </p>
    
    <div className="flex gap-3">
      <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-semibold">
        Contact Support
      </button>
      <button className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-full shadow-lg transition-all font-semibold">
        Go Back
      </button>
    </div>
    
    <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6 max-w-md">
      <h3 className="font-semibold text-orange-800 mb-2 text-sm">Common reasons:</h3>
      <ul className="text-sm text-orange-700 space-y-1">
        <li>• Account verification pending</li>
        <li>• Insufficient permissions</li>
        <li>• Subscription expired</li>
      </ul>
    </div>
  </div>
);

const ErrorState404 = ({ setIsAddOpen }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
        <Search size={64} className="text-white animate-search" strokeWidth={1.5} />
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Pets Found</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      We couldn't find any pets in your account. Start building your pet family today!
    </p>
    
    <button
      onClick={() => setIsAddOpen(true)}
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
    >
      <Plus size={20} />
      Add New Pet
    </button>
    
    <div className="mt-8 grid grid-cols-2 gap-4 max-w-md w-full">
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition text-center">
        <div className="text-4xl mb-2">🏥</div>
        <p className="text-xs font-semibold text-gray-700 mb-1">Health Records</p>
        <p className="text-xs text-gray-500">Track vaccinations</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition text-center">
        <div className="text-4xl mb-2">📅</div>
        <p className="text-xs font-semibold text-gray-700 mb-1">Appointments</p>
        <p className="text-xs text-gray-500">Schedule visits</p>
      </div>
    </div>
  </div>
);

export default function PetDetailsCard() {
  const [open, setOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unAuthorisedError, setUnAuthorisedError] = useState();
  const [msg, setMsg] = useState();
  const [selectedPet, setSelectedPet] = useState(null);
  const [editPetData, setEditPetData] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await useJwt.getAllPetsByOwner();
      const data = response.data;
      setPetList(data.data || []);
    } catch (error) {
      console.error("Error fetching Pets:", error);
      const status = error?.response?.status || error?.status;

      if (status >= 400 && status < 500) {
        switch (status) {
          case 400:
            setMsg("You don't have any pets yet. Please add one.");
            break;
          case 401:
            setMsg("Unauthorized access. Please log in again.");
            break;
          case 403:
            setMsg("You don't have permission to view this information.");
            break;
          case 404:
            setMsg("No pets found. Try adding a new one.");
            break;
          default:
            setMsg("A client error occurred. Please check your request.");
        }
      } else if (status >= 500 && status < 600) {
        setMsg("Server error occurred. Please try again later.");
      } else if (error.message === "Network Error") {
        setMsg("Network error. Please check your internet connection.");
      } else {
        setMsg("Something went wrong while fetching pets.");
      }

      setUnAuthorisedError(status);
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

  const handleAddPet = (newPet) => {
    setPetList((prev) => [...prev, { pid: prev.length + 1, ...newPet }]);
    setIsAddOpen(false);
    setEditPetData(null);
  };

  const handleEditClick = (pet) => {
    setEditPetData(pet);
    setOpen(false);
    setIsAddOpen(true);
  };

  const handleUpdatePet = async (updatedPet) => {
    setPetList((prev) =>
      prev.map((p) => (p.pid === editPetData.pid ? { ...p, ...updatedPet } : p))
    );
    setIsAddOpen(false);
    setEditPetData(null);
  };

  const handleCloseModal = () => {
    setIsAddOpen(false);
    setEditPetData(null);
  };

  const handleDeleteSuccess = async (petId) => {
    console.log(`Pet ${petId} deleted successfully`);
    setOpen(false);
    await fetchPets();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes search {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-search { animation: search 2s ease-in-out infinite; }
      `}</style>

      <div className="container mx-auto px-4 py-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">🐾 Pet Record</h1>
            <p className="text-gray-600 text-sm">Manage and know more about your pets</p>
          </div>
          <AddPets setIsAddOpen={setIsAddOpen} isAddOpen={isAddOpen} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="bg-gray-300 p-8 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gray-400 shadow-md mb-4"></div>
                  <div className="h-6 w-32 bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 w-20 bg-gray-400 rounded"></div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="h-12 bg-gray-300 rounded-lg mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          unAuthorisedError === 400 ? (
            <ErrorState400 setIsAddOpen={setIsAddOpen} />
          ) : unAuthorisedError === 401 ? (
            <ErrorState401 />
          ) : unAuthorisedError === 403 ? (
            <ErrorState403 />
          ) : unAuthorisedError === 404 ? (
            <ErrorState404 setIsAddOpen={setIsAddOpen} />
          ) : (
            <p className="text-red-500 text-center">{msg || error}</p>
          )
        ) : petList.length === 0 ? (
          <ErrorState400 setIsAddOpen={setIsAddOpen} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petList.map((pet) => (
              <div
                key={pet.pid}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fadeIn"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#52B2AD]/20 to-transparent rounded-bl-full"></div>
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                  <Hash size={12} className="text-[#52B2AD]" />
                  <span className="text-xs font-semibold text-gray-700">{pet.pid}</span>
                </div>

                <div className="relative bg-gradient-to-br from-[#52B2AD] to-[#42948f] p-8 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                    <img
                      src={PetProfile}
                      alt={pet.petName}
                      className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover bg-white transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                      <PawPrint size={20} className="text-[#52B2AD]" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mt-4 text-center">{pet.petName}</h2>
                  <p className="text-white/90 text-sm font-medium mt-1">{pet.petSpecies}</p>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">Owner</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {typeof pet.owner === "object"
                          ? `${pet.owner?.firstName || ""} ${pet.owner?.lastName || ""}`.trim() || pet.owner?.email || "N/A"
                          : pet.owner || "N/A"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewProfile(pet)}
                    className="w-full bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
                  >
                    <User size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>View Full Profile</span>
                  </button>
                </div>

                <div className="absolute inset-0 border-2 border-[#52B2AD] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddPetModal
        isAddOpen={isAddOpen}
        setIsAddOpen={handleCloseModal}
        onAddPet={handleAddPet}
        editPetData={editPetData}
        onUpdatePet={handleUpdatePet}
      />

      <ProfileModal
        open={open}
        onClose={() => setOpen(false)}
        pet={selectedPet}
        onEditClick={handleEditClick}
        onDeleteSuccess={handleDeleteSuccess}
      />
      
    </div>
  );
}