import React, { useEffect, useState } from 'react'
import useJwt from '../../../../enpoints/jwt/useJwt'

const Index = () => {
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(false)
  const [petsError, setPetsError] = useState(null)

  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
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
  })

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



  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Build payload that matches GroomerToClientKycRequestDto expected shape
  const buildPayload = () => {
    return {
      petUid: formData.selectedPetUid || null,
      groomingFrequency: formData.groomingFrequency || null,
      lastGroomingDate: formData.lastGroomingDate || null, // ISO date string yyyy-MM-dd
      preferredStyle: formData.preferredStyle || null,
      avoidFocusAreas: formData.avoidFocusAreas || null,
      healthConditions: (formData.healthConditions && formData.healthConditions.length) ? formData.healthConditions : null,
      otherHealthCondition: formData.otherHealthCondition || null,
      onMedication: formData.onMedication !== null ? formData.onMedication : null,
      medicationDetails: formData.medicationDetails || null,
      hadInjuriesSurgery: formData.hadInjuriesSurgery !== null ? formData.hadInjuriesSurgery : null,
      injurySurgeryDetails: formData.injurySurgeryDetails || null,
      behaviorIssues: (formData.behaviorIssues && formData.behaviorIssues.length) ? formData.behaviorIssues : null,
      calmingMethods: formData.calmingMethods || null,
      triggers: formData.triggers || null,
      services: (formData.services && formData.services.length) ? formData.services : null,
      otherService: formData.otherService || null,
      groomingLocation: formData.groomingLocation || null,
      appointmentDate: formData.appointmentDate || null, // ISO date string
      appointmentTime: formData.appointmentTime || null, // HH:mm
      additionalNotes: formData.additionalNotes || null,
      addOns: (formData.addOns && formData.addOns.length) ? formData.addOns : null
    }
  }

  // Submit handler — sends JSON object to backend using the existing API helper
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side guard: required fields
    if (!formData.selectedPetUid) {
      // alert('Please select a pet before submitting the KYC.')
      return
    }

    if (!formData.groomingFrequency) {
      // alert('Please select grooming frequency.')
      return
    }

    if (!formData.groomingLocation) {
      // alert('Please pick a grooming location preference.')
      return
    }

    if (formData.onMedication === null) {
      // alert('Please answer whether the pet is on medication.')
      return
    }

    if (formData.hadInjuriesSurgery === null) {
      // alert('Please answer whether the pet had injuries or surgery.')
      return
    }

    setSubmitting(true)

    try {
      // Assemble payload matching DTO names
      const payload = buildPayload()

      // The frontend service in your project previously accepted FormData but also
      // works when given a plain object (axios will send application/json). The
      // backend controller expects @RequestBody GroomerToClientKycRequestDto so JSON is correct.
      const response = await useJwt.groomerToClientKyc(payload)

      // Depending on your API helper, response may be { data: ... } or raw
      const respData = response?.data ?? response

      console.log('Submission response:', respData)
      // alert('Form submitted successfully!')
      // alert("Form Submitted Sucesfully")
      
      setTimeout(()=>{
setFormData(initialFormState)
      } , 500)
      

      // Optional: reset or keep values — here we'll preserve values but turn off submitting

    } catch (error) {
      console.error('Submission error:', error)

      // Try to show more helpful error message when possible
      const msg = error?.response?.data ?? error?.message ?? 'Unknown error'
      // alert('Error submitting the form — ' + JSON.stringify(msg))
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
        <p className="text-center text-gray-600 mb-8">Metavet Pet Grooming Services</p>

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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Select pet --</option>
                    {pets.map(pet => (
                      <option key={pet.id ?? pet.uid} value={pet.uid}>
                        {`${pet.petName}${pet.petSpecies ? ` (${pet.petSpecies})` : ''}`}
                      </option>
                    ))}
                  </select>
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
              </div>

              <div>
  <label className="block font-medium text-gray-700 mb-2">
    2. When was their last grooming session?
  </label>
  <input
    type="date"
    value={formData.lastGroomingDate}
    max={new Date().toISOString().split("T")[0]} // <-- prevents future dates
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
      const value = e.target.value;

      // Allow only alphabets, numbers, and spaces
      const regex = /^[A-Za-z0-9 ]*$/;

      if (regex.test(value)) {
        handleInputChange("preferredStyle", value);
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
      const value = e.target.value;

      // Allow only alphabets, numbers, and spaces
      const regex = /^[A-Za-z0-9 ]*$/;

      if (regex.test(value)) {
        handleInputChange("avoidFocusAreas", value);
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
                  5. Does your pet have any health conditions we should know about?
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
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
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
          const value = e.target.value;
          const regex = /^[A-Za-z0-9 ]*$/; // letters, numbers, spaces only

          if (regex.test(value)) {
            handleInputChange("medicationDetails", value);
          }
        }}
        rows="2"
        placeholder="Please describe the medications..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      />
    )}
  </div>
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
        onChange={() => handleInputChange("hadInjuriesSurgery", true)}
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
        onChange={() => handleInputChange("hadInjuriesSurgery", false)}
        className="w-4 h-4 text-primary"
        required
      />
      <span className="text-gray-700">No</span>
    </label>

    {formData.hadInjuriesSurgery === true && (
      <textarea
        value={formData.injurySurgeryDetails}
        onChange={(e) => {
          const value = e.target.value;
          const regex = /^[A-Za-z0-9 ]*$/; // allow only A-Z, 0-9, space

          if (regex.test(value)) {
            handleInputChange("injurySurgeryDetails", value);
          }
        }}
        rows="2"
        placeholder="Please describe the injuries or surgeries..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      />
    )}
  </div>
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
                  8. Has your pet shown any of the following during grooming?
                </label>
                <div className="space-y-2">
                  {['Nervousness/anxiety', 'Difficulty standing still', 'Fear of loud tools (clippers, dryers)', 'Growling or snapping', 'None of the above'].map(behavior => (
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
              </div>

              <div>
  <label className="block font-medium text-gray-700 mb-2">
    9. What helps calm or comfort your pet?
  </label>

  <textarea
    value={formData.calmingMethods}
    onChange={(e) => {
      const value = e.target.value;
      const regex = /^[A-Za-z0-9 ]*$/; // only letters, numbers, spaces

      if (regex.test(value)) {
        handleInputChange("calmingMethods", value);
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
      const value = e.target.value;
      const regex = /^[A-Za-z0-9 ]*$/; // only alphabets, numbers, spaces

      if (regex.test(value)) {
        handleInputChange("triggers", value);
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
                  {['Full groom (bath + cut)', 'Bath + brush only', 'Nail trim', 'Ear cleaning', 'Deshedding', 'Specialty/creative cut'].map(service => (
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
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  12. Do you prefer: *
                </label>
                <div className="space-y-2">
                  {['Mobile/in-home grooming', "I'll bring my pet to the groomer", 'Either is fine'].map(option => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="groomingLocation"
                        value={option}
                        checked={formData.groomingLocation === option}
                        onChange={(e) => handleInputChange('groomingLocation', e.target.value)}
                        className="w-4 h-4 text-primary"
                        required
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

           <div>
  <label className="block font-medium text-gray-700 mb-2">
    13. Preferred appointment window:
  </label>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="date"
      value={formData.appointmentDate}
      min={new Date().toISOString().split("T")[0]} // ⛔ blocks past dates
      onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    />

    <input
      type="time"
      value={formData.appointmentTime}
      onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    />
  </div>
</div>


              <div>
  <label className="block font-medium text-gray-700 mb-2">
    14. Any other notes or requests?
  </label>

  <textarea
    value={formData.additionalNotes}
    onChange={(e) => {
      const value = e.target.value;
      const regex = /^[A-Za-z0-9 ]*$/; // letters, numbers, spaces only

      if (regex.test(value)) {
        handleInputChange("additionalNotes", value);
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
              className={`w-full ${submitting ? 'opacity-70 cursor-not-allowed' : 'bg-primary hover:opacity-90'} text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary`}
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
