import React from 'react'

const ChoosingPet = () => {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        Choosing Your Pet
      </h1>

      {/* Introduction */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary mb-10">
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Choosing to add a pet to your life is a big decision! Pets are
          life-long commitments, and keeping a pet happy, healthy, fed, and
          well-exercised requires time and money.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          To explore a specific pet like birds, cats, dogs, horses, small
          animals, and reptiles, continue reading into this section. If you have
          questions about what pet is right for you, do not hesitate to contact
          our office!
        </p>
      </div>

      {/* Sections List */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Sections</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Choosing Your Pet</li>
          <li>Finding Your Pet</li>
          <li>Cats</li>
          <li>Dogs</li>
          <li>Livestock</li>
        </ul>
      </div>

      {/* Finding Your Pet Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Finding Your Pet
        </h2>
        <p className="text-gray-700 mb-6">
          Where you go to get your pet is just as important as what kind of pet
          you get. Here are some suggestions on where to go — and where not to
          go — in your search for your perfect pet.
        </p>

        {/* Sources Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pet Shop */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Pet Shop</h3>
            <p className="text-gray-600 text-sm">
              A pet shop is a place where animals are sold to the public. While
              some find joy in pets from stores, others raise concerns about
              conditions...
            </p>
            <button className="text-blue-600 mt-3 text-sm hover:underline">
              Read More
            </button>
          </div>

          {/* Rescue Agency */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Rescue Agency</h3>
            <p className="text-gray-600 text-sm">
              Rescuing an animal is a great option. Many pets end up in rescue
              due to abandonment, owner illness, or other life events...
            </p>
            <button className="text-blue-600 mt-3 text-sm hover:underline">
              Read More
            </button>
          </div>

          {/* Animal Shelter */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Animal Shelter</h3>
            <p className="text-gray-600 text-sm">
              Shelters offer temporary homes for stray, surrendered, or
              abandoned animals. Adoption gives them a second chance...
            </p>
            <button className="text-blue-600 mt-3 text-sm hover:underline">
              Read More
            </button>
          </div>

          {/* Breeder */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Breeder</h3>
            <p className="text-gray-600 text-sm">
              Buying from a responsible breeder means getting a pet with known
              lineage and care history. Always do thorough research...
            </p>
            <button className="text-blue-600 mt-3 text-sm hover:underline">
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Pet Types Sections */}
      <div className="space-y-10">
        {/* Cats */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-400">
          <h2 className="text-2xl font-semibold text-pink-500 mb-2">Cats</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Cats are adaptable, clean, and independent pets. They come in a
            variety of breeds, sizes, and personalities, and require love,
            attention, and routine care.
          </p>
          <button className="text-blue-600 mt-3 text-sm hover:underline">
            Read More
          </button>
        </div>

        {/* Dogs */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-semibold text-orange-500 mb-2">Dogs</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Dogs vary widely in size, temperament, and care needs. Consider your
            living space, activity level, and available time when choosing a
            breed.
          </p>
          <button className="text-blue-600 mt-3 text-sm hover:underline">
            Read More
          </button>
        </div>

        {/* Livestock */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold text-purple-500 mb-2">
            Livestock
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Livestock like goats, cows, and horses require ample land, shelter,
            and consistent care. Ideal for rural settings and prepared owners.
          </p>
          <button className="text-blue-600 mt-3 text-sm hover:underline">
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChoosingPet
