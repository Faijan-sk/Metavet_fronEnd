import React, { useState } from 'react'

const index = () => {
  const [twoTwo, setTwoTwo] = useState(true)
  const [twoThree, setTwoThree] = useState(null)
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Pet Groomer → Client KYC Flow
      </h1>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Step 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg border-4 border-white">
            1️⃣
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🔹 Step 1: Grooming Preferences
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>
                  How often does your pet get groomed?
                  <ul className="list-none list-inside  text-gray-600">
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Every 4 weeks
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Every 6–8 weeks
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Occasionally / As needed
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      First-time groom
                    </li>
                  </ul>
                </li>
                <li>
                  When was their last grooming session?
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    <input
                      type="date"
                      className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        id="not-sure"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
                      />
                      <label
                        htmlFor="not-sure"
                        className="text-gray-600 not-italic"
                      >
                        Not sure
                      </label>
                    </div>
                  </div>
                </li>

                <li>
                  Preferred grooming style or outcome:
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="3"
                      placeholder="Please provide details..."
                    />
                    {/* (Free text + optional dropdown: short trim, breed cut,
                    deshedding, puppy cut, etc.) */}
                  </div>
                </li>
                <li>
                  Are there any areas you’d like us to avoid or focus on?
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="3"
                      placeholder="Please provide details..."
                    />
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg border-4 border-white">
            2️⃣
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🔹 Step 2: Health & Safety
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>
                  Does your pet have any health conditions we should know about?
                  <ul className="list-none list-inside ml-5 mt-2 text-gray-600">
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Skin issues
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Ear infections
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Arthritis
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Allergies
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Other (please specify)
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      None
                    </li>
                  </ul>
                </li>
                <li>
                  Is your pet currently on any medications or treatments?
                  <ul className="ml-5 mt-2 text-gray-600 space-y-2 list-none">
                    <li>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="twoTwoOption"
                          value="yes"
                          checked={twoTwo === true}
                          onChange={() => setTwoTwo(true)}
                          className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                        />
                        Yes
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="twoTwoOption"
                          value="no"
                          checked={twoTwo === false}
                          onChange={() => setTwoTwo(false)}
                          className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                        />
                        No
                      </label>
                    </li>

                    {twoTwo && (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        rows="3"
                        placeholder=" please provide details..."
                      />
                    )}
                  </ul>
                </li>
                <li>
                  Has your pet had any injuries or surgeries in the past year?
                  <ul className="list-none ml-5 mt-2 text-gray-600 space-y-2">
                    <li>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="twoThreeOption"
                          value="yes"
                          checked={twoThree === true}
                          onChange={() => setTwoThree(true)}
                          className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                        />
                        Yes
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="twoThreeOption"
                          value="no"
                          checked={twoThree === false}
                          onChange={() => setTwoThree(false)}
                          className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                        />
                        No
                      </label>
                    </li>

                    {twoThree === true && (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        rows="3"
                        placeholder="please provide details..."
                      />
                    )}
                  </ul>
                  {/* <div className="ml-5 mt-1 text-gray-600 italic">
                    (If yes, open a text input box to describe)
                  </div> */}
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg border-4 border-white">
            3️⃣
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🔹 Step 3: Behavior & Handling
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>
                  Has your pet shown any of the following during grooming?
                  <ul className="list-none list-inside ml-5 mt-2 text-gray-600">
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Nervousness/anxiety
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Difficulty standing still
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Fear of loud tools (clippers, dryers)
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Growling or snapping
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      None of the above
                    </li>
                  </ul>
                </li>
                <li>
                  What helps calm or comfort your pet?
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="3"
                      placeholder="please provide details..."
                    />
                  </div>
                </li>
                <li>
                  Does your pet have any triggers or dislikes we should know
                  about?
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="3"
                      placeholder="please provide details... , e.g., nail trims, paws touched"
                    />
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg border-4 border-white">
            4️⃣
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🔹 Step 4: Services & Scheduling
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>
                  What services are you looking for?
                  <ul className="list-none list-inside ml-5 mt-2 text-gray-600">
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Full groom (bath + cut)
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Bath + brush only
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Nail trim
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Ear cleaning
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Deshedding
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Specialty/creative cut
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Other (specify)
                    </li>
                  </ul>
                </li>
                <li>
                  Do you prefer:
                  <ul className="list-none list-inside ml-5 mt-2 text-gray-600">
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Mobile/in-home grooming
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      I’ll bring my pet to the groomer
                    </li>
                    <li>
                      {' '}
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                      />
                      Either is fine
                    </li>
                  </ul>
                </li>
                <li>
                  Preferred appointment window:
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    {/* (Date & time picker with optional time-of-day preference) */}
                    <input
                      type="datetime-local"
                      className="mt-2 block w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700"
                    />
                  </div>
                </li>
                <li>
                  Any other notes or requests?
                  <div className="ml-5 mt-1 text-gray-600 italic">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="3"
                      placeholder="Please give us your suggestion"
                    />
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Optional Add-ons */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg border-4 border-white">
            ✅
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-600 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Optional Add-ons like:
              </h2>
              <ul className="list-none list-inside ml-5 space-y-2 text-gray-700">
                <li>
                  {' '}
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                  />
                  Scented finish
                </li>
                <li>
                  {' '}
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                  />
                  De-matting
                </li>
                <li>
                  {' '}
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded mx-2"
                  />
                  Seasonal accessories
                </li>
              </ul>
            </div>
            <div className="text-center mt-8">
              <button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-lg">
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
