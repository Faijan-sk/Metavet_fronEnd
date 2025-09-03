// import { Calendar, Hash, PawPrint, User } from "lucide-react";
// import { useState } from "react";
// import tiger from "../../../assets/tiger.jpg";
// export default function PetDetailsCard() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-4">
//         {/* Page Header */}
//         <div className="mb-6 flex items-center justify-between">
//           {/* Left side: title + subtitle */}
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-1">
//               🐾 Pet Record
//             </h1>
//             <p className="text-gray-600 text-sm">
//               Manage and know more about your pets
//             </p>
//           </div>

//           {/* Right side: Add Pet button */}
//           <button  onClick={() => setIsOpen(true)} className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-4 py-2 rounded-lg shadow-md transition text-sm font-medium">
//             ➕ Add Pet
//           </button>
//         </div>
//         {/* Horizontal Card */}
//         <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row">
//           {/* Left Side (Image + Pet Info) */}
//           <div className="bg-gradient-to-br from-[#52B2AD] to-[#42948f] text-white flex flex-col items-center justify-center p-4 md:w-1/4">
//             <img
//               src={tiger}
//               alt="Cockroach"
//               className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-2 object-cover"
//             />

//             <h2 className="text-lg font-semibold leading-tight">Bella</h2>
//             <p className="text-xs opacity-90">Golden Retriever</p>
//           </div>

//           {/* Right Side (Details) */}
//           <div className="flex-1 p-4 space-y-2">
//             <div className="flex justify-between items-center border-b pb-1">
//               <span className="flex items-center text-gray-500 gap-1 text-sm">
//                 <Hash size={14} /> ID
//               </span>
//               <span className="font-medium text-gray-800 text-sm">
//                 #PET-001
//               </span>
//             </div>

//             <div className="flex justify-between items-center border-b pb-1">
//               <span className="flex items-center text-gray-500 gap-1 text-sm">
//                 <User size={14} /> Owner
//               </span>
//               <span className="font-medium text-gray-800 text-sm">
//                 John Doe
//               </span>
//             </div>

//             <div className="flex justify-between items-center border-b pb-1">
//               <span className="flex items-center text-gray-500 gap-1 text-sm">
//                 <PawPrint size={14} /> Species
//               </span>
//               <span className="font-medium text-gray-800 text-sm">Dog</span>
//             </div>

//             <div className="flex justify-between items-center border-b pb-1">
//               <span className="flex items-center text-gray-500 gap-1 text-sm">
//                 <Calendar size={14} /> Next Appointment
//               </span>
//               <span className="font-medium text-gray-800 text-sm">
//                 Sep 10, 2025
//               </span>
//             </div>

//             {/* Buttons */}
//             <div className="pt-3 flex gap-2 justify-end">
//               <button
//                 onClick={() => setOpen(true)}
//                 className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-3 py-1.5 rounded-md shadow-md transition text-sm font-medium"
//               >
//                 View Profile
//               </button>
//               <button className="border border-[#52B2AD] text-[#52B2AD] hover:bg-[#52B2AD] hover:text-white px-3 py-1.5 rounded-md shadow-md transition text-sm font-medium">
//                 Appointment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               ✖
//             </button>

//             {/* Modal Content */}
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src="https://placekitten.com/200/200"
//                 alt="Pet"
//                 className="w-28 h-28 rounded-full border-4 border-[#52B2AD] shadow-md mb-3 object-cover"
//               />
//               <h2 className="text-2xl font-bold text-gray-900">Bella</h2>
//               <p className="text-gray-500 mb-4">Golden Retriever</p>
//             </div>

