import React from "react";
import { Link } from "react-router-dom";

const DoctorCarousel8 = () => {
  // Array of doctors' data
  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Davis",
      specialty: "Neurologist",
      image: "./src/assets/MetavetImages/dr4.png", // Replace with actual image paths
      description: "Experienced in treating heart diseases and conditions.",
    },
    {
      id: 2,
      name: "Dr. Emily Davis",
      specialty: "Neurologist",
      image: "./src/assets/MetavetImages/dr4.png", // Replace with actual image paths
      description: "Expert in skin care and treatments.",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Neurologist",
      image: "./src/assets/MetavetImages/dr4.png", // Replace with actual image paths
      description: "Specializing in brain and nervous system health.",
    },
  ];

  return (
    <div className="flex justify-center space-x-4 mt-10">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="card bg-base-100 w-80 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        >
          <figure className="px-10 pt-10">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded-xl h-48 object-cover bg-slate-300"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{doctor.name}</h2>
            <p>{doctor.specialty}</p>
            <p className="text-gray-500">{doctor.description}</p>
            <div className="card-actions">
              <Link to="/viewprofile8">
                {" "}
                <button className="btn bg-primary text-white">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCarousel8;
