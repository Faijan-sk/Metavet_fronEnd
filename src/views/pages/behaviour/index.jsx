import React from 'react'

const Behavior = () => {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Behavior</h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {/* Timeline Item 1 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🧠
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                Understanding Behavior
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A pet’s behaviour can reveal a lot about their health &
                well-being. Changes in behaviour may indicate underlying health
                issues, stress, anxiety, or unmet needs. Addressing behavioural
                problems early can help prevent them from escalating. All pet
                owners encounter behavioural problems at some point, especially
                during different life stages or environmental changes.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative flex items-start mb-12">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            🐾
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                Common Behavioral Issues
              </span>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600 leading-relaxed">
                <li>
                  <strong>Aggression:</strong> Aggressive behaviour towards
                  people, other pets, or animals is alarming. Can be caused by
                  fear, territoriality, or pain.
                </li>
                <li>
                  <strong>Separation Anxiety:</strong> Pets that become anxious
                  or destructive when left alone may require behavioural
                  modification strategies to cope with their anxiety.
                </li>
                <li>
                  <strong>Excessive Barking or Meowing:</strong> If your pet is
                  constantly vocalizing, it can be stress-related, boredom, or a
                  medical issue.
                </li>
                <li>
                  <strong>Destructive Chewing/Licking:</strong> Some pets chew
                  furniture, shoes, or themselves due to stress, anxiety,
                  teething, or lack of stimulation.
                </li>
                <li>
                  <strong>House Soiling:</strong> Inappropriate elimination
                  outside the litter box or outdoor area can be a sign of
                  medical problems or behavioural changes.
                </li>
                <li>
                  <strong>Phobias & Fears:</strong> Fear of loud noises or
                  certain situations can affect your pet's mental health.
                </li>
                <li>
                  <strong>Resource Guarding:</strong> Includes behaviours like
                  guarding food, toys, or even people, which can lead to
                  conflicts with other pets or family members.
                </li>
                <li>
                  <strong>Hyperactivity:</strong> Some pets are excessively
                  energetic, or struggle to focus, which can be a sign of
                  behavioural issues.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 - CTA */}
        <div className="relative flex items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white">
            📲
          </div>
          <div className="ml-8 flex-1">
            <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Get Expert Help
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Download the Metavet app to connect with a certified
                behaviourist &amp; explore options for your pet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Behavior
