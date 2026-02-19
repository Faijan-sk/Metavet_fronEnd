import React, { useState } from 'react'
import useJwt from "./../../../../enpoints/jwt/useJwt"
import { useNavigate } from "react-router-dom";

// 🔹 Initial state helper
const getInitialFormData = () => ({
  fullLegalName: '',
  businessName: '',
  email: '',
  phone: '',
   address: '',
  latitude: '',
  longitude: '',
  serviceArea: '',
  yearsExperience: '',

  hasPetCareCertifications: null,
  petCareCertificationsDetails: '',
  petCareCertificationDoc: null,

  bondedOrInsured: null,
  bondedOrInsuredDoc: null,

  hasFirstAid: null,
  petFirstAidCertificateDoc: null,

  criminalCheck: null,
  criminalRecordDoc: null,

  liabilityInsurance: null,
  liabilityProvider: '',
  liabilityPolicyNumber: '',
  insuranceExpiry: '',
  liabilityInsuranceDoc: null,

  hasBusinessLicense: null,
  businessLicenseDoc: null,

  walkRadius: '',
  maxPetsPerWalk: '',
  preferredCommunication: '',

  declarationAccurate: false,
  declarationVerifyOk: false,
  declarationComply: false,

  signature: '',
  signatureDate: ''
})

