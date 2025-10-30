import React, { useState } from "react";

const BookAppointment = () => {
  // State for form inputs
  const [appointmentDate, setAppointmentDate] = useState("");
  const [provider, setProvider] = useState("");
  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [comments, setComments] = useState("");
  const [patientType, setPatientType] = useState("new");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // alert("Appointment Request Submitted!");
  };

  return (
    <div className="bg-gray-100  flex items-center justify-center mt-5 mb-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Request An Appointment
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Appointment Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Appointment Information
            </h3>

            {/* Appointment Date */}
            <div className="mb-4">
              <label
                htmlFor="appointmentDate"
                className="block text-gray-600 font-semibold mb-2"
              >
                Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Select Provider */}
            <div className="mb-4">
              <label
                htmlFor="provider"
                className="block text-gray-600 font-semibold mb-2"
              >
                Select Provider
              </label>
              <select
                id="provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a provider</option>
                <option value="provider1">Provider 1</option>
                <option value="provider2">Provider 2</option>
                <option value="provider3">Provider 3</option>
              </select>
            </div>

            {/* Reason for Visit */}
            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block text-gray-600 font-semibold mb-2"
              >
                Reason for your visit
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason</option>
                <option value="checkup">Check-up</option>
                <option value="sick">Sick</option>
                <option value="surgery">Surgery</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* New/Returning Patient */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                This appointment is for:
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="newPatient"
                  name="patientType"
                  value="new"
                  checked={patientType === "new"}
                  onChange={(e) => setPatientType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="newPatient" className="mr-6">
                  New Patient
                </label>
                <input
                  type="radio"
                  id="returningPatient"
                  name="patientType"
                  value="returning"
                  checked={patientType === "returning"}
                  onChange={(e) => setPatientType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="returningPatient">Returning Patient</label>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Patient Information
            </h3>

            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-600 font-semibold mb-2"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-600 font-semibold mb-2"
              >
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-600 font-semibold mb-2"
              >
                Date of Birth (dd-mm-yyyy)
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Address */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold mb-2"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-600 font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 555-5555"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pet Name */}
            <div className="mb-4">
              <label
                htmlFor="petName"
                className="block text-gray-600 font-semibold mb-2"
              >
                Pet Name*
              </label>
              <input
                type="text"
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Species */}
            <div className="mb-4">
              <label
                htmlFor="species"
                className="block text-gray-600 font-semibold mb-2"
              >
                Species* (e.g., dog, cat)
              </label>
              <input
                type="text"
                id="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Breed */}
            <div className="mb-4">
              <label
                htmlFor="breed"
                className="block text-gray-600 font-semibold mb-2"
              >
                Breed* (e.g., Golden Retriever, Siamese)
              </label>
              <input
                type="text"
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Comments */}
            <div className="mb-4">
              <label
                htmlFor="comments"
                className="block text-gray-600 font-semibold mb-2"
              >
                Comments
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
