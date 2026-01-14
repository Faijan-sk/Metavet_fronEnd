import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"; // Add this importimport JwtService from "./../../../../@core/auth/jwt/jwtService";
import { useParams } from 'react-router-dom';
import useJwt from '../../../../enpoints/jwt/useJwt'


const DoctorProfileForm = ({ onSubmit }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const response = useSelector((state) => state.user.data);
const [uid , setUid] =useState()
const [phoneNumber , setPhoneNumber] = useState();
 const {state}=useLocation();
 const[token, setToken] = useState()
console.log('the state in the update doctor : ' ,state?.phone)
const [locationSuggestions, setLocationSuggestions] = useState([]);
const locationRef = useRef(null);
  const [locationQuery, setLocationQuery] = useState("");



  // Google Autocomplete states
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
//   const {
//   register,
//   handleSubmit,
//   formState: { errors },
// } = useForm({
//   defaultValues: {
//     experienceYears: "12",
//   hospitalClinicName: "Sunrise Medical Center",
//   hospitalClinicAddress: "742 Evergreen Terrace, Apt 3B",
//   pincode: "998855",
//   address: "Suite 21B, Springfield Plaza",
//   country: "United States",
//   city: "Springfield",
//   state: "Illinois",
//   bio: "Dr. John Carter is a board-certified cardiologist with over a decade of experience in managing complex heart conditions and providing compassionate patient care.",
//   consultationFee: "200",
//   gender: "MALE",
//   dateOfBirth: "1978-06-14",
//   licenseNumber: "ILCARD78945",
//   licenseIssueDate: "2010-04-15",
//   licenseExpiryDate: "2030-04-14",
//   qualification: "MBBS, MD (Cardiology)",
//   specialization: "Cardiologist",
//   previousWorkplace: "Mercy General Hospital",
//   joiningDate: "2022-09-01",
//   employmentType: "Full-time",
//   isActive: true,
//   emergencyContactNumber: "3125558976",
//   },
// })

const searchLocation = async (value) => {
  setLocationQuery(value);

  if (value.length < 3) {
    setLocationSuggestions([]);
    return;
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
  );

  const data = await res.json();
  setLocationSuggestions(data);
};

const {
  register,
  handleSubmit,
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
    isActive: false,
    emergencyContactNumber: "",
  },
});

  

  // ✅ Form Submit

  
  const handleFormSubmit = async (data) => {
    console.log(data)
    try {
      // Transform form data into API payload
      const payload = {
        userId: uid,
        experienceYears: Number(data?.experienceYears),
        hospitalClinicName: data?.hospitalClinicName,
        hospitalClinicAddress: data?.hospitalClinicAddress,
        pincode: data?.pincode,
        address: data?.address,
        country: data?.country,
        city: data?.city,
        state: data?.state,
        bio: data?.bio,
        consultationFee: Number(data?.consultationFee),
        gender: data?.gender.toUpperCase(), // ensure API expects MALE/FEMALE/OTHER
        dateOfBirth: data?.dateOfBirth,
        licenseNumber: data?.licenseNumber,
        licenseIssueDate: data?.licenseIssueDate,
        licenseExpiryDate: data?.licenseExpiryDate,
        qualification: data?.qualification,
        specialization: data?.specialization,
        previousWorkplace: data?.previousWorkplace,
        joiningDate: data?.joiningDate,
        employmentType: data?.employmentType.toUpperCase(),
        isActive: Boolean(data?.isActive),
        emergencyContactNumber: data?.emergencyContactNumber,
      };

      const res = await useJwt.createDoctor(payload);

      const loginPyaload = {
        // phone_number: phoneNumber? phoneNumber : '1234567490' ,
                phone_number: res.data.data.user.phoneNumber ,

 };
    

console.log('Login Payload' , loginPyaload)
       let loginRes = await useJwt.login(loginPyaload);
       const {data:loginData}=loginRes

      
      

      
     navigate(`/otp-verification/${loginData?.token}`, {
  state: {
    otp: loginData?.otp, // dynamic OTP
    phone: `${loginData?.phone_number}`, // dynamic mobile
  },
  replace:true
});

          // navigate(, {
          //   state: {
          //     otp: state?.otp, // Use dynamic OTP from response
          //     phone: phoneNumber // Use dynamic mobile from response
          //   }
          // })
       
    } catch (error) {
      console.error(
        "❌ Profile update failed:",
        error.response?.data || error.message
      );
      setErrorMsg(error.response?.data?.message || "Profile update failed");
    }
                console.log('this is token we are sendinto the otp page' ,token)

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

   useEffect(() => {
    
    const fetchUser = async () => {
      try {
        if (state?.phone) {
          const res = await useJwt.getUserByMobile(state.phone);
          console.log("✅ User fetched by mobile:", res.data?.uid);

          setUid(res.data?.uid); // store UID if needed
          setPhoneNumber(res.data?.phone)
          
        }
      } catch (err) {
        console.error("❌ Failed to fetch user:", err.response?.data || err.message);
        setErrorMsg(err.response?.data?.message || "User not found");
      }
    };

    fetchUser();
  }, []);




  return (
    <div className="my-20 bg-white shadow-lg border border-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 xl:px-16 2xl:px-40 max-w-full mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Doctor Profile
        </h2>
        <p className="text-gray-600 text-sm">
          Complete your professional details
        </p>
        {/* <p>{response?.data?.firstName}</p>
        <p>{response?.data?.userType}</p> */}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* Experience */}
        <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Experience (Years)
  </label>
  <input
    type="text"
    {...register("experienceYears", {
      required: "Experience is required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Only numeric values are allowed",
      },
    })}
    onKeyDown={(e) => {
      // Allow only digits and control/navigation keys
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
      // Remove non-numeric characters from pasted input
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }}
    className={inputClass(errors.experienceYears)}
    placeholder="Enter total years"
  />
  <ErrorMsg message={errors.experienceYears?.message} />
