import { Image, Plus, Search, User, Users, X, Stethoscope, Award, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import useJwt from "../../../enpoints/jwt/useJwt";

// LoadingCard - skeleton with grey background
const LoadingCard = () => (
  <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden"></div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
      </div>
      <div className="mb-3">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// DoctorCard with enhanced design
const DoctorCard = ({ doctor, onFollow }) => (
  <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative">
      <div
        className={`w-full h-64 flex items-center justify-center overflow-hidden ${
          doctor.profileImage ? "" : "bg-gradient-to-br from-[#52B2AD] to-[#42948f]"
        }`}
      >
        {doctor.profileImage ? (
          <img
            src={doctor.profileImage}
            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <User className="w-24 h-24 text-white opacity-80" strokeWidth={1.5} />
        )}
      </div>
      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
        <Stethoscope className="w-5 h-5 text-[#52B2AD]" />
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl font-bold text-gray-900 truncate">
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-block bg-[#52B2AD] bg-opacity-10 text-[#52B2AD] text-sm font-semibold px-3 py-1.5 rounded-full">
          {doctor.specialization}
        </span>
      </div>

      <div className="space-y-2 mb-6">
        {doctor.qualification && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Award className="w-4 h-4 flex-shrink-0 text-[#52B2AD]" />
            <span>{doctor.qualification}</span>
          </div>
        )}
        {doctor.bio && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {doctor.bio}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4 text-[#52B2AD]" />
            <span className="text-sm font-semibold text-gray-900">
              {doctor.patientCount || 312}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Image className="w-4 h-4 text-[#52B2AD]" />
            <span className="text-sm font-semibold text-gray-900">
              {doctor.reviewCount || 48}
            </span>
          </div>
        </div>

        <button
          onClick={() => onFollow(doctor)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#52B2AD] to-[#42948f] text-white px-4 py-2 rounded-lg font-medium hover:from-[#42948f] hover:to-[#52B2AD] focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:ring-offset-2 transition-all duration-200 text-sm transform hover:scale-105"
        >
          Book
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Search Bar Component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition-all duration-200 hover:shadow-md"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-2xl transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-md border animate-fadeIn">
          <span className="font-medium">Searching for:</span> "{searchQuery}"
        </div>
      )}
    </div>
  );
};

// Enhanced Error States
const ErrorState400 = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-full flex items-center justify-center shadow-xl">
        <Stethoscope size={64} className="text-white" strokeWidth={1.5} />
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Doctors Available</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      We're currently updating our doctor profiles. Please check back soon!
    </p>
    
    <button className="bg-gradient-to-r from-[#52B2AD] to-[#42948f] hover:from-[#42948f] hover:to-[#52B2AD] text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-semibold">
      Refresh Page
    </button>
  </div>
);

const ErrorState404 = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
        <Search size={64} className="text-white animate-search" strokeWidth={1.5} />
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Doctors Found</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      We couldn't find any doctors matching your search. Try different keywords!
    </p>
    
    <div className="flex gap-3">
      <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-semibold">
        Clear Search
      </button>
      <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full shadow-lg transition-all font-semibold">
        View All
      </button>
    </div>
  </div>
);

const ErrorState500 = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl animate-shake">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Server Error</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      Something went wrong on our end. Please try again in a moment.
    </p>
    
    <button
      onClick={onRetry}
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-semibold"
    >
      Try Again
    </button>
    
    <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
      <p className="text-sm text-red-800 text-center">
        <span className="font-semibold">Error Code:</span> 500 - Internal Server Error
      </p>
    </div>
  </div>
);

const EmptySearchResults = ({ searchQuery, onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="relative mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-xl">
        <Search size={64} className="text-white" strokeWidth={1.5} />
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">No Results Found</h2>
    <p className="text-gray-600 text-center mb-6 max-w-md">
      No doctors match "<span className="font-semibold text-gray-800">{searchQuery}</span>". Try searching by name or specialization.
    </p>
    
    <button
      onClick={onClear}
      className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-semibold"
    >
      Clear Search
    </button>
  </div>
);

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doctor) => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        const specialization = doctor.specialization?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        return fullName.includes(query) || specialization.includes(query);
      });
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      setErrorStatus(null);

      const { data } = await useJwt.getAllDoctors();
      setDoctors(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      const status = error?.response?.status || error?.status;
      setErrorStatus(status);
      setError(error.message || "Failed to fetch doctors");
      setLoading(false);
    }
  };

  const handleFollow = (doctor) => {
    console.log("Booking appointment with:", doctor);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-search { animation: search 2s ease-in-out infinite; }
      `}</style>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-[#52B2AD]" />
            Find Doctors
          </h1>
          <p className="text-gray-600">
            Discover qualified healthcare professionals for your pets
          </p>
        </div>

        {!loading && !error && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : error ? (
          errorStatus === 400 ? (
            <ErrorState400 />
          ) : errorStatus === 404 ? (
            <ErrorState404 />
          ) : errorStatus === 500 ? (
            <ErrorState500 onRetry={fetchDoctors} />
          ) : (
            <ErrorState500 onRetry={fetchDoctors} />
          )
        ) : doctors.length === 0 ? (
          <ErrorState400 />
        ) : filteredDoctors.length === 0 && searchQuery ? (
          <EmptySearchResults 
            searchQuery={searchQuery} 
            onClear={() => setSearchQuery("")}
          />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                {searchQuery ? (
                  <>
                    Found{" "}
                    <span className="font-bold text-[#52B2AD]">
                      {filteredDoctors.filter((x) => x?.doctorProfileStatus === "APPROVED").length}
                    </span>{" "}
                    doctor{filteredDoctors.length !== 1 ? "s" : ""}
                    <span className="font-medium"> matching "{searchQuery}"</span>
                  </>
                ) : (
                  <>
                    Found{" "}
                    <span className="font-bold text-[#52B2AD]">
                      {doctors.filter((x) => x?.doctorProfileStatus === "APPROVED").length}
                    </span>{" "}
                    doctor{doctors.length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors
                .filter((x) => x?.doctorProfileStatus === "APPROVED")
                .map((doctor, index) => (
                  <DoctorCard
                    key={doctor.id || index}
                    doctor={doctor}
                    onFollow={handleFollow}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;