// import React from "react";

// const Footer = () => {
//   return (
//     <div>
//       <footer className="footer bg-neutral text-neutral-content p-10">
//         <nav>
//           <h6 className="footer-title">Quick Links</h6>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Home
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Services
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             About
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Doctors
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Review
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Book
//           </a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Our Services</h6>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Ambulance Service
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             {" "}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
//               ></path>
//             </svg>
//             Veterinary Doctor
//           </a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Contact Info</h6>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 fillRule="evenodd"
//                 d="M4.063 1.25h3.751a.75.75 0 0 1 .702.486l1.456 3.87a.75.75 0 0 1 .035.401l-.73 3.912c.897 2.108 2.378 3.525 4.833 4.796l3.865-.75a.75.75 0 0 1 .41.036l3.882 1.48a.75.75 0 0 1 .483.7v3.584c0 1.626-1.432 2.945-3.108 2.58c-3.053-.664-8.71-2.353-12.672-6.315c-3.796-3.795-5.068-9.037-5.495-11.87c-.245-1.618 1.052-2.91 2.588-2.91"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             Phone: +123 456 7890
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 fillRule="evenodd"
//                 d="M4.063 1.25h3.751a.75.75 0 0 1 .702.486l1.456 3.87a.75.75 0 0 1 .035.401l-.73 3.912c.897 2.108 2.378 3.525 4.833 4.796l3.865-.75a.75.75 0 0 1 .41.036l3.882 1.48a.75.75 0 0 1 .483.7v3.584c0 1.626-1.432 2.945-3.108 2.58c-3.053-.664-8.71-2.353-12.672-6.315c-3.796-3.795-5.068-9.037-5.495-11.87c-.245-1.618 1.052-2.91 2.588-2.91"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             Phone: +123 111 9990
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
//               ></path>
//             </svg>
//             Email: contact@example.com
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7"
//               ></path>
//             </svg>
//             Mumbai, India-400104
//           </a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Follow Us</h6>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
//               ></path>
//             </svg>
//             Facebook
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M16 12a4 4 0 1 0-1.172 2.829A3.84 3.84 0 0 0 16 12.06l-.001-.063zm2.16 0a6.135 6.135 0 1 1-1.797-4.359a5.92 5.92 0 0 1 1.798 4.256l-.001.109zm1.687-6.406v.002a1.44 1.44 0 1 1-.422-1.018c.256.251.415.601.415.988v.029v-.001zm-7.84-3.44l-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014a4.12 4.12 0 0 0-2.272 2.254l-.01.027a6 6 0 0 0-.284 1.083l-.005.037a12 12 0 0 0-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649t.008 1.195t-.008 1.195t0 1.649t.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043a4.12 4.12 0 0 0 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024l1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014a4.12 4.12 0 0 0 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649t-.008-1.195t.008-1.195t0-1.649t-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073a6.3 6.3 0 0 0-.303-1.163l.014.043a4.12 4.12 0 0 0-2.254-2.272l-.027-.01a6 6 0 0 0-1.083-.284l-.037-.005a12 12 0 0 0-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zM24 12q0 3.578-.08 4.953a6.64 6.64 0 0 1-6.985 6.968l.016.001q-1.375.08-4.953.08t-4.953-.08a6.64 6.64 0 0 1-6.968-6.985l-.001.016q-.08-1.375-.08-4.953t.08-4.953A6.64 6.64 0 0 1 7.061.079L7.045.078q1.375-.08 4.953-.08t4.953.08a6.64 6.64 0 0 1 6.968 6.985l.001-.016Q24 8.421 24 12"
//               ></path>
//             </svg>
//             Instagram
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 1000 1000"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M196.064.25C88.347.25.187 88.408.187 196.127v607.841c0 107.717 88.158 195.845 195.877 195.845h607.841c107.718 0 195.845-88.127 195.845-195.845V196.127C999.75 88.41 911.623.25 803.905.25zm49.266 164.948c51.648 0 83.461 33.906 84.443 78.475c0 43.585-32.797 78.444-85.442 78.444h-.969c-50.665 0-83.412-34.857-83.412-78.444c0-44.568 33.738-78.475 85.379-78.475zm445.08 208.31c99.329 0 173.79 64.922 173.79 204.436v260.449H713.247V595.406c0-61.06-21.847-102.718-76.476-102.718c-41.704 0-66.562 28.078-77.476 55.202c-3.987 9.704-4.967 23.257-4.967 36.832v253.671H403.375s1.981-411.613 0-454.233h150.984v64.324c20.06-30.95 55.942-74.977 136.051-74.977zm-521.556 10.685h150.953v454.202H168.854z"
//               ></path>
//             </svg>
//             Linkedin
//           </a>
//           <a className="link link-hover flex items-center gap-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 512 512"
//               width="1em"
//               height="1em"
//             >
//               <path
//                 fill="currentColor"
//                 d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
//               ></path>
//             </svg>
//             X
//           </a>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import PlayStore from "./../../../assets/MetavetImages/logo/google-play.png"
import AppStore from "./../../../assets/MetavetImages/logo/app-store.png"


