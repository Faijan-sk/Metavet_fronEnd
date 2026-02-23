import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Scissors, Star, Award, Clock, Heart, MessageCircle, Phone, Sparkles, CalendarDays } from "lucide-react";
import KycWarning from "./../KycWarning"
import MainPage from "./../DefaultPage"
import useJwt from "./../../../../enpoints/jwt/useJwt"
import GroomerBookingModal from './BookingModal';

// Default Page Component
function DefaultPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-[#52B2AD]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-[#52B2AD]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification in Progress</h2>
        <p className="text-gray-600">Your account is being verified. Please check back soon!</p>
      </div>
    </div>
  );
}

// ─── Groomer Card Component ────────────────────────────────────────────────────
function GroomerCard({ groomer, onFavorite, isFavorite, onBook }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white text-xs font-bold rounded-full shadow-lg">
          {groomer.badge}
        </span>
      </div>

      <button
        onClick={() => onFavorite(groomer.id)}
        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <div className="relative h-48 bg-gradient-to-br from-[#52B2AD]/10 to-[#459d99]/10 flex items-center justify-center overflow-hidden">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-[#52B2AD] to-[#459d99] border-4 border-white shadow-xl transition-transform duration-300 flex items-center justify-center ${isHovered ? 'scale-110' : ''}`}>
          <span className="text-4xl font-bold text-white">
            {groomer.name ? groomer.name.split(' ').map(n => n[0]).join('') : 'G'}
          </span>
        </div>

        <div className="absolute bottom-4 right-4">
          {groomer.available ? (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Available
            </span>
          ) : (
            <span className="px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded-full">
              Busy
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#52B2AD] transition-colors">
          {groomer.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{groomer.specialization}</p>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{groomer.rating}</span>
            <span className="text-xs text-gray-500">({groomer.reviews})</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-[#52B2AD]" />
            <span className="font-semibold">{groomer.distance} km</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <Clock className="w-4 h-4 text-[#52B2AD]" />
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="text-sm font-bold text-gray-900">{groomer.experience}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <Award className="w-4 h-4 text-[#52B2AD]" />
            <div>
              <p className="text-xs text-gray-500">Price Range</p>
              <p className="text-sm font-bold text-gray-900">{groomer.price}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Services:</p>
          <div className="flex flex-wrap gap-1">
            {groomer.services && groomer.services.map((service, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#52B2AD]/10 text-[#52B2AD] text-xs rounded-lg font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onBook(groomer)}
            className="flex-1 py-3 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Book Now
          </button>
          <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-[#52B2AD] hover:bg-[#52B2AD]/5 transition-all duration-200 group">
            <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-[#52B2AD]" />
          </button>
          <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-[#52B2AD] hover:bg-[#52B2AD]/5 transition-all duration-200 group">
            <Phone className="w-5 h-5 text-gray-600 group-hover:text-[#52B2AD]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Index Component ──────────────────────────────────────────────────────
function Index({ location }) {
  const [kycStatus, setKycStatus] = useState('NOT_FOUND');
  const [groomers, setGroomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Booking modal state
  const [selectedGroomer, setSelectedGroomer] = useState(null);

  // User location
  const [userCoords, setUserCoords] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const kycUrl = '/groomerTo-client-kyc';

  const clearSearch = () => setSearchQuery("");
  const clearDistance = () => setMaxDistance("");

  const toggleFavorite = (groomerId) => {
    setFavorites(prev =>
      prev.includes(groomerId)
        ? prev.filter(id => id !== groomerId)
        : [...prev, groomerId]
    );
  };

  const openBookingModal = (groomer) => setSelectedGroomer(groomer);
  const closeBookingModal = () => setSelectedGroomer(null);

  // 1. Fetch User KYC Status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await useJwt.getStatusGroomerToClient();
        setKycStatus(response.data.data.status);
      } catch (error) {
        console.error("Error fetching KYC status:", error);
      }
    };
    fetchStatus();
  }, []);

  // 2. Fetch User Geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Please enable location services to find groomers near you.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  // 3. Fetch Groomers from API
  useEffect(() => {
    const fetchGroomers = async () => {
      if (!userCoords.lat || !userCoords.lng) return;

      setIsLoading(true);
      try {
        const distanceToSend = maxDistance ? maxDistance : '50';

        const response = await useJwt.getAllGroomerByDistance(
          userCoords.lat,
          userCoords.lng,
          '0',
          distanceToSend
        );

        if (response?.data?.success) {
          const backendData = response.data.data.content;

          const mappedGroomers = backendData.map(item => ({
            id: item.uid,
            name: item.fullName || item.businessName,
            specialization: item.serviceType ? item.serviceType.replace(/_/g, ' ') : "Specialist",
            experience: `${item.yearsExperience} years`,
            rating: 4.8,
            reviews: Math.floor(Math.random() * 100),
            distance: parseFloat(item.distanceKm).toFixed(1),
            price: "Contact for Price",
            available: true,
            profileStatus: "APPROVED",
            badge: item.yearsExperience > 4 ? "Expert" : "Certified",
            services: item.servicesOffered.map(s =>
              s.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            )
          }));

          setGroomers(mappedGroomers);
        }
      } catch (error) {
        console.error("Error fetching groomers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchGroomers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userCoords, maxDistance]);

  // Client-side filtering
  const filteredGroomers = groomers.filter(groomer => {
    return !searchQuery ||
      groomer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      groomer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Render Logic
  if (kycStatus === 'CANCELLED' || kycStatus === 'NOT_FOUND') {
    return (
      <>
        <KycWarning kycUrl={kycUrl} />
        <MainPage />
      </>
    );
  }

  if (kycStatus === 'PENDING') {
    return <DefaultPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* ─── Groomer Booking Modal ─── */}
      <GroomerBookingModal
        groomer={selectedGroomer}
        isOpen={!!selectedGroomer}
        onClose={closeBookingModal}
      />

      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="relative mb-10 text-center">

          {/* My Appointments Button - Top Right */}
          <button
            onClick={() => navigate('/groomer-appointments')}
            className="absolute top-0 right-0 flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#52B2AD] text-[#52B2AD] rounded-2xl font-semibold hover:bg-[#52B2AD] hover:text-white transition-all duration-200 shadow-md"
          >
            <CalendarDays className="w-5 h-5" />
            My Appointments
          </button>

          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#52B2AD] to-[#459d99] rounded-2xl shadow-lg">
              <Scissors className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#52B2AD] to-[#459d99] bg-clip-text text-transparent mb-3">
            Find Your Perfect Groomer
          </h1>
          <p className="text-gray-600 text-lg">Discover qualified grooming professionals for your beloved pets</p>

          {locationError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg inline-block">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {locationError}
              </p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">

              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-[#52B2AD]" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#52B2AD] focus:ring-4 focus:ring-[#52B2AD]/10 transition-all"
                />
                {searchQuery && (
                  <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70">
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                )}
              </div>

              <div className="relative md:w-72">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MapPin className="h-6 w-6 text-[#52B2AD]" />
                </div>
                <input
                  type="number"
                  placeholder="Max distance (km)"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  min="0"
                  step="1"
                  className="block w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#52B2AD] focus:ring-4 focus:ring-[#52B2AD]/10 transition-all"
                />
                {maxDistance && (
                  <button onClick={clearDistance} className="absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70">
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#52B2AD] mx-auto"></div>
            <p className="mt-4 text-gray-500">Searching groomers near you...</p>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600 text-xl">
                Found{" "}
                <span className="font-bold text-[#52B2AD] text-2xl">
                  {filteredGroomers.length}
                </span>{" "}
                amazing groomer{filteredGroomers.length !== 1 ? "s" : ""}
                {maxDistance ? ` within ${maxDistance} km` : " near you"}
              </p>
            </div>

            {filteredGroomers.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-gray-500 text-xl mb-4">No groomers found matching your criteria</p>
                {(searchQuery || maxDistance) && (
                  <button
                    onClick={() => { clearSearch(); clearDistance(); }}
                    className="px-8 py-3 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGroomers.map((groomer) => (
                  <GroomerCard
                    key={groomer.id}
                    groomer={groomer}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(groomer.id)}
                    onBook={openBookingModal}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Index;