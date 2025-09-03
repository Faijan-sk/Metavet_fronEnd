import React from 'react'

const DogTraining = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dog Training</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 - Introduction */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🐶
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                  Why Training Matters
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Dog Training
              </h2>
              <p className="mb-4 text-gray-600 leading-relaxed">
                Training your pet offers a wide range of benefits for both you &
                your furry friend! Metavet connects you with the perfect
                trainers for you & your pet.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 - Key Advantages */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg border-4 border-white">
            🎓
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  Key Advantages
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Key Advantages to Training:
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
                <li>
                  <strong>Improved Communication:</strong> Training helps
                  establish clear communication between you and your pet, so
                  they understand what is expected of them & can follow commands
                  effectively.
                </li>
                <li>
                  <strong>Better Behaviour:</strong> Trained pets tend to behave
                  better, are more accustomed to responding to commands which
                  helps minimize unwanted negative behaviours.
                </li>
                <li>
                  <strong>Stronger Bond:</strong> Training sessions provide
                  quality time to bond with your pet. Positive reinforcement
                  techniques, like treats & praise, build trust & strengthen the
                  relationship.
                </li>
                <li>
                  <strong>Safety:</strong> Basic commands like “sit”, “stay”, or
                  “come” can be lifesaving in situations where you need to keep
                  your pet safe.
                </li>
                <li>
                  <strong>Mental Stimulation:</strong> Training challenges the
                  brain & provides a mental workout. Prevents boredom &
                  destructive behaviour, essentials for high-energy or
                  intelligent breeds.
                </li>
                <li>
                  <strong>Socialization:</strong> Training exposes your pet to
                  different environments, people & other animals, essential to
                  social development. Well socialized animals are less likely to
                  develop fear-based behaviour.
                </li>
                <li>
                  <strong>Confidence:</strong> Well-trained pets know what to
                  expect & tend to feel more secure and confident in their
                  surroundings.
                </li>
                <li>
                  <strong>Good Manners:</strong> A well-trained pet is generally
                  more polite & respectful with both people & other animals.
                </li>
                <li>
                  <strong>Prevention of Behavioral Issues:</strong> Teaching
                  your pet boundaries early on can prevent certain behavioural
                  issues from arising or escalating.
                </li>
                <li>
                  <strong>Fun & Enjoyable:</strong> Training can be an enjoyable
                  activity for all involved, it’s a great way to engage & have
                  fun.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DogTraining
