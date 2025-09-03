import React, { useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link if you're using React Router

const Kong = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="pt-10">
      <div className="max-w-screen-lg mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Image and Description */}
          <div className="space-y-4">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="./src/assets/MetavetImages/1400166436.8a7be3e433eda7b46c25.jpg" // Replace with the actual image
                alt="KONG Puppy Toy"
                className="w-80 h-auto rounded-lg"
              />
            </div>

            {/* Product Details */}
            <h1 className="text-3xl font-bold text-gray-800">
              KONG® Puppy Toy
            </h1>
            <p className="text-gray-600">Brand: KONG®</p>

            <h3 className="text-xl font-semibold text-gray-800">
              Product Details
            </h3>
            <p className="text-gray-600">
              Please allow us to choose one for you. We cannot guarantee a
              specific color. The KONG Puppy toy is customized for a growing
              puppy's baby teeth. The unique, natural rubber formula is the most
              gentle within the KONG rubber toy line. Designed to meet the needs
              of a puppy's 28-baby teeth, it helps teach appropriate chewing
              behavior while offering enrichment and satisfying a younger pup's
              instinctual needs. Meanwhile, the erratic bounces make it ideal
              for those pups that just want to play. A stuffed Puppy KONG
              occupies busy little ones while allowing pet parents the freedom
              to attend to their unique needs. Want to make crate training
              easier or extend play time? Be sure to stuff with puppy kibble and
              a dash of peanut butter. Add to the fun by including KONG Puppy
              Snacks and top with KONG Puppy Easy Treat.
            </p>

            <h3 className="text-xl font-semibold text-gray-800">Features</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Teaches appropriate chewing behavior while offering mental
                enrichment
              </li>
              <li>
                Soft Puppy KONG rubber formula is customized for puppy teeth and
                gums
              </li>
              <li>Unpredictable bounce for games of fetch</li>
              <li>
                Great for stuffing with KONG Puppy Easy Treat, Snacks, or
                Ziggies
              </li>
              <li>Includes: 1 Toy</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800">
              Intended For
            </h3>
            <p className="text-gray-600">Teething Puppies</p>

            <h3 className="text-xl font-semibold text-gray-800">Activity</h3>
            <p className="text-gray-600">Chew</p>

            <h3 className="text-xl font-semibold text-gray-800">Color</h3>
            <p className="text-gray-600">Assorted</p>

            <h3 className="text-xl font-semibold text-gray-800">Material</h3>
            <p className="text-gray-600">Natural Rubber</p>

            <h3 className="text-xl font-semibold text-gray-800">Caution</h3>
            <p className="text-gray-600">
              Supervised use only. Remove all packaging. Discontinue use if
              damaged. Power chewers: Increase one or two sizes or try KONG
              Extreme.
            </p>

            <h3 className="text-xl font-semibold text-gray-800">
              Available Sizes and Dimensions:
            </h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>X-Small: 2.25 in L x 1.40 in W x 1.40 in H</li>
              <li>Small: 3 in L x 1.75 in W x 1.75 in H</li>
              <li>Medium: 3.40 in L x 2.20 in W x 2.20 in H</li>
              <li>Large: 4 in L x 2.75 in W x 2.75 in H</li>
            </ul>
          </div>

          {/* Right Section - Quantity and Add to Bag */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              KONG® Puppy Toy - Treat Dispensing (COLOR VARIES)
            </h2>
            <p className="text-gray-600">Store/Dog Products</p>

            {/* Quantity Input */}
            <div className="flex items-center space-x-4">
              <label className="text-lg font-semibold text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Add to Bag Button */}
            <div className="flex items-center space-x-4 mt-4">
              <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                Add to Bag
              </button>
            </div>

            {/* Product Price and Stock Info */}
            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-700">$6.49</p>
              <p className="text-gray-600">Size: X-Small</p>
              <p className="text-green-600">In Stock</p>
            </div>

            {/* Share Product */}
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-700">
                Share this product with your friends:
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-center items-center space-x-12 mb-8 pt-10">
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
  );
};

export default Kong;
