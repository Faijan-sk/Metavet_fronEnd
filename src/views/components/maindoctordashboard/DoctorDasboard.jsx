import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
const DoctorDashboard = () => {
  return (
    <div className="flex bg-blue-50 min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-3 items-center">
            <button className="p-2 rounded bg-white shadow">
              {/* 📩 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
                ></path>
              </svg>
            </button>
            <button className="p-2 rounded bg-white shadow">
              {/* 🔔 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M17.133 12.632v-1.8a5.41 5.41 0 0 0-4.154-5.262A1 1 0 0 0 13 5.464V3.1a1 1 0 0 0-2 0v2.364a1 1 0 0 0 .021.106a5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807C5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175m-13.267-.8a1 1 0 0 1-1-1a9.42 9.42 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037a1 1 0 0 1-1 .995m16.268 0a1 1 0 0 1-1-1A7.43 7.43 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354a9.42 9.42 0 0 1 2.517 6.391a1 1 0 0 1-1 .995M8.823 19a3.453 3.453 0 0 0 6.354 0z"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Total Patient", value: "2000+", date: "Till Today" },
            { title: "Today Patient", value: "068", date: "21 Dec-2021" },
            { title: "Today Appointments", value: "085", date: "21 Dec-2021" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded shadow text-center space-y-1"
            >
              <div className=" text-3xl pl-32">
                {/* 👥 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                >
                  <path
                    fill="currentColor"
                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c.02.01.03.03.04.04c1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5"
                  ></path>
                </svg>
              </div>
              <h3 className="text-gray-500 font-bold ">{item.title}</h3>
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-xs text-gray-400 font-bold">{item.date}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart and Review */}
          <div className="space-y-4">
            {/* <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">Patients Summary December 2021</h3>
              <div className="flex justify-center items-center h-32">
                <div className="text-gray-400">[Chart Placeholder]</div>
              </div>
              <div className="flex justify-between text-xs mt-3 text-gray-600">
                <span className="text-indigo-400">New Patients</span>
                <span className="text-yellow-500">Old Patients</span>
                <span className="text-blue-700">Total Patients</span>
              </div>
            </div> */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">Patients Summary April 2025</h3>
              <div className="flex justify-center items-center h-32">
                {/* Circular placeholder chart */}
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <circle
                      className="text-gray-400"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="25, 75"
                      cx="18"
                      cy="18"
                      r="15.915"
                    />
                    <circle
                      className="text-yellow-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="35, 65"
                      strokeDashoffset="-25"
                      cx="18"
                      cy="18"
                      r="15.915"
                    />
                    <circle
                      className="text-blue-700"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="40, 60"
                      strokeDashoffset="-60"
                      cx="18"
                      cy="18"
                      r="15.915"
                    />
                  </svg>
                </div>
              </div>

              {/* Vertical legend list */}
              <div className="text-gray-600 text-sm mt-4 space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-gray-400  mr-2"></span>
                  New Patients
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-yellow-500  mr-2"></span>
                  Old Patients
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-blue-700  mr-2"></span>
                  Total Patients
                </div>
              </div>
            </div>

            {/* <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">Patients Review</h3>
              {["Excellent", "Great", "Good", "Average"].map((label, i) => (
                <div key={i} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{label}</span>
                  <div className="w-3/4 bg-gray-100 rounded h-2 ml-4">
                    <div
                      className={`h-full rounded ${
                        i === 0
                          ? "bg-blue-600 w-3/4"
                          : i === 1
                          ? "bg-green-400 w-2/3"
                          : i === 2
                          ? "bg-yellow-400 w-1/2"
                          : "bg-teal-300 w-1/3"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Today Appointments */}
          {/* Today Appointments */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-3">Today Pet Appointments</h3>
            {[
              ["Bella", "Annual Vaccination", "On Going"],
              ["Max", "Dental Checkup", "10:30 AM"],
              ["Whiskers", "Skin Allergy", "11:00 AM"],
              ["Rocky", "Limping Issue", "11:30 AM"],
            ].map(([name, reason, time], i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="text-xs text-gray-500">{reason}</p>
                </div>
                <span className="text-xs text-blue-600">{time}</span>
              </div>
            ))}
          </div>

          {/* Patient Details */}
          {/* Pet Details */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Next Pet Details</h3>
            <div className="flex items-center gap-3 mb-2">
              <img
                src="./src/assets/MetavetImages/cheerful-dog-sitting-cartoon-character.a61b491abe107cb792c1.png"
                className="w-12 h-12 rounded-full"
                alt="Pet"
              />
              <div>
                <p className="font-bold">Bella</p>
                <p className="text-sm text-gray-500">
                  Golden Retriever - Annual Vaccination
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-600 space-y-1 mb-3">
              <p>D.O.B: 03 Mar 2019</p>
              <p>Species: Dog | Breed: Golden Retriever</p>
              <p>Last Visit: 15 Dec 2024</p>
              <p>Owner: Maria Gonzales</p>
            </div>
            <div className="flex gap-2 mb-2 text-xs">
              <span className="bg-yellow-100 text-yellow-700 px-2 rounded">
                Vaccination Due
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 rounded">
                Skin Condition
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                📞 Call Owner
              </button>
              <button className="px-2 py-1 bg-gray-200 text-xs rounded">
                📄 Pet Docs
              </button>
              <button className="px-2 py-1 bg-gray-200 text-xs rounded">
                💬 Chat
              </button>
            </div>
          </div>
        </div>

        {/* Appointment Request & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment Request */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Appointment Request</h3>
            {[
              ["Maria ", "Check Up"],
              ["Max", " Sweating"],
              ["Rocky", " Skin Allergy"],
              ["Bella", " Dental"],
            ].map(([name, reason], i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="text-xs text-gray-500">{reason}</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-green-500">
                    {/* ✔ */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button className="text-red-500">
                    {/* ✖ */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fill="currentColor"
                        d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z"
                      ></path>
                    </svg>
                  </button>
                  <button className="text-blue-500">
                    {/* 🕒 */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fill="currentColor"
                        d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"
                      ></path>
                    </svg>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.2 3.2l.8-1.3l-4.5-2.7z"
                      ></path>
                    </svg> */}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar */}
          {/* <div className="bg-white p-4 rounded shadow col-span-2">
            <h3 className="font-bold mb-2">Calendar - December 2025</h3>
            <div className="grid grid-cols-7 gap-2 text-sm text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d, i) => (
                <div key={i} className="font-semibold text-gray-600">
                  {d}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    i + 1 === 21
                      ? "bg-blue-500 text-white font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div> */}
          <div className="bg-white p-4 rounded shadow col-span-1">
            <h3 className="font-bold mb-2">Calendar</h3>
            <Calendar />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Patients Review</h3>
            {["Excellent", "Great", "Good", "Average"].map((label, i) => (
              <div key={i} className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="w-3/4 bg-gray-100 rounded h-2 ml-4">
                  <div
                    className={`h-full rounded ${
                      i === 0
                        ? "bg-blue-600 w-3/4"
                        : i === 1
                        ? "bg-green-400 w-2/3"
                        : i === 2
                        ? "bg-yellow-400 w-1/2"
                        : "bg-teal-300 w-1/3"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
