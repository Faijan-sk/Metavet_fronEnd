import React from "react";
import Sidebar from "./SideBar";

const DoctorProfile = () => {
  return (
    <div className="flex min-h-screen bg-blue-50 font-sans">
      <Sidebar />

      <main className="flex flex-1 flex-col p-6 space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-400 shadow rounded-xl overflow-hidden">
          <div className="relative h-40 flex items-end p-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Doctor"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-white">
                Dr. Max Foster
              </h2>
              <p className="text-sm text-white">Pet Doctor [Veterinarian]</p>
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pets Treated
              </label>
              <input
                type="text"
                value="128"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Clinic
              </label>
              <input
                type="text"
                value="Happy Paws Veterinary"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value="dr.maxfoster@happypaws.com"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value="+1 555 987 6543"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                value="123 Pet Lane, Pawsville, CA"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
          </div>

          {/* About Doctor */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Doctor Bio</h3>
            <textarea
              value="Dr. Max Foster is a passionate veterinarian with over 10 years of experience treating small and exotic pets. His mission is to provide compassionate, high-quality care for animals and build lasting relationships with pet owners."
              className="w-full h-48 border-gray-300 rounded-md shadow-sm"
              readOnly
            />

            <h3 className="text-lg font-semibold text-gray-800">
              Specializations
            </h3>
            <textarea
              value="Small Animals, Vaccination, Surgery, Emergency Care, Exotic Pets"
              className="w-full h-24 border-gray-300 rounded-md shadow-sm"
              readOnly
            />
          </div>
        </div>

        {/* Save Button */}
        {/* <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Save Details
          </button>
        </div> */}
      </main>
    </div>
  );
};

export default DoctorProfile;
