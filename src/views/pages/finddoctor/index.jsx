import { Image, Plus, Search, User, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import useJwt from "../../../enpoints/jwt/useJwt";

// LoadingCard - skeleton with grey background
const LoadingCard = () => (
  <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-pulse">
    {/* Image Section */}
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden"></div>

    {/* Content Section */}
    <div className="p-6">
      {/* Name and Verification */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
      </div>

      {/* Specialization */}
      <div className="mb-3">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>

      {/* Doctor Details */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Stats and Action Button */}
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

// DoctorCard - profile background #94ece7 if no image
const DoctorCard = ({ doctor, onFollow }) => (
  <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    {/* Image Section */}
    <div className="relative">
      <div
        className={`w-full h-64 flex items-center justify-center overflow-hidden ${
          doctor.profileImage ? "" : "bg-grey-200"
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
          <User className="w-20 h-20 text-gray-400" />
        )}
      </div>
    </div>

    {/* Content Section */}
    <div className="p-6">
      {/* Name and Verification */}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl font-bold text-gray-900 truncate">
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Specialization */}
      <div className="mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {doctor.specialization}
        </span>
      </div>

      {/* Doctor Details */}
      <div className="space-y-2 mb-6">
        {doctor.qualification && (
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Qualification:</span>{" "}
            {doctor.qualification}
          </p>
        )}
        {doctor.bio && (
          <p className="text-gray-600 text-sm line-clamp-2">
            <span className="font-medium">About:</span> {doctor.bio}
          </p>
        )}
      </div>

      {/* Stats and Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-900">
              {doctor.patientCount || 312}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Image className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-900">
              {doctor.reviewCount || 48}
            </span>
          </div>
        </div>

        <button
          onClick={() => onFollow(doctor)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 text-sm"
        >
          Appointment
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
          className="block w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:shadow-md"
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
        <div className="absolute top-full left-0 right-0 mt-1 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border">
          <span className="font-medium">Searching for:</span> "{searchQuery}"
        </div>
      )}
    </div>
  );
};

// Empty Search Results
const EmptySearchResults = ({ searchQuery }) => (
  <div className="text-center py-12">
    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
    <p className="text-gray-500">
      No doctors match "{searchQuery}". Try searching by name or specialization.
    </p>
  </div>
);

// Empty State
const EmptyState = () => (
  <div className="text-center py-12">
    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
    <p className="text-gray-500">Try adjusting your search criteria</p>
  </div>
);

// Error State
const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <div className="text-red-500 mb-4">
      <svg
        className="w-16 h-16 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-500 mb-4">{error}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter doctors based on search query
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

      const { data } = await useJwt.getAllDoctors();
      setDoctors(data.data || []);

      // Remove artificial delay
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error.message || "Failed to fetch doctors");
      setLoading(false);
    }
  };

  const handleFollow = (doctor) => {
    console.log("Following doctor:", doctor);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Doctors
          </h1>
          <p className="text-gray-600">
            Discover qualified healthcare professionals
          </p>
        </div>

        {/* Search Bar */}
        {!loading && !error && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorState error={error} onRetry={fetchDoctors} />
        ) : doctors.length === 0 ? (
          <EmptyState />
        ) : filteredDoctors.length === 0 && searchQuery ? (
          <EmptySearchResults searchQuery={searchQuery} />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {searchQuery ? (
                  <>
                    Found{" "}
                    {
                      filteredDoctors.filter(
                        (x) => x?.doctorProfileStatus === "APPROVED"
                      ).length
                    }{" "}
                    doctor{filteredDoctors.length !== 1 ? "s" : ""}
                    {searchQuery && (
                      <span className="font-medium">
                        {" "}
                        matching "{searchQuery}"
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    Found{" "}
                    {
                      doctors.filter(
                        (x) => x?.doctorProfileStatus === "APPROVED"
                      ).length
                    }{" "}
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
