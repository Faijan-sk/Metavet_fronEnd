import React from "react";

const index = () => {
  return (
    <div className="min-h-lvh flex items-center justify-center gap-16 bg-black-to-white sm:py-11">
      <div>
        <h2 className="mx-auto text-center text-[#DEE4E7] max-w-2xl font-display text-3xl font-bold tracking-normal  sm:text-4xl">
          BCG <span className="text-primary">X</span>
        </h2>
        <h1 className="mx-auto mt-11 text-center text-[#DEE4E7] max-w-4xl font-display text-5xl font-semibold tracking-normal  sm:text-6xl">
          Price Optimization Tool
        </h1>
        <p className="mx-auto text-center mt-3 text-[#DEE4E7] max-w-[47rem] text-lg  sm:mt-5 md:mt-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's
        </p>
        <div className="flex gap-8 justify-center my-14">
          <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]  flex flex-col justify-between gap-9 w-full p-6 max-w-[320px] rounded-lg  overflow-hidden ">
            <div className="mb-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-24 h-24 font-bold text-black"
              >
                <path
                  fill="currentColor"
                  d="M8 20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2V8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zM8 6a2 2 0 0 1-2 2v8a2 2 0 0 1 2 2h8a2 2 0 0 1 2-2V8a2 2 0 0 1-2-2zM4 4v2h2V4zm14 0v2h2V4zm0 14v2h2v-2zM4 18v2h2v-2z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className=" text-gray-800 font-bold flex-1 md:text-2xl sm:text-xl">
                Create and Manage Product
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed auctor.
              </p>
            </div>

            <div className=" flex items-center flex-wrap gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-12 h-12 font-bold text-black"
              >
                <path
                  fill="currentColor"
                  d="M4 12h12.25L11 6.75l.66-.75l6.5 6.5l-6.5 6.5l-.66-.75L16.25 13H4z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]  flex flex-col justify-between gap-9 w-full p-6 max-w-[320px] rounded-lg  overflow-hidden ">
            <div className="mb-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-24 h-24 font-bold text-black"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="m4 8l8-5l8 5v8l-8 5l-8-5z"></path>
                  <path d="m12 4l7.5 12h-15z"></path>
                  <path d="M11 3a1 1 0 1 0 2 0a1 1 0 0 0-2 0m0 18a1 1 0 1 0 2 0a1 1 0 0 0-2 0M3 8a1 1 0 1 0 2 0a1 1 0 0 0-2 0m0 8a1 1 0 1 0 2 0a1 1 0 0 0-2 0m16 0a1 1 0 1 0 2 0a1 1 0 0 0-2 0m0-8a1 1 0 1 0 2 0a1 1 0 0 0-2 0"></path>
                </g>
              </svg>
            </div>
            <div>
              <h3 className=" text-gray-800 font-bold flex-1 md:text-2xl sm:text-xl">
                Pricing Optimization
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed auctor.
              </p>
            </div>

            <div className=" flex items-center flex-wrap gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-12 h-12 font-bold text-black"
              >
                <path
                  fill="currentColor"
                  d="M4 12h12.25L11 6.75l.66-.75l6.5 6.5l-6.5 6.5l-.66-.75L16.25 13H4z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
