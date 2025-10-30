import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle email submission
  };
  const [activeSection, setActiveSection] = useState(""); // Track active section
  const [address, setAddress] = useState(""); // State for Address
  const [permanentAddress, setPermanentAddress] = useState(""); // State for Permanent Address
  const [phone, setPhone] = useState(""); // State for Phone
  // const [email, setEmail] = useState(""); // State for Email
  const [password, setPassword] = useState(""); // State for Password
  const [orderId, setOrderId] = useState(""); // State for Order ID
  const [invoice, setInvoice] = useState(""); // State for Invoice
  const [total, setTotal] = useState(""); // State for Total
  const [price, setPrice] = useState(""); // State for Price
  const [currentPassword, setCurrentPassword] = useState(""); // State for Current Password
  const [newPassword, setNewPassword] = useState(""); // State for New Password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for Confirm Password

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="w-full flex flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8 bg-white p-8 rounded-lg shadow-lg flex">
        {/* Left Side Section */}
        <div className="w-1/2">
          {/* Online Store Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Online Store</h1>
          </div>

          {/* Account Section */}
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Account</h2>
            <p className="text-sm text-gray-500">Store / Account</p>
          </div>

          {/* Guest Account Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Guest Account</h3>
            <p className="text-sm text-gray-500">
              You are not signed in.{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Sign in
              </a>
            </p>
          </div>

          {/* Shopping Cart Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Shopping Cart</h3>
            <p className="text-sm text-gray-500">Your shopping cart is empty</p>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="w-1/2">
          {/* Join or Sign In Section */}
          {/* <div>
            <p className="text-sm text-gray-500">
              Join us or sign in to track your orders, checkout faster, and sync
              your favorites. Just enter your email, and we’ll send you a
              special link that will sign you in instantly.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              An account will be automatically created for you if you don’t have
              one yet.
            </p>
          </div> */}

          {/* Email Input Section */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Your Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              onChange={handleInputChange}
              placeholder="Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* one more */}
      <div className="w-full mt-5 space-y-8 bg-white p-8 rounded-lg shadow-lg flex">
        {/* Left Side Section */}
        <div className="w-96">
          {/* Profile Image & Name */}
          <div>
            <img
              className="w-20 h-20 rounded-full bg-slate-300"
              src="./src/assets/MetavetImages/dr3.png"
              alt="Profile"
            />
            <h3 className="text-2xl font-medium text-gray-700">Jasmine</h3>
          </div>

          {/* Section Links */}
          <div className="mt-6 space-y-4">
            <div
              className={`cursor-pointer p-2 rounded-md w-56 text-xl ${
                activeSection === "profile"
                  ? "bg-primary"
                  : "bg-white border-gray-300"
              } border`}
              onClick={() => handleSectionChange("profile")}
            >
              <label className="text-gray-700">Profile</label>
            </div>
            <div
              className={`cursor-pointer p-2 rounded-md w-56 text-xl ${
                activeSection === "address"
                  ? "bg-primary"
                  : "bg-white border-gray-300"
              } border`}
              onClick={() => handleSectionChange("address")}
            >
              <label className="text-gray-700">Address</label>
            </div>
            <div
              className={`cursor-pointer p-2 rounded-md w-56 text-xl ${
                activeSection === "order"
                  ? "bg-primary"
                  : "bg-white border-gray-300"
              } border`}
              onClick={() => handleSectionChange("order")}
            >
              <label className="text-gray-700">Orders</label>
            </div>
            <div
              className={`cursor-pointer p-2 rounded-md w-56 text-xl ${
                activeSection === "changePassword"
                  ? "bg-primary"
                  : "bg-white border-gray-300"
              } border`}
              onClick={() => handleSectionChange("changePassword")}
            >
              <label className="text-gray-700">Change Password</label>
            </div>
            <div
              className={`cursor-pointer p-2 rounded-md w-56 text-xl ${
                activeSection === "wishlist"
                  ? "bg-primary "
                  : "bg-white border-gray-300"
              } border`}
              onClick={() => handleSectionChange("wishlist")}
            >
              <label className="text-gray-700">Wishlist</label>
            </div>
            <div
              className={`cursor-pointer p-2 rounded-md w-56 text-xl ${
                activeSection === "logout"
                  ? "bg-primary "
                  : "bg-white border-gray-300"
              } border`}
              onClick={() => handleSectionChange("logout")}
            >
              <label className="text-gray-700">Logout</label>
            </div>
          </div>
        </div>
        {/* Right Side Section */}
        <div className="w-full">
          {activeSection === "profile" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Profile
              </h3>
              <form>
                {/* Profile Form Inputs */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Phone
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Email
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Password
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label> */}
                <button
                  type="submit"
                  className="w-full bg-primary  text-white py-2 px-4 rounded-md  mt-4"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* {activeSection === "address" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Address
              </h3>
              <form className="space-y-4">
                
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Address Line 1
                    </span>
                  </div>
                  <textarea
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Address Line 2
                    </span>
                  </div>
                  <textarea
                    type="text"
                    placeholder="Enter Permanent Address"
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Address: ${address}, Permanent Address: ${permanentAddress}`
                    )
                  }
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
                >
                  Save Address
                </button>
              </form>
            </div>
          )} */}

          {activeSection === "address" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Address
              </h3>
              <form className="space-y-4">
                {/* Address Line 1 Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Address Line 1
                    </span>
                  </div>
                  <textarea
                    type="text"
                    placeholder="Enter Address Line 1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* Address Line 2 Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Address Line 2
                    </span>
                  </div>
                  <textarea
                    type="text"
                    placeholder="Enter Address Line 2"
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* City Input */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-normal">City</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </label>

                {/* State Input */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      State
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </label>

                {/* Zip/Postal Code Input */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Zip/Postal Code
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Zip/Postal Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </label>

                {/* Country Input */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Country
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </label>

                {/* Save Address Button */}
                <button
                  type="button"
                  // onClick={() =>
                  //   alert(
                  //     `Address Line 1: ${address}, Address Line 2: ${permanentAddress}, City: ${city}, State: ${state}, Zip/Postal Code: ${zipCode}, Country: ${country}`
                  //   )
                  // }
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
                >
                  Save Address
                </button>
              </form>
            </div>
          )}

          {activeSection === "order" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order
              </h3>
              <form className="space-y-4">
                {/* Order ID Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Order ID
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* Invoice Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Invoice
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Invoice"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* Total Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Total
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* Price Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Price
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Order ID: ${orderId}, Invoice: ${invoice}, Total: ${total}, Price: ${price}`
                    )
                  }
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
                >
                  Submit Order
                </button>
              </form>
            </div>
          )}

          {activeSection === "changePassword" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Change Password
              </h3>
              <form className="space-y-4">
                {/* Current Password Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Current Password
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* New Password Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      New Password
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                {/* Confirm Password Input */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Confirm Password
                    </span>
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Current Password: ${currentPassword}, New Password: ${newPassword}, Confirm Password: ${confirmPassword}`
                    )
                  }
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}

          {activeSection === "wishlist" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Wishlist
              </h3>
              <form className="space-y-4">
                {/* Wishlist Item Input */}
                {/* <label className="form-control w-full max-w-xs"> */}

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-lg font-normal">
                      Wishlist Item
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Wishlist Item"
                    // className="input input-bordered w-full max-w-xs"
                    className=" w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </label>

                <button
                  type="button"
                  // onClick={() => alert("Wishlist item saved")}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
                >
                  Save Wishlist Item
                </button>
              </form>
            </div>
          )}

          {activeSection === "logout" && (
            <div className="text-gray-800 text-center mt-4 text-xl">
              <h3>You have logged out successfully.</h3>
            </div>
          )}
        </div>
      </div>{" "}
      {/* Bottom Section with Flex (Search, My Account, Track Order, Shopping Bag) */}
      <div className="flex justify-center items-center space-x-12 mb-8 mt-10">
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

        {/* Track Order */}
        <Link to="/myaccount">
          {" "}
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

export default MyAccount;
