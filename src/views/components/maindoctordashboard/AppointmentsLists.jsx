import React, { useState } from "react";
import Sidebar from "./SideBar";

const initialAppointments = [
  {
    id: 101,
    patient: "Buddy",
    doctor: "Dr. Smith",
    dateTime: "2025-05-16",
    remarks: "Checkup",
    status: "Confirmed",
    description: "Annual Visit",
    invoiceId: 5001,
    amount: "$120",
    billStatus: "Paid",
  },
  {
    id: 102,
    patient: "Milo",
    doctor: "Dr. Lee",
    dateTime: "17-05-2025 11:00 AM - 11:30 AM",
    remarks: "Vaccine",
    status: "Pending",
    description: "Vaccination",
    invoiceId: 5002,
    amount: "$80",
    billStatus: "Unpaid",
  },
  {
    id: 103,
    patient: "Luna",
    doctor: "Dr. Smith",
    dateTime: "18-05-2025 09:00 AM - 09:30 AM",
    remarks: "Limping",
    status: "Confirmed",
    description: "Injury Check",
    invoiceId: 5003,
    amount: "$150",
    billStatus: "Paid",
  },
  {
    id: 104,
    patient: "Max",
    doctor: "Dr. Jones",
    dateTime: "19-05-2025 01:00 PM - 01:30 PM",
    remarks: "Surgery Follow-up",
    status: "Confirmed",
    description: "Follow Up",
    invoiceId: 5004,
    amount: "$200",
    billStatus: "Paid",
  },
  {
    id: 105,
    patient: "Charlie",
    doctor: "Dr. Lee",
    dateTime: "20-05-2025 03:00 PM - 03:30 PM",
    remarks: "Dental Cleaning",
    status: "Pending",
    description: "Teeth Cleaning",
    invoiceId: 5005,
    amount: "$100",
    billStatus: "Unpaid",
  },
  {
    id: 106,
    patient: "Rocky",
    doctor: "Dr. Brown",
    dateTime: "21-05-2025 10:30 AM - 11:00 AM",
    remarks: "Ear Infection",
    status: "Confirmed",
    description: "Consultation",
    invoiceId: 5006,
    amount: "$90",
    billStatus: "Paid",
  },
  {
    id: 107,
    patient: "Bella",
    doctor: "Dr. Jones",
    dateTime: "22-05-2025 02:00 PM - 02:30 PM",
    remarks: "Itching",
    status: "Pending",
    description: "Skin Check",
    invoiceId: 5007,
    amount: "$110",
    billStatus: "Unpaid",
  },
  {
    id: 108,
    patient: "Coco",
    doctor: "Dr. Brown",
    dateTime: "23-05-2025 09:30 AM - 10:00 AM",
    remarks: "Fever",
    status: "Confirmed",
    description: "General Checkup",
    invoiceId: 5008,
    amount: "$95",
    billStatus: "Paid",
  },
  {
    id: 109,
    patient: "Daisy",
    doctor: "Dr. Smith",
    dateTime: "24-05-2025 01:30 PM - 02:00 PM",
    remarks: "Vomiting",
    status: "Confirmed",
    description: "Emergency",
    invoiceId: 5009,
    amount: "$130",
    billStatus: "Paid",
  },
  {
    id: 110,
    patient: "Tiger",
    doctor: "Dr. Lee",
    dateTime: "25-05-2025 11:30 AM - 12:00 PM",
    remarks: "Behavioral",
    status: "Pending",
    description: "Behavior Check",
    invoiceId: 5010,
    amount: "$105",
    billStatus: "Unpaid",
  },
  // Add the rest of your appointments here...
];

