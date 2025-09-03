// import { useState } from 'react'

// // Example doctor images
// const doctorImages = {
//   'Dr. Michael':
//     './src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png',
//   'Dr. Jasmine': './src/assets/MetavetImages/dr3.png',
//   'Dr. Diannel': './src/assets/MetavetImages/dr4.png',
// }

// const Appointment = () => {
//   const [appointments, setAppointments] = useState([
//     {
//       id: 1,
//       pet: 'Max',
//       doctor: 'Dr. Michael',
//       petType: 'Dog',
//       date: '2024-10-05',
//       time: '10:00 AM',
//       reason: 'Vaccination',
//       notes: 'Bring vaccination records',
//     },
//     {
//       id: 2,
//       pet: 'Bella',
//       doctor: 'Dr. Jasmine',
//       petType: 'Cat',
//       date: '2024-10-06',
//       time: '2:00 PM',
//       reason: 'Annual Check-up',
//       notes: 'Need to discuss diet',
//     },
//     {
//       id: 3,
//       pet: 'Charlie',
//       doctor: 'Dr. Diannel',
//       petType: 'Dog',
//       date: '2024-10-10',
//       time: '1:00 PM',
//       reason: 'Dental Cleaning',
//       notes: 'Monitor allergies',
//     },
//     {
//       id: 4,
//       pet: 'Luna',
//       doctor: 'Dr. Michael',
//       petType: 'Rabbit',
//       date: '2024-10-12',
//       time: '11:30 AM',
//       reason: 'Wellness Check',
//       notes: 'Confirm spay Status',
//     },
//     {
//       id: 5,
//       pet: 'Daisy',
//       doctor: 'Dr. Jasmine',
//       petType: 'Dog',
//       date: '2024-10-15',
//       time: '3:00 PM',
//       reason: 'Behaviour Consultation',
//       notes: 'Check for anxiety issues',
//     },
//     {
//       id: 6,
//       pet: 'Max',
//       doctor: 'Dr. Diannel',
//       petType: 'Dog',
//       date: '2024-10-05',
//       time: '10:00 AM',
//       reason: 'Vaccination',
//       notes: 'Bring vaccination records',
//     },
//     {
//       id: 7,
//       pet: 'Bella',
//       doctor: 'Dr. Michael',
//       petType: 'Cat',
//       date: '2024-10-06',
//       time: '2:00 PM',
//       reason: 'Annual Check-up',
//       notes: 'Need to discuss diet',
//     },
//     {
//       id: 8,
//       pet: 'Charlie',
//       doctor: 'Dr. Jasmine',
//       petType: 'Dog',
//       date: '2024-10-10',
//       time: '1:00 PM',
//       reason: 'Dental Cleaning',
//       notes: 'Monitor allergies',
//     },
//     {
//       id: 9,
//       pet: 'Luna',
//       doctor: 'Dr. Diannel',
//       petType: 'Rabbit',
//       date: '2024-10-12',
//       time: '11:30 AM',
//       reason: 'Wellness Check',
//       notes: 'Confirm spay Status',
//     },
//     {
//       id: 10,
//       pet: 'Daisy',
//       doctor: 'Dr. Michael',
//       petType: 'Dog',
//       date: '2024-10-15',
//       time: '3:00 PM',
//       reason: 'Behaviour Consultation',
//       notes: 'Check for anxiety issues',
//     },
//   ])

//   const [editAppointment, setEditAppointment] = useState(null)
//   const [originalAppointment, setOriginalAppointment] = useState(null)

//   const handleEdit = (appointment) => {
//     setOriginalAppointment({ ...appointment })
//     setEditAppointment({ ...appointment })
//   }

//   const handleSaveEdit = () => {
//     setAppointments((prevAppointments) =>
//       prevAppointments.map((appointment) =>
//         appointment.id === editAppointment.id ? editAppointment : appointment
//       )
//     )
//     setEditAppointment(null)
//     setOriginalAppointment(null)
//   }

//   const handleCancelEdit = () => {
//     setEditAppointment(null)
//     setOriginalAppointment(null)
//   }

