// import React from "react";

// const HospitalTour = () => {
//   return (
//     <div className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Hospital Tour Section */}
//         <div className="text-center">
//           <h2 className="text-4xl font-semibold text-gray-800 mb-8">
//             Hospital Tour
//           </h2>
//           <p className="text-lg text-gray-600 mb-8">
//             Take a virtual tour of our veterinary clinic. Get a
//             behind-the-scenes look at daily life at our Veterinary Clinic!
//           </p>

//           {/* 9 Images in a 3x3 Grid */}
//           <div className="grid grid-cols-3 gap-6 mb-12">
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/busy-hospital-reception-waiting-area-with-diverse-patients-having-medical-appointment-checkup-visit-waiting-clinic-lobby-attend-healthcare-consultation-medicine-support_482257-48629.1ca41a1acc90468de2e6.avif"
//                 alt="Hospital Image 1"
//                 className="w-full h-72 rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/dog.jpg"
//                 alt="Hospital Image 2"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/123.jpg"
//                 alt="Hospital Image 3"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/123.jpg"
//                 alt="Hospital Image 4"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/11.avif"
//                 alt="Hospital Image 5"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/treatment-area.d81360469179aca58742 (1).png"
//                 alt="Hospital Image 6"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/20231014-Anderson-Vet-32_websize.ac98201b6dd4dcf707d6.jpg"
//                 alt="Hospital Image 7"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/pharmacy.2dbb832cb3755fc7d7b6 (1).png"
//                 alt="Hospital Image 8"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//             <div className="">
//               <img
//                 src="./src/assets/MetavetImages/veterinarian-taking-care-pet-dog_23-2149198634.e7df564bb66989fda3c4.avif"
//                 alt="Hospital Image 9"
//                 className="w-full h-auto rounded-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Contact Information Section with Icons */}
//         <div className="flex flex-wrap justify-between gap-12 text-center">
//           {/* Location */}
//           <div className="bg-white p-6 rounded-lg shadow-md max-w-xs flex-1">
//             <div className=" p-4 rounded-full ">
//               <svg
//                 className="w-12 h-12 text-black mx-auto"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 width="1em"
//                 height="1em"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"
//                 ></path>
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Location
//             </h3>
//             <p className="text-gray-600">
//               187 Nanaimo Ave W #101, Penticton, BC V2A 1N2
//             </p>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-white p-6 rounded-lg shadow-md max-w-xs flex-1">
//             <div className=" p-4 rounded-full ">
//               <svg
//                 className="w-12 h-12 text-black mx-auto"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 width="1em"
//                 height="1em"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3m6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1z"
//                 ></path>
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Contact Information
//             </h3>
//             <p className="text-gray-600">
//               Phone:{" "}
//               <a href="tel:+12504930503" className="text-indigo-600">
//                 250-493-0503
//               </a>
//             </p>
//             <p className="text-gray-600">
//               Email:{" "}
//               <a
//                 href="mailto:reception@andersonvet.ca"
//                 className="text-indigo-600"
//               >
//                 reception@andersonvet.ca
//               </a>
//             </p>
//           </div>

//           {/* Hours of Operation */}
//           <div className="bg-white p-6 rounded-lg shadow-md max-w-xs flex-1">
//             <div className=" p-4 rounded-full ">
//               <svg
//                 className="w-12 h-12 text-black mx-auto"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 width="1em"
//                 height="1em"
//               >
//                 <path
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
//                 ></path>
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Hours</h3>
//             <p className="text-gray-600">Monday - Friday: 8:00 am – 5:00 pm</p>
//             <p className="text-gray-600">Saturday, Sunday & Holidays: Closed</p>
//           </div>
//         </div>

//         {/* Emergency Contact Information */}
//         <p className="text-gray-600 mt-10 text-center">
//           For after hours and 24-hour monitored emergencies, please call:
//         </p>
//         <p className="text-gray-600 text-center">
//           <a href="tel:+12345678910" className="text-indigo-600">
//             Fairfield Animal Hospital-Emergency: 1-234-567-8910
//           </a>{" "}
//           or{" "}
//           <a href="tel:+1112223344" className="text-indigo-600">
//             111-222-3344
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HospitalTour;
import React, { useState } from "react";

const HospitalTour = () => {
  const [address, setAddress] = useState("");
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState(null);

  // Updated demo clinics array, removed "Anderson Clinic" and ensured "Metavet Veterinary Clinic" is present.
  const demoClinics = [
    {
      name: "Penticton Vet Clinic",
      vicinity: "1234 Main St, Penticton, BC",
      place_id: "1",
    },
    {
      name: "Okanagan Animal Hospital",
      vicinity: "5678 Lakeshore Dr, Penticton, BC",
      place_id: "2",
    },
    {
      name: "Pet Veterinary Clinic",
      vicinity: "1234 Main St, Penticton, BC",
      place_id: "3",
    },
  ];

  const handleSearch = () => {
    if (!address) {
      setError("Please enter an address.");
      return;
    }

    // Here we simulate the response for the demo. If address contains any of these keywords, show the demo clinics.
    const searchTerms = ["vet", "clinic", "animal", "address"]; // Add other common terms for easy searching

    // Checking if the address includes any of the simplified terms
    const isMatch = searchTerms.some((term) =>
      address.toLowerCase().includes(term)
    );

    if (isMatch) {
      setClinics(demoClinics);
      setError(null);
    } else {
      setError("No clinics found for the given address.");
      setClinics([]);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Find Nearest Clinic
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter your address below to find the nearest veterinary clinic.
          </p>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your address"
            />
            <button
              onClick={handleSearch}
              className="ml-4 px-6 py-3 bg-primary text-white rounded-lg "
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}
        </div>

        {/* Display Nearest Clinics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.length > 0 &&
            clinics.map((clinic, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {clinic.name}
                </h3>
                <p className="text-gray-600 mb-4">{clinic.vicinity}</p>
                <a
                  href={`https://www.google.com/maps/search/?q=${clinic.name}+${clinic.vicinity}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalTour;