</div>


        {/* Hospital + Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      Hospital/Clinic Name
    </label>
    <input
      type="text"
      {...register("hospitalClinicName", {
        required: "Hospital/Clinic name is required",
        pattern: {
          value: /^[A-Za-z0-9.,\s]+$/,
          message:
            "Only letters, numbers, spaces, dots, and commas are allowed",
        },
      })}
      onKeyDown={(e) => {
        // Allow only letters, numbers, space, dot, comma, and editing keys
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
        // Remove any invalid characters (e.g., pasted text)
        e.target.value = e.target.value.replace(/[^A-Za-z0-9.,\s]/g, "");
      }}
      className={inputClass(errors.hospitalClinicName)}
      placeholder="Hospital Name"
    />
    <ErrorMsg message={errors.hospitalClinicName?.message} />
  </div>
          <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      Pincode
    </label>
    <input
      type="text"
      {...register("pincode", {
        required: "Pincode is required",
        pattern: {
          value: /^[0-9]+$/,
          message: "Only numbers are allowed",
        },
      })}
      onKeyDown={(e) => {
        // Allow only digits and editing keys
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
        // Remove non-numeric pasted content
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }}
      className={inputClass(errors.pincode)}
      placeholder="411045"
      maxLength={6} // Optional: limit to 6 digits for Indian pincodes
    />
    <ErrorMsg message={errors.pincode?.message} />
  </div>
        </div>

        {/* Hospital Address */}
        <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Hospital/Clinic Address
  </label>
  <input
    type="text"
    {...register("hospitalClinicAddress", {
      required: "Address is required",
      pattern: {
        value: /^[A-Za-z0-9.,\s]+$/,
        message: "Only letters, numbers, spaces, commas, and dots are allowed",
      },
    })}
    onKeyDown={(e) => {
      // Allow: letters, numbers, space, comma, dot, and essential control keys
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ];

      if (
        !/[a-zA-Z0-9.,\s]/.test(e.key) && // not a valid input char
        !allowedKeys.includes(e.key) // not a control key
      ) {
        e.preventDefault(); // block typing
      }
    }}
    onInput={(e) => {
      // Clean pasted content: remove any disallowed characters
      e.target.value = e.target.value.replace(/[^A-Za-z0-9.,\s]/g, "");
    }}
    className={inputClass(errors.hospitalClinicAddress)}
    placeholder="Full Address"
  />
  <ErrorMsg message={errors.hospitalClinicAddress?.message} />
