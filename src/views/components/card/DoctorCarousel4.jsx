import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    image:
      './src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png',
    title: 'Veterinarian',
    specialization: 'Specializing in Pet Care & Wellness',
    description:
      'With over 10 years of experience in the field, I am dedicated to providing the best care for your pets.',
  },
  {
    id: 2,
    name: 'Dr. John Doe',
    image:
      './src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png',
    title: 'Veterinarian',
    specialization: 'Specializing in Pet Surgery & Diagnostics',
    description:
      'I have a passion for improving the health of pets and ensuring a safe, comfortable experience.',
  },
  {
    id: 3,
    name: 'Dr. John Doe',
    image:
      './src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png',
    title: 'Veterinarian',
    specialization: 'Specializing in Emergency & Critical Care',
    description:
      'With my expertise, I provide prompt and effective care to pets in a very critical conditions .',
  },
]

const DoctorCarousel4 = () => {
  // State to control whether to show full description or not
  const [expandedId, setExpandedId] = useState(null)

  const toggleDescription = (id) => {
    // Toggle the description view for the clicked doctor
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className=" text-center mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="bg-white shadow-lg rounded-lg max-w-sm w-full text-center p-6"
        >
          <div className="mb-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 rounded-full mx-auto bg-slate-400"
            />
          </div>
          <h3 className="text-2xl font-semibold">{doctor.name}</h3>
          <p className="text-gray-500">{doctor.title}</p>
          <p className="text-gray-600 mt-2">{doctor.specialization}</p>

          <p className="mt-4 text-gray-500 text-sm">
            {expandedId === doctor.id
              ? doctor.description
              : doctor.description.substring(0, 100) + '...'}
          </p>

          <Link to="/viewprofile4">
            {' '}
            <button
              onClick={() => toggleDescription(doctor.id)}
              className="text-white btn mt-2 text-sm bg-primary"
            >
              View Profile{' '}
              {/* {expandedId === doctor.id ? "View Less" : "View Profile "} */}
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default DoctorCarousel4