const Badge = ({ text }) => {
  const base = "px-2 py-1 text-xs rounded-full font-medium";
  const styles = {
    Confirmed: "bg-teal-100 text-teal-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-teal-100 text-teal-700",
    Unpaid: "bg-yellow-100 text-yellow-700",
  };
  return <span className={`${base} ${styles[text] || ""}`}>{text}</span>;
};
const AddAppointmentModal = ({ show, onClose, onSave, isEdit, editData }) => {
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    dateTime: "",
    status: "Pending",
    remarks: "",
    description: "",
    amount: "",
    billStatus: "Unpaid",
  });

  // Reset form when modal opens or editData changes
  React.useEffect(() => {
    if (isEdit && editData) {
      setForm({ ...editData });
    } else {
      setForm({
        patient: "",
        doctor: "",
        dateTime: "",
        status: "Pending",
        remarks: "",
        description: "",
        amount: "",
        billStatus: "Unpaid",
      });
    }
  }, [show, isEdit, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50">
      <div className="bg-white p-6 rounded shadow-md w-[700px] relative mt-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "Edit Appointment" : "Add Appointment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Patient *</label>
              <input
                type="text"
                name="patient"
                value={form.patient}
                onChange={handleChange}
                placeholder={isEdit ? editData?.patient : ""}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Doctor *</label>
              <input
                type="text"
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                placeholder={isEdit ? editData?.doctor : ""}
                required
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Date *</label>
              <input
                type="date"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Appointment Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Remarks</label>
            <input
              type="text"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              placeholder={isEdit ? editData?.remarks : ""}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Visit Description *
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={isEdit ? editData?.description : ""}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder={isEdit ? editData?.amount : ""}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Bill Status</label>
              <select
                name="billStatus"
                value={form.billStatus}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {isEdit ? "Update Appointment" : "Save Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AppointmentsLists = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleAdd = () => {
    setIsEditMode(false);
    setEditingAppointment(null);
    setShowModal(true);
  };

  const handleSave = (data) => {
    if (isEditMode && editingAppointment) {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === editingAppointment.id ? { ...item, ...data } : item
        )
      );
    } else {
      const newAppointment = {
        ...data,
        id: Date.now(),
        invoiceId: Math.floor(Math.random() * 10000),
      };
      setAppointments((prev) => [...prev, newAppointment]);
    }
  };

  const handleEdit = (appointment) => {
    setIsEditMode(true);
    setEditingAppointment(appointment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="p-4 bg-white shadow rounded w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">List of All Appointments</h2>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleAdd}
            >
              + Add Appointment
            </button>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border">Id</th>
                  <th className="p-2 border">Patient</th>
                  <th className="p-2 border">Doctor</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Remarks</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Invoice ID</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Bill Status</th>
                  <th className="p-2 border">Options</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{a.id}</td>
                    <td className="p-2 border">{a.patient}</td>
                    <td className="p-2 border">{a.doctor}</td>
                    <td className="p-2 border">{a.dateTime}</td>
                    <td className="p-2 border">{a.remarks}</td>
                    <td className="p-2 border">
                      <Badge text={a.status} />
                    </td>
                    <td className="p-2 border">{a.description}</td>
                    <td className="p-2 border">{a.invoiceId}</td>
                    <td className="p-2 border">{a.amount}</td>
                    <td className="p-2 border">
                      <Badge text={a.billStatus} />
                    </td>
                    <td className="p-2 border space-x-1 flex">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AddAppointmentModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            isEdit={isEditMode}
            editData={editingAppointment}
          />
        </div>
      </main>
    </div>
  );
};

export default AppointmentsLists;

// import React, { useState } from "react";
// import Sidebar from "./SideBar";