const Footer = () => {
  // State to handle the dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
              ></path>
            </svg>
            Home
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
              ></path>
            </svg>
            About
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
              ></path>
            </svg>
            Doctors
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
              ></path>
            </svg>
            Review
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
              ></path>
            </svg>
            Book
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Our Services</h6>
          <div className="dropdown">
            <button
              className="link link-hover flex items-center gap-1 dropdown-toggle"
              type="button"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"
                ></path>
              </svg>
              Services
            </button>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <ul className="dropdown-menu mt-2">
                <li>
                  <a className="link link-hover">Ambulance Service</a>
                </li>
                <li>
                  <a className="link link-hover">Veterinary Doctor</a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Info</h6>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.063 1.25h3.751a.75.75 0 0 1 .702.486l1.456 3.87a.75.75 0 0 1 .035.401l-.73 3.912c.897 2.108 2.378 3.525 4.833 4.796l3.865-.75a.75.75 0 0 1 .41.036l3.882 1.48a.75.75 0 0 1 .483.7v3.584c0 1.626-1.432 2.945-3.108 2.58c-3.053-.664-8.71-2.353-12.672-6.315c-3.796-3.795-5.068-9.037-5.495-11.87c-.245-1.618 1.052-2.91 2.588-2.91"
                clipRule="evenodd"
              ></path>
            </svg>
            Phone: +123 456 7890
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.063 1.25h3.751a.75.75 0 0 1 .702.486l1.456 3.87a.75.75 0 0 1 .035.401l-.73 3.912c.897 2.108 2.378 3.525 4.833 4.796l3.865-.75a.75.75 0 0 1 .41.036l3.882 1.48a.75.75 0 0 1 .483.7v3.584c0 1.626-1.432 2.945-3.108 2.58c-3.053-.664-8.71-2.353-12.672-6.315c-3.796-3.795-5.068-9.037-5.495-11.87c-.245-1.618 1.052-2.91 2.588-2.91"
                clipRule="evenodd"
              ></path>
            </svg>
            Phone: +123 111 9990
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
              ></path>
            </svg>
            Email: contact@example.com
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7"
              ></path>
            </svg>
            Mumbai, India-400104
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Follow Us</h6>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
              ></path>
            </svg>
            Facebook
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M16 12a4 4 0 1 0-1.172 2.829A3.84 3.84 0 0 0 16 12.06l-.001-.063zm2.16 0a6.135 6.135 0 1 1-1.797-4.359a5.92 5.92 0 0 1 1.798 4.256l-.001.109zm1.687-6.406v.002a1.44 1.44 0 1 1-.422-1.018c.256.251.415.601.415.988v.029v-.001zm-7.84-3.44l-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014a4.12 4.12 0 0 0-2.272 2.254l-.01.027a6 6 0 0 0-.284 1.083l-.005.037a12 12 0 0 0-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649t.008 1.195t-.008 1.195t0 1.649t.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043a4.12 4.12 0 0 0 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024l1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014a4.12 4.12 0 0 0 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649t-.008-1.195t.008-1.195t0-1.649t-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073a6.3 6.3 0 0 0-.303-1.163l.014.043a4.12 4.12 0 0 0-2.254-2.272l-.027-.01a6 6 0 0 0-1.083-.284l-.037-.005a12 12 0 0 0-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zM24 12q0 3.578-.08 4.953a6.64 6.64 0 0 1-6.985 6.968l.016.001q-1.375.08-4.953.08t-4.953-.08a6.64 6.64 0 0 1-6.968-6.985l-.001.016q-.08-1.375-.08-4.953t.08-4.953A6.64 6.64 0 0 1 7.061.079L7.045.078q1.375-.08 4.953-.08t4.953.08a6.64 6.64 0 0 1 6.968 6.985l.001-.016Q24 8.421 24 12"
              ></path>
            </svg>
            Instagram
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M196.064.25C88.347.25.187 88.408.187 196.127v607.841c0 107.717 88.158 195.845 195.877 195.845h607.841c107.718 0 195.845-88.127 195.845-195.845V196.127C999.75 88.41 911.623.25 803.905.25zm49.266 164.948c51.648 0 83.461 33.906 84.443 78.475c0 43.585-32.797 78.444-85.442 78.444h-.969c-50.665 0-83.412-34.857-83.412-78.444c0-44.568 33.738-78.475 85.379-78.475zm445.08 208.31c99.329 0 173.79 64.922 173.79 204.436v260.449H713.247V595.406c0-61.06-21.847-102.718-76.476-102.718c-41.704 0-66.562 28.078-77.476 55.202c-3.987 9.704-4.967 23.257-4.967 36.832v253.671H403.375s1.981-411.613 0-454.233h150.984v64.324c20.06-30.95 55.942-74.977 136.051-74.977zm-521.556 10.685h150.953v454.202H168.854z"
              ></path>
            </svg>
            Linkedin
          </a>
          <a className="link link-hover flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
              ></path>
            </svg>
            X
          </a>
        </nav>
        <nav>
          <h6 className="footer-title pl-8">LINKS</h6>
          <div className="footer-store-links  gap-6">
            {/* Google Play Section */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-2 border-gray-200 p-2 rounded-lg"
            >
              <img
                src={PlayStore}
                alt="Google Play"
                className="w-12 h-12 " // Adjusted to create space between image and text
              />
              <div className="text-left">
                <p className="text-sm font-normal text-white">Get it on</p>
                <p className="text-xl  text-white">Google Play</p>
              </div>
            </a>

            {/* App Store Section */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border-2 border-gray-200 p-2 rounded-lg mt-2"
            >
              <img
                src={AppStore}
                alt="App Store"
                className="w-10 h-10" // Adjusted to create space between image and text
              />
              <div className="text-left pl-2">
                <p className="text-sm font-normal text-white">Download on</p>
                <p className="text-xl  text-white">App Store</p>
              </div>
            </a>
          </div>
          {/* <div>
            <div className="footer-store-links  flex  gap-6">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="./src/assets/MetavetImages/google-play.png" // Play Store Icon
                  alt="Google Play"
                  className="w-14 h-14"
                />
              </a>

              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="./src/assets/MetavetImages/app-store.png" // App Store Icon
                  alt="App Store"
                  className="w-12 h-12"
                />
              </a>
            </div>
          </div> */}
        </nav>
      </footer>{" "}
    </div>
  );
};

export default Footer;

// <div>
//   <div className="footer-store-links gap-6">
//     <a
//       href="https://play.google.com/store"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center gap-2" // Use flex to align icon and text side by side
//     >
//       <img
//         src="./src/assets/MetavetImages/google-play.png" // Play Store Icon
//         alt="Google Play"
//         className="w-14 h-14"
//       />
//       <span>Get it on Google Play</span> {/* Text next to the icon */}
//     </a>

//     <a
//       href="https://www.apple.com/app-store/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex items-center gap-2" // Use flex to align icon and text side by side
//     >
//       <img
//         src="./src/assets/MetavetImages/app-store.png" // App Store Icon
//         alt="App Store"
//         className="w-12 h-12"
//       />
//       <span>Download on the App Store</span> {/* Text next to the icon */}
//     </a>
//   </div>
// </div>
