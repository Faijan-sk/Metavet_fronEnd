import React, { useState, useRef } from 'react'

const ClientReview3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      review:
        "Amazing service! The product exceeded my expectations. I'll definitely be returning for more.",
      rating: 4,
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      review:
        'Great experience! Very professional and quick. Highly recommend them.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sam Brown',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      review:
        'Good service, but the response time could be improved. Overall, satisfied.',
      rating: 3,
    },
    {
      id: 4,
      name: 'Emily Johnson',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      review:
        'Outstanding customer service! They went above and beyond to help me with my needs.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Michael Davis',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      review:
        'Very reliable and trustworthy. The quality of work was exceptional.',
      rating: 4,
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      image: 'https://randomuser.me/api/portraits/women/25.jpg',
      review:
        'Impressed with their attention to detail and prompt communication throughout the process.',
      rating: 5,
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
      setCurrentIndex(Math.min(reviews.length - 1, currentIndex + 1))
    }
  }

  return (
    <div style={{ marginBottom: '50px' }}>
      <div className="flex flex-col items-center justify-center text-center px-4 py-8 mb-5">
        <div
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-primary"
          style={{ fontFamily: "'Abril Fatface', serif" }}
        >
          Client Reviews
        </div>
        <p
          className="text-base sm:text-lg lg:text-xl mb-8"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          What our satisfied customers say about us
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
          disabled={currentIndex >= reviews.length - 1}
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
          {reviews.map((review) => (
            <div key={review.id} className="flex-shrink-0 w-72 sm:w-80 lg:w-96">
              {/* Flip Card */}
              <div className="relative transform-style-preserve-3d transition-transform duration-1000 hover:rotate-y-180 h-96">
                {/* Front Side */}
                <div className="absolute w-full h-full bg-slate-100 shadow-lg rounded-lg p-6 flex flex-col items-center backface-hidden transform hover:scale-105 transition-all duration-300">
                  <div className="text-xl sm:text-2xl font-semibold mb-4">
                    Client Review
                  </div>
                  <img
                    src={review.image}
                    alt={`${review.name} Profile`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">
                    {review.name}
                  </h3>

                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          index < review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15l-3.5 2 1-4.5L3 8.5l4.5-.5L10 3l2.5 4l4.5.5-2.5 4.5L10 15z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-xs sm:text-sm text-center leading-relaxed">
                    {review.review}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
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
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

export default ClientReview3
