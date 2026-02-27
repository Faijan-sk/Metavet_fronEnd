import { Image, Plus, Search, User, Users, X, Stethoscope, Award, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useJwt from "../../../enpoints/jwt/useJwt";
import BookAppointmentForm from "../appointment/BokAppointmentForm";
import BookAppointment from "./BookAppointmentModal"

// Modal Component
const Modal = ({ open, onClose, title, children, size = "xl" }) => {
  if (!open) return null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sizeMap = {
    sm: "sm:max-w-md",
    md: "sm:max-w-lg md:max-w-xl",
    lg: "sm:max-w-xl md:max-w-2xl lg:max-w-4xl",
    xl: "md:max-w-3xl lg:max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
<div
  className={`relative z-[101] w-full ${sizeMap[size]} mx-auto rounded-2xl bg-white shadow-2xl`}
>        {(title || title === "") && (
          <div className="sticky top-0 bg-white/80 backdrop-blur border-b px-5 py-4 rounded-t-2xl z-10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button aria-label="Close modal" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
        <div className="px-5 py-6">{children}</div>
      </div>
    </div>
  );
};

// LoadingCard
const LoadingCard = () => (
  <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200" />
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 bg-gray-200 rounded w-32" />
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0" />
      </div>
      <div className="mb-3">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-10 bg-gray-200 rounded" />
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-20 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

// Smooth Loading Spinner for refetching
const RefetchingLoader = () => (
  <div className="flex flex-col items-center justify-center py-24 animate-fadeIn">
    <Loader2 className="w-16 h-16 text-[#52B2AD] animate-spin" />
    <p className="text-gray-600 font-medium mt-4 text-lg">Loading doctors...</p>
  </div>
);

// DoctorCard
const DoctorCard = ({ doctor, onFollow }) => (
  <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative">
      <div className={`w-full h-64 flex items-center justify-center overflow-hidden ${doctor.profileImage ? "" : "bg-gradient-to-br from-[#52B2AD] to-[#42948f]"}`}>
        {doctor.profileImage ? (
          <img src={doctor.profileImage} alt={`Dr. ${doctor.firstName} ${doctor.lastName}`} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <User className="w-24 h-24 text-white opacity-80" strokeWidth={1.5} />
        )}
      </div>
      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
        <Stethoscope className="w-5 h-5 text-[#52B2AD]" />
      </div>
      {doctor.distance && (
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#52B2AD]" />
          <span className="text-sm font-semibold text-gray-900">{doctor.distance} km</span>
        </div>
      )}
    </div>

    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl font-bold text-gray-900 truncate">
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-4 h-4">
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
        {doctor.bio && <p className="text-gray-600 text-sm line-clamp-2">{doctor.bio}</p>}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4 text-[#52B2AD]" />
            <span className="text-sm font-semibold text-gray-900">{doctor.patientCount || 312}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Image className="w-4 h-4 text-[#52B2AD]" />
            <span className="text-sm font-semibold text-gray-900">{doctor.reviewCount || 48}</span>
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

// Search Bar with Distance Filter
const SearchBar = ({ searchQuery, setSearchQuery, maxDistance, setMaxDistance }) => {
  const clearSearch = () => setSearchQuery("");
  const clearDistance = () => setMaxDistance("");

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
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
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-2xl transition-colors duration-200">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Distance Filter */}
        <div className="relative md:w-64">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            placeholder="Max distance (km)"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
            min="0"
            step="0.5"
            className="block w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#52B2AD] focus:border-[#52B2AD] transition-all duration-200 hover:shadow-md"
          />
          {maxDistance && (
            <button onClick={clearDistance} className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-2xl transition-colors duration-200">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || maxDistance) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchQuery && (
            <div className="inline-flex items-center gap-2 bg-[#52B2AD] bg-opacity-10 text-[#52B2AD] px-4 py-2 rounded-full text-sm font-medium">
              <Search className="w-4 h-4" />
              <span>"{searchQuery}"</span>
              <button onClick={clearSearch} className="hover:bg-[#52B2AD] hover:bg-opacity-20 rounded-full p-0.5">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {maxDistance && (
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>Within {maxDistance} km</span>
              <button onClick={clearDistance} className="hover:bg-blue-100 rounded-full p-0.5">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Error states
const ErrorState400 = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="w-32 h-32 bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-full flex items-center justify-center shadow-xl" />
    <h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">No Doctors Available</h2>
  </div>
);

const ErrorState404 = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl" />
    <h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">No Doctors Found</h2>
  </div>
);

const ErrorState500 = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl" />
    <h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">Server Error</h2>
    <button onClick={onRetry} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full">Try Again</button>
  </div>
);

const EmptySearchResults = ({ searchQuery, maxDistance, onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
    <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-xl">
      <Search className="w-16 h-16 text-white" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">No Results Found</h2>
    <p className="text-gray-600 mt-2 text-center">
      {searchQuery && maxDistance && `No doctors found matching "${searchQuery}" within ${maxDistance} km`}
      {searchQuery && !maxDistance && `No doctors found matching "${searchQuery}"`}
      {!searchQuery && maxDistance && `No doctors found within ${maxDistance} km`}
    </p>
    <button onClick={onClear} className="mt-4 bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
      Clear Filters
    </button>
  </div>
);

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Get user location on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // console.log("User Latitude:", lat);
        // console.log("User Longitude:", lng);

        setLatitude(lat);
        setLongitude(lng);
      },
      (error) => {
        console.error("Location Error:", error);
        setLocationError("Location permission denied or unavailable");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      setErrorStatus(null);
      const { data } = await useJwt.getAllDoctors();
      setDoctors(data.data || []);
    } catch (err) {
      const status = err?.response?.status || err?.status;
      setErrorStatus(status);
      setError(err?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors with distance when maxDistance changes
  useEffect(() => {
    const fetchDoctorsWithDistance = async () => {
      // If no distance filter, fetch all doctors
      if (!maxDistance) {
        // If doctors already loaded, use refetching state
        if (doctors.length > 0) {
          setIsRefetching(true);
        } else {
          setLoading(true);
        }
        
        try {
          setError(null);
          setErrorStatus(null);
          const { data } = await useJwt.getAllDoctors();
          setDoctors(data.data || []);
        } catch (err) {
          const status = err?.response?.status || err?.status;
          setErrorStatus(status);
          setError(err?.message || "Failed to fetch doctors");
        } finally {
          setLoading(false);
          setIsRefetching(false);
        }
        return;
      }

      if (!latitude || !longitude) {
        return;
      }

      const distanceValue = parseFloat(maxDistance);
      if (isNaN(distanceValue) || distanceValue <= 0) {
        return;
      }

      try {
        // If doctors already loaded, use refetching state
        if (doctors.length > 0) {
          setIsRefetching(true);
        } else {
          setLoading(true);
        }
        setError(null);
        setErrorStatus(null);
        
        const { data } = await useJwt.getAllDoctorwithDistance(longitude, latitude, maxDistance);
        setDoctors(data.data || []);
      } catch (err) {
        const status = err?.response?.status || err?.status;
        setErrorStatus(status);
        setError(err?.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
        setIsRefetching(false);
      }
    };

    fetchDoctorsWithDistance();
  }, [maxDistance, latitude, longitude]);

  // Filter doctors based on search query only (distance is handled by API)
  useEffect(() => {
    let filtered = doctors;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((doctor) => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        const specialization = doctor.specialization?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || specialization.includes(query);
      });
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleFollow = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setMaxDistance("");
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn {from { opacity: 0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-[#52B2AD]" />
            Find Doctors
          </h1>
          <p className="text-gray-600">Discover qualified healthcare professionals for your pets</p>
          
          {/* Display location info */}
          {/* {latitude && longitude && (
            <div className="mt-2 text-sm text-gray-500">
              Location: {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </div>
          )} */}
          {locationError && (
            <div className="mt-2 text-sm text-red-500">
              {locationError}
            </div>
          )}
        </div>

        {!loading && !error && (
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            maxDistance={maxDistance}
            setMaxDistance={setMaxDistance}
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => <LoadingCard key={index} />)}
          </div>
        ) : isRefetching ? (
          <RefetchingLoader />
        ) : error ? (
          errorStatus === 400 ? <ErrorState400 /> :
          errorStatus === 404 ? <ErrorState404 /> :
          <ErrorState500 onRetry={fetchDoctors} />
        ) : doctors.length === 0 ? (
          <ErrorState400 />
        ) : filteredDoctors.length === 0 && (searchQuery || maxDistance) ? (
          <EmptySearchResults 
            searchQuery={searchQuery} 
            maxDistance={maxDistance}
            onClear={clearAllFilters} 
          />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                {(searchQuery || maxDistance) ? (
                  <>
                    Found{" "}
                    <span className="font-bold text-[#52B2AD]">
                      {filteredDoctors.filter((x) => x?.doctorProfileStatus === "APPROVED").length}
                    </span>{" "}
                    doctor{filteredDoctors.filter((x) => x?.doctorProfileStatus === "APPROVED").length !== 1 ? "s" : ""}
                  </>
                ) : (
                  <>
                    Found{" "}
                    <span className="font-bold text-[#52B2AD]">
                      {doctors.filter((x) => x?.doctorProfileStatus === "APPROVED").length}
                    </span>{" "}
                    doctor{doctors.filter((x) => x?.doctorProfileStatus === "APPROVED").length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors
                .filter((x) => x?.doctorProfileStatus === "APPROVED")
                .map((doctor, index) => (
                  <DoctorCard key={doctor.id || index} doctor={doctor} onFollow={handleFollow} />
                ))}
            </div>
          </>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        size="xl"
        title={
          selectedDoctor
            ? `Book with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}`
            : "Book Appointment"
        }
      >
      <p className="text-lg font-bold text-[#52B2AD]">
         
            <BookAppointment doctor={selectedDoctor} />
          
          </p>
      </Modal>
    </div>
  );
};

export default FindDoctor;