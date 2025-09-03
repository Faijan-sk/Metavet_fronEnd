import React from 'react'

const Nutrition = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pet Nutrition Guide
      </h1>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🍽️
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                Why Nutrition Matters
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Proper nutrition is one of the cornerstones of your pet's health
                and well-being. Just like humans, pets need a balanced diet
                tailored to their age, breed, lifestyle, and health conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧠
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Key Benefits
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600 leading-relaxed">
                <li>Boosts energy and vitality</li>
                <li>Promotes skin & coat health</li>
                <li>Supports healthy weight management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🥗
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                Choosing the Right Food
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600 leading-relaxed">
                <li>Puppies & Kittens: Nutrient-dense food for growth</li>
                <li>Adults: Balanced diet for daily health</li>
                <li>Seniors: Joint-friendly and anti-inflammatory foods</li>
                <li>Breed-Specific: Customized to breed needs</li>
                <li>Medical Conditions: Vet-approved prescription diets</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🥣
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Food Types
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600 leading-relaxed">
                <li>
                  <strong>Dry Food:</strong> Good for dental health
                </li>
                <li>
                  <strong>Wet Food:</strong> Adds moisture to diet
                </li>
                <li>
                  <strong>Raw Diet:</strong> Vet-guided raw feeding
                </li>
                <li>
                  <strong>Prescription:</strong> Targeted for health issues
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 5 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            ⚠️
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-red-700 bg-red-100 px-3 py-1 rounded-full">
                Common Issues
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600 leading-relaxed">
                <li>
                  <strong>Obesity:</strong> Leads to serious health problems
                </li>
                <li>
                  <strong>Allergies:</strong> Caused by food sensitivities
                </li>
                <li>
                  <strong>Digestive Issues:</strong> Vomiting or diarrhea from
                  poor nutrition
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 6 - Final CTA */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📞
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Schedule a Nutrition Consultation
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Unsure what to feed your pet? Book a nutrition consultation
                today. We'll tailor a plan based on your pet's lifestyle, age,
                and health condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
