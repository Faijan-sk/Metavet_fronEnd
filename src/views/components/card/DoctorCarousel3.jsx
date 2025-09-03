import React from "react";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Jasmine",
    specialty: "Cardiology Specialist",
    imageUrl: "./src/assets/MetavetImages/dr1 (1).png",
  },
  {
    id: 2,
    name: "Dr. Jasmine",
    specialty: "Cardiology Specialist",
    imageUrl: "./src/assets/MetavetImages/dr1 (1).png",
  },
  {
    id: 3,
    name: "Dr. Jasmine",
    specialty: "Cardiology Specialist",
    imageUrl: "./src/assets/MetavetImages/dr1 (1).png",
  },
];

const DoctorCarousel3 = () => {
  return (
    <div className="mx-4 mt-28 flex space-x-4 overflow-x-auto">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="card bg-base-100 image-full w-96 shadow-xl"
        >
          <figure>
            <img src={doctor.imageUrl} alt={doctor.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{doctor.name}</h2>
            <p>{doctor.specialty}</p>

            <div className="card-actions justify-end">
              <Link to="/viewprofile3">
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

export default DoctorCarousel3;
