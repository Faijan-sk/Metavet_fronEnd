import React from 'react'

import { Stethoscope, Camera, FileText, Building2, CheckCircle2, Sparkles, ArrowRight,Plus } from 'lucide-react'


function DoctorProfileIncomplete() {
  return (
    <div className="flex flex-col bg-gradient-to-br  px-4 pb-16">
      
      <div className="flex flex-col items-center mt-10">

        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-teal-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse"></div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce-slow">
            <Stethoscope size={64} className="text-white drop-shadow-lg" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center shadow-xl animate-pulse hover:animate-spin transition-all cursor-pointer">
            <Sparkles size={28} className="text-white font-bold" />
          </div>
        </div>

        

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Complete Your Doctor Profile
        </h2>

        {/* Main Icon with Floating Animation */}
        

        <p className="text-gray-600 text-center mb-6 max-w-md">
          Set up your professional profile to start providing veterinary services and connect with pet owners in need.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md w-full">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">👨‍⚕️</div>
            <p className="text-xs text-gray-600">Add Details</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-xs text-gray-600">Credentials</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">🏥</div>
            <p className="text-xs text-gray-600">Clinic Info</p>
          </div>
        </div>

        <div className="mt-8 bg-[#e8f4ff] border-l-4 border-[#4A90E2] p-4 rounded-lg max-w-md">
          <p className="text-[#357ABD] font-medium text-sm">
            ℹ️ Why Complete Your Profile?
          </p>
          <p className="text-gray-700 text-xs mt-1">
            A complete profile builds trust with pet owners and helps them find the right veterinary care for their pets.
          </p>
        </div>

        {/* <p className="text-center text-gray-600 mt-8 text-sm">
          Need help?{" "}
          <button className="text-[#4A90E2] font-medium underline">
            Contact Support
          </button>
        </p> */}
      </div>

    </div>
  )
}

export default DoctorProfileIncomplete