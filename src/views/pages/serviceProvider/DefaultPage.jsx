import React from 'react'
import { ShieldAlert, Plus } from 'lucide-react'

function KYCRequired() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-[#e6f5f4] via-white to-[#e6f5f4] px-4 pb-16">
      
      <div className="flex flex-col items-center mt-10">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-[#52B2AD] to-[#42948f] rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
            <ShieldAlert size={64} className="text-white" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Plus size={24} className="text-white font-bold" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Complete Your KYC Verification
        </h2>

        <p className="text-gray-600 text-center mb-6 max-w-md">
          Verify your identity to unlock our premium pet care services and ensure a safe experience for you and your pets.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md w-full">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">🐕</div>
            <p className="text-xs text-gray-600">Pet Walker</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">🧠</div>
            <p className="text-xs text-gray-600">Pet Behaviourist</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-2">✂️</div>
            <p className="text-xs text-gray-600">Pet Groomer</p>
          </div>
        </div>

        <div className="mt-8 bg-[#e6f5f4] border-l-4 border-[#52B2AD] p-4 rounded-lg max-w-md">
          <p className="text-[#42948f] font-medium text-sm">
            🔒 Why KYC is Required?
          </p>
          <p className="text-gray-700 text-xs mt-1">
            KYC verification ensures the safety and security of both pet owners and service providers in our community.
          </p>
        </div>

        <p className="text-center text-gray-600 mt-8 text-sm">
          Need help?{" "}
          <button className="text-[#52B2AD] font-medium underline">
            Contact Support
          </button>
        </p>
      </div>

    </div>
  )
}

export default KYCRequired
