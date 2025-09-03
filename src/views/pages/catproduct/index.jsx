import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const CatProduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
        {/* Title and Breadcrumb */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Cat Products</h1>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              Store / Cat Products / Prescription Required
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="text-center mb-8">
          <img
            src="./src/assets/MetavetImages/1604547186.35386fb2771bad356b1b.jpg"
            alt="Cat Products"
            className="w-64 h-auto rounded-lg"
          />
        </div>

        {/* Content Section with Search on Left and Products on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Left Side - Filters/Search */}
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
                  <label htmlFor="brand1">Cosequin®</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="brand2">Frontline Plus</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="brand3">Hill's® Science Diet®</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="brand4">Whisker City®</label>
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
                  <label htmlFor="size1">3.5 lb</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size2">7 lb</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="size3">15.5 lb</label>
                </div>
              </div>
            </div>

            {/* Quantity Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Quantity</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="quantity1">3 Months</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultunChecked
                    className="checkbox size-5 mr-2"
                  />
                  <label htmlFor="quantity2">6 Months</label>
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
                  src="./src/assets/MetavetImages/1400174347.4b8b77bd209eacb0ecab.jpg"
                  alt="Frontline Plus"
                  className="w-64 h-64 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Frontline Plus Cat Flea & Tick Treatment
                  <p>$34.99</p>
                </span>
              </div>

              {/* Product 2 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-xs">
                <img
                  src="./src/assets/MetavetImages/1400172152.3046e47bcd2b667ab29b.jpg"
                  alt="Hill's® Science Diet®"
                  className="w-64 h-64 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Hill's® Science Diet® Sensitive Stomach & Skin Adult Cat Food
                  - Chicken & Rice
                  <p>$41.99</p>
                </span>
              </div>

              {/* Product 3 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-xs">
                <img
                  src="./src/assets/MetavetImages/1400174603.82da2e4239bdbc603a72.jpg"
                  alt="Feathers Teaser Cat Toy"
                  className="w-64 h-64 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Feathers Teaser Cat Toy
                  <p>$3.99</p>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Links */}
        <div className="flex justify-center items-center space-x-12 mb-8">
          {/* Search Box */}
          <Link to="/searchproduct">
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
              <span className="text-sm">Search Products</span>
            </div>
          </Link>

          {/* My Account */}
          <Link to="/account">
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
              <span className="text-sm">My Account</span>
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
              <span className="text-sm">Track Order</span>
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
              <span className="text-sm">Shopping Bag</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatProduct;
