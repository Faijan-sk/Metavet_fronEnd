import React, { useState } from "react";

const DoctorCarousel9 = () => {
  // Default image to show for all doctors
  const defaultImageUrl = "https://via.placeholder.com/150";

  // Sample data for the doctor profiles
  const doctors = [
    {
      name: "Dr. John Doe",
      specialization: "Cardiologist",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Jane Smith",
      specialization: "Neurologist",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Emily Johnson",
      specialization: "Pediatrician",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Sarah Williams",
      specialization: "Orthopedic",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Michael Brown",
      specialization: "Dermatologist",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Linda Green",
      specialization: "Gastroenterologist",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Brian Wilson",
      specialization: "Surgeon",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Lisa Taylor",
      specialization: "Psychologist",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
    {
      name: "Dr. Chris Moore",
      specialization: "ENT Specialist",
      imageUrl:
        "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
    },
  ];

  const doctorsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  // Get the subset of doctors to display for the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const doctorsToDisplay = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle page number click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-8">
      <div className="flex justify-center space-x-8">
        {doctorsToDisplay.map((doctor, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105"
          >
            {/* <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-full h-64  bg-slate-100 " // Make sure the image takes up full width and height
            /> */}
            <figure className="px-10 pt-10">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="rounded-xl w-full h-48 object-cover bg-slate-200"
              />
            </figure>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                {doctor.name}
              </h3>
              <p className="text-gray-600">{doctor.specialization}</p>
              <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-4">
        {/* Previous Page Button */}
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-6 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
          >
            Prev
          </button>
        )}

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-6 py-2 rounded-full ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-gray-200 text-black"
            } hover:bg-blue-300 transition`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Page Button */}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-6 py-2 bg-primary text-white rounded-full "
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorCarousel9;
