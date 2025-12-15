import React, { useEffect, useState } from 'react'
import useJwt from "./../../../../enpoints/jwt/useJwt"

// Initial empty form state (so we can reset easily after success)
const initialFormData = {
  petUid: '',
  petNames: '',
  breedType: '',
  age: '',
  petSpecies: '',

  energyLevel: '',
  walkingExperience: '',
  preferredWalkType: '',
  preferredWalkDuration: '',
  customWalkDuration: '',
  frequency: '',
  frequencyOther: '',
  preferredTimeOfDay: '',
  preferredStartDate: '',

  leashBehavior: [],
  leashBehaviorOther: '',
  knownTriggers: '',
  socialCompatibility: '',
  handlingNotes: [],
  handlingNotesOther: '',
  comfortingMethods: '',

  medicalConditions: null,
  medicalConditionsDetails: '',
  medications: null,
  medicationsDetails: '',
  emergencyVetInfo: '',

  startingLocation: '',
  addressMeetingPoint: '',
  accessInstructions: '',
  backupContact: '',
  postWalkPreferences: [],

  additionalServices: [],
  additionalServicesOther: '',

  consent: false,
  signature: '',
  signatureDate: ''
}

const PetWalkerKYC = () => {
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(false)
  const [petsError, setPetsError] = useState(null)
  const [selectedPetId, setSelectedPetId] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [formData, setFormData] = useState(initialFormData)

  // Generic setter that validates input against a provided regex.
  // Allows empty string so users can clear fields.
  const setIfValid = (field, value, regex) => {
    if (value === '' || regex.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleCheckboxArray = (field, value) => {
    setFormData(prev => {
      const current = Array.isArray(prev[field]) ? prev[field] : []
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter(i => i !== value)
          : [...current, value]
      }
    })
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // When user selects a pet from dropdown, populate fields (but keep breed/age/species/petName hidden from user)
  const handlePetSelect = (petIdentifier) => {
    setSelectedPetId(petIdentifier)

    if (!petIdentifier) {
      // clear pet-specific fields if user chooses blank option
      setFormData(prev => ({
        ...prev,
        petNames: '',
        breedType: '',
        age: '',
        petSpecies: '',
        petUid: ''
      }))
      return
    }

    // Try to find by uid first, then id
    const pet = pets.find(p =>
      (p.uid && String(p.uid) === String(petIdentifier)) ||
      (p.id && String(p.id) === String(petIdentifier))
    )

    if (!pet) {
      // If not found, still set petUid to the selected identifier (defensive)
      setFormData(prev => ({ ...prev, petUid: String(petIdentifier) }))
      return
    }

    setFormData(prev => ({
      ...prev,
      petNames: pet.petName ?? prev.petNames ?? '',
      breedType: pet.petBreed ?? prev.breedType ?? '',
      age: (pet.petAge !== undefined && pet.petAge !== null) ? String(pet.petAge) : prev.age ?? '',
      petSpecies: pet.petSpecies ?? prev.petSpecies ?? '',
      petUid: pet.uid ?? String(pet.id ?? petIdentifier)
    }))
  }

  useEffect(() => {
    async function fetchPetsByOwner() {
      try {
        setLoadingPets(true)
        setPetsError(null)
        const response = await useJwt.getAllPetsByOwner()

        const items = response?.data?.data ?? response?.data ?? response ?? []
        const arr = Array.isArray(items) ? items : (Array.isArray(items.data) ? items.data : [])
        setPets(arr)
      } catch (err) {
        console.error("Failed to fetch pets:", err)
        setPetsError(err?.message ?? 'Failed to load pets')
        setPets([])
      } finally {
        setLoadingPets(false)
      }
    }

    fetchPetsByOwner()
  }, [])

  const buildPayloadForBackend = (raw) => {
    const ageNum = raw.age === '' || raw.age === null ? null : Number(raw.age)
    const customDurNum =
      raw.customWalkDuration === '' || raw.customWalkDuration === null
        ? null
        : Number(raw.customWalkDuration)

    const medicalConditions = raw.medicalConditions === null ? null : !!raw.medicalConditions
    const medications = raw.medications === null ? null : !!raw.medications
    const consent = !!raw.consent

    return {
      petUid: raw.petUid || null,
      petNames: raw.petNames || null,
      breedType: raw.breedType || null,
      age: ageNum,
      petSpecies: raw.petSpecies || null,

      energyLevel: raw.energyLevel || null,
      walkingExperience: raw.walkingExperience || null,
      preferredWalkType: raw.preferredWalkType || null,
      preferredWalkDuration: raw.preferredWalkDuration || null,
      customWalkDuration: customDurNum,

      frequency: raw.frequency || null,
      frequencyOther: raw.frequencyOther || null,
      preferredTimeOfDay: raw.preferredTimeOfDay || null,
      preferredStartDate: raw.preferredStartDate || null,

      leashBehavior: raw.leashBehavior || [],
      leashBehaviorOther: raw.leashBehaviorOther || null,
      knownTriggers: raw.knownTriggers || null,
      socialCompatibility: raw.socialCompatibility || null,
      handlingNotes: raw.handlingNotes || [],
      handlingNotesOther: raw.handlingNotesOther || null,
      comfortingMethods: raw.comfortingMethods || null,

      medicalConditions,
      medicalConditionsDetails: raw.medicalConditionsDetails || null,
      medications,
      medicationsDetails: raw.medicationsDetails || null,
      emergencyVetInfo: raw.emergencyVetInfo || null,

      startingLocation: raw.startingLocation || null,
      addressMeetingPoint: raw.addressMeetingPoint || null,
      accessInstructions: raw.accessInstructions || null,
      backupContact: raw.backupContact || null,
      postWalkPreferences: raw.postWalkPreferences || [],

      additionalServices: raw.additionalServices || [],
      additionalServicesOther: raw.additionalServicesOther || null,

      consent,
      signature: raw.signature || null,
      signatureDate: raw.signatureDate || null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)
    setSuccessMessage(null)

    // -------- Client-side validations (important ones matching backend) --------
    const errors = []

    if (!formData.petUid) {
      errors.push("Please select your pet.")
    }

    if (!formData.consent) {
      errors.push("Consent is required to proceed.")
    }
    if (!formData.signature || formData.signature.trim() === '') {
      errors.push("Signature is required.")
    }
    if (!formData.signatureDate) {
      errors.push("Signature date is required.")
    }

    if (formData.preferredWalkDuration === 'Custom') {
      if (!formData.customWalkDuration || Number(formData.customWalkDuration) <= 0) {
        errors.push("Custom walk duration must be greater than 0.")
      }
    }

    if (formData.frequency === 'Other') {
      if (!formData.frequencyOther || formData.frequencyOther.trim() === '') {
        errors.push("Please specify the frequency when 'Other' is selected.")
      }
    }

    if (formData.leashBehavior.includes('Other')) {
      if (!formData.leashBehaviorOther || formData.leashBehaviorOther.trim() === '') {
        errors.push("Please specify leash behavior details when 'Other' is selected.")
      }
    }

    if (formData.handlingNotes.includes('Other')) {
      if (!formData.handlingNotesOther || formData.handlingNotesOther.trim() === '') {
        errors.push("Please specify handling notes when 'Other' is selected.")
      }
    }

    if (formData.medicalConditions === true) {
      if (!formData.medicalConditionsDetails || formData.medicalConditionsDetails.trim() === '') {
        errors.push("Please provide medical condition details when 'Medical Conditions' is Yes.")
      }
    }

    if (formData.medications === true) {
      if (!formData.medicationsDetails || formData.medicationsDetails.trim() === '') {
        errors.push("Please provide medication details when 'Medications' is Yes.")
      }
    }

    if (errors.length > 0) {
      setApiError(errors.join(' '))
      return
    }

    const payload = buildPayloadForBackend(formData)
    console.log('Submitting Walker KYC payload:', payload)

    setSubmitting(true)
    try {
      // Axios-style call: useJwt.walkerToClientKyc(payload) expected to be axios.post(...)
      const res = await useJwt.walkerToClientKyc(payload)
      const data = res?.data ?? res

      if (data && data.success === false) {
        const backendMsg = data.details || data.message || 'Submission failed due to validation error.'
        setApiError(backendMsg)
        console.error('Submission failed (backend validation):', data)
        return
      }

      console.log('Submission successful:', data)
      setSuccessMessage('Walker KYC submitted successfully.')

      // ✅ Reset full form & selection after successful submit
      setFormData(initialFormData)
      setSelectedPetId('')
    } catch (err) {
      console.error('Submission error:', err)
      // Handle axios error shape
      const backend = err?.response?.data
      let message = err?.message ?? 'Unknown error during submission.'
      if (backend) {
        message = backend.details || backend.message || message
      }
      setApiError(`Submission failed: ${message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // Today's date (YYYY-MM-DD) for min/max in date inputs
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🚶‍♂️ Pet Walker → Client KYC Summary
        </h1>
        <p className="text-center text-gray-600 mb-4">Metavet Pet Walking Services</p>

        {successMessage && (
          <div className="mb-4 text-green-700 bg-green-50 p-3 rounded">
            {successMessage}
          </div>
        )}

        {apiError && (
          <div className="mb-4 text-red-700 bg-red-50 p-3 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Pet & Routine Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Pet & Routine Overview
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Select your pet:
                </label>

                {loadingPets ? (
                  <div className="text-sm text-gray-500">Loading pets...</div>
                ) : petsError ? (
                  <div className="text-sm text-red-500">
                    Error loading pets: {petsError}
                  </div>
                ) : (
                  <select
                    value={selectedPetId}
                    onChange={(e) => handlePetSelect(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">— Select your pet —</option>
                    {pets.map(p => (
                      <option key={p.uid ?? p.id} value={p.uid ?? p.id}>
                        {p.petName} {p.petSpecies ? `(${p.petSpecies})` : ''} {p.petBreed ? `— ${p.petBreed}` : ''}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Pet Name - hidden */}
              <div className="hidden">
                <label className="block font-medium text-gray-700 mb-2">
                  Pet Name(s):
                </label>
                <input
                  type="text"
                  value={formData.petNames}
                  onChange={(e) => setIfValid('petNames', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                  placeholder="e.g., Bella, Charlie"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Breed/Type - hidden */}
                <div className="hidden">
                  <label className="block font-medium text-gray-700 mb-2">
                    Breed/Type:
                  </label>
                  <input
                    type="text"
                    value={formData.breedType}
                    onChange={(e) => setIfValid('breedType', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Age - hidden */}
                <div className="hidden">
                  <label className="block font-medium text-gray-700 mb-2">
                    Age:
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.age}
                    onChange={(e) => setIfValid('age', e.target.value, /^[0-9]*$/u)}
                    placeholder="e.g., 3"
                    pattern="^[0-9]+$"
                    title="Please enter numbers only"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Energy Level:
                  </label>
                  <select
                    value={formData.energyLevel}
                    onChange={(e) => handleInputChange('energyLevel', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Walking Experience:
                  </label>
                  <select
                    value={formData.walkingExperience}
                    onChange={(e) => handleInputChange('walkingExperience', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Well-trained</option>
                    <option>Reactive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Preferred Walk Type:
                  </label>
                  <select
                    value={formData.preferredWalkType}
                    onChange={(e) => handleInputChange('preferredWalkType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option>Solo</option>
                    <option>Group</option>
                    <option>Either</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Preferred Walk Duration:
                  </label>
                  <div className="space-y-2">
                    {['15', '30', '60', 'Custom'].map(d => (
                      <label key={d} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredWalkDuration"
                          value={d}
                          checked={formData.preferredWalkDuration === d}
                          onChange={(e) => handleInputChange('preferredWalkDuration', e.target.value)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-gray-700">
                          {d === 'Custom' ? 'Custom → Please specify' : d + ' minutes'}
                        </span>
                      </label>
                    ))}

                    {formData.preferredWalkDuration === 'Custom' && (
                      <input
                        type="text"
                        value={formData.customWalkDuration}
                        onChange={(e) => setIfValid('customWalkDuration', e.target.value, /^[0-9]*$/u)}
                        placeholder="Please specify duration (e.g., 45)"
                        inputMode="numeric"
                        pattern="^[0-9]+$"
                        title="Numbers only"
                        className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Frequency:
                  </label>
                  <div className="space-y-2">
                    {['Daily', 'Weekly', 'As needed', 'Other'].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          value={opt}
                          checked={formData.frequency === opt}
                          onChange={(e) => handleInputChange('frequency', e.target.value)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-gray-700">
                          {opt}{opt === 'Other' ? ' → Please specify' : ''}
                        </span>
                      </label>
                    ))}

                    {formData.frequency === 'Other' && (
                      <input
                        type="text"
                        value={formData.frequencyOther}
                        onChange={(e) => setIfValid('frequencyOther', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                        placeholder="Please specify frequency"
                        className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Preferred Time of Day:
                  </label>
                  <select
                    value={formData.preferredTimeOfDay}
                    onChange={(e) => handleInputChange('preferredTimeOfDay', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option>Morning</option>
                    <option>Midday</option>
                    <option>Evening</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Preferred Start Date:
                </label>

                <input
                  type="date"
                  value={formData.preferredStartDate}
                  min={today} // backend: @FutureOrPresent
                  onChange={(e) => handleInputChange("preferredStartDate", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Species - hidden */}
              <div className="hidden">
                <label className="block font-medium text-gray-700 mb-2">
                  Species:
                </label>
                <input
                  type="text"
                  value={formData.petSpecies}
                  onChange={(e) => setIfValid('petSpecies', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Behavior & Handling */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Behavior & Handling
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Leash Behavior:
                </label>
                <div className="space-y-2">
                  {['Pulls', 'Walks nicely', 'Lunges at other dogs', 'Reactive', 'Other'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.leashBehavior.includes(opt)}
                        onChange={() => handleCheckboxArray('leashBehavior', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.leashBehavior.includes('Other') && (
                    <input
                      type="text"
                      value={formData.leashBehaviorOther}
                      onChange={(e) => setIfValid('leashBehaviorOther', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                      placeholder="Please specify..."
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Known Triggers:
                </label>
                <textarea
                  value={formData.knownTriggers}
                  onChange={(e) => setIfValid('knownTriggers', e.target.value, /^[A-Za-z0-9\s,.'"-]*$/u)}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., skateboards, kids yelling, other dogs..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Social Compatibility:
                  </label>
                  <select
                    value={formData.socialCompatibility}
                    onChange={(e) => handleInputChange('socialCompatibility', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option>Friendly</option>
                    <option>Solo only</option>
                    <option>Unsure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Handling Notes:
                  </label>
                  <div className="space-y-2">
                    {['Needs harness', 'Wears muzzle', 'Prefers calm approach', 'Avoids stairs', 'Other'].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.handlingNotes.includes(opt)}
                          onChange={() => handleCheckboxArray('handlingNotes', opt)}
                          className="w-4 h-4 text-primary rounded"
                        />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}

                    {formData.handlingNotes.includes('Other') && (
                      <input
                        type="text"
                        value={formData.handlingNotesOther}
                        onChange={(e) => setIfValid('handlingNotesOther', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                        placeholder="Please specify..."
                        className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Comforting Methods or Cues:
                </label>
                <textarea
                  value={formData.comfortingMethods}
                  onChange={(e) => setIfValid('comfortingMethods', e.target.value, /^[A-Za-z0-9\s,.'"-]*$/u)}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., treats, cue words, favorite toy..."
                />
              </div>
            </div>
          </section>

          {/* Health & Safety */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Health & Safety
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Medical Conditions:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="medicalConditions"
                      checked={formData.medicalConditions === true}
                      onChange={() => handleInputChange('medicalConditions', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="medicalConditions"
                      checked={formData.medicalConditions === false}
                      onChange={() => handleInputChange('medicalConditions', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.medicalConditions === true && (
                    <textarea
                      value={formData.medicalConditionsDetails}
                      onChange={(e) => setIfValid('medicalConditionsDetails', e.target.value, /^[A-Za-z0-9\s,.'"-]*$/u)}
                      rows="2"
                      placeholder="Please describe medical conditions..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Medications:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="medications"
                      checked={formData.medications === true}
                      onChange={() => handleInputChange('medications', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="medications"
                      checked={formData.medications === false}
                      onChange={() => handleInputChange('medications', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.medications === true && (
                    <textarea
                      value={formData.medicationsDetails}
                      onChange={(e) => {
                        const allowed = e.target.value.replace(/[^A-Za-z0-9\s.,]/g, "")
                        setIfValid("medicationsDetails", allowed, /^[A-Za-z0-9\s.,]*$/)
                      }}
                      rows="2"
                      placeholder="Name, dosage, timing..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Emergency Vet Info:
                </label>
                <input
                  type="text"
                  value={formData.emergencyVetInfo}
                  onChange={(e) => setIfValid('emergencyVetInfo', e.target.value, /^[A-Za-z0-9\s,()+\-.#]*$/u)}
                  placeholder="Vet name, phone, address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Access & Logistics */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Access & Logistics
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Starting Location:
                </label>
                <select
                  value={formData.startingLocation}
                  onChange={(e) => handleInputChange('startingLocation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select</option>
                  <option>Home</option>
                  <option>Apartment</option>
                  <option>Workplace</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Address or Meeting Point:
                </label>
                <input
                  type="text"
                  value={formData.addressMeetingPoint}
                  onChange={(e) => setIfValid('addressMeetingPoint', e.target.value, /^[A-Za-z0-9\s,.'#\/ -]*$/u)}
                  placeholder="Full address or meetup spot"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {(formData.startingLocation === 'Home' || formData.startingLocation === 'Apartment') && (
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Access Instructions:
                  </label>
                  <textarea
                    value={formData.accessInstructions}
                    onChange={(e) => setIfValid('accessInstructions', e.target.value, /^[A-Za-z0-9\s,.'"#:\/ -]*$/u)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., gate code, leave key with neighbor..."
                  />
                </div>
              )}

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Backup Contact (optional):
                </label>
                <input
                  type="text"
                  value={formData.backupContact}
                  onChange={(e) => setIfValid('backupContact', e.target.value, /^[0-9+\-\s]*$/u)}
                  placeholder="Name & phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Post-Walk Preferences:
                </label>
                <div className="space-y-2">
                  {['Text update', 'Photo update', 'Walk summary in app'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.postWalkPreferences.includes(opt)}
                        onChange={() => handleCheckboxArray('postWalkPreferences', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services & Add-ons */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🟦 Services & Add-ons
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Additional Services:
                </label>
                <div className="space-y-2">
                  {['Feeding', 'Water', 'Towel Dry', 'Medication'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.additionalServices.includes(opt)}
                        onChange={() => handleCheckboxArray('additionalServices', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes('Other')}
                      onChange={() => handleCheckboxArray('additionalServices', 'Other')}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-gray-700">Other</span>
                  </label>

                  {formData.additionalServices.includes('Other') && (
                    <input
                      type="text"
                      value={formData.additionalServicesOther}
                      onChange={(e) => setIfValid('additionalServicesOther', e.target.value, /^[A-Za-z0-9 ,.'-]*$/u)}
                      placeholder="Please describe..."
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Consent & Signature */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              ✅ Consent & Signature
            </h2>

            <div className="space-y-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange('consent', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">
                  I confirm that the information provided is accurate and consent to share it with my assigned walker through the Metavet platform.
                </span>
              </label>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Signature (type full name):
                </label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setIfValid('signature', e.target.value, /^[A-Za-z\s.'-]*$/u)}
                  placeholder="Full name as signature"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  min={today}  // ✅ @PastOrPresent: blocks future dates
                  onChange={(e) => handleInputChange('signatureDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${
                submitting ? 'opacity-60 cursor-not-allowed' : 'bg-primary hover:opacity-90'
              } text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary`}
            >
              {submitting ? 'Submitting...' : 'Submit Walker KYC'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PetWalkerKYC
