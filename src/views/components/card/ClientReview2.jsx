// import React from "react";

// const reviews = [
//   {
//     id: 1,
//     name: "John Doe",
//     image: "https://randomuser.me/api/portraits/men/32.jpg", // Client image URL
//     reviewText:
//       "Amazing service! The product exceeded my expectations. I'll definitely be returning  .",
//     rating: 4,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     image: "https://randomuser.me/api/portraits/women/44.jpg", // Another client image URL
//     reviewText:
//       "Great experience! Very professional and quick. Highly recommend them.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Sam Brown",
//     image: "https://randomuser.me/api/portraits/men/45.jpg", // Another client image URL
//     reviewText:
//       "Good service, but the response time could be improved. Overall, satisfied.",
//     rating: 3,
//   },
// ];

// const ClientReview2 = () => {
//   return (
//     <div className="flex flex-wrap justify-center space-x-6 space-y-6">
//       {reviews.map((review) => (
//         <div
//           key={review.id}
//           className="max-w-xs bg-lightgray p-6 rounded-lg shadow-lg"
//         >
//           {/* Profile Image and Name */}
//           <div className="flex items-center mb-4">
//             <img
//               src={review.image}
//               alt="Client Profile"
//               className="w-16 h-16 rounded-full mr-4"
//             />
//             <div>
//               <h3 className="text-xl font-semibold">{review.name}</h3>
//               <p className="text-sm text-gray-500">Verified Customer</p>
//             </div>
//           </div>

//           {/* Rating Stars */}
//           <div className="flex mb-4">
//             {[...Array(5)].map((_, index) => (
//               <svg
//                 key={index}
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-5 w-5 ${
//                   index < review.rating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlnsXlink="http://www.w3.org/1999/xlink"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 15l-3.5 2 1-4.5L3 8.5l4.5-.5L10 3l2.5 4l4.5.5-2.5 4.5L10 15z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             ))}
//           </div>

//           {/* Review Comment */}
//           <p className="text-gray-600 text-sm">{review.reviewText}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClientReview2;

import React from "react";

const reviews = [
  {
    name: "Jane Doe",
    role: "Dog Owner",
    review:
      "I absolutely love the care my pet received here. The team was so professional and kind. My dog felt very comfortable throughout the visit.  for all veterinary needs!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "John Smith",
    role: "Cat Owner",
    review:
      "The staff were wonderful! They took great care of my cat and made the whole process smooth and easy. I will definitely come back for future visits.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma Johnson",
    role: "Rabbit Owner",
    review:
      "Very happy with the service! The vet was very attentive, and my rabbit was in good hands. The clinic has great facilities and a friendly atmosphere.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const ClientReview2 = () => {
  return (
    <div className="flex justify-center space-x-6">
      {/* Mapping over the reviews array to display each card */}
      {reviews.map((review, index) => (
        <div
          key={index}
          className="w-80 max-w-sm rounded overflow-hidden shadow-lg bg-blue-50"
        >
          {/* Card Header */}
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-green-800">
              Client Review
            </h2>
          </div>

          {/* Review Content */}
          <div className="p-4">
            <p className="text-gray-700 text-lg mb-4">"{review.review}"</p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="text-yellow-500">
                {"⭐".repeat(review.rating)}
                {/* Dynamically displaying the star rating */}
              </span>
            </div>

            {/* Client Info */}
            <div className="flex items-center">
              <img
                src={review.image}
                alt="Client"
                className="w-12 h-12 rounded-full border-2 mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientReview2;
