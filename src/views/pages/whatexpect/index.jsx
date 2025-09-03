import React from 'react'

const WhatExpect = () => {
  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">What to Expect</h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🏠
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Virtual Convenience
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Using telemedicine for your pet allows you to consult with a
                veterinarian from the comfort of your home. During the virtual
                visit, you can discuss your pet’s symptoms, ask questions, and
                receive guidance on care or treatment options. While
                telemedicine is ideal for non-emergency situations or follow-up
                care, your vet may recommend an in-person visit if a physical
                exam or more complex procedures are needed. It’s a convenient
                and efficient way to get professional advice without the hassle
                of travel.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧑‍⚕️
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Accessible Pet Services
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe you & your pet deserve high quality animal care from
                anywhere. Our goal is to provide easier, simpler access to
                veterinary care & all things pet related, medicine, alternative
                medicine options, grooming, training, nutrition, behaviour, end
                of life services and much more. Download the app to view all
                available services.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🩺
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Hands-On Care Still Matters
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Telemedicine will never replace the value of hands-on care by a
                professional & you still need to plan for an annual check in for
                parasite prevention, vaccines & general overall wellness of your
                animals. Metavet is dedicated to helping you connect quickly
                with a professional that best suits your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatExpect
