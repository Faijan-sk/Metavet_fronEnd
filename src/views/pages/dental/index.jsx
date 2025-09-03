import React from 'react'

const Dental = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dental</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🦷
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                  Dental Awareness
                </span>
              </div>
              <p className="mb-4 text-gray-600 leading-relaxed">
                DID you know…. Dogs and cats can develop dental issues similar
                to humans, such as gingivitis, periodontal disease, tooth decay,
                and cavities. When your pet eats, food particles fuel bacteria
                that form plaque on their teeth. If left untreated, plaque
                hardens into tartar, leading to gum disease, cavities, and
                infections.
              </p>
              <p className="mb-4 text-gray-600 leading-relaxed">
                When was the last time you had your pet’s teeth cleaned? AVMA
                states that pets who have NOT had a teeth cleaning by 3 years of
                age show signs of dental disease. For this reason, amongst many
                others, Metavet can connect you with professionals for oral
                examinations & dental cleanings.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Signs of Disease */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            📋
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                  Signs to Watch
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Signs of Dental Disease
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
                <li>Broken or loose teeth</li>
                <li>Discomfort while eating</li>
                <li>Extremely bad breath</li>
                <li>Pussy or bloody drool</li>
                <li>Red gums</li>
                <li>Staining on teeth</li>
                <li>Swollen or inflamed gums</li>
                <li>Weight loss or loss of appetite</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 - Checkups */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🩺
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                  Preventive Care
                </span>
              </div>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Pet dental care is recommended on an annual basis. Checkups
                include an examination of your pet’s head, neck, face, ears, and
                mouth to check for other signs of health issues.
              </p>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Download the Metavet app to connect right away with a
                professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dental