</div>





<div ref={locationRef} className="relative">
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Enter Hospital Location (Search City / Area)
  </label>

  <input
    type="text"
    value={locationQuery}
    onChange={(e) => searchLocation(e.target.value)}
    className={inputClass(errors.hospitalClinicAddress)}
    placeholder="Type location "
  />

  {/* Suggestions */}
  {locationSuggestions.length > 0 && (
    <ul className="absolute z-50 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">
      {locationSuggestions.map((item) => (
        <li
          key={item.place_id}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
          onClick={() => selectLocation(item)}
        >
          {item.display_name}
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Hidden fields for latitude and longitude */}
        <input type="hidden" {...register("latitude")} />
        <input type="hidden" {...register("longitude")} />














        {/* Home Address */}
       <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Residential Address
  </label>
  <input
    type="text"
    {...register("address", {
      required: "Address is required",
      pattern: {
        value: /^[A-Za-z0-9.,\s]+$/,
        message: "Only letters, numbers, spaces, commas, and dots are allowed",
      },
    })}
    onKeyDown={(e) => {
      // Allow only letters, numbers, spaces, comma, dot, and navigation keys
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ];

      if (
        !/[a-zA-Z0-9.,\s]/.test(e.key) && // not valid character
        !allowedKeys.includes(e.key) // not control key
      ) {
        e.preventDefault(); // block invalid typing
      }
    }}
    onInput={(e) => {
      // Clean pasted text or autofill input
      e.target.value = e.target.value.replace(/[^A-Za-z0-9.,\s]/g, "");
    }}
    className={inputClass(errors.address)}
    placeholder="Home Address"
  />
  <ErrorMsg message={errors.address?.message} />
</div>



        {/* Country, State, City */}
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {/* Country */}
  <input
    type="text"
    {...register("country", {
      required: "Country is required",
      pattern: {
        value: /^[A-Za-z0-9\s]+$/,
        message: "Only letters, numbers, and spaces are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
      if (!/[a-zA-Z0-9\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");
    }}
    className={inputClass(errors.country)}
    placeholder="Country"
  />
  <ErrorMsg message={errors.country?.message} />

  {/* State */}
  <input
    type="text"
    {...register("state", {
      required: "State is required",
      pattern: {
        value: /^[A-Za-z0-9\s]+$/,
        message: "Only letters, numbers, and spaces are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
      if (!/[a-zA-Z0-9\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");
    }}
    className={inputClass(errors.state)}
    placeholder="State"
  />
  <ErrorMsg message={errors.state?.message} />

  {/* City */}
  <input
    type="text"
    {...register("city", {
      required: "City is required",
      pattern: {
        value: /^[A-Za-z0-9\s]+$/,
        message: "Only letters, numbers, and spaces are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
      if (!/[a-zA-Z0-9\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");
    }}
    className={inputClass(errors.city)}
    placeholder="City"
  />
  <ErrorMsg message={errors.city?.message} />
</div>


        {/* Bio */}
        <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Short Bio
  </label>
  <textarea
    {...register("bio", {
      required: "Bio is required",
      pattern: {
        value: /^[A-Za-z0-9,\s]+$/,
        message: "Only letters, numbers, spaces, and commas are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

      // Block Enter key (no multiline)
      if (e.key === "Enter") {
        e.preventDefault();
        return;
      }

      // Allow letters, numbers, spaces, commas, and essential keys only
      if (!/[a-zA-Z0-9,\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      // Clean any invalid pasted characters
      e.target.value = e.target.value.replace(/[^A-Za-z0-9,\s]/g, "");
    }}
    className={inputClass(errors.bio)}
    placeholder="Write about yourself..."
  />
  <ErrorMsg message={errors.bio?.message} />
</div>


        {/* Consultation Fee */}
        <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Consultation Fee ($)
  </label>

  <input
    type="text"
    {...register("consultationFee", {
      required: "Fee is required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Only numbers are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

      // Allow only digits and essential control keys
      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      // Clean up any invalid characters from pasted input
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
              Gender
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
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: "DOB is required" })}
              className={inputClass(errors.dateOfBirth)}
            />
          </div>
        </div>

        {/* License */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              License Number
            </label>
            {/* <input
              type="text"
              {...register("licenseNumber", {
                required: "License number is required",
                pattern: {
                  value: /^[A-Z]{2}\d{2}\s\d{4}\s\d{7}$/,
                  message:
                    "Enter a valid license number (e.g., MH14 2025 1234567)",
                },
              })}
              className={inputClass(errors.licenseNumber)}
              placeholder="License Number"

            /> */}
            <input
              type="text"
              {...register("licenseNumber", {
                required: "License number is required",
                // pattern: {
                //   value: /^[A-Z]{2}\d{2}\s\d{4}\s\d{7}$/,
                //   message: "Enter a valid license number (e.g., MH14 2025 1234567)",
                // },
                setValueAs: (v) => (v ? v.toUpperCase() : ""), // safely transform
              })}
              style={{ textTransform: "uppercase" }} // display uppercase
              className={inputClass(errors.licenseNumber)}
              placeholder="License Number"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Issue Date
            </label>
            <input
              type="date"
              {...register("licenseIssueDate", {
                required: "Issue date is required",
              })}
              className={inputClass(errors.licenseIssueDate)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("licenseExpiryDate", {
                required: "Expiry date is required",
              })}
              className={inputClass(errors.licenseExpiryDate)}
            />
          </div>
        </div>

        {/* Qualification + Specialization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Qualification */}
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      Qualification
    </label>
    <input
      type="text"
      {...register("qualification", {
        required: "Qualification is required",
        pattern: {
          value: /^[A-Za-z,\s]+$/,
          message: "Only letters, spaces, and commas are allowed",
        },
      })}
      onKeyDown={(e) => {
        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
        if (!/[a-zA-Z,\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }
      }}
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z,\s]/g, "");
      }}
      className={inputClass(errors.qualification)}
      placeholder="MBBS, MD"
    />
    <ErrorMsg message={errors.qualification?.message} />
  </div>

  {/* Specialization */}
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      Specialization
    </label>
    <input
      type="text"
      {...register("specialization", {
        required: "Specialization is required",
        pattern: {
          value: /^[A-Za-z,\s]+$/,
          message: "Only letters, spaces, and commas are allowed",
        },
      })}
      onKeyDown={(e) => {
        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
        if (!/[a-zA-Z,\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }
      }}
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z,\s]/g, "");
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
      required: "Previous workplace is required",
      pattern: {
        value: /^[A-Za-z0-9,\s]+$/,
        message: "Only letters, numbers, spaces, and commas are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
      // Allow only letters, numbers, spaces, commas, and essential control keys
      if (!/[a-zA-Z0-9,\s]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      // Remove any invalid characters from pasted text
      e.target.value = e.target.value.replace(/[^A-Za-z0-9,\s]/g, "");
    }}
    className={inputClass(errors.previousWorkplace)}
    placeholder="Fortis Hospital"
  />
  <ErrorMsg message={errors.previousWorkplace?.message} />
</div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Joining Date
            </label>
            <input
              type="date"
              {...register("joiningDate", {
                required: "Joining date is required",
              })}
              className={inputClass(errors.joiningDate)}
            />
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Employment Type
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
        </div>

        {/* isActive */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label className="text-sm font-semibold text-gray-800 mb-2">
            Active
          </label>
        </div>

        {/* Emergency Contact */}
        <div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Emergency Contact Number
  </label>
  <input
    type="tel"
    {...register("emergencyContactNumber", {
      required: "Emergency contact is required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Only numbers are allowed",
      },
    })}
    onKeyDown={(e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
      // Allow only digits and essential control keys
      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onInput={(e) => {
      // Remove invalid characters if pasted
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }}
    className={inputClass(errors.emergencyContactNumber)}
    placeholder="9988776655"
  />
  <ErrorMsg message={errors.emergencyContactNumber?.message} />
</div>


        {/* Server Error */}
        <p className="text-red-500 text-sm text-center">{errorMsg}</p>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 text-sm sm:text-base"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default DoctorProfileForm;
