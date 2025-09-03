import React from 'react'

const WhatExpect = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">What to Expect</h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🩺
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                Veterinary Conditions
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinary care is crucial and effective for a wide variety of
                conditions. The following is a partial list of some of the most
                common. If you do not see your pet's specific condition listed,
                we encourage you to give us a call so we can personally address
                your particular concerns.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                <li>Pet Health</li>
                <li>Chronic Conditions</li>
                <li>Digestive and Oral Health</li>
                <li>Diseases and Viruses</li>
                <li>Pests and Parasites</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            💻
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Telemedicine Benefits
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Using telemedicine for your pet allows you to consult with a
                veterinarian from the comfort of your home. You can discuss
                symptoms, ask questions, and receive care guidance. It’s ideal
                for non-emergency situations, but your vet may suggest in-person
                visits if necessary.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🐶
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full">
                Commitment to Care
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe you & your pet deserve high quality animal care from
                anywhere. Our goal is to provide easier access to veterinary
                care, grooming, training, nutrition, end-of-life services, and
                more. Download the app to explore all services.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📅
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Annual Check-ins
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Telemedicine doesn't replace physical exams. Plan for annual
                visits for vaccines, parasite prevention, and wellness checks.
                Metavet helps you connect quickly with the right professionals
                for your pet’s needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatExpect
