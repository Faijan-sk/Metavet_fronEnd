import React from 'react'

const FAQ = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Bloodwork</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Introduction */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🩸
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                  Why Blood Tests?
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Importance of Blood Tests
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Blood tests are an essential part of diagnosing what is ailing
                your pet, just as they are in human medicine. Blood tests can
                tell the veterinarian a myriad of things, from dehydration to
                anemia.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Common Blood Tests */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🧪
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  Common Tests
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Common Blood Tests Used by Veterinarians
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Red blood cells are used to determine several factors. The
                packed red blood cell count can detect a condition called
                polycythemia. A high count indicates dehydration, while a low
                count can be an indicator of anemia. The hemoglobin
                concentration test measures the oxygen-carrying capacity of your
                pet's blood, and the red blood cell count can tell your vet how
                well your pet's body is functioning.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Testing white blood cells is equally as useful. A high white
                blood cell count is indicative of infection, whereas a low count
                can mean a weakened immune system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
