import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import JwtService from "./../../../../@core/auth/jwt/jwtService";
import { useParams } from 'react-router-dom';
import useJwt from '../../../../enpoints/jwt/useJwt'

const DoctorProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const response = useSelector((state) => state.user.data);
  const [uid, setUid] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const { state } = useLocation();
  const [token, setToken] = useState();
  
  console.log('the state in the update doctor: ', state?.phone);
  
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const locationRef = useRef(null);
  const [locationQuery, setLocationQuery] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Autocomplete states
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const searchLocation = async (value) => {
    setLocationQuery(value);

    if (value.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
      );

      const data = await res.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error("Location search error:", error);
    }
  };

  const selectLocation = (item) => {
    setLocationQuery(item.display_name);
    setValue("hospitalClinicAddress", item.display_name);
    setValue("latitude", item.lat);
    setValue("longitude", item.lon);
    setLocationSuggestions([]);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding to get address from coordinates
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();

            setLocationQuery(data.display_name);
            setValue("hospitalClinicAddress", data.display_name);
            setValue("latitude", latitude.toString());
            setValue("longitude", longitude.toString());
            setIsGettingLocation(false);
          } catch (error) {
            console.error("Error getting address:", error);
            setIsGettingLocation(false);
            alert("Failed to get address from location");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsGettingLocation(false);
          alert("Unable to get your location. Please enable location access.");
        }
      );
    } else {
      setIsGettingLocation(false);
      alert("Geolocation is not supported by your browser");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experienceYears: "",
      hospitalClinicName: "",
      hospitalClinicAddress: "",
      pincode: "",
      address: "",
      country: "",
      city: "",
      state: "",
      bio: "",
      consultationFee: "",
      gender: "",
      dateOfBirth: "",
      licenseNumber: "",
      licenseIssueDate: "",
      licenseExpiryDate: "",
      qualification: "",
      specialization: "",
      previousWorkplace: "",
      joiningDate: "",
      employmentType: "",
      isActive: true,
      emergencyContactNumber: "",
      latitude: "",
      longitude: "",
    },
  });

  // ✅ Form Submit Handler
  const handleFormSubmit = async (data) => {
    console.log("Form data:", data);
    
   
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Transform form data into API payload matching backend DTO
      const payload = {
    
        experienceYears: parseInt(data.experienceYears, 10),
        hospitalClinicName: data.hospitalClinicName.trim(),
        hospitalClinicAddress: data.hospitalClinicAddress.trim(),
        pincode: data.pincode.trim(),
        address: data.address.trim(),
        country: data.country.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
        bio: data.bio.trim(),
        consultationFee: parseFloat(data.consultationFee),
        gender: data.gender.toUpperCase(),
        dateOfBirth: data.dateOfBirth,
        licenseNumber: data.licenseNumber.toUpperCase().trim(),
        licenseIssueDate: data.licenseIssueDate,
        licenseExpiryDate: data.licenseExpiryDate || null,
        qualification: data.qualification.trim(),
        specialization: data.specialization.trim(),
        previousWorkplace: data.previousWorkplace?.trim() || "",
        joiningDate: data.joiningDate,
        employmentType: data.employmentType.toUpperCase(),
        isActive: Boolean(data.isActive),
        emergencyContactNumber: data.emergencyContactNumber.trim(),
        latitude: data.latitude || "",
        longitude: data.longitude || "",
      };

      console.log("Payload being sent:", payload);

      // Call create doctor API
      const res = await useJwt.createDoctor(payload);
      
      console.log("✅ Doctor created successfully:", res.data);

// ✅ strict success check
    if (res?.data) {

        window.scrollTo({
        top: 0,
        behavior: "smooth",
      });



      navigate("/doctor-profile", { replace: true });
    }

    } catch (error) {
      console.error("❌ Doctor profile creation failed:", error);
      
      // Handle different error types
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Check for specific error messages
        if (errorData.message) {
          setErrorMsg(errorData.message);
        } else if (errorData.error) {
          setErrorMsg(errorData.error);
        } else {
          setErrorMsg("Failed to create doctor profile. Please check all fields.");
        }
        
        console.error("Error details:", errorData);
      } else if (error.message) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Common Input Class
  const inputClass = (err) =>
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base
    ${
      err
        ? "border-red-400 focus:border-red-500"
        : "border-gray-200 focus:border-primary hover:border-gray-300"
    }
    focus:outline-none bg-gray-50 focus:bg-white transition-all duration-200`;

  // ✅ Error Component with Icon
  const ErrorMsg = ({ message }) =>
    message ? (
      <p className="text-red-500 text-sm flex items-center mt-1">
        <svg
          className="w-4 h-4 mr-1 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {message}
      </p>
    ) : null;

  

  return (
    <div className="my-20 bg-white shadow-lg border border-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 xl:px-16 2xl:px-40 max-w-full mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Doctor Profile Registration
        </h2>
        <p className="text-gray-600 text-sm">
          Complete your professional details to create your profile
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Experience (Years) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("experienceYears", {
              required: "Experience is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numeric values are allowed",
              },
              min: {
                value: 0,
                message: "Experience cannot be negative"
              },
              max: {
                value: 50,
                message: "Experience cannot exceed 50 years"
              }
            })}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== "Backspace" &&
                e.key !== "Tab" &&
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight" &&
                e.key !== "Delete"
              ) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className={inputClass(errors.experienceYears)}
            placeholder="Enter total years of experience"
          />
          <ErrorMsg message={errors.experienceYears?.message} />
        </div>

        {/* Hospital + Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Hospital/Clinic Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("hospitalClinicName", {
                required: "Hospital/Clinic name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required"
                },
                maxLength: {
                  value: 150,
                  message: "Maximum 150 characters allowed"
                },
                pattern: {
                  value: /^[A-Za-z0-9.,\s]+$/,
                  message: "Only letters, numbers, spaces, dots, and commas are allowed",
                },
              })}
              onKeyDown={(e) => {
                if (
                  !/[a-zA-Z0-9.,\s]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z0-9.,\s]/g, "");
              }}
              className={inputClass(errors.hospitalClinicName)}
              placeholder="Enter hospital/clinic name"
            />
            <ErrorMsg message={errors.hospitalClinicName?.message} />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Pincode must be exactly 6 digits",
                },
              })}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              className={inputClass(errors.pincode)}
              placeholder="411045"
              maxLength={6}
            />
            <ErrorMsg message={errors.pincode?.message} />
          </div>
        </div>

        {/* Hospital Location with Map Search */}
        <div ref={locationRef} className="relative">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Hospital/Clinic Location <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={locationQuery}
            {...register("hospitalClinicAddress", {
              required: "Hospital location is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters required"
              },
              maxLength: {
                value: 300,
                message: "Maximum 300 characters allowed"
              }
            })}
            onChange={(e) => searchLocation(e.target.value)}
            onFocus={() => setLocationSuggestions([{ place_id: 'current', display_name: 'Use Current Location', isCurrentLocation: true }])}
            className={inputClass(errors.hospitalClinicAddress)}
            placeholder="Type location or use current location"
            disabled={isGettingLocation}
          />
          <ErrorMsg message={errors.hospitalClinicAddress?.message} />

          {/* Suggestions Dropdown */}
          {locationSuggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto mt-1">
              {locationSuggestions.map((item) => (
                <li
                  key={item.place_id}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b last:border-b-0 ${
                    item.isCurrentLocation ? 'bg-blue-50 font-medium text-blue-600 flex items-center gap-2' : ''
                  }`}
                  onClick={() => {
                    if (item.isCurrentLocation) {
                      getCurrentLocation();
                    } else {
                      selectLocation(item);
                    }
                  }}
                >
                  {item.isCurrentLocation && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hidden fields for latitude and longitude */}
        <input type="hidden" {...register("latitude")} />
        <input type="hidden" {...register("longitude")} />

        {/* Residential Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters required"
              },
              maxLength: {
                value: 200,
                message: "Maximum 200 characters allowed"
              },
              pattern: {
                value: /^[A-Za-z0-9.,\s]+$/,
                message: "Only letters, numbers, spaces, commas, and dots are allowed",
              },
            })}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
              ];

              if (
                !/[a-zA-Z0-9.,\s]/.test(e.key) &&
                !allowedKeys.includes(e.key)
              ) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^A-Za-z0-9.,\s]/g, "");
            }}
            className={inputClass(errors.address)}
            placeholder="Enter home address"
          />
          <ErrorMsg message={errors.address?.message} />
        </div>

        {/* Country, State, City */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("country", {
                required: "Country is required",
                maxLength: {
                  value: 50,
                  message: "Maximum 50 characters allowed"
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters and spaces are allowed",
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/[a-zA-Z\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
              className={inputClass(errors.country)}
              placeholder="India"
            />
            <ErrorMsg message={errors.country?.message} />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("state", {
                required: "State is required",
                pattern: {
                  value: /^[A-Za-z\s]{2,50}$/,
                  message: "State must be 2-50 characters, letters only",
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/[a-zA-Z\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
              className={inputClass(errors.state)}
              placeholder="Maharashtra"
            />
            <ErrorMsg message={errors.state?.message} />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("city", {
                required: "City is required",
                pattern: {
                  value: /^[A-Za-z\s]{2,50}$/,
                  message: "City must be 2-50 characters, letters only",
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/[a-zA-Z\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
              className={inputClass(errors.city)}
              placeholder="Nagpur"
            />
            <ErrorMsg message={errors.city?.message} />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Professional Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("bio", {
              required: "Bio is required",
              maxLength: {
                value: 500,
                message: "Bio cannot exceed 500 characters"
              },
              pattern: {
                value: /^[A-Za-z0-9,.\s]+$/,
                message: "Only letters, numbers, spaces, commas, and periods are allowed",
              },
            })}
            onKeyDown={(e) => {
              const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

              if (e.key === "Enter") {
                e.preventDefault();
                return;
              }

              if (!/[a-zA-Z0-9,.\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^A-Za-z0-9,.\s]/g, "");
            }}
            rows="4"
            className={inputClass(errors.bio)}
            placeholder="Write a brief professional bio about yourself..."
          />
          <ErrorMsg message={errors.bio?.message} />
        </div>

        {/* Consultation Fee */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Consultation Fee (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("consultationFee", {
              required: "Consultation fee is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
              min: {
                value: 0,
                message: "Fee cannot be negative"
              },
              max: {
                value: 50000,
                message: "Fee cannot exceed 50000"
              }
            })}
            onKeyDown={(e) => {
              const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

              if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className={inputClass(errors.consultationFee)}
            placeholder="2000"
          />
          <ErrorMsg message={errors.consultationFee?.message} />
        </div>

        {/* Gender + DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={inputClass(errors.gender)}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <ErrorMsg message={errors.gender?.message} />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: "Date of birth is required" })}
              className={inputClass(errors.dateOfBirth)}
              max={new Date().toISOString().split('T')[0]}
            />
            <ErrorMsg message={errors.dateOfBirth?.message} />
          </div>
        </div>

        {/* License Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              License Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("licenseNumber", {
                required: "License number is required",
                pattern: {
                  value: /^[A-Z0-9]{6,20}$/,
                  message: "License must be 6-20 alphanumeric characters"
                },
                setValueAs: (v) => (v ? v.toUpperCase() : ""),
              })}
              style={{ textTransform: "uppercase" }}
              className={inputClass(errors.licenseNumber)}
              placeholder="ABC123456"
              maxLength={20}
            />
            <ErrorMsg message={errors.licenseNumber?.message} />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Issue Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("licenseIssueDate", {
                required: "License issue date is required",
              })}
              className={inputClass(errors.licenseIssueDate)}
              max={new Date().toISOString().split('T')[0]}
            />
            <ErrorMsg message={errors.licenseIssueDate?.message} />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("licenseExpiryDate")}
              className={inputClass(errors.licenseExpiryDate)}
              min={new Date().toISOString().split('T')[0]}
            />
            <ErrorMsg message={errors.licenseExpiryDate?.message} />
          </div>
        </div>

        {/* Qualification + Specialization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Qualification <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("qualification", {
                required: "Qualification is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required"
                },
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters allowed"
                },
                pattern: {
                  value: /^[A-Za-z,.\s]+$/,
                  message: "Only letters, spaces, commas, and periods are allowed",
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/[a-zA-Z,.\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z,.\s]/g, "");
              }}
              className={inputClass(errors.qualification)}
              placeholder="MBBS, MD"
            />
            <ErrorMsg message={errors.qualification?.message} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Specialization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("specialization", {
                required: "Specialization is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required"
                },
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters allowed"
                },
                pattern: {
                  value: /^[A-Za-z,.\s]+$/,
                  message: "Only letters, spaces, commas, and periods are allowed",
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/[a-zA-Z,.\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z,.\s]/g, "");
              }}
              className={inputClass(errors.specialization)}
              placeholder="Cardiology"
            />
            <ErrorMsg message={errors.specialization?.message} />
          </div>
        </div>

        {/* Previous Workplace + Joining Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Previous Workplace
            </label>
            <input
              type="text"
              {...register("previousWorkplace", {
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters allowed"
                },
                pattern: {
                  value: /^[A-Za-z0-9,.\s]*$/,
                  message: "Only letters, numbers, spaces, commas, and periods are allowed",
                },
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/[a-zA-Z0-9,.\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z0-9,.\s]/g, "");
              }}
              className={inputClass(errors.previousWorkplace)}
              placeholder="Fortis Hospital (Optional)"
            />
            <ErrorMsg message={errors.previousWorkplace?.message} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("joiningDate", {
                required: "Joining date is required",
              })}
              className={inputClass(errors.joiningDate)}
              max={new Date().toISOString().split('T')[0]}
            />
            <ErrorMsg message={errors.joiningDate?.message} />
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("employmentType", {
              required: "Employment type is required",
            })}
            className={inputClass(errors.employmentType)}
          >
            <option value="">Select Employment Type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONSULTANT">Consultant</option>
          </select>
          <ErrorMsg message={errors.employmentType?.message} />
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Emergency Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("emergencyContactNumber", {
              required: "Emergency contact is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Emergency contact must be exactly 10 digits",
              },
            })}
            onKeyDown={(e) => {
              const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
              if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className={inputClass(errors.emergencyContactNumber)}
            placeholder="9988776655"
            maxLength={10}
          />
          <ErrorMsg message={errors.emergencyContactNumber?.message} />
        </div>

        {/* isActive Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            defaultChecked={true}
          />
          <label className="text-sm font-semibold text-gray-800">
            Currently Active (Available for appointments)
          </label>
        </div>

        {/* Server Error Message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errorMsg}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base flex items-center justify-center ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Profile...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfileForm;