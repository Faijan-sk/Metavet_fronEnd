// import React, { useState } from "react";
// import AddPatientForm from "./AddPatientForm";
// import Sidebar from "./SideBar";

// const petPatients = [
//   {
//     id: "#PET-0001",
//     checkInDate: "2025-05-12, 10:00 AM",
//     petName: "Bella",
//     species: "Dog",
//     breed: "Golden Retriever",
//     owner: "Maria Gonzales",
//     status: "New Patient",
//   },
//   {
//     id: "#PET-0002",
//     checkInDate: "2025-05-10, 09:30 AM",
//     petName: "Max",
//     species: "Cat",
//     breed: "Siamese",
//     owner: "John Carter",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0003",
//     checkInDate: "2025-05-08, 11:15 AM",
//     petName: "Whiskers",
//     species: "Cat",
//     breed: "Persian",
//     owner: "Emily Wong",
//     status: "In Treatment",
//   },
//   {
//     id: "#PET-0004",
//     checkInDate: "2025-05-07, 01:45 PM",
//     petName: "Rocky",
//     species: "Dog",
//     breed: "Bulldog",
//     owner: "David Lee",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0005",
//     checkInDate: "2025-05-05, 03:00 PM",
//     petName: "Chirpy",
//     species: "Bird",
//     breed: "Parakeet",
//     owner: "Sophia Johnson",
//     status: "New Patient",
//   },
//   {
//     id: "#PET-0001",
//     checkInDate: "2025-05-12, 10:00 AM",
//     petName: "Bella",
//     species: "Dog",
//     breed: "Golden Retriever",
//     owner: "Maria Gonzales",
//     status: "New Patient",
//   },
//   {
//     id: "#PET-0002",
//     checkInDate: "2025-05-10, 09:30 AM",
//     petName: "Max",
//     species: "Cat",
//     breed: "Siamese",
//     owner: "John Carter",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0003",
//     checkInDate: "2025-05-08, 11:15 AM",
//     petName: "Whiskers",
//     species: "Cat",
//     breed: "Persian",
//     owner: "Emily Wong",
//     status: "In Treatment",
//   },
//   {
//     id: "#PET-0004",
//     checkInDate: "2025-05-07, 01:45 PM",
//     petName: "Rocky",
//     species: "Dog",
//     breed: "Bulldog",
//     owner: "David Lee",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0005",
//     checkInDate: "2025-05-05, 03:00 PM",
//     petName: "Chirpy",
//     species: "Bird",
//     breed: "Parakeet",
//     owner: "Sophia Johnson",
//     status: "New Patient",
//   },
// ];

// const getStatusStyle = (status) => {
//   switch (status) {
//     case "New Patient":
//       return "bg-green-100 text-green-700 border border-green-500";
//     case "Recovered":
//       return "bg-indigo-100 text-indigo-700 border border-indigo-500";
//     case "In Treatment":
//       return "bg-orange-100 text-orange-700 border border-orange-500";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// };

// const PatientList = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <div className="bg-white rounded shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Pet Patient Directory</h2>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
//               onClick={() => setShowForm(true)}
//             >
//               + Add New
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border text-left">
//               <thead className="bg-gray-100 font-semibold">
//                 <tr>
//                   <th className="p-3 border">Pet ID</th>
//                   <th className="p-3 border">Check-In</th>
//                   <th className="p-3 border">Pet Name</th>
//                   <th className="p-3 border">Species</th>
//                   <th className="p-3 border">Breed</th>
//                   <th className="p-3 border">Owner</th>
//                   <th className="p-3 border">Status</th>
//                   <th className="p-3 border">Options</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {petPatients.map((pet) => (
//                   <tr key={pet.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 border">{pet.id}</td>
//                     <td className="p-3 border">{pet.checkInDate}</td>
//                     <td className="p-3 border">{pet.petName}</td>
//                     <td className="p-3 border">{pet.species}</td>
//                     <td className="p-3 border">{pet.breed}</td>
//                     <td className="p-3 border">{pet.owner}</td>
//                     <td className="p-3 border">
//                       <span
//                         className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${getStatusStyle(
//                           pet.status
//                         )}`}
//                       >
//                         {pet.status}
//                       </span>
//                     </td>
//                     <td className="p-3 border space-x-2">
//                       <button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
//                         Edit
//                       </button>
//                       <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600">
//                         Info
//                       </button>
//                       <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
//                         History
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>

