import React, { useEffect, useState } from 'react'
import useJwt from '../../../../enpoints/jwt/useJwt'

const HEALTH_CONDITION_MAP = {
  'Skin issues': 'SKIN_ISSUES',
  'Ear infections': 'EAR_INFECTIONS',
  'Arthritis': 'ARTHRITIS',
  'Allergies': 'ALLERGIES',
  'None': 'NONE',
  'Other': 'OTHER'
}

const BEHAVIOR_ISSUE_MAP = {
  'Nervousness/anxiety': 'NERVOUSNESS_ANXIETY',
  'Difficulty standing still': 'DIFFICULTY_STANDING_STILL',
  'Fear of loud tools (clippers, dryers)': 'FEAR_OF_LOUD_TOOLS',
  'Growling or snapping': 'GROWLING_OR_SNAPPING',
  'None of the above': 'NONE_OF_THE_ABOVE'
}

const SERVICE_MAP = {
  'Full groom (bath + cut)': 'FULL_GROOM',
  'Bath + brush only': 'BATH_BRUSH_ONLY',          // ✅ backend enum
  'Nail trim': 'NAIL_TRIM',
  'Ear cleaning': 'EAR_CLEANING',
  'Deshedding': 'DESHEDDING',
  'Specialty/creative cut': 'SPECIALITY_CREATIVE_CUT', // ✅ spelling "SPECIALITY"
  'Other': 'OTHER'
}


const ADDON_MAP = {
  'Scented finish': 'SCENTED_FINISH',
  'De-matting': 'DE_MATTING',
  'Seasonal accessories': 'SEASONAL_ACCESSORIES'
}

const initialFormState = {
  groomingFrequency: '',
  lastGroomingDate: '',
  preferredStyle: '',
  avoidFocusAreas: '',
  healthConditions: [],
  otherHealthCondition: '',
  onMedication: null,
  medicationDetails: '',
  hadInjuriesSurgery: null,
  injurySurgeryDetails: '',
  behaviorIssues: [],
  calmingMethods: '',
  triggers: '',
  services: [],
  otherService: '',
  groomingLocation: '',
  appointmentDate: '',
  appointmentTime: '',
  additionalNotes: '',
  addOns: [],
  selectedPetUid: ''
}

