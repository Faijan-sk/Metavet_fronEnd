import React from 'react'

const Grooming = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Grooming</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Grooming is Essential */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🧼
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  Grooming & Wellness
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Grooming is Essential to Overall Pet Care
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                As pet parents, we all know that their health & wellness goes
                far beyond clinic visits & vaccines. Grooming is not a luxury,
                but is truly a key part of keeping your furry companion healthy,
                happy & of course beautiful. Keeping a regular grooming schedule
                contributes to overall pet health. Metavet can connect you with
                a skilled groomer who is perfectly suited to your pet's unique
                grooming requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Pet Grooming Services */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            ✂️
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  Our Services
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Pet Grooming Services:
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Flea & Tick Baths</li>
                <li>Bath & Coat Conditioning</li>
                <li>Specialized Shampoo applications</li>
                <li>Post-Bath blow dry & brush out</li>
                <li>Standard Fur Trimming</li>
                <li>Customized coat cutting, trimming, shaping & styling</li>
                <li>Focused attention on facial fur trimming & care</li>
                <li>De-Shedding</li>
                <li>Nail Trimming & Filing</li>
                <li>Ear Cleaning & Excessive Hair removal</li>
                <li>Sanitary Trimming</li>
                <li>Anal Gland Expression</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Grooming