//       {showForm && <AddPatientForm onClose={() => setShowForm(false)} />}
//     </div>
//   );
// };

// export default PatientList;

import React, { useState } from "react";
import AddPatientForm from "./AddPatientForm";
import Sidebar from "./SideBar";
import EditPatientForm from "./EditPatientForm";
import PatientInfoPopup from "./PatientInfoPopup";
import PatientHistoryPopup from "./PatientHistoryPopup";

const petPatients = [
  {
    id: "#PET-0001",
    checkInDate: "2025-05-12, 10:00 AM",
    petName: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    owner: "Maria Gonzales",
    status: "New Patient",
  },
  {
    id: "#PET-0002",
    checkInDate: "2025-05-10, 09:30 AM",
    petName: "Max",
    species: "Cat",
    breed: "Siamese",
    owner: "John Carter",
    status: "Recovered",
  },
  {
    id: "#PET-0003",
    checkInDate: "2025-05-08, 11:15 AM",
    petName: "Whiskers",
    species: "Cat",
    breed: "Persian",
    owner: "Emily Wong",
    status: "In Treatment",
  },
  {
    id: "#PET-0004",
    checkInDate: "2025-05-07, 01:45 PM",
    petName: "Rocky",
    species: "Dog",
    breed: "Bulldog",
    owner: "David Lee",
    status: "Recovered",
  },
  {
    id: "#PET-0005",
    checkInDate: "2025-05-05, 03:00 PM",
    petName: "Chirpy",
    species: "Bird",
    breed: "Parakeet",
    owner: "Sophia Johnson",
    status: "New Patient",
  },
  {
    id: "#PET-0006",
    checkInDate: "2025-05-12, 10:00 AM",
    petName: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    owner: "Maria Gonzales",
    status: "New Patient",
  },
  {
    id: "#PET-0007",
    checkInDate: "2025-05-10, 09:30 AM",
    petName: "Max",
    species: "Cat",
    breed: "Siamese",
    owner: "John Carter",
    status: "Recovered",
  },
  {
    id: "#PET-0008",
    checkInDate: "2025-05-08, 11:15 AM",
    petName: "Whiskers",
    species: "Cat",
    breed: "Persian",
    owner: "Emily Wong",
    status: "In Treatment",
  },
  {
    id: "#PET-0009",
    checkInDate: "2025-05-07, 01:45 PM",
    petName: "Rocky",
    species: "Dog",
    breed: "Bulldog",
    owner: "David Lee",
    status: "Recovered",
  },
  {
    id: "#PET-0010",
    checkInDate: "2025-05-05, 03:00 PM",
    petName: "Chirpy",
    species: "Bird",
    breed: "Parakeet",
    owner: "Sophia Johnson",
    status: "New Patient",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "New Patient":
      return "bg-green-100 text-green-700 border border-green-500";
    case "Recovered":
      return "bg-indigo-100 text-indigo-700 border border-indigo-500";
    case "In Treatment":
      return "bg-orange-100 text-orange-700 border border-orange-500";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PatientList = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [patients, setPatients] = useState(petPatients);

  const handleSave = (updatedPet) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPet.id ? updatedPet : p))
    );
    setShowEdit(false);
    setSelectedPet(null);
  };

  return (
    <div className="flex min-h-screen bg-blue-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="bg-white rounded shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Pet Patient Directory</h2>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              onClick={() => setShowForm(true)}
            >
              + Add New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border text-left">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="p-3 border">Pet ID</th>
                  <th className="p-3 border">Check-In</th>
                  <th className="p-3 border">Pet Name</th>
                  <th className="p-3 border">Species</th>
                  <th className="p-3 border">Breed</th>
                  <th className="p-3 border">Owner</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Options</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((pet) => (
                  <tr key={pet.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{pet.id}</td>
                    <td className="p-3 border">{pet.checkInDate}</td>
                    <td className="p-3 border">{pet.petName}</td>
                    <td className="p-3 border">{pet.species}</td>
                    <td className="p-3 border">{pet.breed}</td>
                    <td className="p-3 border">{pet.owner}</td>
                    <td className="p-3 border">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${getStatusStyle(
                          pet.status
                        )}`}
                      >
                        {pet.status}
                      </span>
                    </td>
                    <td className="p-3 border space-x-2">
                      {/* <button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
                        Edit
                      </button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600">
                        Info
                      </button> 
                       <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
                        History
                      </button> */}
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                        onClick={() => {
                          setSelectedPet(pet);
                          setShowEdit(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                        onClick={() => {
                          setSelectedPet(pet);
                          setShowInfo(true);
                        }}
                      >
                        Info
                      </button>

                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        onClick={() => {
                          setSelectedPet(pet);
                          setShowHistory(true);
                        }}
                      >
                        History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showForm && <AddPatientForm onClose={() => setShowForm(false)} />}
      {/* {showForm && <AddPatientForm onClose={() => setShowForm(false)} />} */}
      {showEdit && (
        <EditPatientForm
          pet={selectedPet}
          onClose={() => {
            setShowEdit(false);
            setSelectedPet(null);
          }}
          onSave={handleSave}
        />
      )}

      {showInfo && (
        <PatientInfoPopup
          pet={selectedPet}
          onClose={() => {
            setShowInfo(false);
            setSelectedPet(null);
          }}
        />
      )}
      {showHistory && (
        <PatientHistoryPopup
          pet={selectedPet}
          onClose={() => {
            setShowHistory(false);
            setSelectedPet(null);
          }}
        />
      )}
    </div>
  );
};

export default PatientList;
// without popup
// import React from "react";
// import Sidebar from "./Sidebar"; // Adjust the path if needed

// const petPatients = [
//   {
//     id: "#PET-0001",
//     checkInDate: "2025-05-12, 10:00 AM",
//     petName: "Bella",
//     species: "Dog",
//     breed: "Golden Retriever",
//     owner: "Maria Gonzales",
//     status: "New Patient",
//   },
//   {
//     id: "#PET-0002",
//     checkInDate: "2025-05-10, 09:30 AM",
//     petName: "Max",
//     species: "Cat",
//     breed: "Siamese",
//     owner: "John Carter",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0003",
//     checkInDate: "2025-05-08, 11:15 AM",
//     petName: "Whiskers",
//     species: "Cat",
//     breed: "Persian",
//     owner: "Emily Wong",
//     status: "In Treatment",
//   },
//   {
//     id: "#PET-0004",
//     checkInDate: "2025-05-07, 01:45 PM",
//     petName: "Rocky",
//     species: "Dog",
//     breed: "Bulldog",
//     owner: "David Lee",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0005",
//     checkInDate: "2025-05-05, 03:00 PM",
//     petName: "Chirpy",
//     species: "Bird",
//     breed: "Parakeet",
//     owner: "Sophia Johnson",
//     status: "New Patient",
//   },
// ];

// const getStatusStyle = (status) => {
//   switch (status) {
//     case "New Patient":
//       return "bg-green-100 text-green-700 border border-green-500";
//     case "Recovered":
//       return "bg-indigo-100 text-indigo-700 border border-indigo-500";
//     case "In Treatment":
//       return "bg-orange-100 text-orange-700 border border-orange-500";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// };

// const PatientList = () => {
//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <div className="bg-white rounded shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Pet Patient Directory</h2>
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
//               + Add New
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border text-left">
//               <thead className="bg-gray-100 font-semibold">
//                 <tr>
//                   <th className="p-3 border">Pet ID</th>
//                   <th className="p-3 border">Check-In</th>
//                   <th className="p-3 border">Pet Name</th>
//                   <th className="p-3 border">Species</th>
//                   <th className="p-3 border">Breed</th>
//                   <th className="p-3 border">Owner</th>
//                   <th className="p-3 border">Status</th>
//                   <th className="p-3 border">Options</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {petPatients.map((pet) => (
//                   <tr key={pet.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 border">{pet.id}</td>
//                     <td className="p-3 border">{pet.checkInDate}</td>
//                     <td className="p-3 border">{pet.petName}</td>
//                     <td className="p-3 border">{pet.species}</td>
//                     <td className="p-3 border">{pet.breed}</td>
//                     <td className="p-3 border">{pet.owner}</td>
//                     <td className="p-3 border">
//                       <span
//                         className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${getStatusStyle(
//                           pet.status
//                         )}`}
//                       >
//                         {pet.status}
//                       </span>
//                     </td>
//                     <td className="p-3 border space-x-2">
//                       <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
//                         Edit
//                       </button>
//                       <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600">
//                         Info
//                       </button>
//                       <button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
//                         History
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientList;

// import React from "react";

// const petPatients = [
//   {
//     id: "#PET-0001",
//     checkInDate: "2025-05-12, 10:00 AM",
//     petName: "Bella",
//     species: "Dog",
//     breed: "Golden Retriever",
//     owner: "Maria Gonzales",
//     status: "New Patient",
//   },
//   {
//     id: "#PET-0002",
//     checkInDate: "2025-05-10, 09:30 AM",
//     petName: "Max",
//     species: "Cat",
//     breed: "Siamese",
//     owner: "John Carter",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0003",
//     checkInDate: "2025-05-08, 11:15 AM",
//     petName: "Whiskers",
//     species: "Cat",
//     breed: "Persian",
//     owner: "Emily Wong",
//     status: "In Treatment",
//   },
//   {
//     id: "#PET-0004",
//     checkInDate: "2025-05-07, 01:45 PM",
//     petName: "Rocky",
//     species: "Dog",
//     breed: "Bulldog",
//     owner: "David Lee",
//     status: "Recovered",
//   },
//   {
//     id: "#PET-0005",
//     checkInDate: "2025-05-05, 03:00 PM",
//     petName: "Chirpy",
//     species: "Bird",
//     breed: "Parakeet",
//     owner: "Sophia Johnson",
//     status: "New Patient",
//   },
// ];

// const getStatusStyle = (status) => {
//   switch (status) {
//     case "New Patient":
//       return "bg-green-100 text-green-600 border border-green-600";
//     case "Recovered":
//       return "bg-indigo-100 text-indigo-600";
//     case "In Treatment":
//       return "bg-orange-100 text-orange-600";
//     default:
//       return "";
//   }
// };

// const PatientList = () => {
//   return (
//     <div className="p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Pet Patient List</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left text-sm border">
//           <thead className="bg-gray-100 font-semibold">
//             <tr>
//               <th className="p-3">Pet ID</th>
//               <th className="p-3">Check-In Date</th>
//               <th className="p-3">Pet Name</th>
//               <th className="p-3">Species</th>
//               <th className="p-3">Breed</th>
//               <th className="p-3">Owner</th>
//               <th className="p-3">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {petPatients.map((pet) => (
//               <tr key={pet.id} className="border-b">
//                 <td className="p-3">{pet.id}</td>
//                 <td className="p-3">{pet.checkInDate}</td>
//                 <td className="p-3">{pet.petName}</td>
//                 <td className="p-3">{pet.species}</td>
//                 <td className="p-3">{pet.breed}</td>
//                 <td className="p-3">{pet.owner}</td>
//                 <td className="p-3">
//                   <span
//                     className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
//                       pet.status
//                     )}`}
//                   >
//                     {pet.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PatientList;
// import React from "react";
// import Sidebar from "./Sidebar"; // Adjust path if needed

// const petPatients = [
//   // same petPatients array as before...
// ];

// const getStatusStyle = (status) => {
//   switch (status) {
//     case "New Patient":
//       return "bg-green-100 text-green-600 border border-green-600";
//     case "Recovered":
//       return "bg-indigo-100 text-indigo-600";
//     case "In Treatment":
//       return "bg-orange-100 text-orange-600";
//     default:
//       return "";
//   }
// };

// const PatientList = () => {
//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-4">Pet Patient List</h2>
//         <div className="overflow-x-auto bg-white rounded shadow p-4">
//           <table className="min-w-full text-left text-sm border">
//             <thead className="bg-gray-100 font-semibold">
//               <tr>
//                 <th className="p-3">Pet ID</th>
//                 <th className="p-3">Check-In Date</th>
//                 <th className="p-3">Pet Name</th>
//                 <th className="p-3">Species</th>
//                 <th className="p-3">Breed</th>
//                 <th className="p-3">Owner</th>
//                 <th className="p-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {petPatients.map((pet) => (
//                 <tr key={pet.id} className="border-b">
//                   <td className="p-3">{pet.id}</td>
//                   <td className="p-3">{pet.checkInDate}</td>
//                   <td className="p-3">{pet.petName}</td>
//                   <td className="p-3">{pet.species}</td>
//                   <td className="p-3">{pet.breed}</td>
//                   <td className="p-3">{pet.owner}</td>
//                   <td className="p-3">
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
//                         pet.status
//                       )}`}
//                     >
//                       {pet.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientList;
