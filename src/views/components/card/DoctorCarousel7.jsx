import React from "react";
import { Link } from "react-router-dom";

const doctorData = [
  {
    name: "Mike Johnson",
    title: "Cardiology Specialist",
    specialty: "Specializing in Pet Care & Wellness",
    description:
      "I have a passion for improving the health of pets and ensuring a safe, comfortable experience....",
    imgSrc:
      "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
  },
  {
    name: "Mike Johnson",
    title: "Cardiology Specialist",
    specialty: "Specializing in Pet Care & Wellness",
    description:
      "With over 10 years of experience in the field, I am dedicated to providing the best care for your pets...",
    imgSrc:
      "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
  },
  {
    name: "Mike Johnson",
    title: "Cardiology Specialist",
    specialty: "Specializing in Pet Care & Wellness",
    description:
      "With my expertise, I provide prompt and effective care to pets in very critical conditions....",
    imgSrc:
      "./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png",
  },
];

const DoctorCarousel7 = () => {
  return (
    <div className="flex justify-center gap-6 pt-10">
      {doctorData.map((doctor, index) => (
        <div
          key={index}
          className="relative block overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xs"
        >
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                {doctor.name}
              </h3>
              <p className="mt-1 text-xs font-medium text-gray-600">
                {doctor.title}
              </p>
            </div>

            <div className="hidden sm:block sm:shrink-0">
              <img
                alt="Doctor"
                src={doctor.imgSrc}
                className="w-20 h-20 rounded-lg object-cover shadow-xs bg-slate-200"
              />
            </div>
          </div>

          <div>
            <p className="mt-1 text-xs font-medium text-gray-600">
              {doctor.specialty}
            </p>
            <p className="text-sm text-pretty text-gray-500 mt-2">
              {doctor.description}
            </p>
          </div>

          <div className="mt-6">
            <Link to="/viewprofile7">
              {" "}
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCarousel7;
