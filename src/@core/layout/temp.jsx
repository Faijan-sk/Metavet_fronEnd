import { useEffect, useState, memo, useCallback, useMemo } from 'react'
import { Link, NavLink } from 'react-router-dom'

//import images 
import Logo from "./../../assets/MetavetImages/logo/navLogo.png"

// Get user info - component ke bahar
const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo)
    return userInfo ? JSON.parse(userInfo) : null;

  } catch (error) {
    console.error('Error parsing userInfo:', error);
    return null;
  }
};

// Memoized Dropdown Component
const DropdownMenu = memo(({ items }) => (
  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
    {items.map(({ label, path }, index) => (
      <Link
        key={index}
        to={path}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
      >
        {label}
      </Link>
    ))}
  </div>
))

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const userInfo = getUserInfo();
  const serviceType = userInfo?.ServiceType;
  console.log("USER SERVICE TYPE FROM NAVABR " ,  serviceType)


  // Memoized navigation items
  const baseNavItems = useMemo(() => {
    const shouldShowPets = !userInfo || userInfo?.userType === 1;
    const serviceProvider = userInfo?.userType === 3;
    console.log(serviceProvider, 'serviceProvider check')
    
    return [
      ...(shouldShowPets  ? [{ name: 'Find a Doctor', path: '/finddoctor', active: true }] : []),
      // Appointment button - show only when user is NOT service provider (userType !== 3)
      ...(!serviceProvider ? [{ name: 'Appointment', path: '/appointment', active: true }] : []),
      // Appointments button - show only when user IS service provider (userType === 3)
      ...(serviceProvider ? [{ name: 'Appointments', path: '/service-appointment', active: true }] : []),
      // {
      //   name: 'KYC',
      //   hasDropdown: true, 
      //   dropdownItems: [
      //     { label: 'KYC Metavet to Pet Groomer', path: '/groomer-kyc' },
      //     { label: 'KYC Metavet to Pet Walker', path: '/walker-kyc' },
      //     { label: 'KYC Metavet to Behaviourist', path: '/behaviourist-kyc' },
      //     { label: 'KYC Walker to Client', path: '/walkerTo-client-Kyc' },
      //     { label: 'KYC Groomer to Client', path: '/groomerTo-client-kyc' },
      //     { label: 'KYC Behaviourist to Client', path: '/behaviouristTo-client-kyc' },
      //   ],
      // },
      ...(shouldShowPets ? [{ name: 'Pets', path: '/about-pet', active: true }] : []),
    

  
    
      
     shouldShowPets && {
  name: 'Pet Services',
  hasDropdown: true,
 dropdownItems: [

    { label: 'Pet Behaviourist', path: '/service-provider/petBehaviourist' },
    { label: 'Pet Walker', path: '/service-provider/petWalker' },    { label: 'Pet Grooming', path: '/service-provider/petGroomer' },
  ],
}




    ]
    
  }, [userInfo])

  const navItems2 = useMemo(() => [
    ...(isMobile ? baseNavItems : []),
    {
      name: 'Patient Center',
      hasDropdown: true,
      dropdownItems: [
        { label: 'What to Expect', path: '/what-to-expect' },
        // { label: 'Behavioural Concern ', path: '/behavioural-concern' },
        { label: 'Payment Options', path: '/payment-options' },
      ],
    },
    {
      name: 'About Us',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Team', path: '/our-team' },
        { label: 'Meet the Team', path: '/meet-the-team' },
        { label: 'About Us', path: '/about-us' },
      ],
    },
    {
      name: 'Resources',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Teleconsultation', path: '/teleconsultation' },
        { label: 'Treatment Plans/Rx', path: '/treatment-plans-rx' },
        { label: 'Blood Work', path: '/blood-work' },
        { label: 'Grooming', path: '/grooming' },
        { label: 'Kennels/Boarding', path: '/kennels-boarding' },
        { label: 'Training', path: '/dog-training' },
        { label: 'Dental', path: '/dental' },
        { label: 'Vaccines', path: '/vaccines' },
        { label: 'Parasite Prevention', path: '/parasite-prevention' },
        { label: 'Spaying or Neutering Your Pet', path: '/spaying-neutering' },
        { label: 'Nutrition', path: '/nutrition' },
        { label: 'Behaviour', path: '/behaviour' },
        { label: 'Blogs', path: '/blogs' },
        { label: 'Pet Health', path: '/pet-health' },
        { label: 'Choosing Your Pet', path: '/choosing-pet' },
        { label: 'Living With Your Pet', path: '/livingpet' },
        { label: 'Video Newsroom', path: '/videonewsroom' },
        { label: "Today's Veterinarian", path: '/todayveterinarian' },
        { label: 'Newsletter Archive', path: '/newsletter' },
        { label: 'Surgery', path: '/surgery' },
        { label: 'Radiology', path: '/radiology' },
        { label: 'FAQ', path: '/faq' },
      ],
    },
    { name: 'Contact Us', path: '/contactus' },
  ], [isMobile, baseNavItems])

  // Combined effect for screen size and click outside
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 991)
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  // Body overflow effect
  useEffect(() => {
    document.body.style.overflow = isMenuOpen && isMobile ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, isMobile])

  // Memoized callbacks
  const handleDropdownHover = useCallback((index) => {
    if (!isMobile) setHoveredItem(index)
  }, [isMobile])

  const handleDropdownLeave = useCallback(() => {
    if (!isMobile) setHoveredItem(null)
  }, [isMobile])

  const toggleMobileDropdown = useCallback((index) => {
    setOpenMobileDropdown(prev => prev === index ? null : index)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setOpenMobileDropdown(null)
  }, [])

  // Logout handler - clears entire localStorage and redirects to signin
  const handleLogout = useCallback((e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    try {
      // Clear everything from localStorage (accessToken, refreshToken, userInfo, etc.)
      localStorage.clear();
      // Also remove axios default Authorization header if set globally
      try {
        // eslint-disable-next-line no-undef
        if (typeof window !== 'undefined' && window.axios?.defaults?.headers) {
          delete window.axios.defaults.headers.common['Authorization'];
        }
      } catch (err) {
        // ignore - only best-effort cleanup
      }
    } catch (err) {
      console.error("Error clearing localStorage during logout:", err);
    }

    setIsMenuOpen(false);
    setOpenMobileDropdown(null);

    // Full reload to Signin page so app state resets
    window.location.href = "/Signin";
  }, []);

  return (
    <header className="sticky top-0 shadow-md py-2 sm:py-4 px-4 sm:px-6 lg:px-10 font-sans min-h-[60px] sm:min-h-[70px] tracking-wide relative z-50 bg-primary">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="logo"
              loading="lazy"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="ml-2 text-white font-bold text-lg sm:text-xl hidden sm:block">
              Metavet
            </span>
          </Link>
        </div>

        <nav
          className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-1`}
        >
          {baseNavItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => handleDropdownHover(index)}
              onMouseLeave={handleDropdownLeave}
            >
              <NavLink
                to={item.path || '#'}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'text-white bg-white bg-opacity-20'
                      : 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
                  }`
                }
              >
                {item.name}
                {item.hasDropdown && (
                  <svg
                    className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </NavLink>

              {item.hasDropdown && hoveredItem === index && (
                <DropdownMenu items={item.dropdownItems} />
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          {userInfo ? (
            <Link
              to="/Signin"
              onClick={handleLogout}
              className={`${
                isMobile ? 'hidden' : 'flex'
              } items-center px-3 py-2 text-sm font-medium text-white border border-white border-opacity-50 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Log Out
            </Link>
          ) : (
            <Link
              to="/Signin"
              className={`${
                isMobile ? 'hidden' : 'flex'
              } items-center px-3 py-2 text-sm font-medium text-white border border-white border-opacity-50 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Login / SignUp
            </Link>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle block p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <nav className="p-4 space-y-2">
            {navItems2.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-b-0"
              >
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(index)}
                      className="flex items-center justify-between w-full px-3 py-3 text-left text-gray-700 font-medium hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileDropdown === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openMobileDropdown === index
                          ? 'max-h-screen opacity-100 pb-2'
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="pl-4 space-y-1">
                        {item.dropdownItems.map(({ label, path }, i) => (
                          <Link
                            key={i}
                            to={path}
                            onClick={closeMenu}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-3 py-3 font-medium rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            {userInfo ? (
              <Link
                to="/Signin"
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                LogOut
              </Link>
            ) : (
              <Link
                to="/SignUp"
                onClick={closeMenu}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                Sign Up / Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header