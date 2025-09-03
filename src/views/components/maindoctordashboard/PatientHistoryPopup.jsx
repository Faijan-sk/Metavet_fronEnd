import React from "react";

const PatientHistoryPopup = ({ pet, onClose }) => {
  const history = [
    {
      date: "2025-05-10",
      treatment: "Vaccination",
      notes: "Annual vaccine administered.",
    },
    {
      date: "2025-04-20",
      treatment: "Check-up",
      notes: "Routine physical exam, all normal.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">
          History for {pet?.petName}
        </h2>
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {history.map((entry, index) => (
            <li key={index} className="border p-3 rounded bg-gray-50">
              <p className="text-sm">
                <span className="font-semibold">Date:</span> {entry.date}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Treatment:</span>{" "}
                {entry.treatment}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Notes:</span> {entry.notes}
              </p>
            </li>
          ))}
        </ul>
        {/* <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded  "
          onClick={onClose}
        >
          Close
        </button> */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistoryPopup;
