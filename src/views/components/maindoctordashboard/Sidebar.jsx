// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64  p-4 shadow-md bg-primary">
      <div className="flex flex-col items-center ">
        <img
          src="./src/assets/MetavetImages/dr4.png"
          alt="Doctor"
          className="w-24 h-24 rounded-full mb-2 bg-white"
        />
        <h2 className="font-bold text-lg text-center">Dr. Marttin Deo</h2>
        <p className="text-sm  text-center">Cardiology Specialist</p>
      </div>
      <nav className="mt-6 space-y-3 text-sm  font-medium text-gray-700  ">
        {/* <Link to={"/dashboard"}>
          {" "}
          <a className="block p-2  rounded hover:bg-blue-50">Dashboard</a>
        </Link> */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"
            ></path>
          </svg>
          Dashboard
        </Link>

        {/* <Link to={"/patientlist"}>
          {" "}
          <a className="block p-2  rounded hover:bg-blue-50">Patients</a>
        </Link> */}
        <Link
          to="/patientlist"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3.366 5.23q-.213 0-.357-.143q-.143-.144-.143-.357t.143-.356t.357-.143h9q.212 0 .356.144t.144.357t-.144.356t-.356.143zM7.87 17.117q.467 0 .789-.326q.322-.325.322-.79v-1.384h1.385q.464 0 .79-.327t.325-.793t-.325-.79q-.326-.321-.79-.321H8.98V11q0-.465-.327-.79q-.326-.325-.793-.325t-.789.325t-.322.79v1.385H5.366q-.465 0-.79.326q-.326.327-.326.793q0 .467.325.79q.326.322.79.322H6.75V16q0 .465.327.79q.326.326.793.326M3.48 20q-.69 0-1.152-.462t-.462-1.153v-9.77q0-.69.462-1.152T3.481 7h8.769q.69 0 1.153.463t.463 1.153v9.769q0 .69-.463 1.153T12.25 20zm15.487-5.546q-.165-.166-.165-.367t.165-.366l1.26-1.221h-3.38q-.195 0-.338-.153T16.366 12t.147-.337t.333-.144h3.381l-1.221-1.221q-.165-.165-.175-.354t.157-.354t.37-.165t.37.166l1.859 1.851q.244.24.244.56t-.242.564L19.7 14.454q-.165.165-.366.165t-.367-.165"
            ></path>
          </svg>{" "}
          Patients
        </Link>

        {/* <Link to={"/appointmentslists"}>
          {" "}
          <a className="block p-2 rounded hover:bg-blue-50">Appointments</a>
        </Link> */}
        <Link
          to="/appointmentslists"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M4.5 1a1 1 0 0 0-2 0v1h-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2h-1V1a1 1 0 1 0-2 0v1h-5zm1.47 4.428c0-.217.176-.392.393-.392h1.275c.216 0 .392.175.392.392v1.56h1.56c.217 0 .392.176.392.392v1.275a.39.39 0 0 1-.392.393H8.03v1.56a.39.39 0 0 1-.392.392H6.362a.39.39 0 0 1-.392-.392v-1.56H4.41a.39.39 0 0 1-.392-.393V7.38c0-.216.175-.392.392-.392h1.56z"
              clipRule="evenodd"
            ></path>
          </svg>
          Appointments
        </Link>

        {/* <Link to={"/reviewlist"}>
          <a className="block p-2 rounded hover:bg-blue-50">Reviews</a>
        </Link> */}
        <Link
          to="/chatlist"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              d="m6.077 17l-1.704 1.704q-.379.379-.876.171T3 18.133V4.616q0-.691.463-1.153T4.615 3h14.77q.69 0 1.152.463T21 4.616v10.769q0 .69-.463 1.153T19.385 17zM7 13.5h6q.213 0 .356-.144t.144-.357t-.144-.356T13 12.5H7q-.213 0-.356.144t-.144.357t.144.356T7 13.5m0-3h10q.213 0 .356-.144t.144-.357t-.144-.356T17 9.5H7q-.213 0-.356.144t-.144.357t.144.356T7 10.5m0-3h10q.213 0 .356-.144t.144-.357t-.144-.356T17 6.5H7q-.213 0-.356.144t-.144.357t.144.356T7 7.5"
            ></path>
          </svg>
          Chats
        </Link>

        <Link
          to="/reviewlist"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm7.075-7.75L12 12.475l2.925 1.775l-.775-3.325l2.6-2.25l-3.425-.275L12 5.25L10.675 8.4l-3.425.275l2.6 2.25z"
            ></path>
          </svg>
          Reviews
        </Link>
        <Link
          to="/docmainprofile"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"
            ></path>
          </svg>
          Profile
        </Link>

        {/* <Link to={"/signin"}>
          {" "}
          <a className="block p-2 rounded text-red-500 hover:bg-red-50">
            Logout
          </a>
        </Link> */}
        <Link
          to="/signin"
          className="flex items-center gap-2 p-2 rounded hover:bg-blue-50 "
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
            ></path>
          </svg>
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