// const appointments = [
//   {
//     id: 101,
//     patient: "Buddy",
//     doctor: "Dr. Smith",
//     dateTime: "16-05-2025 10:00 AM - 10:30 AM",
//     remarks: "Checkup",
//     status: "Confirmed",
//     description: "Annual Visit",
//     invoiceId: 5001,
//     amount: "$120",
//     billStatus: "Paid",
//   },
//   {
//     id: 102,
//     patient: "Milo",
//     doctor: "Dr. Lee",
//     dateTime: "17-05-2025 11:00 AM - 11:30 AM",
//     remarks: "Vaccine",
//     status: "Pending",
//     description: "Vaccination",
//     invoiceId: 5002,
//     amount: "$80",
//     billStatus: "Unpaid",
//   },
//   {
//     id: 103,
//     patient: "Luna",
//     doctor: "Dr. Smith",
//     dateTime: "18-05-2025 09:00 AM - 09:30 AM",
//     remarks: "Limping",
//     status: "Confirmed",
//     description: "Injury Check",
//     invoiceId: 5003,
//     amount: "$150",
//     billStatus: "Paid",
//   },
//   {
//     id: 104,
//     patient: "Max",
//     doctor: "Dr. Jones",
//     dateTime: "19-05-2025 01:00 PM - 01:30 PM",
//     remarks: "Surgery Follow-up",
//     status: "Confirmed",
//     description: "Follow Up",
//     invoiceId: 5004,
//     amount: "$200",
//     billStatus: "Paid",
//   },
//   {
//     id: 105,
//     patient: "Charlie",
//     doctor: "Dr. Lee",
//     dateTime: "20-05-2025 03:00 PM - 03:30 PM",
//     remarks: "Dental Cleaning",
//     status: "Pending",
//     description: "Teeth Cleaning",
//     invoiceId: 5005,
//     amount: "$100",
//     billStatus: "Unpaid",
//   },
//   {
//     id: 106,
//     patient: "Rocky",
//     doctor: "Dr. Brown",
//     dateTime: "21-05-2025 10:30 AM - 11:00 AM",
//     remarks: "Ear Infection",
//     status: "Confirmed",
//     description: "Consultation",
//     invoiceId: 5006,
//     amount: "$90",
//     billStatus: "Paid",
//   },
//   {
//     id: 107,
//     patient: "Bella",
//     doctor: "Dr. Jones",
//     dateTime: "22-05-2025 02:00 PM - 02:30 PM",
//     remarks: "Itching",
//     status: "Pending",
//     description: "Skin Check",
//     invoiceId: 5007,
//     amount: "$110",
//     billStatus: "Unpaid",
//   },
//   {
//     id: 108,
//     patient: "Coco",
//     doctor: "Dr. Brown",
//     dateTime: "23-05-2025 09:30 AM - 10:00 AM",
//     remarks: "Fever",
//     status: "Confirmed",
//     description: "General Checkup",
//     invoiceId: 5008,
//     amount: "$95",
//     billStatus: "Paid",
//   },
//   {
//     id: 109,
//     patient: "Daisy",
//     doctor: "Dr. Smith",
//     dateTime: "24-05-2025 01:30 PM - 02:00 PM",
//     remarks: "Vomiting",
//     status: "Confirmed",
//     description: "Emergency",
//     invoiceId: 5009,
//     amount: "$130",
//     billStatus: "Paid",
//   },
//   {
//     id: 110,
//     patient: "Tiger",
//     doctor: "Dr. Lee",
//     dateTime: "25-05-2025 11:30 AM - 12:00 PM",
//     remarks: "Behavioral",
//     status: "Pending",
//     description: "Behavior Check",
//     invoiceId: 5010,
//     amount: "$105",
//     billStatus: "Unpaid",
//   },
// ];

// const Badge = ({ text }) => {
//   const base = "px-2 py-1 text-xs rounded-full font-medium";
//   const styles = {
//     Confirmed: "bg-teal-100 text-teal-700",
//     Pending: "bg-yellow-100 text-yellow-700",
//     Paid: "bg-teal-100 text-teal-700",
//     Unpaid: "bg-yellow-100 text-yellow-700",
//   };
//   return <span className={`${base} ${styles[text] || ""}`}>{text}</span>;
// };

// const AddAppointmentModal = ({ show, onClose }) => {
//   const [form, setForm] = useState({
//     patient: "",
//     doctor: "",
//     date: "",
//     status: "Pending",
//     remarks: "",
//     description: "",
//     charges: 0,
//     discount: 0,
//   });

//   const grandTotal = form.charges - form.discount;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: name === "charges" || name === "discount" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("New Appointment Data:", form);
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 ">
//       <div className="bg-white p-6 rounded shadow-md w-[700px] relative mt-4">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
//         >
//           ×
//         </button>
//         <h2 className="text-lg font-bold mb-4">Add Appointment</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           {/* Patient & Doctor Row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Patient *</label>
//               <input
//                 type="text"
//                 name="patient"
//                 value={form.patient}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Doctor *</label>
//               <input
//                 type="text"
//                 name="doctor"
//                 value={form.doctor}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Date & Status in same row */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Date *</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">
//                 Appointment Status
//               </label>
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Confirmed">Confirmed</option>
//               </select>
//             </div>
//           </div>

//           {/* Rest of your form remains the same */}

//           <div>
//             <label className="block text-sm font-medium">Remarks</label>
//             <input
//               type="text"
//               name="remarks"
//               value={form.remarks}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">
//               Visit Description *
//             </label>
//             <input
//               type="text"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               required
//               className="w-full border p-2 rounded"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Visit Charges</label>
//               <input
//                 type="number"
//                 name="charges"
//                 value={form.charges}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Discount</label>
//               <input
//                 type="number"
//                 name="discount"
//                 value={form.discount}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Grand Total</label>
//             <input
//               type="text"
//               readOnly
//               value={grandTotal >= 0 ? `$${grandTotal}` : "$0"}
//               className="w-full border p-2 rounded bg-gray-100"
//             />
//           </div>

