import React, { useEffect, useState, useCallback } from 'react';
import { Search, MapPin, Brain, Star, Award, Clock, Heart, Phone, Sparkles, Loader2 } from "lucide-react";
import KycWarning from '../KycWarning'
import MainPage from "./../DefaultPage"
import useJwt from "./../../../../enpoints/jwt/useJwt"
import BookingModal from "./BookingModal"  // ✅ Fixed: was imported as BookSessionModal but used as BookingModal

// --- DefaultPage Component (Verification Progress) ---
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

// --- BehaviouristCard Component ---
function BehaviouristCard({ behaviourist, onFavorite, isFavorite, onBookSession }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTag = (text) => text.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');

  return (
    <div 
      className="group relative bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white text-xs font-bold rounded-full shadow-lg">
          {behaviourist.yearsExperience > 5 ? 'Expert' : 'Certified'}
        </span>
      </div>

      <button
        onClick={() => onFavorite(behaviourist.uid)}
        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
      >
        <Heart 
          className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <div className="relative h-48 bg-gradient-to-br from-[#52B2AD]/10 to-[#459d99]/10 flex items-center justify-center overflow-hidden">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-[#52B2AD] to-[#459d99] border-4 border-white shadow-xl transition-transform duration-300 flex items-center justify-center ${isHovered ? 'scale-110' : ''}`}>
          <span className="text-4xl font-bold text-white">
            {behaviourist.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Active
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#52B2AD] transition-colors truncate">
          {behaviourist.fullName}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{formatTag(behaviourist.serviceType)}</p>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">4.9</span>
            <span className="text-xs text-gray-500">(New)</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-[#52B2AD]" />
            <span className="font-semibold">{behaviourist.distanceKm.toFixed(1)} km</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <Clock className="w-4 h-4 text-[#52B2AD]" />
            <div>
              <p className="text-xs text-gray-500">Exp.</p>
              <p className="text-sm font-bold text-gray-900">{behaviourist.yearsExperience} Years</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
            <Award className="w-4 h-4 text-[#52B2AD]" />
            <div>
              <p className="text-xs text-gray-500">Radius</p>
              <p className="text-sm font-bold text-gray-900">{behaviourist.serviceArea} km</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-1 h-14 overflow-hidden">
            {behaviourist.specializations.map((area, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-[#52B2AD]/10 text-[#52B2AD] text-[10px] rounded-lg font-medium"
              >
                {formatTag(area)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onBookSession(behaviourist)}
            className="flex-1 py-3 bg-gradient-to-r from-[#52B2AD] to-[#459d99] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Book Session
          </button>
          <a href={`tel:${behaviourist.phoneNumber}`} className="p-3 border-2 border-gray-200 rounded-xl hover:border-[#52B2AD] hover:bg-[#52B2AD]/5 transition-all duration-200 group">
            <Phone className="w-5 h-5 text-gray-600 group-hover:text-[#52B2AD]" />
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Main Index Component ---
function Index() {
  const [kycStatus, setKycStatus] = useState('NOT_FOUND');
  const [behaviourists, setBehaviourists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [coords, setCoords] = useState({ lat: '20.00734825160445', lng: '73.7637480064178' });
  const [selectedBehaviourist, setSelectedBehaviourist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const kycUrl = '/behaviouristTo-client-kyc';

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBookSession = (behaviourist) => {
    setSelectedBehaviourist(behaviourist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBehaviourist(null);
  };

  const loadData = useCallback(async (lat, lng, distance) => {
    try {
      setLoading(true);
      const kycRes = await useJwt.getKycStatusBehaviouristToClinet();
      setKycStatus(kycRes.data.data.status);

      const response = await useJwt.getAllBehaviouristByDistance(
        lat.toString(),
        lng.toString(),
        '0',
        distance || '1000'
      );
      
      if (response.data.success) {
        setBehaviourists(response.data.data.content);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude.toString();
          const newLng = position.coords.longitude.toString();
          setCoords({ lat: newLat, lng: newLng });
          loadData(newLat, newLng, maxDistance);
        },
        (error) => {
          console.error("Geolocation error:", error);
          loadData(coords.lat, coords.lng, maxDistance);
        }
      );
    } else {
      loadData(coords.lat, coords.lng, maxDistance);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (maxDistance) {
        loadData(coords.lat, coords.lng, maxDistance);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [maxDistance, coords.lat, coords.lng, loadData]);

  const filteredBehaviourists = behaviourists.filter(b => {
    const matchesSearch = !searchQuery || 
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  if (loading && behaviourists.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#52B2AD] animate-spin" />
      </div>
    );
  }

  if (kycStatus === 'REJECTED' || kycStatus === 'NOT_FOUND') {
    return <><KycWarning kycUrl={kycUrl} /><MainPage /></>;
  }

  if (kycStatus === 'PENDING') return <DefaultPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#52B2AD] to-[#459d99] rounded-2xl shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#52B2AD] to-[#459d99] bg-clip-text text-transparent mb-3">
            Find Expert Behaviourists
          </h1>
          <p className="text-gray-600 text-lg">Connected to your live location</p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-[#52B2AD]" />
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#52B2AD] transition-all"
                />
              </div>
              <div className="relative md:w-72">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-[#52B2AD]" />
                <input
                  type="number"
                  placeholder="Max distance (km)"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  className="block w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#52B2AD] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredBehaviourists.length === 0 ? (
          <div className="text-center py-20">
            {loading ? (
              <Loader2 className="w-12 h-12 text-[#52B2AD] animate-spin mx-auto" />
            ) : (
              <>
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl">No behaviourists found within {maxDistance}km</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBehaviourists.map((b) => (
              <BehaviouristCard 
                key={b.uid} 
                behaviourist={b}
                onFavorite={toggleFavorite}
                isFavorite={favorites.includes(b.uid)}
                onBookSession={handleBookSession}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ BookingModal - correct component name matches import */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        behaviourist={selectedBehaviourist}
      />
    </div>
  );
}

export default Index;