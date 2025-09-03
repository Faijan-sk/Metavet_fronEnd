import React from 'react'

const VideoNewsroom = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Video Newsroom</h1>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📰
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Introduction
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinary care supports a wide range of pet conditions. Here
                you’ll find news and articles about pet health, science, and
                technology.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧬
          </div>
          <div className="ml-8 flex-1 space-y-8">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                Battling Canine Cancer
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Katy, a 12-year-old Shepherd mix, fights lymphoma with daily
                chemo hidden in peanut butter. Canine cancer is widespread — 1
                in 4 dogs will die from it. Katy’s story highlights the
                emotional toll and the critical need for awareness.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Overweight Pets
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                More than half of pets are overweight or obese. Ramsey the Bull
                Mastiff and others show how pet diets and exercise routines must
                be taken seriously to avoid heart issues, diabetes, and reduced
                lifespans.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                Pain Management
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Pets experience chronic pain like humans. Arthritis affects 1 in
                5 dogs, especially seniors. From therapy to emerging treatments
                like stem cell therapy, managing pet pain is crucial for a
                better quality of life.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🔬
          </div>
          <div className="ml-8 flex-1 space-y-8">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Stem Cell Therapy
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Stem cell therapy uses a dog’s own fat tissue to treat
                arthritis. This innovative treatment could offer relief where
                traditional therapies fall short.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                Veterinary Acupuncture
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Acupuncture is gaining traction in veterinary care. It helps
                manage pain, allergies, seizures, and even organ diseases —
                bringing holistic healing to modern pet care.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                Laser Surgery
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinary laser surgery mirrors human medicine advances,
                offering pets faster recovery and less pain after procedures
                like mass removal or dental surgeries.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🐾
          </div>
          <div className="ml-8 flex-1 space-y-8">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                Rescue Groups
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Purebred and exotic pet rescue organizations help rehome animals
                in need. Many are saved just before scheduled euthanasia —
                proving that second chances save lives.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Winter Safety
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Cold weather brings seasonal risks. Keep pets safe during
                holiday chaos and avoid feeding them harmful festive foods to
                ensure a joyful season for all.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Traveling with Pets
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Over half of pet owners travel with pets. Always prep ID tags,
                vaccination records, meds, and destination emergency contacts.
                Microchips and travel-friendly checklists are essential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoNewsroom
