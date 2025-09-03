import React, { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Ana Rodes",
    image: "./src/assets/MetavetImages/44.jpg",
    title: "Veterinarian",
    specialization: "Specializing in Pet Care & Wellness",
    description:
      "With over 10 years of experience in the field, I am dedicated to providing the best care for your pets.",
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Excellent care! Very professional and caring.",
      },
    ],
  },
  {
    id: 2,
    name: "Ana Rodes",
    image: "./src/assets/MetavetImages/44.jpg",
    title: "Veterinarian",
    specialization: "Specializing in Pet Surgery & Diagnostics",
    description:
      "I have a passion for improving the health of pets and ensuring a safe, comfortable experience.",
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Great service and compassionate care.",
      },
    ],
  },
  {
    id: 3,
    name: "Ana Rodes",
    image: "./src/assets/MetavetImages/44.jpg",
    title: "Veterinarian",
    specialization: "Specializing in Emergency & Critical Care",
    description:
      "With my expertise, I provide prompt and effective care to pets in critical conditions.",
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Very quick and efficient care, my pet is doing well.",
      },
    ],
  },
];

const ClientReview = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-gray-100 shadow-lg rounded-lg max-w-sm w-full text-center p-6"
          >
            <div className="mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-full mx-auto"
              />
            </div>
            <h3 className="text-2xl font-semibold">{doctor.name}</h3>

            {/* Review Section */}
            <div className="mt-6 text-left">
              <h4 className="font-semibold text-lg ">Client Reviews</h4>
              {doctor.reviews.map((review) => (
                <div key={review.id} className="mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          index < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15l-3.5 2 1-4.5L3 8.5l4.5-.5L10 3l2.5 4l4.5.5-2.5 4.5L10 15z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReview;
