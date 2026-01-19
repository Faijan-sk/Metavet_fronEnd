import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DrOne from "./../../../assets/MetavetImages/Dr profile/dr2.png"
import useJwt from '../../../enpoints/jwt/useJwt'

const DoctorCarousel5 = () => {
  const [doctors, setDoctors] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  // ================= FETCH DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await useJwt.getAllDoctors()

        const approvedDoctors = data.data
          .filter(doc => doc.doctorProfileStatus === "APPROVED")
          .map(doc => ({
            id: doc.doctorId,
            uid: doc.doctorUid,
            name: `Dr. ${doc.firstName} ${doc.lastName}`,
            specialty: doc.specialization,
            description: doc.bio,
            image: DrOne, // backend se image nahi aa rahi to static
          }))

        setDoctors(approvedDoctors)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()
  }, [])

  // ================= SCROLL FUNCTIONS =================
  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth + 24
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
      setCurrentIndex(Math.max(0, currentIndex - 1))
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth + 24
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
      setCurrentIndex(Math.min(doctors.length - 1, currentIndex + 1))
    }
  }

  // ================= JSX =================
  return (
    <>
      {/* Heading */}
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-primary"
          style={{ fontFamily: "'Abril Fatface', serif" }}
        >
          Our Team
        </div>
        <p className="text-base sm:text-lg lg:text-xl">
          Quick connections for scheduling pet
        </p>
        <p className="text-base sm:text-lg lg:text-xl mb-8">
          care professionals
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 border"
        >
          ◀
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={currentIndex >= doctors.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 border"
        >
          ▶
        </button>

        {/* Cards */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-10 py-4 scrollbar-hide"
        >
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex-shrink-0 w-80 bg-white rounded-3xl shadow-xl hover:scale-105 transition-all"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-56 w-full object-cover rounded-t-3xl"
              />

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-primary font-medium mt-2">
                  {doctor.specialty}
                </p>
                <p className="text-gray-600 mt-2 text-sm">
                  {doctor.description}
                </p>

                {/* <Link to={`/viewprofile5/${doctor.uid}`}>
                  <button className="mt-4 bg-primary text-white px-5 py-2 rounded-md hover:bg-white hover:text-primary border border-primary transition">
                    View Profile
                  </button>
                </Link> */}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {doctors.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const cardWidth =
                  carouselRef.current.children[0].offsetWidth + 24
                carouselRef.current.scrollTo({
                  left: cardWidth * index,
                  behavior: 'smooth',
                })
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

export default DoctorCarousel5
