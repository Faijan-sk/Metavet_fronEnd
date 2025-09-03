import React, { useState } from "react";

const ViewProfile4 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a backend)
    console.log("Appointment booked:", formData);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Profile and Form Section */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Profile Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src="./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png" // Placeholder image for veterinarian
            alt="Veterinarian"
            className="rounded-full w-32 h-32 object-cover mb-4 bg-slate-200"
          />
          <h2 className="text-3xl font-bold text-gray-800">Dr. John Doe</h2>
          <p className="text-xl text-gray-600">Veterinarian</p>
          <p className="mt-4 text-gray-700">
            Dr. John Doe is an expert in animal health, specializing in pets,
            exotic animals, and preventive care. He is dedicated to providing
            high-quality care to ensure the health and well-being of your
            animals.
          </p>
        </div>

        {/* Right Section - Appointment Form */}
        <div className="max-w-xl mx-auto lg:mx-0">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Book an Appointment
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-2 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-2 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-2 p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-2 p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn bg-primary text-white w-full py-3 mt-4 rounded-md hover:bg-primary-dark"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile4;
