import React from "react";

const AddPatientForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative my-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Patient</h2>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Doctor</label>
              <input
                className="w-full border px-3 py-2 rounded"
                type="text"
                placeholder="Mr Doctor"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Name *</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <input className="w-full border px-3 py-2 rounded" type="email" />
            </div>
            <div>
              <label className="text-sm font-medium">Password *</label>
              <input
                className="w-full border px-3 py-2 rounded"
                type="password"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address *</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone *</label>
              <input className="w-full border px-3 py-2 rounded" type="tel" />
            </div>
            <div>
              <label className="text-sm font-medium">Sex</label>
              <select className="w-full border px-3 py-2 rounded">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Birth Date</label>
              <input className="w-full border px-3 py-2 rounded" type="date" />
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Age (Years)</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Months</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Days</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="number"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Blood Group</label>
              <select className="w-full border px-3 py-2 rounded">
                <option>Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Profile Image</label>
              <input className="w-full border px-3 py-2 rounded" type="file" />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;

// import React from "react";

// const AddPatientForm = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 pt-10 pb-10">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
//         >
//           &times;
//         </button>

//         {/* <div className="mb-2 text-sm text-gray-600">
//           Home &gt; Patient &gt;{" "}
//           <span className="font-semibold">Add New Patient</span>
//         </div> */}

//         <h2 className="text-xl font-bold mb-4">Add New Patient</h2>

//         <form className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">Doctor</label>
//               <input
//                 className="w-full border px-3 py-2 rounded"
//                 type="text"
//                 placeholder="Mr Doctor"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Name *</label>
//               <input className="w-full border px-3 py-2 rounded" type="text" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Email *</label>
//               <input className="w-full border px-3 py-2 rounded" type="email" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Password *</label>
//               <input
//                 className="w-full border px-3 py-2 rounded"
//                 type="password"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Address *</label>
//               <input className="w-full border px-3 py-2 rounded" type="text" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Phone *</label>
//               <input className="w-full border px-3 py-2 rounded" type="tel" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Sex</label>
//               <select className="w-full border px-3 py-2 rounded">
//                 <option>Male</option>
//                 <option>Female</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium">Birth Date</label>
//               <input className="w-full border px-3 py-2 rounded" type="date" />
//             </div>
//             <div className="col-span-2 grid grid-cols-3 gap-4">
//               <div>
//                 <label className="text-sm font-medium">Age (Years)</label>
//                 <input
//                   className="w-full border px-3 py-2 rounded"
//                   type="number"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Months</label>
//                 <input
//                   className="w-full border px-3 py-2 rounded"
//                   type="number"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Days</label>
//                 <input
//                   className="w-full border px-3 py-2 rounded"
//                   type="number"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium">Blood Group</label>
//               <select className="w-full border px-3 py-2 rounded">
//                 <option>Select</option>
//                 <option>A+</option>
//                 <option>A-</option>
//                 <option>B+</option>
//                 <option>B-</option>
//                 <option>AB+</option>
//                 <option>AB-</option>
//                 <option>O+</option>
//                 <option>O-</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium">Profile Image</label>
//               <input className="w-full border px-3 py-2 rounded" type="file" />
//             </div>
//           </div>

//           <div className="text-right">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//             >
//               Send SMS
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPatientForm;
