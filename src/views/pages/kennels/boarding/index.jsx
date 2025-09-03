import React from 'react'

const KennelsBoarding = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Kennels/Boarding</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Pet Boarding */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🏠
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  What is Pet Boarding
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Pet Boarding
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Pet boarding is a service that provides temporary care for pets
                while their owners are away. It typically involves a pet staying
                at a facility, such as a kennel, pet hotel, or with a trusted
                caregiver, where they receive food, shelter, and supervision.
                Depending on the facility, additional services like exercise,
                grooming, and medical care may be offered. Pet boarding is ideal
                for when you need to travel or have a busy schedule and want to
                ensure your pet is well taken care of in a safe environment
                while you enjoy your trip.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Tips for Choosing */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            📋
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  Choosing the Right Service
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Tips for Choosing a Pet Boarding Service:
              </h2>
              <ul className="list-none space-y-3 mb-4">
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Reputation & Reviews:</strong> Look for facilities
                    with good reviews and recommendations from other pet owners.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Safety and Security:</strong> Ensure the facility
                    has proper enclosures, secure fencing & safety protocols in
                    place to prevent escapes or accidents. Well-trained staff in
                    pet first aid & emergency procedures.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Facility Cleanliness:</strong> Assess cleanliness &
                    hygiene practices. A clean environment reduces the risk of
                    infections or illnesses.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Staff to Pet Ratio:</strong> Ensure adequate staff
                    to pet ratios.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Medical Care & Special Needs:</strong> If your pet
                    requires special medical needs, check to ensure the facility
                    can administer medication, monitor health conditions, or
                    provide that extra care.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Exercise & Socialization:</strong> Are there
                    separate areas for large & small breed animals? Specific
                    timelines scheduled for exercise & socialization?
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Comfort & Accommodations:</strong> Separate
                    facilities for canines & felines?
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Trial Stay:</strong> Consider a trial stay before a
                    longer trip to see how your pet adjusts to the facility &
                    staff.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Daily Routine & Updates:</strong> Ensure the
                    facility provides a daily service, updates & photos during
                    your pet's stay.
                  </div>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <div>
                    <strong>Pricing & Policies:</strong> Understand the cost
                    associated with boarding & what is included. Also, be aware
                    of cancellation, booking, & refund policies.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KennelsBoarding
