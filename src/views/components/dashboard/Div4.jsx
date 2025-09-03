import React from "react";

const features = [
  {
    title: "Find Dr. or Service Provider",
    description:
      "Discover Discover a provider who understands your needs and supports your pets journey.",

    iconContainerClasses:
      "flex items-center justify-center w-20 h-20 mx-auto bg-blue-100 rounded-full",
    svgClasses: "text-blue-600 w-9 h-9",
    svgPath:
      "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4",
    svgProps: {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
    },
  },
  {
    title: "Check Professional Profile",
    description:
      "Explore professional profiles to ensure you choose the right provider for your needs",
    iconContainerClasses:
      "flex items-center justify-center w-20 h-20 mx-auto bg-orange-100 rounded-full",
    svgClasses: "text-orange-600 w-9 h-9",
    svgPath: "M13 10V3L4 14h7v7l9-11h-7z",
    svgProps: {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
    },
  },
  {
    title: "Schedule Appointment",
    description:
      "Schedule your appointment easily & directly with just a few taps on the app",
    iconContainerClasses:
      "flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full",
    svgClasses: "text-green-600 w-9 h-9",
    svgPath:
      "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    svgProps: {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
    },
  },
  {
    title: "Get Your Solution",
    description: "“Find the solution that fits your needs, all in one place.",
    iconContainerClasses:
      "flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full",
    svgClasses: "text-red-600 w-9 h-9",
    svgPath:
      "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
    svgProps: {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
    },
  },
];

const Div4 = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      {/* <div className="d-flex  ">
        How it Works
        <p>Quick connections for scheduling pet</p>
        <p>care professionals</p>
      </div> */}
      <div className="flex flex-col items-center justify-center text-center text-3xl">
        <div
          className="text-4xl font-bold mb-2 text-primary"
          style={{ fontFamily: "'Abril Fatface', serif" }}
        >
          How it Works
        </div>
        <p
          className="text-xl"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Quick connections for scheduling pet
        </p>
        <p
          className="text-xl"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          care professionals
        </p>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 gap-y-8 lg:grid-cols-4 sm:gap-12">
          {features.map((feature, index) => (
            <div key={index}>
              <div className={feature.iconContainerClasses}>
                <svg
                  className={feature.svgClasses}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d={feature.svgPath} {...feature.svgProps} />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Div4;
