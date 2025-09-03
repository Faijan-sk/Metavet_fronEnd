import React from "react";

const Index = () => {
  return (
    <div className="p-6">
      {/* Veterinary Services Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold mb-4">Veterinary Services</h2>
        <p className="text-lg text-gray-600">
          At Veterinary Clinic, you can trust that your pets are in great hands.
          Our compassionate, skillful veterinary staff are here to help when you
          need us most. We look forward to seeing you soon!
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* First Card */}
        <div className="card bg-base-100 w-72 shadow-2xl">
          <figure className="px-10 pt-10">
            <img
              src="./src/assets/MetavetImages/treatment-area.d81360469179aca58742.png"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Examinations & Consultations</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <button className="btn text-white bg-primary">Learn More</button>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="card bg-base-100 w-72 shadow-2xl">
          <figure className="px-10 pt-10">
            <img
              src="./src/assets/MetavetImages/vaccinations.2bed80d3b7942c944526.webp"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Vaccination Programs</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <button className="btn  text-white bg-primary">Learn More</button>
            </div>
          </div>
        </div>

        {/* Third Card */}
        <div className="card bg-base-100 w-72 shadow-2xl">
          <figure className="px-10 pt-10">
            <img
              src="./src/assets/MetavetImages/doctor-examining-cat-xray-room.0e8c9e1cfcaf772651b7.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Spays & Neuters</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <button className="btn text-white bg-primary">Learn More </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-72 shadow-2xl">
          <figure className="px-10 pt-10">
            <img
              src="./src/assets/MetavetImages/doctor-examining-cat-xray-room.0e8c9e1cfcaf772651b7.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Senior Pet Wellness</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <button className="btn text-white bg-primary">Learn More </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-72 shadow-2xl">
          <figure className="px-10 pt-10">
            <img
              src="./src/assets/MetavetImages/doctor-examining-cat-xray-room.0e8c9e1cfcaf772651b7.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Palliative Care Counselling</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <button className="btn text-white bg-primary">Learn More </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-72 shadow-2xl">
          <figure className="px-10 pt-10">
            <img
              src="./src/assets/MetavetImages/doctor-examining-cat-xray-room.0e8c9e1cfcaf772651b7.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Dentistry & Prophylaxis</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <button className="btn text-white bg-primary">Learn More </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
