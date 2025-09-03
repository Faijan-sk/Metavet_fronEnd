import React from "react";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Online Store Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Online Store</h2>
      </div>

      {/* Search and Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Filters Sidebar */}
        <div className="col-span-1 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Search Products</h3>

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
                <label htmlFor="brand1">All Living Things®</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand2">Cosequin®</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultununChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3">Frontline Plus</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3"> Hills® Science Diet®</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3">KONG®</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3"> Milk-Bone</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3">Oxbow Essentials </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3"> Rimadyl®</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="brand3"> Whisker City®</label>
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="category2">Cat Products</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="category3">Dog Products</label>
              </div>
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Quantity</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="size1">3 Months</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="size2">6 Months</label>
              </div>
            </div>
          </div>

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
                <label htmlFor="size2">5 lb</label>
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
                <label htmlFor="size2">10 lb</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="size2">15.5 lb</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="size2">4 lbs</label>
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
                {/* <input type="checkbox" className="mr-2" id="size2" /> */}

                <input
                  type="checkbox"
                  defaultunChecked
                  className="checkbox size-5 mr-2"
                />
                <label htmlFor="size2">30 lbs</label>
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

        {/* Product Listings */}
        <div className="col-span-3">
          {/* Grid of Products */}
          <div className="grid grid-cols-3 gap-6">
            {/* Product 1 */}
            <Link to="/cosequin">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1604571435.5ec044a48f5ce466ce00.jpg"
                  alt="Cosequin® Sprinkle Capsules"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Cosequin® Sprinkle Capsules<span>$25.98</span>
                </span>
              </div>
            </Link>

            {/* Product 2 */}
            <Link to="/rimadyl">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1599590763.ba669f016b74ca5d3f37.jpg"
                  alt="Rimadyl® Chewables"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Rimadyl® Chewables<span>$65.98</span>
                </span>
              </div>
            </Link>

            {/* Product 3 */}
            <Link to="/smallpetglass">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400179616.0152d7157beff2ab3153.jpg"
                  alt="Small Pet Glass Water Bottle"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Small Pet Glass Water Bottle<span>$11.99</span>
                </span>
              </div>
            </Link>

            {/* Product 4 */}
            <Link to="/marketmedley">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400179326.a6403e63bda4747373cb.jpg"
                  alt="Oxbow Essentials Adult Rabbit"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Market Medley™ Peas & Carrots Small Pet Treats
                  <span>$3.49</span>
                </span>
              </div>
            </Link>

            {/* Product 5 */}
            <Link to="/oxbow">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400179006.7f65fa27d48e4bcad9cb.jpg"
                  alt="Feathers Teaser Cat Toy"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Oxbow Essentials Adult Rabbit Food<span>$10.99</span>
                </span>
              </div>
            </Link>

            {/* Product 6 */}
            <Link to="/feather">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400174603.82da2e4239bdbc603a72.jpg"
                  alt="Hill's® Science Diet® Sensitive"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Feathers Teaser Cat Toy<span>$3.99</span>
                </span>
              </div>
            </Link>
            {/* Product 7 */}
            <Link to="/hillsciencecat">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400172152.3046e47bcd2b667ab29b.jpg"
                  alt="Example Product 7"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Hill's® Science Diet® Sensitive Stomach & Skin Adult Cat Food
                  - Chicken & Rice<span>$41.99</span>
                </span>
              </div>
            </Link>

            {/* Product 8 */}
            <Link to="/kong">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400166436.8a7be3e433eda7b46c25.jpg"
                  alt="Example Product 8"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  KONG® Puppy Toy - Treat Dispensing (COLOR VARIES)
                  <span>$6.49</span>
                </span>
              </div>
            </Link>
            <Link to="/milkbone">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400154938.0483de78d5d72b0fcbfe.jpg"
                  alt="Example Product 8"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Milk-Bone Mini's Flavor Snacks Dog Treat<span>$11.99</span>
                </span>
              </div>
            </Link>
            <Link to="/hillsciencedog">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400154588.eb5ce5dc00c0f9b31b25.jpg"
                  alt="Example Product 8"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Hill's® Science Diet® Sensitive Stomach & Skin Adult Dog Food
                  - Chicken & Barley<span>$57.99</span>
                </span>
              </div>
            </Link>

            {/* Product 9 */}
            <Link to="/frontline">
              {" "}
              <div className="flex flex-col items-center">
                <img
                  src="./src/assets/MetavetImages/1400174347.4b8b77bd209eacb0ecab.jpg"
                  alt="Example Product 9"
                  className="w-full h-48 object-cover mb-4"
                />
                <span className="font-semibold text-center">
                  Frontline Plus Cat Flea & Tick Treatment <span>$34.99</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Icons */}
      <div className="flex justify-center items-center space-x-12 mb-8">
        {/* Search Box */}
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

        {/* My Account */}
        <Link to="/myaccount">
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
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58z"
              ></path>
            </svg>
            <span className="text-gray-700">My Account</span>
          </div>
        </Link>
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

export default SearchProduct;