//           <div className="text-right">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Save Appointment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const AppointmentsLists = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <div className="p-4 bg-white shadow rounded w-full">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">List of All Appointments</h2>
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             onClick={() => setShowModal(true)}
//           >
//             + Add Appointment
//           </button>
//         </div>

//         <div className="overflow-auto">
//           <table className="min-w-full border text-sm">
//             <thead className="bg-gray-100 text-left">
//               <tr>
//                 <th className="p-2 border">Id</th>
//                 <th className="p-2 border">Patient</th>
//                 <th className="p-2 border">Doctor</th>
//                 <th className="p-2 border">Date - Time</th>
//                 <th className="p-2 border">Remarks</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Description</th>
//                 <th className="p-2 border">Invoice ID</th>
//                 <th className="p-2 border">Amount</th>
//                 <th className="p-2 border">Bill Status</th>
//                 <th className="p-2 border">Options</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((a) => (
//                 <tr key={a.id} className="border-t hover:bg-gray-50">
//                   <td className="p-2 border">{a.id}</td>
//                   <td className="p-2 border text-blue-600 cursor-pointer hover:underline">
//                     {a.patient}
//                   </td>
//                   <td className="p-2 border">{a.doctor}</td>
//                   <td className="p-2 border">{a.dateTime}</td>
//                   <td className="p-2 border">{a.remarks}</td>
//                   <td className="p-2 border">
//                     <Badge text={a.status} />
//                   </td>
//                   <td className="p-2 border">{a.description}</td>
//                   <td className="p-2 border text-blue-600 cursor-pointer hover:underline">
//                     {a.invoiceId}
//                   </td>
//                   <td className="p-2 border">{a.amount}</td>
//                   <td className="p-2 border">
//                     <Badge text={a.billStatus} />
//                   </td>
//                   <td className="p-2 border space-x-1 flex">
//                     <button className="bg-green-600 text-white px-2 py-1 rounded">
//                       {/* ✎   */}Edit
//                     </button>
//                     <button className="bg-red-600 text-white px-2 py-1 rounded">
//                       {/* 🗑 */}Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Modal Component */}
//         <AddAppointmentModal
//           show={showModal}
//           onClose={() => setShowModal(false)}
//         />
//       </div>
//     </div>
//   );
// };

// export default AppointmentsLists;

// without popup on button
// import React from "react";
// import Sidebar from "./SideBar";

// const appointments = [
//   {
//     id: 101,
//     patient: "Buddy",
//     doctor: "Dr. Smith",
//     dateTime: "16-05-2025 10:00 AM - 10:30 AM",
//     remarks: "Checkup",
//     status: "Confirmed",
//     description: "Annual Visit",
//     invoiceId: 5001,
//     amount: "$120",
//     billStatus: "Paid",
//   },
//   {
//     id: 102,
//     patient: "Milo",
//     doctor: "Dr. Lee",
//     dateTime: "17-05-2025 11:00 AM - 11:30 AM",
//     remarks: "Vaccine",
//     status: "Pending",
//     description: "Vaccination",
//     invoiceId: 5002,
//     amount: "$80",
//     billStatus: "Unpaid",
//   },
//   {
//     id: 103,
//     patient: "Luna",
//     doctor: "Dr. Smith",
//     dateTime: "18-05-2025 09:00 AM - 09:30 AM",
//     remarks: "Limping",
//     status: "Confirmed",
//     description: "Injury Check",
//     invoiceId: 5003,
//     amount: "$150",
//     billStatus: "Paid",
//   },
//   {
//     id: 104,
//     patient: "Max",
//     doctor: "Dr. Jones",
//     dateTime: "19-05-2025 01:00 PM - 01:30 PM",
//     remarks: "Surgery Follow-up",
//     status: "Confirmed",
//     description: "Follow Up",
//     invoiceId: 5004,
//     amount: "$200",
//     billStatus: "Paid",
//   },
//   {
//     id: 105,
//     patient: "Charlie",
//     doctor: "Dr. Lee",
//     dateTime: "20-05-2025 03:00 PM - 03:30 PM",
//     remarks: "Dental Cleaning",
//     status: "Pending",
//     description: "Teeth Cleaning",
//     invoiceId: 5005,
//     amount: "$100",
//     billStatus: "Unpaid",
//   },
//   {
//     id: 106,
//     patient: "Rocky",
//     doctor: "Dr. Brown",
//     dateTime: "21-05-2025 10:30 AM - 11:00 AM",
//     remarks: "Ear Infection",
//     status: "Confirmed",
//     description: "Consultation",
//     invoiceId: 5006,
//     amount: "$90",
//     billStatus: "Paid",
//   },
//   {
//     id: 107,
//     patient: "Bella",
//     doctor: "Dr. Jones",
//     dateTime: "22-05-2025 02:00 PM - 02:30 PM",
//     remarks: "Itching",
//     status: "Pending",
//     description: "Skin Check",
//     invoiceId: 5007,
//     amount: "$110",
//     billStatus: "Unpaid",
//   },
//   {
//     id: 108,
//     patient: "Coco",
//     doctor: "Dr. Brown",
//     dateTime: "23-05-2025 09:30 AM - 10:00 AM",
//     remarks: "Fever",
//     status: "Confirmed",
//     description: "General Checkup",
//     invoiceId: 5008,
//     amount: "$95",
//     billStatus: "Paid",
//   },
//   {
//     id: 109,
//     patient: "Daisy",
//     doctor: "Dr. Smith",
//     dateTime: "24-05-2025 01:30 PM - 02:00 PM",
//     remarks: "Vomiting",
//     status: "Confirmed",
//     description: "Emergency",
//     invoiceId: 5009,
//     amount: "$130",
//     billStatus: "Paid",
//   },
//   {
//     id: 110,
//     patient: "Tiger",
//     doctor: "Dr. Lee",
//     dateTime: "25-05-2025 11:30 AM - 12:00 PM",
//     remarks: "Behavioral",
//     status: "Pending",
//     description: "Behavior Check",
//     invoiceId: 5010,
//     amount: "$105",
//     billStatus: "Unpaid",
//   },
// ];

