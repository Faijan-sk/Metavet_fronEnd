import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import DrOne from "./../../../assets/MetavetImages/Dr profile/dr2.png"

const DoctorCarousel5 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  // Doctor data array for easier management
  const doctors = [
    {
      id: 1,
      name: 'Dr. Jane Doe',
      specialty: 'Cardiology Specialist',
      description: 'Specializing in Pet Surgery & Diagnostics',
      image: DrOne,
      profileLink: '/viewprofile5',
    },
    {
      id: 2,
      name: 'Dr. John Smith',
      specialty: 'Emergency Veterinarian',
      description: 'Specialized in Emergency Care & Critical Medicine',
      image: DrOne,
      profileLink: '/viewprofile5',
    },
    {
      id: 3,
      name: 'Dr. Sarah Wilson',
      specialty: 'Dermatology Specialist',
      description: 'Expert in Pet Skin Conditions & Allergies',
      image: DrOne,
      profileLink: '/viewprofile5',
    },
    {
      id: 4,
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedic Surgeon',
      description: 'Specializing in Bone & Joint Surgery',
      image: DrOne,
      profileLink: '/viewprofile5',
    },
    {
      id: 5,
      name: 'Dr. Emily Davis',
      specialty: 'Internal Medicine',
      description: 'Expert in Complex Diagnostic Cases',
      image: DrOne,
      profileLink: '/viewprofile5',
    },
  ]

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth + 24 // card width + gap
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
      setCurrentIndex(Math.max(0, currentIndex - 1))
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth + 24 // card width + gap
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
      setCurrentIndex(Math.min(doctors.length - 1, currentIndex + 1))
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-primary"
          style={{ fontFamily: "'Abril Fatface', serif" }}
        >
          Our Team
        </div>
        <p
          className="text-base sm:text-lg lg:text-xl"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Quick connections for scheduling pet
        </p>
        <p
          className="text-base sm:text-lg lg:text-xl mb-8"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          care professionals
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110 border border-gray-200"
          disabled={currentIndex === 0}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110 border border-gray-200"
          disabled={currentIndex >= doctors.length - 1}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8 sm:px-12 py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' },
          }}
        >
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex-shrink-0 w-72 sm:w-80 lg:w-96 relative block rounded-3xl border border-gray-100 bg-white shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-48 sm:h-56 lg:h-64 w-full rounded-tr-3xl object-cover bg-slate-300"
              />

              <div className="p-4 sm:p-6 text-center">
                <strong className="text-lg sm:text-xl font-medium text-gray-900">
                  {doctor.name}
                </strong>
                <p className="mt-2 text-sm sm:text-base text-primary font-semibold">
                  {doctor.specialty}
                </p>
                <p className="mt-2 text-sm sm:text-base text-gray-700">
                  {doctor.description}
                </p>

                <Link to={doctor.profileLink}>
                  <span className="mt-4 block rounded-md border bg-primary px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900 hover:border-primary">
                    View Profile
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {doctors.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const cardWidth =
                  carouselRef.current?.children[0].offsetWidth + 24
                carouselRef.current?.scrollTo({
                  left: cardWidth * index,
                  behavior: 'smooth',
                })
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default DoctorCarousel5
