import React from 'react'

const Radiology = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Radiology</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        When it comes to accurately diagnosing and treating your pet after an
        injury or illness, you can count on our veterinary team to have the
        latest diagnostic equipment, including digital imaging devices and
        ultrasound machines.
      </p>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Overview */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🔬
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Injuries and Ailments Diagnosed via Radiology and Ultrasounds
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Digital images, including ultrasounds, radiographs, MRIs, and CT
                scans are used to diagnose a variety of conditions and ailments
                in dogs and cats. Common conditions diagnosed include broken
                bones, joint problems, tumors, brain abnormalities, and problems
                with the internal organs, including the heart, lungs, liver,
                kidneys, and bladder.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Ultrasound Imaging */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📡
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Ultrasound Imaging
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ultrasound imaging involves using sound waves to create an image
                on a computer monitor. When our team passes the wand over an
                injured area of your pet, we are able to find otherwise hidden
                problems, like when your pet accidentally eats something that
                isn't food, has a tumor, or has problems with an internal organ,
                like the stomach, spleen, liver, and pancreas. Ultrasound
                imaging is completely painless and does not have any side
                effects.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 - Radiographs (X-Rays) */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🦴
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                Radiographs (X-Rays)
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The common term for a radiograph is an x-ray. These images can
                help diagnose problems and conditions with the bones and joints,
                such as broken bones, swelling in the joints, and other types of
                bone abnormalities. X-rays can also be used to diagnose problems
                with the internal organs, like the heart, lungs, spleen, liver,
                and kidneys.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 - MRIs */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧠
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                MRIs
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                MRI is an acronym for Magnetic Resonance Imaging. This type of
                diagnostic equipment has the ability to produce detailed images
                of the internal structures of the body. They are helpful in
                diagnosing tumors and abnormalities in the brain as well as
                spinal disorders, like herniated discs and spinal stenosis in
                cats and dogs.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 5 - CT Scans */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            💻
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                CT Scans
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The acronym CT stands for computed tomography. These are
                essentially highly detailed x-rays that can show cross sections
                of your dog or cat's anatomy. While the CT machine is taking
                images, our veterinarian has the ability to enhance and focus on
                specific parts of your pet's body in order to make a detailed
                and accurate diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 6 - Diagnosing */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🩺
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                Diagnosing Your Pet's Ailment or Injury
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our veterinary staff can rapidly diagnose your pet's injury or
                condition via x-rays, CT scans, MRIs, and ultrasound imaging.
                Once we understand the depth of your pet's illness or injury, a
                treatment plan will be developed in order to help your pet heal
                and restore your pet's health. If you have any questions or
                concerns about your pet's health and their diagnosis, we would
                be happy to answer them and provide you with guidance to help
                make your pet comfortable during the healing process.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                For more information on our radiology and diagnostic imaging
                services, call us at{' '}
                <span className="text-indigo-600 font-semibold">
                  800-462-8749
                </span>{' '}
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Radiology
