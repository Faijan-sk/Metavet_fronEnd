import React from 'react'

const ParasitePrevention = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Parasite Prevention
      </h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Flea Info */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🐛
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Flea Issues
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Fleas can lead to flea allergy dermatitis, causing itching,
                sores, and hair loss. They can also carry tapeworm eggs, which
                may infect your pet if ingested. Severe infestations may cause
                anemia — this is a medical emergency.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Tick Info */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🕷️
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                Tick Dangers
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ticks spread bacteria causing diseases like Lyme disease, Rocky
                Mountain spotted fever, and zoonosis. These can lead to symptoms
                like joint pain, vomiting, appetite loss, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 - Types of Medication */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            💊
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Flea Prevention Options
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-3 text-gray-600 leading-relaxed">
                <li>
                  <strong>Flea Collars:</strong> Worn around the neck. Kills on
                  contact.
                </li>
                <li>
                  <strong>Oral Tablets:</strong> Given monthly. Parasites die
                  after ingestion.
                </li>
                <li>
                  <strong>Spot-on Treatments:</strong> Applied to the skin.
                  Kills on contact.
                </li>
                <li>
                  <strong>Sprays:</strong> Used during active infestations to
                  kill pests on fur.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 - CTA */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📲
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Take Action
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Download the Metavet App to connect with a professional today
                for the best advice on Flea & Tick Prevention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParasitePrevention
