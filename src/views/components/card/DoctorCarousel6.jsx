import React from "react";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Jane",
    specialization: "Neurologist",
    image: "./src/assets/MetavetImages/portrait-3d-female-doctor (1).png",
  },
  {
    id: 2,
    name: "Dr. Emily Jane",
    specialization: "Neurologist",
    image: "./src/assets/MetavetImages/portrait-3d-female-doctor (1).png",
  },
  {
    id: 3,
    name: "Dr. Emily Jane",
    specialization: "Neurologist",
    image: "./src/assets/MetavetImages/portrait-3d-female-doctor (1).png",
  },
];

const DoctorCarousel6 = () => {
  return (
    <div className="flex justify-center space-x-4 overflow-x-auto gap-10 py-8">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="flex-none w-72 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-52 object-cover bg-blue-100"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.specialization}</p>
            <div className="flex justify-end mt-4">
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Book
              </button> */}
              <Link to="/viewprofile6">
                {" "}
                <button className="bg-primary text-white px-4 py-2 rounded-lg  ">
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

export default DoctorCarousel6;
