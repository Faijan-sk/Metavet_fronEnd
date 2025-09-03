import React from "react";

const MeetTeam = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Meet the Team
        </h2>
        <p className="text-lg text-gray-600 mb-8">Learn Who We Are</p>

        <div className="flex justify-center items-center space-x-12">
          <div className="flex items-center bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
            {/* Image on the left */}
            <div className="w-1/3">
              <img
                src="./src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png" // Add your image URL here
                alt="Doctor Nathan "
                className="w-60 h-60 rounded-full mx-auto bg-slate-300"
              />
            </div>

            {/* Text content on the right */}
            <div className="w-2/3 pl-8">
              <h3 className="text-xl font-semibold text-gray-800">
                Doctor Nathan
              </h3>
              <p className="text-sm text-gray-500">Owner, Doctor</p>
              <p className="text-gray-600 mt-4">
                I have always loved animals and pets, so working with them all
                day and learning how their bodies work fascinates me. Every day,
                I feel like I am making a difference in the lives of not only my
                pet patients but also their human families as well.
              </p>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block"
              >
                View Full Bio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTeam;