const PetWalkerProviderKYC = () => {

  const [formData, setFormData] = useState(getInitialFormData)   // 🔹 use helper here
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
const [locationSuggestions, setLocationSuggestions] = useState([])
const [isGettingLocation, setIsGettingLocation] = useState(false)
const navigate = useNavigate();

  // Generic setter that validates input against a provided regex.
  const setIfValid = (field, value, regex) => {
    if (value === '' || regex.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleRadio = (field, val) => setFormData(prev => ({ ...prev, [field]: val }))
  const handleFileChange = (field, file) => setFormData(prev => ({ ...prev, [field]: file }))
  const handleCheckbox = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const validateForm = () => {
    // Required fields
    if (!formData.fullLegalName || !formData.email) {
      throw new Error('Please fill required fields: Full legal name and email')
    }

    if (!formData.phone || !formData.address || !formData.serviceArea) {
      throw new Error('Please fill phone, address and service area')
    }

   

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address')
    }



    // Conditional validations based on selections
    if (formData.hasPetCareCertifications === true && !formData.petCareCertificationDoc) {
      throw new Error('Please upload Pet Care Certification document')
    }

    if (formData.bondedOrInsured === true && !formData.bondedOrInsuredDoc) {
      throw new Error('Please upload Bonded or Insured document')
    }

    if (formData.hasFirstAid === true && !formData.petFirstAidCertificateDoc) {
      throw new Error('Please upload Pet First Aid Certificate document')
    }

    if (formData.criminalCheck === true && !formData.criminalRecordDoc) {
      throw new Error('Please upload Criminal Record document')
    }

    if (formData.liabilityInsurance === true) {
      if (!formData.liabilityProvider) {
        throw new Error('Please enter Liability Provider name')
      }
      if (!formData.liabilityPolicyNumber) {
        throw new Error('Please enter Liability Policy Number')
      }
      if (!formData.insuranceExpiry) {
        throw new Error('Please enter Insurance Expiry date')
      }
      if (!formData.liabilityInsuranceDoc) {
        throw new Error('Please upload Liability Insurance document')
      }
    }

    // Declaration validations
    if (!formData.declarationAccurate || !formData.declarationVerifyOk || !formData.declarationComply) {
      throw new Error('Please accept all declarations to proceed')
    }

    if (!formData.signature) {
      throw new Error('Please provide your signature')
    }

    if (!formData.signatureDate) {
      throw new Error('Please select signature date')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      // Early check: prevent submission if declarations are not all checked
      if (!formData.declarationAccurate || !formData.declarationVerifyOk || !formData.declarationComply) {
        setError('Please accept all declarations to proceed')
        setLoading(false)
        return
      }

      // Validate form
      validateForm()

      // Create FormData object
      const formDataToSend = new FormData()

      // Add all text fields (must match DTO field names)
      formDataToSend.append('fullLegalName', formData.fullLegalName)
      if (formData.businessName) formDataToSend.append('businessName', formData.businessName)
      formDataToSend.append('email', formData.email)
      if (formData.phone) formDataToSend.append('phone', formData.phone)
      if (formData.address) formDataToSend.append('address', formData.address)
      if (formData.latitude) {
  formDataToSend.append('latitude', formData.latitude)
}

if (formData.longitude) {
  formDataToSend.append('longitude', formData.longitude)
}


      if (formData.serviceArea) formDataToSend.append('serviceArea', formData.serviceArea)
      if (formData.yearsExperience) formDataToSend.append('yearsExperience', formData.yearsExperience)

      // Professional Credentials
      if (formData.hasPetCareCertifications !== null) {
        formDataToSend.append('hasPetCareCertifications', formData.hasPetCareCertifications)
        if (formData.hasPetCareCertifications === true) {
          if (formData.petCareCertificationsDetails) {
            formDataToSend.append('petCareCertificationsDetails', formData.petCareCertificationsDetails)
          }
          if (formData.petCareCertificationDoc) {
            formDataToSend.append('petCareCertificationDoc', formData.petCareCertificationDoc)
          }
        }
      }

      if (formData.bondedOrInsured !== null) {
        formDataToSend.append('bondedOrInsured', formData.bondedOrInsured)
        if (formData.bondedOrInsured === true && formData.bondedOrInsuredDoc) {
          formDataToSend.append('bondedOrInsuredDoc', formData.bondedOrInsuredDoc)
        }
      }

      if (formData.hasFirstAid !== null) {
        formDataToSend.append('hasFirstAid', formData.hasFirstAid)
        if (formData.hasFirstAid === true && formData.petFirstAidCertificateDoc) {
          formDataToSend.append('petFirstAidCertificateDoc', formData.petFirstAidCertificateDoc)
        }
      }

      if (formData.criminalCheck !== null) {
        formDataToSend.append('criminalCheck', formData.criminalCheck)
        if (formData.criminalCheck === true && formData.criminalRecordDoc) {
          formDataToSend.append('criminalRecordDoc', formData.criminalRecordDoc)
        }
      }

      // Liability and Insurance
      if (formData.liabilityInsurance !== null) {
        formDataToSend.append('liabilityInsurance', formData.liabilityInsurance)
        if (formData.liabilityInsurance === true) {
          if (formData.liabilityProvider) {
            formDataToSend.append('liabilityProvider', formData.liabilityProvider)
          }
          if (formData.liabilityPolicyNumber) {
            formDataToSend.append('liabilityPolicyNumber', formData.liabilityPolicyNumber)
          }
          if (formData.insuranceExpiry) {
            formDataToSend.append('insuranceExpiry', formData.insuranceExpiry)
          }
          if (formData.liabilityInsuranceDoc) {
            formDataToSend.append('liabilityInsuranceDoc', formData.liabilityInsuranceDoc)
          }
        }
      }

      if (formData.hasBusinessLicense !== null) {
        formDataToSend.append('hasBusinessLicense', formData.hasBusinessLicense)
        if (formData.hasBusinessLicense === true && formData.businessLicenseDoc) {
          formDataToSend.append('businessLicenseDoc', formData.businessLicenseDoc)
        }
      }

      // Operations
      if (formData.walkRadius) formDataToSend.append('walkRadius', formData.walkRadius)
      if (formData.maxPetsPerWalk) formDataToSend.append('maxPetsPerWalk', formData.maxPetsPerWalk)
      if (formData.preferredCommunication) formDataToSend.append('preferredCommunication', formData.preferredCommunication)

      // Declarations
      formDataToSend.append('declarationAccurate', formData.declarationAccurate)
      formDataToSend.append('declarationVerifyOk', formData.declarationVerifyOk)
      formDataToSend.append('declarationComply', formData.declarationComply)
      
      if (formData.signature) formDataToSend.append('signature', formData.signature)
      if (formData.signatureDate) formDataToSend.append('signatureDate', formData.signatureDate)

      // Call API
      console.log("*******body****************", formDataToSend)
      const response = await useJwt.metavetToWalkerKyc(formDataToSend)
      console.log("response *************" , response)
      console.log('Success:', response.data)

      setSuccess(true)
      setError(null)

      // 🔹 Reset form after successful submit
    setFormData(getInitialFormData())
setLocationQuery('')
setLocationSuggestions([])

     setTimeout(() => {
  navigate("/pet-walker", { replace: true });
}, 1000);

    } catch (err) {
      console.error('Error submitting form:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit form. Please try again.'
      setError(errorMessage)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  // helper to check if all declarations are ticked
  const allDeclarationsChecked = formData.declarationAccurate && formData.declarationVerifyOk && formData.declarationComply

  // onClick for the submit button — if declarations not checked, show message and prevent submit
  const handleSubmitButtonClick = (e) => {
    if (!allDeclarationsChecked && !loading) {
      e.preventDefault()
      setError('Please accept all declarations to proceed')
      // Optional: scroll to declarations area (improves UX)
      const el = document.querySelector('input[name="declarationAccurate"]')
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    // otherwise allow form submit to proceed (form's onSubmit will run)
  }

  const searchLocation = async (value) => {
  setLocationQuery(value)
  setFormData(prev => ({ ...prev, address: value }))

  if (value.length < 3) {
    setLocationSuggestions([])
    return
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1&limit=5`
    )
    const data = await res.json()
    setLocationSuggestions(data)
  } catch (err) {
    console.error('Location search error', err)
  }
}
const selectLocation = (item) => {
  setLocationQuery(item.display_name)

  setFormData(prev => ({
    ...prev,
    address: item.display_name,
    latitude: item.lat,
    longitude: item.lon
  }))

  setLocationSuggestions([])
}
const getCurrentLocation = () => {
  setIsGettingLocation(true)

  if (!navigator.geolocation) {
    alert('Geolocation not supported')
    setIsGettingLocation(false)
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
        const data = await res.json()

        setLocationQuery(data.display_name)
        setFormData(prev => ({
          ...prev,
          address: data.display_name,
          latitude: latitude.toString(),
          longitude: longitude.toString()
        }))
      } catch (err) {
        alert('Failed to fetch address')
      } finally {
        setIsGettingLocation(false)
      }
    },
    () => {
      alert('Location access denied')
      setIsGettingLocation(false)
    }
  )
}



  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">🚶 Metavet → Pet Walker KYC</h1>
        <p className="text-center text-gray-600 mb-8">Provider onboarding — walking services</p>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Walker KYC submitted successfully! Redirecting...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal & Business Information */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">🏢 Personal & Business Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Full Legal Name *</label>
                <input
                  type="text"
                  value={formData.fullLegalName}
                  onChange={(e) => setIfValid('fullLegalName', e.target.value, /^[A-Za-z\s.'-]*$/u)}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Business / Operating Name (if applicable)</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setIfValid('businessName', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                  placeholder="Business name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      const filtered = e.target.value.replace(/[^A-Za-z0-9@.]/g, '');
                      setFormData(prev => ({ ...prev, email: filtered }));
                    }}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 10) {
                        value = value.slice(0, 10);
                      }
                      setFormData(prev => ({ ...prev, phone: value }));
                    }}
                    placeholder="9876543210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="relative">
  <label className="block font-medium text-gray-700 mb-2">Address</label>

  <input
    type="text"
    value={locationQuery}
    onChange={(e) => searchLocation(e.target.value)}
    onFocus={() =>
      setLocationSuggestions([
        {
          place_id: 'current',
          display_name: '📍 Use Current Location',
          isCurrentLocation: true
        }
      ])
    }
    placeholder="Type address or use current location"
    disabled={isGettingLocation}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
  />

  {/* Dropdown */}
  {locationSuggestions.length > 0 && (
    <ul className="absolute z-50 w-full bg-white border rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto">
      {locationSuggestions.map(item => (
        <li
          key={item.place_id}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
          onClick={() =>
            item.isCurrentLocation
              ? getCurrentLocation()
              : selectLocation(item)
          }
        >
          {item.display_name}
        </li>
      ))}
    </ul>
  )}
</div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Service Area / City</label>
                  <input
                    type="text"
                    value={formData.serviceArea}
                    onChange={(e) => setIfValid('serviceArea', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                    placeholder="e.g., Bandra, Mumbai"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.yearsExperience}
                    onChange={(e) => setIfValid('yearsExperience', e.target.value, /^[0-9]*$/u)}
                    placeholder="e.g., 2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div />
              </div>
            </div>
          </section>

          {/* Professional Credentials */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">🎓 Professional Credentials</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Pet Care Certifications</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasPetCareCertifications"
                      checked={formData.hasPetCareCertifications === true}
                      onChange={() => handleRadio('hasPetCareCertifications', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasPetCareCertifications"
                      checked={formData.hasPetCareCertifications === false}
                      onChange={() => handleRadio('hasPetCareCertifications', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasPetCareCertifications === true && (
                    <div className="mt-2 ml-4 space-y-2">
                      <input
                        type="text"
                        value={formData.petCareCertificationsDetails}
                        onChange={(e) => setIfValid('petCareCertificationsDetails', e.target.value, /^[A-Za-z0-9,\s\/.-]*$/u)}
                        placeholder="List certifications (or brief details)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <label className="block text-sm text-gray-600">Upload proof (PDF/JPG) *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('petCareCertificationDoc', e.target.files[0])}
                        className="mt-1"
                      />
                      {formData.petCareCertificationDoc && (
                        <p className="text-sm text-green-600">✓ {formData.petCareCertificationDoc.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Bonded or Insured</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="bondedOrInsured"
                      checked={formData.bondedOrInsured === true}
                      onChange={() => handleRadio('bondedOrInsured', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="bondedOrInsured"
                      checked={formData.bondedOrInsured === false}
                      onChange={() => handleRadio('bondedOrInsured', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.bondedOrInsured === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload documentation *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('bondedOrInsuredDoc', e.target.files[0])}
                        className="mt-1"
                      />
                      {formData.bondedOrInsuredDoc && (
                        <p className="text-sm text-green-600">✓ {formData.bondedOrInsuredDoc.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Pet First Aid Certificate</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasFirstAid"
                      checked={formData.hasFirstAid === true}
                      onChange={() => handleRadio('hasFirstAid', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasFirstAid"
                      checked={formData.hasFirstAid === false}
                      onChange={() => handleRadio('hasFirstAid', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasFirstAid === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload proof *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('petFirstAidCertificateDoc', e.target.files[0])}
                        className="mt-1"
                      />
                      {formData.petFirstAidCertificateDoc && (
                        <p className="text-sm text-green-600">✓ {formData.petFirstAidCertificateDoc.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Criminal Background Check (within 12 months)</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="criminalCheck"
                      checked={formData.criminalCheck === true}
                      onChange={() => handleRadio('criminalCheck', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="criminalCheck"
                      checked={formData.criminalCheck === false}
                      onChange={() => handleRadio('criminalCheck', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.criminalCheck === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload proof (PDF) *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('criminalRecordDoc', e.target.files[0])}
                        className="mt-1"
                      />
                      {formData.criminalRecordDoc && (
                        <p className="text-sm text-green-600">✓ {formData.criminalRecordDoc.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Liability & Compliance */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">⚖️ Liability & Compliance</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Professional Liability Insurance</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="liabilityInsurance"
                      checked={formData.liabilityInsurance === true}
                      onChange={() => handleRadio('liabilityInsurance', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="liabilityInsurance"
                      checked={formData.liabilityInsurance === false}
                      onChange={() => handleRadio('liabilityInsurance', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.liabilityInsurance === true && (
                    <div className="mt-2 ml-4 space-y-2">
                      <input
                        type="text"
                        value={formData.liabilityProvider}
                        onChange={(e) => setIfValid('liabilityProvider', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                        placeholder="Provider name *"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <input
                        type="text"
                        value={formData.liabilityPolicyNumber}
                        onChange={(e) => setIfValid('liabilityPolicyNumber', e.target.value, /^[A-Za-z0-9-]*$/u)}
                        placeholder="Policy number *"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <input
                        type="date"
                        value={formData.insuranceExpiry}
                        onChange={(e) => setFormData(prev => ({ ...prev, insuranceExpiry: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <label className="block text-sm text-gray-600">Upload certificate *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('liabilityInsuranceDoc', e.target.files[0])}
                        className="mt-1"
                      />
                      {formData.liabilityInsuranceDoc && (
                        <p className="text-sm text-green-600">✓ {formData.liabilityInsuranceDoc.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Business License (if applicable)</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBusinessLicense"
                      checked={formData.hasBusinessLicense === true}
                      onChange={() => handleRadio('hasBusinessLicense', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBusinessLicense"
                      checked={formData.hasBusinessLicense === false}
                      onChange={() => handleRadio('hasBusinessLicense', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasBusinessLicense === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload license *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('businessLicenseDoc', e.target.files[0])}
                        className="mt-1"
                      />
                      {formData.businessLicenseDoc && (
                        <p className="text-sm text-green-600">✓ {formData.businessLicenseDoc.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Availability & Operations */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">🔧 Availability & Operations</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Walk Radius / Coverage Area</label>
                <input
                  type="text"
                  value={formData.walkRadius}
                  onChange={(e) => {
                    const filtered = e.target.value.replace(/[^0-9]/g, '');
                    setFormData(prev => ({ ...prev, walkRadius: filtered }));
                  }}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md-grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Maximum Pets per Walk</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.maxPetsPerWalk}
                    onChange={(e) => setIfValid('maxPetsPerWalk', e.target.value, /^[0-9]*$/u)}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Preferred Communication Method</label>
                  <select
                    value={formData.preferredCommunication}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredCommunication: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="IN_APP">In-app</option>
                    <option value="TEXT">Text</option>
                    <option value="CALL">Call</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Declarations & Signature */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">✅ Declarations & Signature</h2>

            <div className="space-y-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarationAccurate}
                  onChange={(e) => handleCheckbox('declarationAccurate', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                  name="declarationAccurate"
                />
                <span className="text-gray-700">I confirm all provided information is accurate and current. *</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarationVerifyOk}
                  onChange={(e) => handleCheckbox('declarationVerifyOk', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I acknowledge Metavet may verify my insurance, certifications, and background prior to activation or renewal of my provider account. *</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarationComply}
                  onChange={(e) => handleCheckbox('declarationComply', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I agree to comply with Metavet's Provider Code of Conduct and Pet Safety Standards. *</span>
              </label>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Signature (type full name) *</label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setIfValid('signature', e.target.value, /^[A-Za-z\s.'-]*$/u)}
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFormData(prev => ({ ...prev, signatureDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              onClick={handleSubmitButtonClick}
              disabled={loading}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : allDeclarationsChecked
                    ? 'bg-primary hover:bg-primary-dark text-white'
                    : 'bg-gray-300 text-gray-700 cursor-pointer'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Walker KYC'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PetWalkerProviderKYC