//   const handleDelete = (id) => {
//     setAppointments((prevAppointments) =>
//       prevAppointments.filter((appointment) => appointment.id !== id)
//     )
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setEditAppointment((prevEdit) => ({
//       ...prevEdit,
//       [name]: value,
//     }))
//   }

//   return (
//     <div className="py-6 px-4">
//       <p className="text-center text-3xl font-semibold">Pet Appointments</p>

//       {/* Horizontal scroll below xl */}
//       {/* <div className="overflow-x-auto xl:overflow-visible mt-10">
//         <table className="min-w-[1200px] xl:min-w-full table-auto bg-white border-collapse">
//           <thead>
//             <tr className="border-b bg-primary">
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 #
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Doctor
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Vet/Provider Name
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Pet Type
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Appointment Date
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Time
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Reason
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Notes
//               </th>
//               <th className="px-4 py-2 text-left font-semibold text-white">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <tr key={appointment.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {appointment.id}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700 flex items-center">
//                   <img
//                     src={doctorImages[appointment.doctor]}
//                     alt={appointment.doctor}
//                     className="w-24 h-20 mt-4 rounded-full"
//                   />
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <input
//                       type="text"
//                       name="doctor"
//                       value={editAppointment.doctor}
//                       onChange={handleInputChange}
//                       className="w-full px-2 py-1 rounded border"
//                     />
//                   ) : (
//                     appointment.doctor
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <input
//                       type="text"
//                       name="petType"
//                       value={editAppointment.petType}
//                       onChange={handleInputChange}
//                       className="w-full px-2 py-1 rounded border"
//                     />
//                   ) : (
//                     appointment.petType
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <input
//                       type="date"
//                       name="date"
//                       value={editAppointment.date}
//                       onChange={handleInputChange}
//                       className="w-full px-2 py-1 rounded border"
//                     />
//                   ) : (
//                     appointment.date
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <input
//                       type="time"
//                       name="time"
//                       value={editAppointment.time}
//                       onChange={handleInputChange}
//                       className="w-full px-2 py-1 rounded border"
//                     />
//                   ) : (
//                     appointment.time
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <input
//                       type="text"
//                       name="reason"
//                       value={editAppointment.reason}
//                       onChange={handleInputChange}
//                       className="w-full px-2 py-1 rounded border"
//                     />
//                   ) : (
//                     appointment.reason
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <textarea
//                       name="notes"
//                       value={editAppointment.notes}
//                       onChange={handleInputChange}
//                       className="w-full px-2 py-1 rounded border"
//                     />
//                   ) : (
//                     appointment.notes
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-700">
//                   {editAppointment?.id === appointment.id ? (
//                     <>
//                       <button
//                         onClick={handleSaveEdit}
//                         className="btn w-full bg-primary text-white mr-2"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         className="btn w-full bg-primary text-white"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <div className="flex flex-col gap-2">
//                       <button
//                         onClick={() => handleEdit(appointment)}
//                         className="btn w-full hover:bg-primary hover:text-white"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(appointment.id)}
//                         className="btn w-full hover:bg-primary hover:text-white"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}

//     </div>
//   )
// }

// export default Appointment
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import dr from "../../../assets/drG.jpg";

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      pet: "Max",
      doctor: "Dr. Michael",
      petType: "Dog",
      date: "2024-10-05",
      time: "10:00 AM",
      reason: "Vaccination",
      notes: "Bring vaccination records",
    },
    {
      id: 2,
      pet: "Bella",
      doctor: "Dr. Jasmine",
      petType: "Cat",
      date: "2024-10-06",
      time: "2:00 PM",
      reason: "Annual Check-up",
      notes: "Need to discuss diet",
    },
    {
      id: 3,
      pet: "Charlie",
      doctor: "Dr. Diannel",
      petType: "Dog",
      date: "2024-10-10",
      time: "1:00 PM",
      reason: "Dental Cleaning",
      notes: "Monitor allergies",
    },
    {
      id: 4,
      pet: "Luna",
      doctor: "Dr. Michael",
      petType: "Rabbit",
      date: "2024-10-12",
      time: "11:30 AM",
      reason: "Wellness Check",
      notes: "Confirm spay Status",
    },
  ]);

  const [editAppointment, setEditAppointment] = useState(null);

  const handleEdit = (appointment) => setEditAppointment({ ...appointment });

  const handleSaveEdit = () => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === editAppointment.id ? editAppointment : a))
    );
    setEditAppointment(null);
  };

  const handleCancelEdit = () => setEditAppointment(null);

  const handleDelete = (id) =>
    setAppointments((prev) => prev.filter((a) => a.id !== id));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditAppointment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-6 px-4 max-w-full mx-4">
  {/* Header Row */}
  <div className="flex items-center justify-between mb-8">
    <p className="text-3xl font-bold text-gray-800">🐾 Pet Appointments</p>
    <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
      ➕ Add Appointment
    </button>
  </div>

  {/* Appointment Cards */}
  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
    {appointments.map((appointment) => (
      <div
        key={appointment.id}
        className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
      >
        {/* Card Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Appointment #{appointment.id}
          </span>
          <div className="flex space-x-2">
            {editAppointment?.id === appointment.id ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(appointment)}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Card Content - One Row */}
        <div className="p-4 flex items-center gap-6">
          {/* Doctor Image */}
          <img
            src={dr}
            alt={appointment.doctor}
            className="w-14 h-14 rounded-full border-2 border-teal-500 shadow-md object-cover"
          />

          {/* Appointment Info in Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm w-full">
            <div>
              <p className="text-gray-500 text-xs">Doctor</p>
              <p className="font-medium text-gray-800">{appointment.doctor}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Pet</p>
              <p className="font-medium text-gray-800">{appointment.pet}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Type</p>
              <p className="font-medium text-gray-800">{appointment.petType}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Date</p>
              <p className="font-medium text-gray-800">{appointment.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Time</p>
              <p className="font-medium text-gray-800">{appointment.time}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Reason</p>
              <p className="font-medium text-gray-800">{appointment.reason}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Appointment;
