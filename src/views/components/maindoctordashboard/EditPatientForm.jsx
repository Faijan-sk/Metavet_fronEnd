import React, { useState, useEffect } from "react";

const EditPatientForm = ({ pet, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    checkInDate: "",
    petName: "",
    species: "",
    breed: "",
    owner: "",
    status: "",
  });

  useEffect(() => {
    if (pet) {
      setFormData({ ...pet });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!pet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">
          Edit Patient - {pet.petName}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mt-2">Pet ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            readOnly
          />

          <label className="block text-sm font-medium mt-2">
            Check-In Date
          </label>
          <input
            type="text"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block text-sm font-medium mt-2">Pet Name</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block text-sm font-medium mt-2">Species</label>
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block text-sm font-medium mt-2">Breed</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block text-sm font-medium mt-2">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block text-sm font-medium mt-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="New Patient">New Patient</option>
            <option value="Recovered">Recovered</option>
            <option value="In Treatment">In Treatment</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientForm;
