import { Calendar, Hash, PawPrint, User, Plus, Lock, ShieldAlert, Search } from "lucide-react";
import { useEffect, useState } from "react";

// Mock functions for demonstration
const useJwt = {
  getAllPetsByOwner: async () => {
    // Simulate different error scenarios for demo
    // Change the status to test: 400, 401, 403, 404
    const status = 400;
    throw { response: { status }, status };
  }
};

const AddPets = ({ setIsAddOpen, isAddOpen }) => (
  <button 
    onClick={() => setIsAddOpen(true)}
    className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-4 py-2 rounded-lg shadow-md transition flex items-center gap-2"
  >
    <Plus size={20} />
    Add Pet
  </button>
);

const PetProfile = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2352B2AD'/%3E%3C/svg%3E";

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
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row animate-pulse"
              >
                <div className="bg-gray-300 flex flex-col items-center justify-center p-4 md:w-1/4 space-y-2">
                  <div className="w-28 h-28 rounded-full bg-gray-400 shadow-md"></div>
                  <div className="h-4 w-20 bg-gray-400 rounded"></div>
                  <div className="h-3 w-16 bg-gray-400 rounded"></div>
                </div>
                <div className="flex-1 p-4 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-1">
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                      <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                  <div className="pt-3 flex gap-2 justify-end">
                    <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
                    <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
                  </div>
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
          petList.map((pet) => (
            <div
              key={pet.pid}
              className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row mb-4"
            >
              <div className="bg-gradient-to-br from-[#52B2AD] to-[#42948f] text-white flex flex-col items-center justify-center p-4 md:w-1/4">
                <img
                  src={PetProfile}
                  alt="Pet"
                  className="w-28 h-28 rounded-full shadow-lg border-4 border-white shadow-md mb-2 object-cover bg-white"
                />
                <h2 className="text-lg font-semibold leading-tight">{pet.petName}</h2>
                <p className="text-xs opacity-90">{pet.petSpecies}</p>
              </div>
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
    </div>
  );
}