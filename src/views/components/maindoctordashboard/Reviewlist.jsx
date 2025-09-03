import React from "react";
import Sidebar from "./SideBar"; // Adjust path as needed

const petReviews = [
  {
    id: 1,
    name: "Charlie the Beagle",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    comment:
      "The vet was so gentle and kind. Charlie usually gets nervous, but he was totally calm here!",
    date: "Monday, 18 March 2024 10:15 AM",
    condition: "Regular Checkup",
    published: false,
  },
  {
    id: 2,
    name: "Luna the Persian Cat",
    avatar: "https://i.pravatar.cc/100?img=22",
    rating: 4,
    comment:
      "Staff handled Luna with care. She had a minor allergy, and they gave great advice and medicine.",
    date: "Wednesday, 3 April 2024 02:30 PM",
    condition: "Allergy Treatment",
    published: true,
  },
  {
    id: 3,
    name: "Max the Labrador",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    comment:
      "Max had a leg injury and they treated him wonderfully. He recovered fast. Highly recommend!",
    date: "Friday, 12 April 2024 09:45 AM",
    condition: "Injury Recovery",
    published: false,
  },
  {
    id: 4,
    name: "Bella the Bunny",
    avatar: "https://i.pravatar.cc/100?img=30",
    rating: 4,
    comment:
      "Bella was handled so well during her nail trim. Thank you for being bunny-friendly!",
    date: "Sunday, 28 April 2024 01:20 PM",
    condition: "Grooming",
    published: false,
  },
  {
    id: 5,
    name: "Rocky the Rottweiler",
    avatar: "https://i.pravatar.cc/100?img=40",
    rating: 5,
    comment: "Excellent diagnosis and care. Rocky is doing much better!",
    date: "Tuesday, 7 May 2024 11:00 AM",
    condition: "Surgery Follow-up",
    published: true,
  },
  {
    id: 6,
    name: "Milo the Parrot",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 3,
    comment: "Good service, but had to wait a bit too long.",
    date: "Thursday, 9 May 2024 04:00 PM",
    condition: "Beak Trimming",
    published: false,
  },
  {
    id: 7,
    name: "Daisy the Dachshund",
    avatar: "https://i.pravatar.cc/100?img=18",
    rating: 4,
    comment: "Very friendly staff and smooth experience.",
    date: "Saturday, 11 May 2024 12:45 PM",
    condition: "Vaccination",
    published: true,
  },
  {
    id: 8,
    name: "Coco the Cockatoo",
    avatar: "https://i.pravatar.cc/100?img=9",
    rating: 5,
    comment: "Coco got great care. The doctor was very experienced with birds.",
    date: "Sunday, 12 May 2024 03:30 PM",
    condition: "Feather Checkup",
    published: false,
  },
  {
    id: 9,
    name: "Tiger the Tabby",
    avatar: "https://i.pravatar.cc/100?img=8",
    rating: 4,
    comment: "Very clean clinic and knowledgeable team.",
    date: "Monday, 13 May 2024 09:00 AM",
    condition: "Skin Irritation",
    published: true,
  },
];

const PetReviewList = () => {
  return (
    <div className="flex bg-blue-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Pet Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {petReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>

              <div className="mb-2 text-yellow-400 text-sm">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
              </div>

              <p className="text-gray-700 mb-2">{review.comment}</p>

              <div className="text-sm mb-4">
                <span className="text-gray-500">Condition: </span>
                <span className="font-semibold text-teal-600">
                  {review.condition}
                </span>
              </div>

              <div className="flex justify-between gap-2">
                <button className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 text-sm">
                  DELETE
                </button>
                <button
                  disabled={review.published}
                  className={`px-3 py-1 text-sm rounded border transition ${
                    review.published
                      ? "border-gray-400 text-gray-400 cursor-not-allowed"
                      : "border-green-600 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {review.published ? "UNPUBLISH" : "PUBLISH"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetReviewList;

// import React from "react";
// import Sidebar from "./SideBar";

// const petReviews = [
//   {
//     id: 1,
//     name: "Charlie the Beagle",
//     avatar: "https://i.pravatar.cc/100?img=12",
//     rating: 5,
//     comment:
//       "The vet was so gentle and kind. Charlie usually gets nervous, but he was totally calm here!",
//     date: "Monday, 18 March 2024 10:15 AM",
//     condition: "Regular Checkup",
//     published: false,
//   },
//   {
//     id: 2,
//     name: "Luna the Persian Cat",
//     avatar: "https://i.pravatar.cc/100?img=22",
//     rating: 4,
//     comment:
//       "Staff handled Luna with care. She had a minor allergy, and they gave great advice and medicine.",
//     date: "Wednesday, 3 April 2024 02:30 PM",
//     condition: "Allergy Treatment",
//     published: true,
//   },
//   {
//     id: 3,
//     name: "Max the Labrador",
//     avatar: "https://i.pravatar.cc/100?img=5",
//     rating: 5,
//     comment:
//       "Max had a leg injury and they treated him wonderfully. He recovered fast. Highly recommend!",
//     date: "Friday, 12 April 2024 09:45 AM",
//     condition: "Injury Recovery",
//     published: false,
//   },
//   {
//     id: 4,
//     name: "Bella the Bunny",
//     avatar: "https://i.pravatar.cc/100?img=30",
//     rating: 4,
//     comment:
//       "Bella was handled so well during her nail trim. Thank you for being bunny-friendly!",
//     date: "Sunday, 28 April 2024 01:20 PM",
//     condition: "Grooming",
//     published: false,
//   },
// ];

// const PetReviewList = () => {
//   return (
//     <div className=" flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <h2 className="text-2xl font-bold mb-4">Pet Reviews</h2>
//       <div className="space-y-4">
//         {petReviews.map((review) => (
//           <div
//             key={review.id}
//             className="flex items-start p-4 border rounded-lg bg-white shadow-sm"
//           >
//             <input type="checkbox" className="mt-2 mr-4" />
//             <img
//               src={review.avatar}
//               alt={review.name}
//               className="w-14 h-14 rounded-full object-cover mr-4"
//             />
//             <div className="flex-1">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-bold text-lg">{review.name}</h4>
//                   <div className="flex items-center space-x-1 text-yellow-400">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <span key={i}>{i < review.rating ? "★" : "☆"}</span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="text-sm text-right">
//                   <p className="text-gray-400">Condition</p>
//                   <p className="text-teal-600 font-semibold">
//                     {review.condition}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-700 my-2">{review.comment}</p>
//               <p className="text-sm text-gray-500">{review.date}</p>
//               <div className="mt-4 flex gap-2">
//                 <button className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-100 transition">
//                   DELETE
//                 </button>
//                 <button
//                   className={`border px-4 py-1 rounded ${
//                     review.published
//                       ? "border-gray-400 text-gray-400 cursor-not-allowed"
//                       : "border-green-600 text-green-600 hover:bg-green-100"
//                   }`}
//                   disabled={review.published}
//                 >
//                   {review.published ? "UNPUBLISH" : "PUBLISH"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PetReviewList;
