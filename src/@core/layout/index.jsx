import React from 'react'

import Header from './temp'

import Horizontal from '../navigation/Horizontal'

import { Link, Outlet } from 'react-router-dom'

const sidebar = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-[18px] h-[18px] mr-4"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3zm0-4h18v-2H3zm0-4h18v-2H3zm0-4h18V7H3zm0-6v2h18V3z"
        ></path>
      </svg>
    ),
    name: 'metavet',
    path: '/',
  },
  // {
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       className="w-[18px] h-[18px] mr-4"
  //     >
  //       <path
  //         fill="currentColor"
  //         d="M19 5v2h-4V5zM9 5v6H5V5zm10 8v6h-4v-6zM9 17v2H5v-2zM21 3h-8v6h8zM11 3H3v10h8zm10 8h-8v10h8zm-10 4H3v6h8z"
  //       ></path>
  //     </svg>
  //   ),
  //   name: "Dashboard",
  //   path: "/",
  // },
  // {
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 14 14"
  //       className="w-[18px] h-[18px] mr-4"
  //     >
  //       <path
  //         fill="currentColor"
  //         fillRule="evenodd"
  //         d="M4.5 1a1 1 0 0 0-2 0v1h-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2h-1V1a1 1 0 1 0-2 0v1h-5zm1.47 4.428c0-.217.176-.392.393-.392h1.275c.216 0 .392.175.392.392v1.56h1.56c.217 0 .392.176.392.392v1.275a.39.39 0 0 1-.392.393H8.03v1.56a.39.39 0 0 1-.392.392H6.362a.39.39 0 0 1-.392-.392v-1.56H4.41a.39.39 0 0 1-.392-.393V7.38c0-.216.175-.392.392-.392h1.56z"
  //         clipRule="evenodd"
  //       ></path>
  //     </svg>
  //   ),
  //   name: 'Appointment',
  //   path: '/appointment',
  // },
  // {
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 24 24"
  //       className="w-[20px] h-[20px] mr-4"
  //     >
  //       <path
  //         fill="currentColor"
  //         d="M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3zM12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5zm6 9.09c0 4-2.55 7.7-6 8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6 2.25z"
  //       ></path>
  //     </svg>
  //   ),
  //   name: 'Health Record',
  //   path: '/healthrecord',
  // },
  // {
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 14 14"
  //       className="w-[18px] h-[18px] mr-4"
  //     >
  //       <path
  //         fill="currentColor"
  //         fillRule="evenodd"
  //         d="M8.171 3.108a2.17 2.17 0 0 1 1.94-1.2h.733a.25.25 0 0 1 .25.25v2.22l2.708.902a.25.25 0 0 1 .17.237v.96a2.17 2.17 0 0 1-2.168 2.168h-1.67v.002C9.11 8.43 8.35 7.853 7.8 7.173a5.7 5.7 0 0 1-.884-1.554zM5.637 5.747H4.035a3.6 3.6 0 0 1-2.242-.787L.446 3.882a.25.25 0 0 0-.406.196v8.155a1.69 1.69 0 1 0 3.378 0v-.48a.71.71 0 0 1 .71-.709h1.919a.71.71 0 0 1 .71.71v.48a1.69 1.69 0 1 0 3.378 0V9.917c-1.49-.239-2.57-1.05-3.307-1.958a6.9 6.9 0 0 1-1.19-2.213Z"
  //         clipRule="evenodd"
  //       ></path>
  //     </svg>
  //   ),
  //   name: 'My Pet',
  //   path: '/',
  // },
  // {
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 14 14"
  //       className="w-[18px] h-[18px] mr-4"
  //     >
  //       <path
  //         fill="none"
  //         stroke="currentColor"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M9.5 10.5v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2M6.5 7h7m-2-2l2 2l-2 2"
  //       ></path>
  //     </svg>
  //   ),
  //   name: 'Logout',
  //   path: '/signin',
  // },
]

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64">
      <nav className="bg-base shadow-lg h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto  bg-primary">
        <ul className="mt-3">
          {sidebar.map((sideNav, index) => (
            <li key={index}>
              <Link
                // href="javascript:void(0)"
                to={sideNav.path ? sideNav.path : '/'}
              >
                <div className="text-white hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  {sideNav.icon}{' '}
                  <span className="font-semibold">{sideNav.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* <div className="mt-6">
          <h6 className="text-blue-600 text-sm font-bold px-4">Information</h6>
          <ul className="mt-3">
            <li>
              <a
                href="javascript:void(0)"
                className="text-white hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"
              >
                <span>Audience</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-white hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"
              >
                <span>Posts</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-white hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"
              >
                <span>Schedules</span>
              </a>
            </li>
          </ul>
        </div> */}
      </nav>
    </div>
  )
}

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-base border-b border-gray-200">
      <div className="flex items-center px-4">
        <button className="text-gray-500 focus:outline-none focus:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <input
          className="mx-4 w-full border rounded-md px-4 py-2"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center pr-4">
        <button className="flex items-center text-gray-500 hover:text-primary focus:outline-none focus:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l-7-7 7-7m5 14l7-7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

const MainContent = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Daystar Daycare</h1>
      <p className="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* <Navbar /> */}
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