//             {/* Details */}
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-500">ID</span>
//                 <span className="font-medium">#PET-001</span>
//               </div>
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-500">Owner</span>
//                 <span className="font-medium">John Doe</span>
//               </div>
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-500">Species</span>
//                 <span className="font-medium">Dog</span>
//               </div>
//               <div className="flex justify-between border-b pb-2">
//                 <span className="text-gray-500">Next Appointment</span>
//                 <span className="font-medium">Sep 10, 2025</span>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="mt-5 flex justify-end gap-2">
//               <button
//                 onClick={() => setOpen(false)}
//                 className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
//               >
//                 Close
//               </button>
//               <button className="px-4 py-2 rounded-md bg-[#52B2AD] text-white hover:bg-[#42948f] text-sm">
//                 Edit Info
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { Calendar, Hash, PawPrint, User } from "lucide-react";
import { useEffect, useState } from "react";
import tiger from "../../../assets/tiger.jpg";
import useJwt from "../../../enpoints/jwt/useJwt";
import AddPets from "./AddPets";
export default function PetDetailsCard() {
  const [open, setOpen] = useState(false); // Profile modal
  const [isAddOpen, setIsAddOpen] = useState(false); // Add Pet modal

  // Form states
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [species, setSpecies] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = { petName, ownerName, species, image };
    console.log("Pet Added:", newPet);
    alert("Pet added successfully!");
    setIsAddOpen(false);
  };

  const fetchPets = async () => {
    try {
      const getAll = await useJwt.getAllPets('12345');
      console.log(getAll);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          {/* Left side: title + subtitle */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              🐾 Pet Record
            </h1>
            <p className="text-gray-600 text-sm">
              Manage and know more about your pets
            </p>
          </div>

          {/* Right side: Add Pet button */}
          <AddPets setIsAddOpen={setIsAddOpen} isAddOpen={isAddOpen} />
        </div>

        {/* Horizontal Card */}
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left Side (Image + Pet Info) */}
          <div className="bg-gradient-to-br from-[#52B2AD] to-[#42948f] text-white flex flex-col items-center justify-center p-4 md:w-1/4">
            <img
              src={tiger}
              alt="Pet"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-2 object-cover"
            />

            <h2 className="text-lg font-semibold leading-tight">Tiger</h2>
            <p className="text-xs opacity-90">Rohit Sonawane</p>
          </div>

          {/* Right Side (Details) */}
          <div className="flex-1 p-4 space-y-2">
            <div className="flex justify-between items-center border-b pb-1">
              <span className="flex items-center text-gray-500 gap-1 text-sm">
                <Hash size={14} /> ID
              </span>
              <span className="font-medium text-gray-800 text-sm">
                #PET-001
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-1">
              <span className="flex items-center text-gray-500 gap-1 text-sm">
                <User size={14} /> Owner
              </span>
              <span className="font-medium text-gray-800 text-sm">
                Rohit Sonawane
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-1">
              <span className="flex items-center text-gray-500 gap-1 text-sm">
                <PawPrint size={14} /> Species
              </span>
              <span className="font-medium text-gray-800 text-sm">Tiger</span>
            </div>

            <div className="flex justify-between items-center border-b pb-1">
              <span className="flex items-center text-gray-500 gap-1 text-sm">
                <Calendar size={14} /> Next Appointment
              </span>
              <span className="font-medium text-gray-800 text-sm">
                Sep 10, 2025
              </span>
            </div>

            {/* Buttons */}
            <div className="pt-3 flex gap-2 justify-end">
              <button
                onClick={() => setOpen(true)}
                className="bg-[#52B2AD] hover:bg-[#42948f] text-white px-3 py-1.5 rounded-md shadow-md transition text-sm font-medium"
              >
                View Profile
              </button>
              <button className="border border-[#52B2AD] text-[#52B2AD] hover:bg-[#52B2AD] hover:text-white px-3 py-1.5 rounded-md shadow-md transition text-sm font-medium">
                Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Profile Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              <img
                src={tiger}
                alt="Pet"
                className="w-28 h-28 rounded-full border-4 border-[#52B2AD] shadow-md mb-3 object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-900">Sheru</h2>
              <p className="text-gray-500 mb-4">Owner: Rohit Sonawane</p>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">ID</span>
                <span className="font-medium">#PET-001</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Owner UID</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Pet Name</span>
                <span className="font-medium">Sheru</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Species</span>
                <span className="font-medium">Tiger</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Breed</span>
                <span className="font-medium">Bengal Tiger</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Gender</span>
                <span className="font-medium">Male</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Age</span>
                <span className="font-medium">5 Years</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Height</span>
                <span className="font-medium">65 cm</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Weight</span>
                <span className="font-medium">220 kg</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Vaccinated</span>
                <span className="font-medium">Yes</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Neutered</span>
                <span className="font-medium">No</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Medical Notes</span>
                <span className="font-medium">No major illness</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Next Appointment</span>
                <span className="font-medium">Sep 10, 2025</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-md bg-[#52B2AD] text-white hover:bg-[#42948f] text-sm">
                Edit Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
