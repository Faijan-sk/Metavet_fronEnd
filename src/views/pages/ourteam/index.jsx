import React, { useState } from 'react'

const teamMembers = [
  {
    name: 'Dr. Tyson Bull',
    title: 'RETIRED, DVM',
    img: './src/assets/MetavetImages/Dr.59be69373e742412d610.webp',
    role: 'Veterinarian',
    bio: 'Dr. Tyson Bull has over 20 years of experience in veterinary care...',
  },
  {
    name: 'Dr. John Cruickshank',
    title: 'DVM',
    img: './src/assets/MetavetImages/Dr.-John-Cruickshank.4a43ea39d642e5fe2713.png',
    role: 'Veterinarian',
    bio: 'Dr. John Cruickshank specializes in emergency and critical care...',
  },
  {
    name: 'Dr. Carlie Petrisor',
    title: 'DVM',
    img: './src/assets/MetavetImages/4 (1).ca1e3b71e2be7d09ca63.png',
    role: 'Veterinarian',
    bio: 'Dr. Carlie Petrisor is known for her expertise in dental care for pets...',
  },
  {
    name: 'Jena',
    title: 'Team Member',
    img: './src/assets/MetavetImages/4 (1).ca1e3b71e2be7d09ca63.png',
    role: 'Team Member',
    bio: 'Jena is a dedicated member of the administrative team...',
  },
  {
    name: 'Kat',
    title: 'Team Member',
    img: './src/assets/MetavetImages/4 (1).ca1e3b71e2be7d09ca63.png',
    role: 'Team Member',
    bio: 'Kat is the go-to person for all scheduling and customer service...',
  },
  {
    name: 'Brittany',
    title: 'Team Member',
    img: './src/assets/MetavetImages/4 (1).ca1e3b71e2be7d09ca63.png',
    role: 'Team Member',
    bio: 'Brittany handles inventory and supplies management...',
  },
]

const OurTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const membersPerPage = 3

  const indexOfLastMember = currentPage * membersPerPage
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembers = teamMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  )

  const totalPages = Math.ceil(teamMembers.length / membersPerPage)

  const openModal = (member) => setSelectedMember(member)
  const closeModal = () => setSelectedMember(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2 text-primary">Meet Our Team</h2>
        <p className="text-gray-600 text-lg">
          Learn more about the veterinarians and support team that care for your
          pets.
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
              <button
                onClick={() => openModal(member)}
                className="mt-3 text-sm text-primary underline hover:text-primary/80"
              >
                Read Bio
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-white hover:bg-primary hover:text-white border-primary text-primary'
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === i + 1
                ? 'bg-primary text-white'
                : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-white hover:bg-primary hover:text-white border-primary text-primary'
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-2">
              {selectedMember.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{selectedMember.title}</p>
            <p className="text-gray-700">{selectedMember.bio}</p>
            <div className="text-right mt-4">
              <button
                onClick={closeModal}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OurTeam
