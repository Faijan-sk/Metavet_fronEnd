// import React, { useState } from "react";

// const ViewProfile = () => {
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       `Appointment booked for ${appointmentDate} at ${appointmentTime} by ${name}`
//     );
//   };

//   return (
//     <div className="pt-10">
//       <div className="max-w-screen-lg mx-auto">
//         {/* Doctor Profile Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Section - Doctor Info */}
//           <div className="space-y-4">
//             <div className="flex justify-center">
//               {/* Doctor Image */}
//               <img
//                 src="./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png" // Replace with actual doctor's image URL
//                 alt="Doctor"
//                 className="w-48 h-48 rounded-full object-cover border-4 border-gray-300"
//               />
//             </div>

//             {/* Doctor's Name and Specialty */}
//             <h1 className="text-3xl font-bold text-gray-800">Dr. John Doe</h1>
//             <p className="text-xl font-semibold text-gray-600">Cardiologist</p>

//             {/* About Doctor */}
//             <h3 className="text-xl font-semibold text-gray-800">
//               About Dr. John Doe
//             </h3>
//             <p className="text-gray-600">
//               Dr. John Doe is a board-certified cardiologist with over 10 years
//               of experience in diagnosing and treating heart conditions. He
//               specializes in heart disease prevention, treatment, and
//               management.
//             </p>

//             {/* Doctor's Qualifications */}
//             <h3 className="text-xl font-semibold text-gray-800">
//               Qualifications
//             </h3>
//             <ul className="list-disc pl-6 text-gray-600">
//               <li>MBBS, MD (Cardiology)</li>
//               <li>Fellow of the American College of Cardiology (FACC)</li>
//               <li>10+ years of clinical experience</li>
//             </ul>

//             {/* Doctor's Contact */}
//             <h3 className="text-xl font-semibold text-gray-800">
//               Contact Information
//             </h3>
//             <p className="text-gray-600">Phone: +123 456 7890</p>
//             <p className="text-gray-600">Email: dr.johndoe@example.com</p>
//             <p className="text-gray-600">
//               Location: 123 Heart Health St, City, Country
//             </p>
//           </div>

//           {/* Right Section - Appointment Booking */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Book an Appointment
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Input */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="text-lg font-semibold text-gray-700"
//                 >
//                   Your Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>

//               {/* Phone Number Input */}
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="text-lg font-semibold text-gray-700"
//                 >
//                   Phone Number:
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>

//               {/* Email Input */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="text-lg font-semibold text-gray-700"
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>

//               {/* Appointment Date */}
//               <div>
//                 <label
//                   htmlFor="appointment-date"
//                   className="text-lg font-semibold text-gray-700"
//                 >
//                   Select Date:
//                 </label>
//                 <input
//                   type="date"
//                   id="appointment-date"
//                   value={appointmentDate}
//                   onChange={(e) => setAppointmentDate(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>

//               {/* Appointment Time */}
//               <div>
//                 <label
//                   htmlFor="appointment-time"
//                   className="text-lg font-semibold text-gray-700"
//                 >
//                   Select Time:
//                 </label>
//                 <input
//                   type="time"
//                   id="appointment-time"
//                   value={appointmentTime}
//                   onChange={(e) => setAppointmentTime(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>

//               {/* Book Appointment Button */}
//               <div className="mt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
//                 >
//                   Book Appointment
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//     </div>
//   );
// };

// export default ViewProfile;

import React, { useState } from "react";

const ViewProfile = () => {
  // State for booking form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Appointment booked for ${name} on ${appointmentDate} at ${appointmentTime}`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg p-6 ">
        {/* Doctor Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Doctor Info */}
          <div>
            {/* Doctor's Image */}
            <div className="flex justify-center">
              <img
                src="./src/assets/MetavetImages/dr3.png"
                alt="Doctor"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
            {/* Doctor's Name and Specialty */}
            <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
              Dr. Jasmine Kimberly
            </h1>
            <p className="text-xl font-semibold text-gray-600 text-center">
              Cardiologist
            </p>

            {/* About Doctor */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              About Dr. Jasmine Kimberly
            </h3>
            <p className="text-gray-600">
              Dr. Jasmine Kimberly is a board-certified cardiologist with over
              10 years of experience in diagnosing and treating heart
              conditions. He specializes in heart disease prevention, treatment,
              and management.
            </p>

            {/* Doctor's Qualifications */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Qualifications
            </h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>MBBS, MD (Cardiology)</li>
              <li>Fellow of the American College of Cardiology (FACC)</li>
              <li>10+ years of clinical experience</li>
            </ul>

            {/* Doctor's Contact */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Contact Information
            </h3>
            <p className="text-gray-600">Phone: +123 456 7890</p>
            <p className="text-gray-600">
              Email: dr.jasmine kimberly@example.com
            </p>
            <p className="text-gray-600">
              Location: 123 Heart Health St, City, Country
            </p>
          </div>

          {/* Right Section - Appointment Booking */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Book an Appointment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="text-lg font-semibold text-gray-700"
                >
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-lg font-semibold text-gray-700"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="text-lg font-semibold text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>

              {/* Appointment Date */}
              <div>
                <label
                  htmlFor="appointment-date"
                  className="text-lg font-semibold text-gray-700"
                >
                  Select Date:
                </label>
                <input
                  type="date"
                  id="appointment-date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>

              {/* Appointment Time */}
              <div>
                <label
                  htmlFor="appointment-time"
                  className="text-lg font-semibold text-gray-700"
                >
                  Select Time:
                </label>
                <input
                  type="time"
                  id="appointment-time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  required
                />
              </div>

              {/* Book Appointment Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
