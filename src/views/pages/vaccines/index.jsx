import React from 'react'

const Vaccines = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Vaccines</h1>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Introduction */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            💉
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                What Are Vaccines?
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Vaccines administer a very low dose of a pathogen to a pet so
                that their immune system can learn to fight it. Introducing a
                low dose of a disease prompts the system to manufacture
                antibodies to help fight it.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Pros of Vaccination */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            ✅
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                Pros of Vaccination
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-3 text-gray-600 leading-relaxed">
                <li>
                  <strong>Disease Prevention:</strong> Vaccines protect against
                  serious, sometimes fatal diseases like rabies, parvovirus, &
                  distemper.
                </li>
                <li>
                  <strong>Protects Other Animals:</strong> Vaccinating your pet
                  helps protect other animals in your community by reducing the
                  spread of contagious diseases.
                </li>
                <li>
                  <strong>Prevents Expensive Treatment:</strong> Vaccines are
                  much more affordable than treating diseases that could have
                  been prevented.
                </li>
                <li>
                  <strong>Health & Longevity:</strong> Vaccines ensure your pet
                  stays healthy & lives a longer, more active life.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> Some vaccinations like
                  rabies are required by law in many areas for the safety of
                  both pets & humans.
                </li>
                <li>
                  <strong>Peace of Mind:</strong> Knowing your pet is protected
                  gives you peace of mind & helps focus on enjoying your life
                  together.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 - Additional Info */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📌
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Did You Know?
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                There are “core” vaccines & “non-core” vaccines. Depending on
                your individual pet, your vet may recommend other vaccines as
                well.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Download the Metavet App to connect with professionals &
                discover what your pet might need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vaccines
