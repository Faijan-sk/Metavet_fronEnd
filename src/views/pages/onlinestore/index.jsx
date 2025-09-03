import React from 'react'
import { Link } from 'react-router-dom'

const OnlineStore = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Prescription Required Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold ">Online Store</h2>
      </div>

      {/* Product Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Prescription Required */}
        <Link to="/prescription">
          {' '}
          <div className="text-center">
            <img
              src="./src/assets/MetavetImages/1599608013.bb38993b2d54e7224cea.jpg"
              alt="Prescription Required"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Prescription Required</h3>
          </div>
        </Link>

        {/* Cat Products */}
        <Link to="/catproduct">
          {' '}
          <div className="text-center">
            <img
              src="./src/assets/MetavetImages/1400142574.c25528fecb848cbfa561.jpg"
              alt="Cat Products"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Cat Products</h3>
          </div>
        </Link>

        {/* Dog Products */}
        <Link to="/dogproduct">
          {' '}
          <div className="text-center">
            <img
              src="./src/assets/MetavetImages/1409217298.b38c41d7e7e3dfd818ab.jpg"
              alt="Dog Products"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Dog Products</h3>
          </div>
        </Link>
      </div>

      {/* Featured Products Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
      </div>

      {/* Featured Products with Images */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product 1 */}
          <Link to="/frontline">
            {' '}
            <div className="text-center">
              <img
                src="./src/assets/MetavetImages/1400174347.4b8b77bd209eacb0ecab.jpg"
                alt="Product 1"
                className="w-full h-72 object-cover mb-4"
              />
              <h4 className="font-semibold">
                Frontline Plus Cat Flea & Tick Treatment
              </h4>
              <p className="text-lg text-gray-700">$34.99</p>
            </div>
          </Link>

          {/* Product 2 */}
          <Link to="/cosequin">
            {' '}
            <div className="text-center">
              <img
                src="./src/assets/MetavetImages/1604571435.5ec044a48f5ce466ce00.jpg"
                alt="Product 2"
                className="w-full h-72 object-cover mb-4"
              />
              <h4 className="font-semibold">Cosequin® Sprinkle Capsules</h4>
              <p className="text-lg text-gray-700">$25.98</p>
            </div>
          </Link>

          {/* Product 3 */}
          <Link to="/hillsciencecat">
            {' '}
            <div className="text-center">
              <img
                src="./src/assets/MetavetImages/1400172152.3046e47bcd2b667ab29b.jpg"
                alt="Product 3"
                className="w-full h-72 object-cover mb-4"
              />
              <h4 className="font-semibold">
                Hill's® Science Diet® Sensitive Stomach & Skin Adult Cat Food -
                Chicken & Rice
              </h4>
              <p className="text-lg text-gray-700">$41.99</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Search, Account, Track Order, Shopping Bag Section */}
      <div className="flex justify-center items-center space-x-12 mb-8">
        {/* Search Box */}
        <Link to="/searchproduct">
          {' '}
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
          {' '}
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
          {' '}
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
          {' '}
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
  )
}

export default OnlineStore
