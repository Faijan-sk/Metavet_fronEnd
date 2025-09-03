import React from 'react'

const PaymentOptions = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Payment Options</h2>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg border-4 border-white">
            💳
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl border-l-4 border-primary shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-red-700 bg-red-100 px-3 py-1 rounded-full">
                1. Prepayment Required
              </span>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Payment is due prior to any teleconsultations & a hold will be placed
                for the entire amount of the service being rendered for any mobile
                services.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg border-4 border-white">
            🏦
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl border-l-4 border-primary shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                2. Card Payments Accepted
              </span>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Please view your profile in the app to add payment cards.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg border-4 border-white">
            🐕
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl border-l-4 border-primary shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                3. Pet Insurance
              </span>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                If you haven't yet gotten pet insurance, to learn more please visit the
                following websites:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-1 text-blue-600">
                <li>
                  <a
                    href="https://www.trupanion.com"
                    className="hover:underline"
                  >
                    www.trupanion.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.fetchpet.com"
                    className="hover:underline"
                  >
                    www.fetchpet.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.petsecure.com"
                    className="hover:underline"
                  >
                    www.petsecure.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.spotpetinsurance.ca"
                    className="hover:underline"
                  >
                    www.spotpetinsurance.ca
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧾
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl border-l-4 border-primary shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                4. Installment Options
              </span>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                We have partnered with Affirm Payment & CareCredit. It takes a few short
                minutes to complete an application and break down your payments into
                installments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentOptions
