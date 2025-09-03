import React from "react";
import { Link } from "react-router-dom";

const Prescription = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
        {/* Title and Breadcrumb */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Prescription Required
          </h1>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              Store / Prescription Required
            </p>
          </div>
        </div>

        {/* Dog and Cat Medications Images (Flex Section) */}
        <div className="flex justify-center gap-8 mb-8">
          {/* Dog Medications */}
          <div className="flex flex-col items-center">
            <img
              src="./src/assets/MetavetImages/1599608032.2cb229e7aa342b83bc3a.jpg" // Replace with actual image
              alt="Dog Medications"
              className="w-64 h-64 object-cover mb-4"
            />
            <span className="text-gray-700">Dog Medications</span>
          </div>

          {/* Cat Medications */}
          <div className="flex flex-col items-center">
            <img
              src="./src/assets/MetavetImages/1599590662.62a1ed02ab4511f66a90.jpg" // Replace with actual image
              alt="Cat Medications"
              className="w-64 h-64 object-cover mb-4"
            />
            <span className="text-gray-700">Cat Medications</span>
          </div>
        </div>

        {/* Filters and Product Section */}
        <div className="grid  grid-cols-2 ">
          {/* Filters Section (Left side) */}
          <div className="w-2/4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Filters
            </h2>

            {/* Search by Phrase */}
            <div className="flex flex-col mb-6">
              <label className="text-gray-700 mb-2" htmlFor="search-phrase">
                Search by Phrase
              </label>
              <input
                id="search-phrase"
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Keyword or Phrase"
              />
            </div>

            {/* Price Filter */}
            <div className="flex flex-col mb-6">
              <label className="text-gray-700 mb-2">Price</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                  placeholder="from"
                />
                <span className="text-gray-700 mt-2">-</span>
                <input
                  type="number"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                  placeholder="to"
                />
              </div>
            </div>

            {/* Brand Filter (Checkboxes) */}
            <div className="flex flex-col mb-6">
              <label className="text-gray-700 mb-2">Brand</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    id="brand-cosequin"
                    className="checkbox size-5 mr-2"
                  />

                  <label
                    htmlFor="brand-cosequin"
                    className="text-gray-700 ml-2"
                  >
                    Cosequin®
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    id="brand-rimadyl"
                    className="checkbox size-5 mr-2"
                  />

                  <label htmlFor="brand-rimadyl" className="text-gray-700 ml-2">
                    Rimadyl®
                  </label>
                </div>
              </div>
            </div>

            {/* Category Filter (Checkboxes) */}
            <div className="flex flex-col mb-6">
              <label className="text-gray-700 mb-2">Category</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="category-cat" className="text-gray-700 ml-2">
                    Cat Medications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="category-dog" className="text-gray-700 ml-2">
                    Dog Medications
                  </label>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">Availability</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label className="text-gray-700" htmlFor="in-stock">
                  In stock
                </label>
              </div>
            </div>
          </div>

          {/* Products Section (Right side) */}
          {/* Products Section (Right side) */}
          <div className="w-full ">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Products
            </h2>
            <div className="flex gap-8">
              {/* Product 1 */}
              <div className="bg-white w-56 p-6 rounded-lg shadow-md">
                <img
                  src="./src/assets/MetavetImages/1604571435.5ec044a48f5ce466ce00.jpg" // Replace with actual image and increased width
                  alt="Cosequin® Sprinkle Capsules"
                  className="w-full h-48 object-cover mb-4" // Increased the height to make the image larger
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Cosequin® Sprinkle Capsules
                </h3>
                <p className="text-gray-500 mt-2">$25.98</p>
              </div>

              {/* Product 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="./src/assets/MetavetImages/1599590763.ba669f016b74ca5d3f37.jpg" // Replace with actual image and increased width
                  alt="Rimadyl® Chewables"
                  className="w-full h-48 object-cover mb-4" // Increased the height to make the image larger
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Rimadyl® Chewables
                </h3>
                <p className="text-gray-500 mt-2">$65.98</p>
              </div>

              {/* Product 3 */}
            </div>
          </div>
        </div>

        {/* Bottom Section with Icons */}
        <div className="flex justify-center items-center space-x-12 mb-8">
          {/* Search Box */}
          <Link to="/searchproduct">
            {" "}
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                className="w-8 h-8 text-gray-700 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="m22.241 24l-7.414-7.414a9.5 9.5 0 0 1-5.652 1.885h-.002l-.108.001A9.065 9.065 0 0 1 0 9.407l.001-.114v.006a9.298 9.298 0 0 1 18.596 0a9.8 9.8 0 0 1-1.904 5.682l.019-.027l7.414 7.414zM9.299 2.513a6.758 6.758 0 1 0 .029.001zH9.3z"
                ></path>
              </svg>
              <span className="text-gray-700">Search Products</span>
            </div>
          </Link>

          {/* My Account */}
          <Link to="/myaccount">
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                className="w-8 h-8 text-gray-700 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58z"
                ></path>
              </svg>
              <span className="text-gray-700">My Account</span>
            </div>
          </Link>

          {/* Track Order */}
          <Link to="/myaccount">
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                className="w-8 h-8 text-gray-700 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="1em"
                height="1em"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path d="M12 39a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm23 0a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z"></path>
                  <path
                    strokeLinecap="round"
                    d="M8 35H2V11h29v24H16m15 0V18h8.571L46 26.5V35h-6.189"
                  ></path>
                </g>
              </svg>
              <span className="text-gray-700">Track Order</span>
            </div>
          </Link>

          {/* Shopping Cart */}
          <Link to="/shoppingbag">
            <div className="flex flex-col items-center cursor-pointer">
              <svg
                className="w-8 h-8 text-gray-700 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2z"
                ></path>
              </svg>
              <span className="text-gray-700">Shopping Bag</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
