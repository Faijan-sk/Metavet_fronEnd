import React from "react";
import { Link } from "react-router-dom";
import BannerOne from "./../../../assets/MetavetImages/dashboard images/bannerOne.png"

const HeroSection = () => {
  return (
    <div className="bg-white">
      <section className="bg-[#FCF8F1] bg-opacity-30 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              {/* <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                A social media for learners
              </p> */}
              <h1
                className="mt-4 text-4xl font-bold text-primary lg:mt-8 sm:text-6xl xl:text-6xl"
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                {/* Connect &amp; learn from the experts */}
                Animal Care from anywhere
              </h1>
              <p
                className="mt-4 text-base  text-black lg:mt-8 sm:text-xl"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {/* Grow your career fast with right mentor. */}
                Metavet is dedicated to taking the worry out of waiting by
                bringing veterinary care into the comfort of your own home
              </p>
              <Link to={"/appointmentform"}>
                <button
                  title=""
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-primary rounded-full lg:mt-16"
                  role="button"
                >
                  Book Appointment
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </Link>

              <p className="mt-5 text-gray-600">
                {/* Already joined us?{" "} */}
                <a
                  href="#"
                  title=""
                  className="text-black transition-all duration-200 hover:underline"
                >
                  {/* Log in */}
                </a>
              </p>
            </div>

            <div className="pt-4">
              <img
                className="w-full bg-blue-100 rounded-full "
                src={BannerOne}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
