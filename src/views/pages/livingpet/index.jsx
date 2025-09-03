import React from 'react'

const LivingPet = () => {
  const sections = [
    {
      icon: '🏡',
      tag: 'Daily Pet Care',
      color: 'rose',
      content: (
        <>
          <p>
            Your pet relies on you every day for its happiness, health, and
            well-being. Brushing, bathing, nail and teeth care, and attention to
            your pet's nutritional needs are important parts of daily pet care.
          </p>
          <p className="mt-4">
            And what do you do when you are thinking about taking your pet on a
            trip? Some pets travel better by car, whereas others travel better
            by air. Still other pets are better off remaining in familiar
            surroundings. In any case, advance planning and preparation are
            necessary when traveling with your pet.
          </p>
        </>
      ),
    },
    {
      icon: '💡',
      tag: 'Practical Advice',
      color: 'green',
      content: (
        <p>
          Here's some practical advice: keep your veterinarian's phone number
          handy with your other emergency numbers, just in case! Taking care of
          your pet is a job that lasts all year long. As the seasons change,
          preparations should always be made for the change in weather and
          climate.
        </p>
      ),
    },
    {
      icon: '🚪',
      tag: 'Bringing Your Pet Home',
      color: 'yellow',
      content: (
        <>
          <p>
            Prepare your house for your pet's arrival. A special place should be
            designated for it to eat, sleep, and eliminate. Obtain any necessary
            accessories (e.g., collar, leash, ID tag, crate, cage, aquarium, and
            dishes) before you bring your pet home.
          </p>
          <p className="mt-4">
            For most pets, you will need to pet-proof your home just as you
            would child-proof your home to avoid accidents. Harmful cleansers,
            plants, electrical cords, and breakable objects should be kept out
            of reach. Open windows should be screened.
          </p>
        </>
      ),
    },
    {
      icon: '🌳',
      tag: 'Indoor vs Outdoor',
      color: 'blue',
      content: (
        <>
          <p>
            Roaming pets are prime candidates for fights with other animals,
            traffic accidents, and communicable diseases. Their life span can be
            expected to be considerably shorter as a result.
          </p>
          <p className="mt-4">
            The AVMA strongly recommends that for a healthier, happier pet you
            consider keeping your pets indoors only. If your pet must go
            outside, ensure it is safe by monitoring it and keeping it
            well-identified.
          </p>
        </>
      ),
    },
    {
      icon: '🐱',
      tag: 'Cat-Friendly Environment',
      color: 'purple',
      content: (
        <p>
          The Journal of Feline Medicine and Surgery confirms that feline
          emotional wellbeing, behavior, and physical health are a result of how
          comfortable they are in their environment. Understanding how our cats
          interact with their environment can help us create a space where cats
          and owners thrive.
        </p>
      ),
    },
    {
      icon: '💉',
      tag: 'Exams & Vaccines',
      color: 'red',
      content: (
        <p>
          Experts agree that widespread use of vaccines has prevented death and
          disease in millions of animals. Pets, like people, can be protected
          from some diseases by vaccination. Your vet can provide more detailed
          guidance.
        </p>
      ),
    },
    {
      icon: '🎓',
      tag: 'Obedience & Training',
      color: 'indigo',
      content: (
        <p>
          Obedience training helps prevent negative encounters between family
          members and the dog. It also reinforces the bond between the
          handler(s) and the pet. Training is essential for every family dog!
        </p>
      ),
    },
    {
      icon: '🤗',
      tag: 'Pet Therapy',
      color: 'pink',
      content: (
        <p>
          Pet therapy for children is a proven treatment that works for a
          variety of conditions. Emotional support animals can provide comfort
          for children dealing with stress or anxiety. Ask your vet for more
          info.
        </p>
      ),
    },
    {
      icon: '🩺',
      tag: 'Spotting Illness',
      color: 'orange',
      content: (
        <p>
          Only a healthy pet is a happy companion. Regular care and attention to
          any signs of illness are crucial. Watch for abnormal eating habits,
          lethargy, or behavior changes—and contact your vet when needed.
        </p>
      ),
    },
    {
      icon: '🌈',
      tag: 'Saying Goodbye',
      color: 'gray',
      content: (
        <p>
          Euthanasia is a difficult decision. If your pet is very sick or
          suffering, sometimes the kindest choice is a peaceful passing. Discuss
          options with your vet and loved ones.
        </p>
      ),
    },
  ]

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Living With Your Pet
      </h1>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-white rounded-full"></div>

        {sections.map((section, index) => (
          <div key={index} className="relative flex items-start mb-12 group">
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold z-10 shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-110">
              {section.icon}
            </div>

            {/* Content */}
            <div className="ml-8 flex-1">
              <div className="bg-white rounded-xl shadow-lg border-l-4 border-primary p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <span
                  className={`text-sm font-medium text-${section.color}-700 bg-${section.color}-100 px-3 py-1 rounded-full inline-block`}
                >
                  {section.tag}
                </span>
                <div className="mt-4 text-gray-600 leading-relaxed text-[17px]">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LivingPet
