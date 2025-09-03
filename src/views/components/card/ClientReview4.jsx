import React from "react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    title: "Veterinary",
    text: "The service at Fox Veterinary was exceptional! The staff was friendly, and they took great care of my pet. Highly recommend them!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Emily Smith",
    title: " Veterinary",
    text: "I was so impressed by the level of care my dog received. The entire team was gentle, knowledgeable, and professional. Will definitely return!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Mark Wilson",
    title: " Veterinary",
    text: "Fox Veterinary made my cat's visit stress-free. The staff is amazing, and I felt reassured that my pet was in the best hands possible. Thank you!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const ClientReview4 = () => {
  return (
    <div className="flex justify-between gap-8 p-8">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="w-1/3 max-w-xs rounded-lg overflow-hidden shadow-lg bg-slate-100 p-6 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Review Header (Client's Name and Picture) */}
          <div className="flex items-center mb-4">
            <img
              className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
              src={review.image}
              alt={review.name}
            />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {review.name}
              </p>
              <p className="text-gray-500 text-sm">{review.title}</p>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 text-base mb-4">{review.text}</p>

          {/* Rating (Stars) */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`${
                  index < review.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientReview4;
