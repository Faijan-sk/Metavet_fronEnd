import React from "react";

const PatientInfoPopup = ({ pet, onClose }) => {
  if (!pet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Patient Info - {pet.petName}
        </h2>
        <ul className="text-sm space-y-2">
          <li>
            <strong>Pet ID:</strong> {pet.id}
          </li>
          <li>
            <strong>Check-In:</strong> {pet.checkInDate}
          </li>
          <li>
            <strong>Species:</strong> {pet.species}
          </li>
          <li>
            <strong>Breed:</strong> {pet.breed}
          </li>
          <li>
            <strong>Owner:</strong> {pet.owner}
          </li>
          <li>
            <strong>Status:</strong> {pet.status}
          </li>
        </ul>
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

export default PatientInfoPopup;
