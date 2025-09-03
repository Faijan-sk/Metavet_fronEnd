import React from "react";

//images import 
import Banner from "./../../../../src/assets/MetavetImages/dashboard images/bannerTwo.jpg"

const Div2 = () => {
  return (
    <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4  ">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={Banner}
            alt=""
          />
        </div>

        <div className="sm:text-center lg:text-left ml-5 mt-12">
          {/* <h1 className="text-3xl tracking-tight font-extrabold text-primary sm:text-3xl md:text-4xl"> */}
          <h1
            className="mt-4 text-4xl font-bold text-primary lg:mt-1 sm:text-6xl xl:text-6xl"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            <span className="block xl:inline">
              Expert Care anytime, anywhere.
            </span>
            {/* <span className="block text-indigo-600 xl:inline">
              online business
            </span> */}
          </h1>
          <p
            className="mt-3 text-base  sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Your pet’s health is important – book a convenient telemedicine
            appointment today and get expert care from the comfort of your home!
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-6">
            <p
              className="mt-3 text-base  sm:mt-1 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-1 md:text-xl lg:mx-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <span>98% :</span>
              <span> Satisfaction rate</span>
            </p>
            <p
              className="mt-3 text-base sm:mt-1 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-1 md:text-xl lg:mx-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <span>25M :</span>
              <span> Registered users</span>
            </p>
          </div>
          {/* Button Section */}
          {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Live demo
              </a>
            </div>
          </div> */}
          {/* End of Button Section */}
        </div>

        {/* Image Section */}
        {/* End of Image Section */}
      </div>
    </section>
  );
};

export default Div2;
