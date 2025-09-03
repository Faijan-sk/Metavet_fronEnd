import React from 'react'

const VideoNewsroom = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center"> Surgery</h1>
      <p className="mb-5">
        {' '}
        When your pet needs surgery, you need to find a practice that can
        administer both gentle and effective treatment to your beloved
        companion. From routine procedures, such as spaying or neutering, to
        more advanced operations, your pet may need to undergo surgery for any
        number of reasons. Our staff is trained to provide the care and
        compassion your pet deserves.
      </p>

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
                Modern Surgical Facilities
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The modern amenities and pristine conditions of our surgical
                rooms enable our staff to function at peak capacity. We ensure
                that all lab work and pre-surgical exams are completed in a
                timely manner, so that your pet can undergo surgery with the
                best possible preparation.
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
                Compassionate Care
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our team is trained to give your pet the care they need to not
                only make it through the operation but to also lead a healthier
                and happier life after returning from our facilities. We make
                sure that your pet feels as comfortable as possible during their
                stay with us.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Follow-Up Care
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We recommend a follow-up with each of our clients to ensure that
                recovery is progressing smoothly. Early detection of any issues
                can prevent larger problems later on, and we are here to support
                you every step of the way.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                Advanced Monitoring During Surgery
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Veterinary surgery often requires multiple professionals working
                together. While your pet is in the surgical room, our team
                constantly monitors and adjusts your pet's temperature, IV
                fluids, and anesthesia. We communicate any potential anomalies
                that could affect the surgery’s outcome to ensure a safe and
                successful procedure.
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
                A Commitment to the Best Outcomes
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe that working together as a team, communicating
                effectively, and providing constant attention to detail during
                surgery is the best way to ensure the most favorable outcomes
                for your pet. Our staff is fully dedicated to making sure your
                pet receives the best care.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
      </div>
    </div>
  )
}

export default VideoNewsroom
