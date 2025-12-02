import React, { useEffect, useState } from 'react'
import useJwt from "./../../../../enpoints/jwt/useJwt"

const PetBehaviorForm = () => {
  const [formData, setFormData] = useState({
    // NEW: selected pet UID (keeps all your existing fields)
    selectedPetUid: '',

    // Step 1: Behavioral Concern Overview
    behavioralChallenges: [],
    aggressionBiteDescription: '',
    otherBehaviorDescription: '',
    behaviorStartTime: '',
    behaviorFrequency: '',
    specificSituationsDescription: '',

    // Step 2: Triggers & Context
    knownTriggers: '',
    behaviorProgress: '',
    behaviorProgressContext: '',
    aggressiveBehaviors: [],
    seriousIncidents: '',

    // Step 3: Training & Tools History
    workedWithTrainer: null,
    trainerApproaches: '',
    currentTrainingTools: [],
    otherTrainingTool: '',
    petMotivation: '',
    favoriteRewards: '',

    // Step 4: Routine & Environment
    walksPerDay: '',
    offLeashTime: '',
    timeAlone: '',
    exerciseStimulation: '',
    otherPets: null,
    otherPetsDetails: '',
    childrenInHome: null,
    childrenAges: '',
    petResponseWithChildren: '',
    homeEnvironment: '',
    homeEnvironmentOther: '',

    // Step 5: Goals & Expectations
    successOutcome: '',
    openToAdjustments: '',
    preferredSessionType: '',
    additionalNotes: '',

    // Consent
    consentAccuracy: false
  })

  // local UI state for pets list + loading/errors
  const [pets, setPets] = useState([]) // always prefer array here
  const [petsLoading, setPetsLoading] = useState(true)
  const [petsError, setPetsError] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const handleCheckboxArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value]
    }))
  }

  const handleRadio = (field, val) => setFormData(prev => ({ ...prev, [field]: val }))

  const setIfValid = (field, value, regex) => {
    if (value === '' || regex.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus({ type: '', message: '' })

    // Validation
    if (!formData.selectedPetUid) {
      setSubmitStatus({ type: 'error', message: 'Please select a pet from the dropdown' })
      return
    }

    if (formData.behavioralChallenges.length === 0) {
      setSubmitStatus({ type: 'error', message: 'Please select at least one behavioral challenge' })
      return
    }

    if (formData.behavioralChallenges.includes('Aggression') && !formData.aggressionBiteDescription) {
      setSubmitStatus({ type: 'error', message: 'Please describe aggression incidents' })
      return
    }

    if (formData.behavioralChallenges.includes('Other') && !formData.otherBehaviorDescription) {
      setSubmitStatus({ type: 'error', message: 'Please describe other behavioral challenge' })
      return
    }

    if (!formData.consentAccuracy) {
      setSubmitStatus({ type: 'error', message: 'Please confirm accuracy of information' })
      return
    }

    setIsSubmitting(true)

    try {
      // Build payload that matches your backend DTO shape.
      // Note: backend expects lists for behavioralChallenges, aggressiveBehaviors, currentTrainingTools.
      const payload = {
        // map selectedPetUid -> petUid (your backend service expects petUid)
        petUid: formData.selectedPetUid,

        // Step 1
        behavioralChallenges: Array.isArray(formData.behavioralChallenges) ? formData.behavioralChallenges : (formData.behavioralChallenges ? [formData.behavioralChallenges] : []),
        aggressionBiteDescription: formData.aggressionBiteDescription,
        otherBehaviorDescription: formData.otherBehaviorDescription,
        behaviorStartTime: formData.behaviorStartTime,
        behaviorFrequency: formData.behaviorFrequency,
        specificSituationsDescription: formData.specificSituationsDescription,

        // Step 2
        knownTriggers: formData.knownTriggers,
        behaviorProgress: formData.behaviorProgress,
        behaviorProgressContext: formData.behaviorProgressContext,
        aggressiveBehaviors: Array.isArray(formData.aggressiveBehaviors) ? formData.aggressiveBehaviors : (formData.aggressiveBehaviors ? [formData.aggressiveBehaviors] : []),
        seriousIncidents: formData.seriousIncidents,

        // Step 3
        workedWithTrainer: formData.workedWithTrainer,
        trainerApproaches: formData.trainerApproaches,
        currentTrainingTools: Array.isArray(formData.currentTrainingTools) ? formData.currentTrainingTools : (formData.currentTrainingTools ? [formData.currentTrainingTools] : []),
        otherTrainingTool: formData.otherTrainingTool,
        petMotivation: formData.petMotivation,
        favoriteRewards: formData.favoriteRewards,

        // Step 4
        walksPerDay: formData.walksPerDay,
        offLeashTime: formData.offLeashTime,
        timeAlone: formData.timeAlone,
        exerciseStimulation: formData.exerciseStimulation,
        otherPets: formData.otherPets,
        otherPetsDetails: formData.otherPetsDetails,
        childrenInHome: formData.childrenInHome,
        childrenAges: formData.childrenAges,
        petResponseWithChildren: formData.petResponseWithChildren,
        homeEnvironment: formData.homeEnvironment,
        homeEnvironmentOther: formData.homeEnvironmentOther,

        // Step 5
        successOutcome: formData.successOutcome,
        openToAdjustments: formData.openToAdjustments,
        preferredSessionType: formData.preferredSessionType,
        additionalNotes: formData.additionalNotes,

        // Consent
        consentAccuracy: formData.consentAccuracy
      }

      console.log('Submitting behavior form payload:', payload)

      // Primary attempt: call useJwt helper methods if available (most projects have some helper)
      let apiResponse = null
      if (useJwt && typeof useJwt.createBehavioristKyc === 'function') {
        // Preferred explicit helper name
        apiResponse = await useJwt.createBehavioristKyc(payload)
      } else if (useJwt && typeof useJwt.submitPetBehavior === 'function') {
        // Alternative helper name (some projects use generic submit functions)
        apiResponse = await useJwt.submitPetBehavior(payload)
      } else if (useJwt && typeof useJwt.post === 'function') {
        // Generic wrapper that accepts (path, payload)
        apiResponse = await useJwt.post('/api/behaviorist-kyc', payload)
      } else {
        // Fallback to fetch directly (no assumption about auth wrapper).
        // If your app needs Authorization header, ensure token is available in localStorage or update this to read token from your auth store.
        // apiResponse = await fetch('/api/behaviorist-kyc', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //     // if you need auth: 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        //   },
        //   body: JSON.stringify(payload)
        // })
console.log("&&&&&&&&&&&&&&&&&" , payload)
        // apiResponse = await useJwt.behaviouristToClientKyc(payload)


      }

      // Normalize response handling: check for fetch Response vs axios-like
      let success = false
      let responseData = null

      // If apiResponse is a fetch Response (has ok property)
      // if (apiResponse && typeof apiResponse.ok === 'boolean') {
      //   if (apiResponse.ok) {
      //     responseData = await apiResponse.json().catch(() => null)
      //     success = true
      //   } else {
      //     // try to parse error body
      //     let errBody = null
      //     try { errBody = await apiResponse.text() } catch (e) { errBody = null }
      //     throw new Error(errBody || `Server responded with status ${apiResponse.status}`)
      //   }
      // } else if (apiResponse && apiResponse.data !== undefined) {
      //   // axios-like response (data field)
      //   responseData = apiResponse.data
      //   success = true
      // } else if (apiResponse !== null && apiResponse !== undefined) {
      //   // some other wrapper that returns plain object
      //   responseData = apiResponse
      //   success = true
      // }

      // if (success) {
      //   setSubmitStatus({ type: 'success', message: 'Form submitted successfully!' })
      //   console.log('Behaviorist KYC created response:', responseData)

      //   // Reset / reload (preserve your original behavior)
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 2000)
      // } else {
      //   throw new Error('Unknown response from API')
      // }

    } catch (error) {
      console.error('Error submitting form:', error)
      const msg = (error && error.message) ? error.message : 'Failed to submit form. Please try again.'
      setSubmitStatus({
        type: 'error',
        message: msg
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // fetch pets by owner on mount
    let mounted = true

    async function fetPetByOwner() {
      setPetsLoading(true)
      setPetsError(null)
      try {
        // Await the response (important)
        const response = await useJwt.getAllPetsByOwner()

        // Try to normalize response to an array of pets.
        // Handle common shapes:
        // 1) { data: [ ... ] }
        // 2) { data: { data: [ ... ] } }
        // 3) raw array [...]
        // 4) { pets: [...] } (less likely)
        let petList = []

        if (Array.isArray(response)) {
          petList = response
        } else if (response && Array.isArray(response.data)) {
          petList = response.data
        } else if (response && response.data && Array.isArray(response.data.data)) {
          petList = response.data.data
        } else if (response && Array.isArray(response.pets)) {
          petList = response.pets
        } else {
          // unexpected shape; try to salvage by checking nested values
          // if response.data is an object containing numeric keys (rare), try Object.values
          if (response && response.data && typeof response.data === 'object') {
            const possible = Object.values(response.data).filter(v => Array.isArray(v)).flat()
            if (possible.length) petList = possible
          }
        }

        if (!Array.isArray(petList)) {
          // ensure fallback to empty array
          petList = []
        }

        if (mounted) {
          setPets(petList)
          if (petList.length === 1) {
            // default select the only pet
            setFormData(prev => ({ ...prev, selectedPetUid: petList[0].uid || petList[0].id || '' }))
          }
          // If we got no pets but response contained something, log it to help debug
          if (petList.length === 0) {
            console.warn('getAllPetsByOwner returned no pet array. Raw response:', response)
          }
        }
      } catch (err) {
        console.error('Error fetching pets:', err)
        if (mounted) {
          setPetsError('Unable to fetch pets. Please try again.')
        }
      } finally {
        if (mounted) setPetsLoading(false)
      }
    }

    fetPetByOwner()

    return () => { mounted = false }
  }, [])

  return (
    <div className="min-h-screen px-4 py-8 ">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🐾 Pet Behaviourist → Client KYC
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Help us understand your pet's behavioral needs
        </p>

        {submitStatus.message && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitStatus.message}
          </div>
        )}

        {/* PET SELECT DROPDOWN */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select pet *</label>
          {petsLoading ? (
            <div className="text-gray-600">Loading pets...</div>
          ) : petsError ? (
            <div className="text-red-600">{petsError}</div>
          ) : !Array.isArray(pets) || pets.length === 0 ? (
            <div className="text-gray-600">No pets found for your account.</div>
          ) : (
            <select
              value={formData.selectedPetUid}
              onChange={(e) => setFormData(prev => ({ ...prev, selectedPetUid: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">-- Select a pet --</option>
              {Array.isArray(pets) && pets.map((pet) => {
                const optionValue = pet.uid || pet.id || ''
                const optionLabel = pet.petName ? `${pet.petName}${pet.petSpecies ? ` (${pet.petSpecies})` : ''}` : (pet.petInfo || optionValue)
                return (
                  <option key={optionValue || optionLabel} value={optionValue}>
                    {optionLabel}
                  </option>
                )
              })}
            </select>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Behavioral Concern Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 1: Behavioral Concern Overview
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. What behavioral challenge(s) are you seeking help with? *
                </label>
                <div className="space-y-2">
                  {[
                    'Separation anxiety',
                    'Aggression',
                    'Excessive barking',
                    'Leash pulling/reactivity',
                    'Destructive behavior',
                    'Fearfulness',
                    'Inappropriate elimination',
                    'Other'
                  ].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.behavioralChallenges.includes(opt)}
                        onChange={() => handleCheckboxArray('behavioralChallenges', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.behavioralChallenges.includes('Aggression') && (
                    <div className="ml-6 mt-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Has your pet bitten a person or other animals? Please describe:
                      </label>
                      <textarea
                        value={formData.aggressionBiteDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, aggressionBiteDescription: e.target.value }))}
                        rows="3"
                        placeholder="Please describe any biting incidents..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}

                  {formData.behavioralChallenges.includes('Other') && (
                    <div className="ml-6 mt-2">
                      <label className="block text-sm text-gray-600 mb-1">Please describe:</label>
                      <input
                        type="text"
                        value={formData.otherBehaviorDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, otherBehaviorDescription: e.target.value }))}
                        placeholder="Describe other behavioral challenge"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. When did the behavior first begin?
                </label>
                <div className="space-y-2">
                  {['As a puppy', 'Within the last year', 'Recently (last 3 months)'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="behaviorStartTime"
                        checked={formData.behaviorStartTime === opt}
                        onChange={() => handleRadio('behaviorStartTime', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. How frequently does the issue occur?
                </label>
                <div className="space-y-2">
                  {['Daily', 'Weekly', 'Occasionally', 'Only in specific situations'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="behaviorFrequency"
                        checked={formData.behaviorFrequency === opt}
                        onChange={() => handleRadio('behaviorFrequency', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.behaviorFrequency === 'Only in specific situations' && (
                    <div className="ml-6 mt-2">
                      <input
                        type="text"
                        value={formData.specificSituationsDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, specificSituationsDescription: e.target.value }))}
                        placeholder="Please describe the specific situations"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Triggers & Context */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 2: Triggers & Context
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. Are there known triggers for the behavior?
                </label>
               <textarea
  value={formData.knownTriggers}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""); 
    setFormData(prev => ({ ...prev, knownTriggers: cleaned }));
  }}
  rows="3"
  placeholder="e.g., other dogs visitors car rides being left alone"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>


              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. Has the behavior worsened or improved over time?
                </label>
                <div className="space-y-2">
                  {['Improved', 'Worsened', 'Stayed the same'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="behaviorProgress"
                        checked={formData.behaviorProgress === opt}
                        onChange={() => handleRadio('behaviorProgress', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                  <div className="mt-2">
                    <input
  type="text"
  value={formData.behaviorProgressContext}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""); 
    setFormData(prev => ({
      ...prev,
      behaviorProgressContext: cleaned
    }));
  }}
  placeholder="Optional: Add context"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Has your pet shown any aggressive behavior?
                </label>
                <div className="space-y-2">
                  {['Growling', 'Snapping', 'Lunging', 'Biting (human or animal)', 'No aggression observed'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aggressiveBehaviors.includes(opt)}
                        onChange={() => handleCheckboxArray('aggressiveBehaviors', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. Please describe any serious incidents or close calls, if any.
                </label>
                <textarea
  value={formData.seriousIncidents}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      seriousIncidents: cleaned
    }));
  }}
  rows="3"
  placeholder="Describe any serious incidents..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

              </div>
            </div>
          </section>

          {/* Step 3: Training & Tools History */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 3: Training & Tools History
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. Have you worked with a trainer or behaviourist before?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workedWithTrainer"
                      checked={formData.workedWithTrainer === true}
                      onChange={() => handleRadio('workedWithTrainer', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="workedWithTrainer"
                      checked={formData.workedWithTrainer === false}
                      onChange={() => handleRadio('workedWithTrainer', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.workedWithTrainer === true && (
                    <div className="ml-6 mt-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        What approaches were used? What did/didn't work?
                      </label>
                      <textarea
  value={formData.trainerApproaches}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      trainerApproaches: cleaned
    }));
  }}
  rows="3"
  placeholder="Describe your experience..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. Are you currently using any training tools or methods?
                </label>
                <div className="space-y-2">
                  {['Clicker', 'Muzzle', 'Harness', 'Prong collar', 'E-collar', 'Crate training', 'Other'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.currentTrainingTools.includes(opt)}
                        onChange={() => handleCheckboxArray('currentTrainingTools', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.currentTrainingTools.includes('Other') && (
                    <div className="ml-6 mt-2">
                     <input
  type="text"
  value={formData.otherTrainingTool}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      otherTrainingTool: cleaned
    }));
  }}
  placeholder="Please specify"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Is your pet food or toy motivated?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Unsure'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="petMotivation"
                        checked={formData.petMotivation === opt}
                        onChange={() => handleRadio('petMotivation', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.petMotivation === 'Yes' && (
                    <div className="ml-6 mt-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        What are their favorite rewards?
                      </label>
                      <input
                        type="text"
                        value={formData.favoriteRewards}
                        onChange={(e) => setFormData(prev => ({ ...prev, favoriteRewards: e.target.value }))}
                        placeholder="e.g., chicken treats, tennis ball"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Routine & Environment */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 4: Routine & Environment
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-3">
                  1. Describe your pet's daily routine:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Walks per day</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.walksPerDay}
                      onChange={(e) => setIfValid('walksPerDay', e.target.value, /^[0-9]*$/)}
                      placeholder="e.g., 2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Off-leash time</label>
                    <input
  type="text"
  value={formData.offLeashTime}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      offLeashTime: cleaned
    }));
  }}
  placeholder="e.g., 30 minutes"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Time spent alone</label>
                   <input
  type="text"
  value={formData.timeAlone}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      timeAlone: cleaned
    }));
  }}
  placeholder="e.g., 4 hours"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Exercise & stimulation</label>
                    <input
  type="text"
  value={formData.exerciseStimulation}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      exerciseStimulation: cleaned
    }));
  }}
  placeholder="e.g., fetch, puzzle toys"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. Other pets in the household?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="otherPets"
                      checked={formData.otherPets === true}
                      onChange={() => handleRadio('otherPets', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="otherPets"
                      checked={formData.otherPets === false}
                      onChange={() => handleRadio('otherPets', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.otherPets === true && (
                    <div className="ml-6 mt-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        List types, ages, and how they get along:
                      </label>
                      <textarea
  value={formData.otherPetsDetails}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      otherPetsDetails: cleaned
    }));
  }}
  rows="3"
  placeholder="e.g., 1 cat (3 years), gets along well"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Are there children in the home?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="childrenInHome"
                      checked={formData.childrenInHome === true}
                      onChange={() => handleRadio('childrenInHome', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="childrenInHome"
                      checked={formData.childrenInHome === false}
                      onChange={() => handleRadio('childrenInHome', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.childrenInHome === true && (
                    <div className="ml-6 mt-2 space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">What ages?</label>
                        <input
  type="text"
  value={formData.childrenAges}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      childrenAges: cleaned
    }));
  }}
  placeholder="e.g., 5 and 8 years old"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          How does your pet respond with children?
                        </label>
                       <textarea
  value={formData.petResponseWithChildren}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      petResponseWithChildren: cleaned
    }));
  }}
  rows="2"
  placeholder="Describe interaction..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. What kind of home environment do you live in?
                </label>
                <div className="space-y-2">
                  {['Apartment', 'House with yard', 'Shared/communal', 'Other'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="homeEnvironment"
                        checked={formData.homeEnvironment === opt}
                        onChange={() => handleRadio('homeEnvironment', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.homeEnvironment === 'Other' && (
                    <div className="ml-6 mt-2">
                      <input
  type="text"
  value={formData.homeEnvironmentOther}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      homeEnvironmentOther: cleaned
    }));
  }}
  placeholder="Please describe"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Goals & Expectations */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 5: Goals & Expectations
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. What would a successful outcome look like to you?
                </label>
                <textarea
  value={formData.successOutcome}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      successOutcome: cleaned
    }));
  }}
  rows="4"
  placeholder="Describe your goals and expectations..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. Are you open to adjusting your routine or environment?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Not sure'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="openToAdjustments"
                        checked={formData.openToAdjustments === opt}
                        onChange={() => handleRadio('openToAdjustments', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Preferred session type:
                </label>
                <div className="space-y-2">
                  {['In-person', 'Virtual', 'Either is fine'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredSessionType"
                        checked={formData.preferredSessionType === opt}
                        onChange={() => handleRadio('preferredSessionType', opt)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. Any other notes, concerns, or expectations you'd like to share?
                </label>
                <textarea
  value={formData.additionalNotes}
  onChange={(e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setFormData(prev => ({
      ...prev,
      additionalNotes: cleaned
    }));
  }}
  rows="4"
  placeholder="Share any additional information..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
/>

              </div>
            </div>
          </section>

          {/* Consent */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              ✅ Consent
            </h2>

            <div className="space-y-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consentAccuracy}
                  onChange={(e) => setFormData(prev => ({ ...prev, consentAccuracy: e.target.checked }))}
                  className="w-4 h-4 text-primary mt-1 rounded"
                />
                <span className="text-gray-700">
                  I confirm that the information provided is accurate and agree to share this with my assigned behaviour specialist through the Metavet platform. *
                </span>
              </label>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/80 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Behavior Consultation Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PetBehaviorForm
