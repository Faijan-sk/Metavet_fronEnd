import { Link } from 'react-router-dom'

const ShoppingBag = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
        {/* Online Store & Shopping Cart Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Online Store</h1>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Shopping Cart
            </h2>
            <p className="text-gray-500 text-sm">Store / Shopping Cart</p>
          </div>

          {/* Empty Cart Message */}
          <div className="mt-8">
            <p className="text-gray-500">Your shopping cart is empty</p>
            <p className="text-gray-500 mt-2">
              Browse Store to add products to your cart.
            </p>

            {/* Browse Store Button */}
            <div className="mt-4">
              <Link to="/store">
                <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                  Browse Store
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section with Flex (Search, My Account, Track Order, Shopping Bag) */}
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
  )
}

export default ShoppingBag