// const Badge = ({ text, type }) => {
//   const base = "px-2 py-1 text-xs rounded-full font-medium";
//   const styles = {
//     Confirmed: "bg-teal-100 text-teal-700",
//     Pending: "bg-yellow-100 text-yellow-700",
//     Paid: "bg-teal-100 text-teal-700",
//     Unpaid: "bg-yellow-100 text-yellow-700",
//   };
//   return <span className={`${base} ${styles[text] || ""}`}>{text}</span>;
// };

// const AppointmentsLists = () => {
//   return (
//     <div className="flex min-h-screen bg-blue-50 font-sans">
//       <Sidebar />
//       <div className="p-4 bg-white shadow rounded">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">List of All Appointments</h2>
//           <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//             + Add Appointment
//           </button>
//         </div>

//         <div className="overflow-auto">
//           <table className="min-w-full border text-sm">
//             <thead className="bg-gray-100 text-left">
//               <tr>
//                 <th className="p-2 border">Id</th>
//                 <th className="p-2 border">Patient</th>
//                 <th className="p-2 border">Doctor</th>
//                 <th className="p-2 border">Date - Time</th>
//                 <th className="p-2 border">Remarks</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Description</th>
//                 <th className="p-2 border">Invoice ID</th>
//                 <th className="p-2 border">Amount</th>
//                 <th className="p-2 border">Bill Status</th>
//                 <th className="p-2 border">Options</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((a) => (
//                 <tr key={a.id} className="border-t hover:bg-gray-50">
//                   <td className="p-2 border">{a.id}</td>
//                   <td className="p-2 border text-blue-600 cursor-pointer hover:underline">
//                     {a.patient}
//                   </td>
//                   <td className="p-2 border">{a.doctor}</td>
//                   <td className="p-2 border">{a.dateTime}</td>
//                   <td className="p-2 border">{a.remarks}</td>
//                   <td className="p-2 border">
//                     <Badge text={a.status} type="status" />
//                   </td>
//                   <td className="p-2 border">{a.description}</td>
//                   <td className="p-2 border text-blue-600 cursor-pointer hover:underline">
//                     {a.invoiceId}
//                   </td>
//                   <td className="p-2 border">{a.amount}</td>
//                   <td className="p-2 border">
//                     <Badge text={a.billStatus} type="bill" />
//                   </td>
//                   <td className="p-2 border space-x-1 flex">
//                     <button className="bg-blue-600 text-white px-2 py-1 rounded">
//                       ✎
//                     </button>
//                     <button className="bg-red-600 text-white px-2 py-1 rounded">
//                       🗑
//                     </button>
//                     {/* <button className="bg-cyan-600 text-white px-2 py-1 rounded">
//                       Live
//                     </button> */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentsLists;
