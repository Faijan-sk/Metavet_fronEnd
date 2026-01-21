import React, { useEffect, useState } from 'react';
import { Search, X, MapPin, Dog, Star, Award, Clock, Heart, MessageCircle, Phone, Footprints } from "lucide-react";
import KycWarning from "./../KycWarning"
import MainPage from "./../DefaultPage"
import useJwt from "./../../../../enpoints/jwt/useJwt"

// DefaultPage Component
function DefaultPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-[#52B2AD]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Footprints className="w-10 h-10 text-[#52B2AD]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification in Progress</h2>
        <p className="text-gray-600">Your account is being verified. Please check back soon!</p>
      </div>
    </div>
  );
}

// WalkerCard Component
function WalkerCard({ walker, onFavorite, isFavorite }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white text-xs font-bold rounded-full shadow-lg">
          {walker.badge}
        </span>
      </div>

      <button
        onClick={() => onFavorite(walker.id)}
        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
      >
        <Heart 
          className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <div className="relative h-48 bg-gradient-to-br from-[#52B2AD]/10 to-[#459d99]/10 flex items-center justify-center overflow-hidden">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-[#52B2AD] to-[#459d99] border-4 border-white shadow-xl transition-transform duration-300 flex items-center justify-center ${isHovered ? 'scale-110' : ''}`}>
          <span className="text-4xl font-bold text-white">
            {walker.name ? walker.name.split(' ').map(n => n[0]).join('') : 'W'}
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4">
          {walker.available ? (
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
          {walker.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{walker.specialization}</p>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{walker.rating}</span>
            <span className="text-xs text-gray-500">({walker.reviews})</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-[#52B2AD]" />
            <span className="font-semibold">{walker.distance} km</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <Clock className="w-4 h-4 text-[#52B2AD]" />
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="text-sm font-bold text-gray-900">{walker.experience}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <Award className="w-4 h-4 text-[#52B2AD]" />
            <div>
              <p className="text-xs text-gray-500">Per Walk</p>
              <p className="text-sm font-bold text-gray-900">{walker.price}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Services:</p>
          <div className="flex flex-wrap gap-1">
            {walker.services && walker.services.map((service, idx) => (
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
          <button className="flex-1 py-3 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
            Book Walk
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

// Main Index Component
function Index({ location }) {
  const [kycStatus, setKycStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("10"); // Default distance
  const [favorites, setFavorites] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Geolocation States
  const [coords, setCoords] = useState({ lat: null, lng: null });

  const kycUrl = '/walkerTo-client-Kyc';

  const clearSearch = () => setSearchQuery("");
  const clearDistance = () => setMaxDistance("10");

  const toggleFavorite = (walkerId) => {
    setFavorites(prev => 
      prev.includes(walkerId) 
        ? prev.filter(id => id !== walkerId)
        : [...prev, walkerId]
    );
  };

  // 1. Get User Location on Mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString()
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback static location if user denies permission
          setCoords({ lat: '20.007351', lng: '73.763711' });
        }
      );
    }
  }, []);

  // 2. Fetch Data when Coords or Distance changes
  useEffect(() => {
    const fetchData = async () => {
      // Don't fetch until we have coordinates
      if (!coords.lat || !coords.lng) return;

      try {
        setLoading(true);
        
        // Fetch KYC Status (Once is enough, but kept here as per original flow)
        const kycResponse = await useJwt.getStatusWalkerToClientKyc();
        setKycStatus(kycResponse.data.data.status);

        // API Call with Dynamic Lat, Lng and Distance
        const walkersResponse = await useJwt.getAllWalkerByDistance(
          coords.lat, 
          coords.lng, 
          '0', 
          maxDistance || '10' // Fallback to 10 if empty
        );

        if (walkersResponse.data.success) {
          const rawData = walkersResponse.data.data.content;
          
          const mappedWalkers = rawData.map((item) => ({
            id: item.uid,
            name: item.fullName,
            specialization: item.serviceType ? item.serviceType.replace('_', ' ') : "Professional Walker",
            experience: `${item.yearsExperience || 0} years`,
            rating: 4.8, 
            reviews: 15,
            distance: item.distanceKm ? item.distanceKm.toFixed(1) : "0.0",
            price: "₹200-500", 
            available: true,
            badge: item.yearsExperience > 5 ? "Expert" : "New",
            services: ["Dog Walking", "Pet Sitting"]
          }));

          setWalkers(mappedWalkers);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coords, maxDistance]); // Re-run when location or distance input changes

  // Client-side search filtering (Distance is already filtered by API)
  const filteredWalkers = walkers.filter(walker => {
    return !searchQuery || 
      walker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      walker.specialization.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (kycStatus === 'CANCELLED' || kycStatus === 'NOT_FOUND') {
    return <><KycWarning kycUrl={kycUrl} /><MainPage /></>;
  }

  if (kycStatus === 'PENDING') {
    return <DefaultPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#52B2AD] to-[#459d99] rounded-2xl shadow-lg">
              <Footprints className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#52B2AD] to-[#459d99] bg-clip-text text-transparent mb-3">
            Find Your Perfect Walker
          </h1>
          <p className="text-gray-600 text-lg">Showing results for your current location</p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-[#52B2AD]" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#52B2AD] focus:ring-4 focus:ring-[#52B2AD]/10 transition-all"
                />
              </div>

              {/* Distance Input - Triggers API call on change */}
              <div className="relative md:w-72">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MapPin className="h-6 w-6 text-[#52B2AD]" />
                </div>
                <input
                  type="number"
                  placeholder="Max km"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  min="1"
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

        <div className="mb-8 text-center">
          <p className="text-gray-600 text-xl">
            Found <span className="font-bold text-[#52B2AD] text-2xl">{filteredWalkers.length}</span> amazing walkers near you
          </p>
        </div>

        {loading ? (
           <div className="text-center py-20">
             <div className="w-16 h-16 border-4 border-[#52B2AD] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-gray-500 text-xl">Updating walkers list...</p>
           </div>
        ) : filteredWalkers.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl mb-4">No walkers found in {maxDistance}km</p>
            <button onClick={() => { clearSearch(); setMaxDistance("50"); }} className="px-8 py-3 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white rounded-xl font-semibold">
              Try Larger Radius
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWalkers.map((walker) => (
              <WalkerCard 
                key={walker.id} 
                walker={walker}
                onFavorite={toggleFavorite}
                isFavorite={favorites.includes(walker.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;