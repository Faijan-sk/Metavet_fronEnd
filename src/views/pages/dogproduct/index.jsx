import React from "react";
import { Link } from "react-router-dom";

const DogProduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
        {/* Title and Breadcrumb */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dog Products</h1>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              Store / Dog Products / Prescription Required
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="text-center mb-8">
          <img
            src="./src/assets/MetavetImages/1604511735.1269abd45a0aa242f9a3.jpg" // replace with actual image
            alt="Dog Products"
            className="w-64 h-auto rounded-lg"
          />
        </div>

        {/* Left Side - Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Search by Phrase */}
            <div className="mb-6">
              <label htmlFor="search" className="block mb-2">
                Search by Keyword or Phrase
              </label>
              <input
                type="text"
                id="search"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter keyword"
              />
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block mb-2">Price</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-lg"
                  placeholder="From"
                />
                <input
                  type="number"
                  className="w-1/2 p-2 border border-gray-300 rounded-lg"
                  placeholder="To"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Brand</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="brand1">KONG®</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="brand2">Milk-Bone</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="brand3">Rimadyl®</label>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Category</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="category1">Prescription Required</label>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Size</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size1">4 lbs</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size2">15.5 lbs</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size3">30 lbs</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size4">X-Small</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size5">Small</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size6">Medium</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size7">Large</label>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Availability</h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="inStock">In Stock</label>
              </div>
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="col-span-3">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Products
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {/* Product 1 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-xs">
                <img
                  src="./src/assets/MetavetImages/1599590763.ba669f016b74ca5d3f37.jpg"
                  alt="Rimadyl® Chewables"
                  className="w-64 h-64 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Rimadyl® Chewables
                  <p>$65.98</p>
                </span>
              </div>

              {/* Product 2 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-xs">
                <img
                  src="./src/assets/MetavetImages/1400154588.eb5ce5dc00c0f9b31b25.jpg"
                  alt="Hill's® Science Diet"
                  className="w-64 h-64 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Hill's® Science Diet® Sensitive Stomach & Skin Adult Dog Food
                  - Chicken & Barley
                  <p>$57.99</p>
                </span>
              </div>

              {/* Product 3 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-xs">
                <img
                  src="./src/assets/MetavetImages/1400154938.0483de78d5d72b0fcbfe.jpg"
                  alt="Milk-Bone Mini's Flavor Snacks"
                  className="w-64 h-64 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Milk-Bone Mini's Flavor Snacks Dog Treat
                  <p>$11.99</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Icons */}
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

          {/* Shopping Bag */}
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

export default DogProduct;