const Index = () => {
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(false)
  const [petsError, setPetsError] = useState(null)

  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialFormState)

  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [apiSuccess, setApiSuccess] = useState('')

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const exists = prev[field].includes(value)
      const updated = exists
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]

      return { ...prev, [field]: updated }
    })

    // clear field error on change
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const mapEnumArray = (selected, map) =>
    (selected || [])
      .map(label => map[label])
      .filter(Boolean)

  // Build payload that matches GroomerToClientKycRequestDto expected shape
  const buildPayload = () => {
    return {
      petUid: formData.selectedPetUid || null,
      groomingFrequency: formData.groomingFrequency || null,
      lastGroomingDate: formData.lastGroomingDate || null, // ISO date string yyyy-MM-dd
      preferredStyle: formData.preferredStyle || null,
      avoidFocusAreas: formData.avoidFocusAreas || null,
      healthConditions: mapEnumArray(formData.healthConditions, HEALTH_CONDITION_MAP),
      otherHealthCondition: formData.otherHealthCondition || null,
      onMedication: formData.onMedication !== null ? formData.onMedication : null,
      medicationDetails: formData.medicationDetails || null,
      hadInjuriesSurgery: formData.hadInjuriesSurgery !== null ? formData.hadInjuriesSurgery : null,
      injurySurgeryDetails: formData.injurySurgeryDetails || null,
      behaviorIssues: mapEnumArray(formData.behaviorIssues, BEHAVIOR_ISSUE_MAP),
      calmingMethods: formData.calmingMethods || null,
      triggers: formData.triggers || null,
      services: mapEnumArray(formData.services, SERVICE_MAP),
      otherService: formData.otherService || null,
      groomingLocation: formData.groomingLocation || null,
      appointmentDate: formData.appointmentDate || null, // ISO date string
      appointmentTime: formData.appointmentTime || null, // HH:mm
      additionalNotes: formData.additionalNotes || null,
      addOns: mapEnumArray(formData.addOns, ADDON_MAP)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.selectedPetUid) {
      newErrors.selectedPetUid = 'Please select a pet.'
    }

    if (!formData.groomingFrequency) {
      newErrors.groomingFrequency = 'Please select grooming frequency.'
    }

    if (!formData.healthConditions || formData.healthConditions.length === 0) {
      newErrors.healthConditions = 'Please select at least one health condition (or None).'
    }

    if (formData.healthConditions.includes('Other') && !formData.otherHealthCondition.trim()) {
      newErrors.otherHealthCondition = 'Please specify other health condition.'
    }

    if (formData.onMedication === null) {
      newErrors.onMedication = 'Please specify if your pet is on medication.'
    } else if (formData.onMedication === true && !formData.medicationDetails.trim()) {
      newErrors.medicationDetails = 'Please provide medication details.'
    }

    if (formData.hadInjuriesSurgery === null) {
      newErrors.hadInjuriesSurgery = 'Please specify if your pet had injuries/surgeries.'
    } else if (formData.hadInjuriesSurgery === true && !formData.injurySurgeryDetails.trim()) {
      newErrors.injurySurgeryDetails = 'Please provide injury/surgery details.'
    }

    if (!formData.behaviorIssues || formData.behaviorIssues.length === 0) {
      newErrors.behaviorIssues = 'Please select at least one behavior option (or None of the above).'
    }

    if (!formData.services || formData.services.length === 0) {
      newErrors.services = 'Please select at least one service.'
    }

    if (formData.services.includes('Other') && !formData.otherService.trim()) {
      newErrors.otherService = 'Please specify other service.'
    }

    if (!formData.groomingLocation) {
      newErrors.groomingLocation = 'Please choose grooming location preference.'
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please choose an appointment date.'
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Please choose an appointment time.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit handler — sends JSON object to backend using the existing API helper
  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    setApiSuccess('')

    const isValid = validateForm()
    if (!isValid) return

    setSubmitting(true)

    try {
      const payload = buildPayload()
      const response = await useJwt.groomerToClientKyc(payload)
      const respData = response?.data ?? response

      // Success message from backend if present
      const successMsg =
        respData?.message ||
        respData?.data?.message ||
        'KYC form submitted successfully.'

      setApiSuccess(successMsg)
      setErrors({})
      setFormData(initialFormState)
      console.log('Submission response:', respData)
    } catch (error) {
      console.error('Submission error:', error)
      const apiRes = error?.response?.data
      const errMsg =
        apiRes?.message ||
        apiRes?.details ||
        error?.message ||
        'Error submitting the form.'
      setApiError(errMsg)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    async function fetchPetByOwner() {
      setLoadingPets(true)
      setPetsError(null)
      try {
        const response = await useJwt.getAllPetsByOwner()
        const petsData = response?.data?.data ?? response?.data ?? []
        setPets(Array.isArray(petsData) ? petsData : [])
      } catch (err) {
        console.error('Error fetching pets:', err)
        setPetsError('Failed to load pets')
        setPets([])
      } finally {
        setLoadingPets(false)
      }
    }
    fetchPetByOwner()
  }, [])

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🧼 Pet Groomer → Client KYC
        </h1>
        <p className="text-center text-gray-600 mb-6">Metavet Pet Grooming Services</p>

        {/* Global success / error messages */}
        {apiSuccess && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-300 text-green-800 text-sm">
            {apiSuccess}
          </div>
        )}
        {apiError && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-sm whitespace-pre-wrap">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* NEW: Pet selection dropdown */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Select Pet
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Choose pet for this KYC *
                </label>

                {loadingPets ? (
                  <div className="text-gray-600">Loading pets...</div>
                ) : petsError ? (
                  <div className="text-red-500">{petsError}</div>
                ) : (
                  <select
                    required
                    value={formData.selectedPetUid}
                    onChange={(e) => handleInputChange('selectedPetUid', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.selectedPetUid ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">-- Select pet --</option>
                    {pets.map(pet => (
                      <option key={pet.id ?? pet.uid} value={pet.uid}>
                        {`${pet.petName}${pet.petSpecies ? ` (${pet.petSpecies})` : ''}`}
                      </option>
                    ))}
                  </select>
                )}

                {errors.selectedPetUid && (
                  <p className="text-red-500 text-sm mt-1">{errors.selectedPetUid}</p>
                )}
              </div>
            </div>
          </section>

          {/* Step 1: Grooming Preferences */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 1: Grooming Preferences
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. How often does your pet get groomed? *
                </label>
                <div className="space-y-2">
                  {['Every 4 weeks', 'Every 6–8 weeks', 'Occasionally / As needed', 'First-time groom'].map(option => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="groomingFrequency"
                        value={option}
                        checked={formData.groomingFrequency === option}
                        onChange={(e) => handleInputChange('groomingFrequency', e.target.value)}
                        className="w-4 h-4 text-primary"
                        required
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.groomingFrequency && (
                  <p className="text-red-500 text-sm mt-1">{errors.groomingFrequency}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. When was their last grooming session?
                </label>
                <input
                  type="date"
                  value={formData.lastGroomingDate}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('lastGroomingDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Preferred grooming style or outcome:
                </label>
                <input
                  type="text"
                  value={formData.preferredStyle}
                  onChange={(e) => {
                    const value = e.target.value
                    const regex = /^[A-Za-z0-9 ]*$/
                    if (regex.test(value)) {
                      handleInputChange('preferredStyle', value)
                    }
                  }}
                  placeholder="e.g., short trim, breed cut, deshedding, puppy cut"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. Are there any areas you'd like us to avoid or focus on?
                </label>

                <textarea
                  value={formData.avoidFocusAreas}
                  onChange={(e) => {
                    const value = e.target.value
                    const regex = /^[A-Za-z0-9 ]*$/
                    if (regex.test(value)) {
                      handleInputChange('avoidFocusAreas', value)
                    }
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Please describe any specific areas..."
                />
              </div>
            </div>
          </section>

          {/* Step 2: Health & Safety */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 2: Health & Safety
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  5. Does your pet have any health conditions we should know about? *
                </label>
                <div className="space-y-2">
                  {['Skin issues', 'Ear infections', 'Arthritis', 'Allergies', 'None'].map(condition => (
                    <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.healthConditions.includes(condition)}
                        onChange={() => handleCheckboxChange('healthConditions', condition)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{condition}</span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.includes('Other')}
                      onChange={() => handleCheckboxChange('healthConditions', 'Other')}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-gray-700">Other</span>
                  </label>
                  {formData.healthConditions.includes('Other') && (
                    <input
                      type="text"
                      value={formData.otherHealthCondition}
                      onChange={(e) => handleInputChange('otherHealthCondition', e.target.value)}
                      placeholder="Please specify..."
                      className={`ml-6 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.otherHealthCondition ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                </div>
                {errors.healthConditions && (
                  <p className="text-red-500 text-sm mt-1">{errors.healthConditions}</p>
                )}
                {errors.otherHealthCondition && (
                  <p className="text-red-500 text-sm mt-1">{errors.otherHealthCondition}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  6. Is your pet currently on any medications or treatments? *
                </label>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="onMedication"
                      value="yes"
                      checked={formData.onMedication === true}
                      onChange={() => handleInputChange('onMedication', true)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="onMedication"
                      value="no"
                      checked={formData.onMedication === false}
                      onChange={() => handleInputChange('onMedication', false)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.onMedication === true && (
                    <textarea
                      value={formData.medicationDetails}
                      onChange={(e) => {
                        const value = e.target.value
                        const regex = /^[A-Za-z0-9 ]*$/
                        if (regex.test(value)) {
                          handleInputChange('medicationDetails', value)
                        }
                      }}
                      rows="2"
                      placeholder="Please describe the medications..."
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.medicationDetails ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                </div>
                {errors.onMedication && (
                  <p className="text-red-500 text-sm mt-1">{errors.onMedication}</p>
                )}
                {errors.medicationDetails && (
                  <p className="text-red-500 text-sm mt-1">{errors.medicationDetails}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  7. Has your pet had any injuries or surgeries in the past year? *
                </label>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hadInjuriesSurgery"
                      value="yes"
                      checked={formData.hadInjuriesSurgery === true}
                      onChange={() => handleInputChange('hadInjuriesSurgery', true)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hadInjuriesSurgery"
                      value="no"
                      checked={formData.hadInjuriesSurgery === false}
                      onChange={() => handleInputChange('hadInjuriesSurgery', false)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hadInjuriesSurgery === true && (
                    <textarea
                      value={formData.injurySurgeryDetails}
                      onChange={(e) => {
                        const value = e.target.value
                        const regex = /^[A-Za-z0-9 ]*$/
                        if (regex.test(value)) {
                          handleInputChange('injurySurgeryDetails', value)
                        }
                      }}
                      rows="2"
                      placeholder="Please describe the injuries or surgeries..."
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.injurySurgeryDetails ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                </div>
                {errors.hadInjuriesSurgery && (
                  <p className="text-red-500 text-sm mt-1">{errors.hadInjuriesSurgery}</p>
                )}
                {errors.injurySurgeryDetails && (
                  <p className="text-red-500 text-sm mt-1">{errors.injurySurgeryDetails}</p>
                )}
              </div>
            </div>
          </section>

          {/* Step 3: Behavior & Handling */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 3: Behavior & Handling
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  8. Has your pet shown any of the following during grooming? *
                </label>
                <div className="space-y-2">
                  {[
                    'Nervousness/anxiety',
                    'Difficulty standing still',
                    'Fear of loud tools (clippers, dryers)',
                    'Growling or snapping',
                    'None of the above'
                  ].map(behavior => (
                    <label key={behavior} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.behaviorIssues.includes(behavior)}
                        onChange={() => handleCheckboxChange('behaviorIssues', behavior)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{behavior}</span>
                    </label>
                  ))}
                </div>
                {errors.behaviorIssues && (
                  <p className="text-red-500 text-sm mt-1">{errors.behaviorIssues}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  9. What helps calm or comfort your pet?
                </label>

                <textarea
                  value={formData.calmingMethods}
                  onChange={(e) => {
                    const value = e.target.value
                    const regex = /^[A-Za-z0-9 ]*$/
                    if (regex.test(value)) {
                      handleInputChange('calmingMethods', value)
                    }
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., treats, soft voice, gentle petting..."
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  10. Does your pet have any triggers or dislikes we should know about?
                </label>

                <textarea
                  value={formData.triggers}
                  onChange={(e) => {
                    const value = e.target.value
                    const regex = /^[A-Za-z0-9 ]*$/
                    if (regex.test(value)) {
                      handleInputChange('triggers', value)
                    }
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., nail trims, paws touched, loud noises..."
                />
              </div>
            </div>
          </section>

          {/* Step 4: Services & Scheduling */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 4: Services & Scheduling
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  11. What services are you looking for? *
                </label>
                <div className="space-y-2">
                  {[
                    'Full groom (bath + cut)',
                    'Bath + brush only',
                    'Nail trim',
                    'Ear cleaning',
                    'Deshedding',
                    'Specialty/creative cut'
                  ].map(service => (
                    <label key={service} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleCheckboxChange('services', service)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.services.includes('Other')}
                      onChange={() => handleCheckboxChange('services', 'Other')}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-gray-700">Other</span>
                  </label>
                  {formData.services.includes('Other') && (
                    <input
                      type="text"
                      value={formData.otherService}
                      onChange={(e) => handleInputChange('otherService', e.target.value)}
                      placeholder="Please specify..."
                      className={`ml-6 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.otherService ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                </div>
                {errors.services && (
                  <p className="text-red-500 text-sm mt-1">{errors.services}</p>
                )}
                {errors.otherService && (
                  <p className="text-red-500 text-sm mt-1">{errors.otherService}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  12. Do you prefer: *
                </label>
                <div className="space-y-2">
                  {/* value must match backend regex:
                     "Mobile/in-home grooming", "Grooming salon", "Either is Fine"
                  */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="groomingLocation"
                      value="Mobile/in-home grooming"
                      checked={formData.groomingLocation === 'Mobile/in-home grooming'}
                      onChange={(e) => handleInputChange('groomingLocation', e.target.value)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">Mobile / in-home grooming</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="groomingLocation"
                      value="Grooming salon"
                      checked={formData.groomingLocation === 'Grooming salon'}
                      onChange={(e) => handleInputChange('groomingLocation', e.target.value)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">I&apos;ll bring my pet to the groomer (salon)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="groomingLocation"
                      value="Either is Fine"
                      checked={formData.groomingLocation === 'Either is Fine'}
                      onChange={(e) => handleInputChange('groomingLocation', e.target.value)}
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="text-gray-700">Either is fine</span>
                  </label>
                </div>
                {errors.groomingLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.groomingLocation}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  13. Preferred appointment window:
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={formData.appointmentDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.appointmentDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.appointmentDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.appointmentTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.appointmentTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.appointmentTime}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  14. Any other notes or requests?
                </label>

                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => {
                    const value = e.target.value
                    const regex = /^[A-Za-z0-9 ]*$/
                    if (regex.test(value)) {
                      handleInputChange('additionalNotes', value)
                    }
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  ✅ Optional Add-ons:
                </label>
                <div className="space-y-2">
                  {['Scented finish', 'De-matting', 'Seasonal accessories'].map(addon => (
                    <label key={addon} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.addOns.includes(addon)}
                        onChange={() => handleCheckboxChange('addOns', addon)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{addon}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${
                submitting ? 'opacity-70 cursor-not-allowed' : 'bg-primary hover:opacity-90'
              } text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary`}
            >
              {submitting ? 'Submitting...' : 'Submit KYC Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
