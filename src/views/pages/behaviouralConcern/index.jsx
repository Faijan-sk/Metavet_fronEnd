import React from 'react'

const index = () => {
  // Step 1: Behavioural Concern Overview
  const stepOneA = {
    title: 'What behavioural challenge(s) are you seeking help with?',
    options: [
      'Separation anxiety',
      `Aggression (conditional: follow up with "has your pet bitten a person or other animals?" with a text box "Please describe")`,
      'Excessive barking',
      'Leash pulling/reactivity',
      'Destructive behavior',
      'Fearfulness',
      'Inappropriate elimination',
      `Other (conditional: if selected, enter a text box with "please describe")`,
    ],
    isTextArea: true,
  }

  const stepOneB = {
    title: 'When did the behavior first begin?',
    options: ['As a puppy', 'Within the last year', 'Recently (last 3 months)'],
    // note: '(Optional date input or note)',
  }

  const stepOneC = {
    title: 'How frequently does the issue occur?',
    options: [
      'Daily',
      'Weekly',
      'Occasionally',
      `Only in specific situations (conditional: text box "please describe")`,
    ],
  }

  const StepOne = [stepOneA, stepOneB, stepOneC]

  // Step 2: Triggers & Context
  const stepTwoA = {
    title: 'Are there known triggers for the behavior?',
    options: [
      'Other dogs',
      'Visitors',
      'Car rides',
      'Being left alone',
      'Loud noises',
      'Strangers',
      'Other animals',
      'No known triggers',
      'Other (please describe)',
    ],
    note: '(e.g., other dogs, visitors, car rides, being left alone)',
    isTextArea: true,
  }

  const stepTwoB = {
    title: 'Has the behavior worsened or improved over time?',
    options: ['Improved', 'Worsened', 'Stayed the same'],
    // note: '(Optional context text box)',
  }

  const stepTwoC = {
    title: 'Has your pet shown any aggressive behavior?',
    options: [
      'Growling',
      'Snapping',
      'Lunging',
      'Biting (human or animal)',
      'No aggression observed',
    ],
  }

  const stepTwoD = {
    title: 'Please describe any serious incidents or close calls, if any.',
    options: [],
    note: '(Free text)',
  }

  const StepTwo = [stepTwoA, stepTwoB, stepTwoC, stepTwoD]

  // Step 3: Training & Tools History
  const stepThreeA = {
    title: 'Have you worked with a trainer or behaviourist before?',
    options: ['Yes', 'No'],
    // note: "(If yes, optional text box: What approaches were used? What did/didn't work?)",
  }

  const stepThreeB = {
    title: 'Are you currently using any training tools or methods?',
    options: [
      'Clicker',
      'Muzzle',
      'Harness',
      'Prong collar',
      'E-collar',
      'Crate training',
      'Treats/rewards',
      'Other',
    ],
  }

  const stepThreeC = {
    title: 'Is your pet food or toy motivated?',
    options: ['Yes', 'No', 'Unsure'],
    // note: '(Conditional: What are their favorite rewards?)',
  }

  const StepThree = [stepThreeA, stepThreeB, stepThreeC]

  // Step 4: Routine & Environment
  const stepFourA = {
    title: "Describe your pet's daily routine:",
    options: [
      '1 walk per day',
      '2-3 walks per day',
      'More than 3 walks per day',
      'No regular walks',
      'Daily off-leash time',
      'Weekly off-leash time',
      'No off-leash time',
      'Left alone 0-2 hours',
      'Left alone 3-6 hours',
      'Left alone 6+ hours',
    ],
  }

  const stepFourB = {
    title: 'Other pets in the household?',
    options: ['Yes', 'No'],
    // note: '(conditional: If yes, text box: "list types, ages, and how they get along")',
  }

  const stepFourC = {
    title: 'Are there children in the home?',
    options: ['Yes', 'No'],
    // note: '(conditional: If yes, what ages? How does your pet respond with children)',
  }

  const stepFourD = {
    title: 'What kind of home environment do you live in?',
    options: [
      'Apartment',
      'House with yard',
      'Shared/communal',
      'Other (please describe)',
    ],
    note: '(e.g.,if others, then please describe it )',
    isTextArea: true,
  }

  const StepFour = [stepFourA, stepFourB, stepFourC, stepFourD]

  // Step 5: Goals & Expectations
  const stepFiveA = {
    title: 'What would a successful outcome look like to you?',
    options: [],
    note: '(Free text)',
  }

  const stepFiveB = {
    title: 'Are you open to adjusting your routine or environment?',
    options: ['Yes', 'No', 'Not sure'],
  }

  const stepFiveC = {
    title: 'Preferred session type:',
    options: ['In-person', 'Virtual', 'Either is fine'],
  }

  const stepFiveD = {
    title: "Any other notes, concerns, or expectations you'd like to share?",
    options: [],
    note: '(Free text)',
  }

  const StepFive = [stepFiveA, stepFiveB, stepFiveC, stepFiveD]
  const renderStep = (stepData, stepNumber, stepTitle, stepIcon) => (
    <div className="relative flex items-start mb-12">
      <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10 shadow-lg border-4 border-white">
        {stepIcon}
      </div> 
      <div className="ml-8 flex-1">
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-text-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <ol className="list-decimal list-inside space-y-6 text-gray-700">
            {stepData.map((section, sectionIndex) => (
              <li key={sectionIndex}>
                {section.title}
                {section.options.length > 0 && (
                  <ul className="list-disc list-inside ml-5 mt-2 text-gray-600">
                    {section.options.map((option, optIndex) => (
                      <li key={optIndex} className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id={`step${stepNumber}-${sectionIndex}-${optIndex}`}
                          className="mt-1 h-4 w-4 text-primary focus:ring-blue-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`step${stepNumber}-${sectionIndex}-${optIndex}`}
                          className="text-gray-700"
                        >
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {section.isTextArea && (
                  <div className="ml-5 mt-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows="3"
                      placeholder="Please provide details..."
                    />
                  </div>
                )}
                {section.note && (
                  <div className="ml-5 mt-2">
                    {section.options.length === 0 ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-primary focus:border-transparent"
                        rows="3"
                        placeholder="Please provide details..."
                      />
                    ) : (
                      <div className="text-gray-600 italic text-sm">
                        {section.note}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Pet Behavioral Assessment Form
      </h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-green-600 rounded-full"></div>

        {/* Step 1 Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">
            🔹 Step 1: Behavioural Concern Overview
          </h2>
        </div>
        {/* Step 1 */}
        {renderStep(StepOne, 1, '', '1️⃣')}

        {/* Step 2 Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">
            🔹 Step 2: Triggers & Context
          </h2>
        </div>
        {/* Step 2 */}
        {renderStep(StepTwo, 2, '', '2️⃣')}

        {/* Step 3 Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">
            🔹 Step 3: Training & Tools History
          </h2>
        </div>
        {/* Step 3 */}
        {renderStep(StepThree, 3, '', '3️⃣')}

        {/* Step 4 Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">
            🔹 Step 4: Routine & Environment
          </h2>
        </div>
        {/* Step 4 */}
        {renderStep(StepFour, 4, '', '4️⃣')}

        {/* Step 5 Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-primary mb-2">
            🔹 Step 5: Goals & Expectations
          </h2>
        </div>
        {/* Step 5 */}
        {renderStep(StepFive, 5, '', '5️⃣')}

        {/* Consent */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold z-10 shadow-lg border-4 border-white">
            ✅
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-600 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  className="mt-1 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded flex-shrink-0"
                />
                <label
                  htmlFor="consentCheckbox"
                  className="text-gray-700 text-lg font-semibold cursor-pointer"
                >
                  I confirm that the information provided is accurate and agree
                  to share this with my assigned behaviour specialist through
                  the Metavet platform.
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-lg">
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  )
}

export default index
