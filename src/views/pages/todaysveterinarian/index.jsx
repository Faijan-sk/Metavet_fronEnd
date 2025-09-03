import React from 'react'

const TodaysVeterinarian = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Today's Veterinarian
      </h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🩺
          </div>
          <div className="ml-8 flex-1 space-y-4">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Today's Veterinarian
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinarians use their knowledge and skills for the benefit of
                society — protecting animal welfare, preventing suffering, and
                advancing public health.
              </p>
              <p className="text-gray-600 leading-relaxed">
                They’re trained to care for both animals and humans,
                contributing to environmental protection, food safety, and
                public health systems.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nearly 70,000 veterinarians are active in the U.S. working in
                clinics, research, government, military, education, and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This section helps you understand how veterinarians can improve
                the life of your pet — and you.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🤝
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                You & Your Vet
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Your vet relies on your observations to help diagnose your pet’s
                health. You know your pet best — small behavior changes matter
                and should be shared.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧑‍⚕️
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                What We Do
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinarians are highly trained professionals responsible for
                the health and welfare of animals and people. The word
                "veterinarian" comes from "veterinae" — working animals.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧪
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                The Veterinary Approach
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Using modern diagnostic technology, vets prevent disease,
                vaccinate animals, and promote long-term health in pets through
                ongoing wellness care.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 5 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🎓
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                What We Learn
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinary students must excel in science and biology early on.
                Admission to vet school is highly competitive and requires
                strong academics and hands-on experience.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 6 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📘
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                Vetopedia
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A glossary of veterinary terms such as:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                <li>
                  <strong>AAFCO:</strong> Sets pet food nutrition standards.
                </li>
                <li>
                  <strong>Abdomen:</strong> Area between the diaphragm and
                  pelvis.
                </li>
                <li>
                  <strong>Anal glands:</strong> Scent glands near the anus.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 7 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📊
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                Client Survey
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We provide a client survey to help improve services. Your
                feedback helps us provide exceptional care and personalized
                service.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Completing the survey helps us address your expectations and
                improve our practice. (Privacy assured.)
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 8 */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🎨
          </div>
          <div className="ml-8 flex-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Pets4Kids
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A coloring book and activity guide for kids to learn how to care
                for pets, choose the right companion, and build good pet
                ownership habits.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Games & Puzzles
              </span>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                <li>Mac's Pet Word Search</li>
                <li>Pets in Space Scramble</li>
                <li>Cosmic Pets Crossword Puzzle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodaysVeterinarian
