import React, { useState } from 'react'

const ContactUs = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    alert('Your message has been submitted!')
  }

  return (
    <div className="bg-gray-100  flex items-center justify-center mt-5 mb-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
        {/* Flex container for text and form */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Text */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Contact Us
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Email, call, or complete the form to learn how veterinary can
              solve your messaging problem.
            </p>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-2">
                Email:{' '}
                <a href="mailto:info@vet.io" className="text-blue-600">
                  info@vet.io
                </a>
              </p>
              <p className="text-gray-600 mb-2">
                Phone: <span className="text-blue-600">321-221-231</span>
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Customer Support
              </h3>
              <p className="text-gray-600 mb-2">
                Our support team is available around the clock to address any
                concerns or queries you may have.
              </p>
              <p className="text-gray-600 mb-2">
                We value your feedback and are continuously working to improve
                and shape the future.
              </p>
          </div>
          
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Media Inquiries
              </h3>
              <p className="text-gray-600 mb-2">
                For media inquiries, please email us at{' '}
                <a href="mailto:media@vet.com" className="text-blue-600">
                  media@vet.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-6">
              You can reach us anytime by filling out the form below.
            </p>

            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Your Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 555-5555"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* How Can We Help You? */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  How Can We Help You?*
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
