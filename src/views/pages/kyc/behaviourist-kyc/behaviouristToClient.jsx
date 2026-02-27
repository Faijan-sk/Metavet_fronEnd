import React, { useEffect, useState } from 'react'
import useJwt from "./../../../../enpoints/jwt/useJwt" 

const PetBehaviorForm = () => {
  const [formData, setFormData] = useState({
    // NOT SENT TO BACKEND, only for UI
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
    workedWithTrainer: null, // backend @NotNull
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
    otherPets: null, // backend @NotNull
    otherPetsDetails: '',
    childrenInHome: null, // backend @NotNull
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

  const [pets, setPets] = useState([])
  const [petsLoading, setPetsLoading] = useState(true)
  const [petsError, setPetsError] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  // ---------- Helpers ----------

  const handleCheckboxArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value]
    }))
  }

  const handleRadio = (field, val) =>
    setFormData(prev => ({ ...prev, [field]: val }))

  const setIfValid = (field, value, regex) => {
    if (value === '' || regex.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  // ---------- SUBMIT ----------

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus({ type: '', message: '' })

    // ---------- FRONTEND VALIDATIONS (mirror backend) ----------

    if (!formData.selectedPetUid) {
      setSubmitStatus({ type: 'error', message: 'Please select a pet from the dropdown.' })
      return
    }

    if (!Array.isArray(formData.behavioralChallenges) || formData.behavioralChallenges.length === 0) {
      setSubmitStatus({ type: 'error', message: 'Please select at least one behavioral challenge.' })
      return
    }

    if (!formData.behaviorStartTime) {
      setSubmitStatus({ type: 'error', message: 'Please select when the behavior first began.' })
      return
    }

    if (!formData.behaviorFrequency) {
      setSubmitStatus({ type: 'error', message: 'Please select how frequently the issue occurs.' })
      return
    }

    if (
      formData.behavioralChallenges.includes('Aggression') &&
      !formData.aggressionBiteDescription.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please describe aggression or biting incidents.'
      })
      return
    }

    if (
      formData.behavioralChallenges.includes('Other') &&
      !formData.otherBehaviorDescription.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please describe the "Other" behavioral challenge.'
      })
      return
    }

    if (
      formData.behaviorFrequency === 'Only in specific situations' &&
      !formData.specificSituationsDescription.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please describe the specific situations where the behavior occurs.'
      })
      return
    }

    if (formData.workedWithTrainer === null) {
      setSubmitStatus({
        type: 'error',
        message: 'Please specify if you have worked with a trainer or behaviourist before.'
      })
      return
    }

    if (
      formData.workedWithTrainer === true &&
      !formData.trainerApproaches.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please describe what approaches the trainer used and what did/didn’t work.'
      })
      return
    }

    if (
      formData.currentTrainingTools.includes('Other') &&
      !formData.otherTrainingTool.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please specify the "Other" training tool you are using.'
      })
      return
    }

    if (
      formData.petMotivation === 'Yes' &&
      !formData.favoriteRewards.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please specify your pet’s favorite rewards.'
      })
      return
    }

    if (formData.otherPets === null) {
      setSubmitStatus({
        type: 'error',
        message: 'Please specify if there are other pets in the household.'
      })
      return
    }

    if (
      formData.otherPets === true &&
      !formData.otherPetsDetails.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please provide details about other pets in the household.'
      })
      return
    }

    if (formData.childrenInHome === null) {
      setSubmitStatus({
        type: 'error',
        message: 'Please specify if there are children in the home.'
      })
      return
    }

    if (formData.childrenInHome === true) {
      if (!formData.childrenAges.trim()) {
        setSubmitStatus({
          type: 'error',
          message: 'Please specify the ages of the children in the home.'
        })
        return
      }
      if (!formData.petResponseWithChildren.trim()) {
        setSubmitStatus({
          type: 'error',
          message: 'Please describe how your pet responds with children.'
        })
        return
      }
    }

    if (!formData.homeEnvironment) {
      setSubmitStatus({
        type: 'error',
        message: 'Please select your home environment.'
      })
      return
    }

    if (
      formData.homeEnvironment === 'Other' &&
      !formData.homeEnvironmentOther.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please describe your home environment.'
      })
      return
    }

    if (!formData.consentAccuracy) {
      setSubmitStatus({
        type: 'error',
        message: 'Please confirm that the information provided is accurate (consent checkbox).'
      })
      return
    }

    setIsSubmitting(true)

    try {
      // ---------- BUILD PAYLOAD EXACTLY LIKE DTO ----------
      const payload = {
        petUid: formData.selectedPetUid,

        // Step 1
        behavioralChallenges: Array.isArray(formData.behavioralChallenges)
          ? formData.behavioralChallenges
          : (formData.behavioralChallenges
            ? [formData.behavioralChallenges]
            : []),
        aggressionBiteDescription: formData.aggressionBiteDescription || null,
        otherBehaviorDescription: formData.otherBehaviorDescription || null,
        behaviorStartTime: formData.behaviorStartTime || '',
        behaviorFrequency: formData.behaviorFrequency || '',
        specificSituationsDescription: formData.specificSituationsDescription || null,

        // Step 2
        knownTriggers: formData.knownTriggers || null,
        behaviorProgress: formData.behaviorProgress || null,
        behaviorProgressContext: formData.behaviorProgressContext || null,
        aggressiveBehaviors: Array.isArray(formData.aggressiveBehaviors)
          ? formData.aggressiveBehaviors
          : (formData.aggressiveBehaviors
            ? [formData.aggressiveBehaviors]
            : []),
        seriousIncidents: formData.seriousIncidents || null,

        // Step 3
        workedWithTrainer: formData.workedWithTrainer,
        trainerApproaches: formData.trainerApproaches || null,
        currentTrainingTools: Array.isArray(formData.currentTrainingTools)
          ? formData.currentTrainingTools
          : (formData.currentTrainingTools
            ? [formData.currentTrainingTools]
            : []),
        otherTrainingTool: formData.otherTrainingTool || null,
        petMotivation: formData.petMotivation || null,
        favoriteRewards: formData.favoriteRewards || null,

        // Step 4
        walksPerDay: formData.walksPerDay || null,
        offLeashTime: formData.offLeashTime || null,
        timeAlone: formData.timeAlone || null,
        exerciseStimulation: formData.exerciseStimulation || null,
        otherPets: formData.otherPets,
        otherPetsDetails: formData.otherPetsDetails || null,
        childrenInHome: formData.childrenInHome,
        childrenAges: formData.childrenAges || null,
        petResponseWithChildren: formData.petResponseWithChildren || null,
        homeEnvironment: formData.homeEnvironment || '',
        homeEnvironmentOther: formData.homeEnvironmentOther || null,

        // Step 5
        successOutcome: formData.successOutcome || null,
        openToAdjustments: formData.openToAdjustments || null,
        preferredSessionType: formData.preferredSessionType || null,
        additionalNotes: formData.additionalNotes || null,

        // Consent
        consentAccuracy: formData.consentAccuracy
      }

      // console.log('Submitting behavior form payload (JSON):', payload)

      // 🔥 yahi line se API hit hogi:
      const apiResponse = await useJwt.behaviouristToClientKyc(payload)

      // ---------- Axios style response handling ----------
      let success = false
      let backendMessage = 'Behaviorist KYC created successfully.'
      let responseData = null

      if (apiResponse && apiResponse.data) {
        responseData = apiResponse.data
        success = apiResponse.data.success !== false
        if (apiResponse.data.message) {
          backendMessage = apiResponse.data.message
        }
      } else {
        // Agar tumhara behaviouristToClientKyc direct JSON return kare to:
        responseData = apiResponse
        success = true
      }

      if (success) {
        setSubmitStatus({
          type: 'success',
          message: backendMessage
        })

        // reset (pet selection ko rehne do)
        setFormData(prev => ({
          ...prev,
          behavioralChallenges: [],
          aggressionBiteDescription: '',
          otherBehaviorDescription: '',
          behaviorStartTime: '',
          behaviorFrequency: '',
          specificSituationsDescription: '',
          knownTriggers: '',
          behaviorProgress: '',
          behaviorProgressContext: '',
          aggressiveBehaviors: [],
          seriousIncidents: '',
          workedWithTrainer: null,
          trainerApproaches: '',
          currentTrainingTools: [],
          otherTrainingTool: '',
          petMotivation: '',
          favoriteRewards: '',
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
          successOutcome: '',
          openToAdjustments: '',
          preferredSessionType: '',
          additionalNotes: '',
          consentAccuracy: false
        }))
      } else {
        const msg =
          (responseData && responseData.message) ||
          'Failed to submit behaviorist KYC. Please check your inputs and try again.'
        setSubmitStatus({ type: 'error', message: msg })
      }

    } catch (error) {
      console.error('Error submitting form:', error)
      const msg =
        (error &&
          error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        'Failed to submit form. Please try again.'
      setSubmitStatus({
        type: 'error',
        message: msg
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ---------- FETCH PETS ON MOUNT ----------

  useEffect(() => {
    let mounted = true

    async function fetchPetByOwner() {
      setPetsLoading(true)
      setPetsError(null)
      try {
        const response = await useJwt.getAllPetsByOwner()

        let petList = []

        if (Array.isArray(response)) {
          petList = response
        } else if (response && Array.isArray(response.data)) {
          petList = response.data
        } else if (response && response.data && Array.isArray(response.data.data)) {
          petList = response.data.data
        } else if (response && Array.isArray(response.pets)) {
          petList = response.pets
        } else if (response && response.data && typeof response.data === 'object') {
          const possible = Object.values(response.data).filter(v => Array.isArray(v)).flat()
          if (possible.length) petList = possible
        }

        if (!Array.isArray(petList)) {
          petList = []
        }

        if (mounted) {
          setPets(petList)
          if (petList.length === 1) {
            const first = petList[0]
            const uidVal = first.uid || first.id || ''
            setFormData(prev => ({
              ...prev,
              selectedPetUid: uidVal
            }))
          }
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

    fetchPetByOwner()

    return () => { mounted = false }
  }, [])  // 👈 useJwt dependency ki zaroorat nahi, yeh imported singleton hai

  // ---------- RENDER ----------

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🐾 Pet Behaviourist → Client KYC
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Help us understand your pet&apos;s behavioral needs
        </p>

        {submitStatus.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
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
              onChange={(e) =>
                setFormData(prev => ({ ...prev, selectedPetUid: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">-- Select a pet --</option>
              {Array.isArray(pets) &&
                pets.map((pet) => {
                  const optionValue = pet.uid || pet.id || ''
                  const optionLabel = pet.petName
                    ? `${pet.petName}${pet.petSpecies ? ` (${pet.petSpecies})` : ''}`
                    : (pet.petInfo || optionValue)
                  return (
                    <option key={optionValue || optionLabel} value={optionValue}>
                      {optionLabel}
                    </option>
                  )
                })}
            </select>
          )}
        </div>

        {/* =================== FORM =================== */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Behavioral Concern Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">
              🔹 Step 1: Behavioral Concern Overview
            </h2>

            <div className="space-y-4">
              {/* 1. Behavioral challenges */}
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
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, aggressionBiteDescription: e.target.value }))
                        }
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
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            otherBehaviorDescription: e.target.value
                          }))
                        }
                        placeholder="Describe other behavioral challenge"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 2. behaviorStartTime */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. When did the behavior first begin? *
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

              {/* 3. behaviorFrequency */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. How frequently does the issue occur? *
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
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            specificSituationsDescription: e.target.value
                          }))
                        }
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
              {/* knownTriggers */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. Are there known triggers for the behavior?
                </label>
                <textarea
                  value={formData.knownTriggers}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, knownTriggers: e.target.value }))
                  }
                  rows="3"
                  placeholder="e.g., other dogs, visitors, car rides, being left alone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* behaviorProgress */}
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
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          behaviorProgressContext: e.target.value
                        }))
                      }
                      placeholder="Optional: Add context"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* aggressiveBehaviors */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Has your pet shown any aggressive behavior?
                </label>
                <div className="space-y-2">
                  {[
                    'Growling',
                    'Snapping',
                    'Lunging',
                    'Biting (human or animal)',
                    'No aggression observed'
                  ].map(opt => (
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

              {/* seriousIncidents */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. Please describe any serious incidents or close calls, if any.
                </label>
                <textarea
                  value={formData.seriousIncidents}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, seriousIncidents: e.target.value }))
                  }
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
              {/* workedWithTrainer */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. Have you worked with a trainer or behaviourist before? *
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
                        What approaches were used? What did/didn&apos;t work?
                      </label>
                      <textarea
                        value={formData.trainerApproaches}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            trainerApproaches: e.target.value
                          }))
                        }
                        rows="3"
                        placeholder="Describe your experience..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* currentTrainingTools */}
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
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            otherTrainingTool: e.target.value
                          }))
                        }
                        placeholder="Please specify"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* petMotivation */}
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
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            favoriteRewards: e.target.value
                          }))
                        }
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
              {/* Daily routine */}
              <div>
                <label className="block font-medium text-gray-700 mb-3">
                  1. Describe your pet&apos;s daily routine:
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
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, offLeashTime: e.target.value }))
                      }
                      placeholder="e.g., 30 minutes"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Time spent alone</label>
                    <input
                      type="text"
                      value={formData.timeAlone}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, timeAlone: e.target.value }))
                      }
                      placeholder="e.g., 4 hours"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Exercise & stimulation
                    </label>
                    <input
                      type="text"
                      value={formData.exerciseStimulation}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          exerciseStimulation: e.target.value
                        }))
                      }
                      placeholder="e.g., fetch, puzzle toys"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* otherPets */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  2. Other pets in the household? *
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
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            otherPetsDetails: e.target.value
                          }))
                        }
                        rows="3"
                        placeholder="e.g., 1 cat (3 years), gets along well"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* childrenInHome */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  3. Are there children in the home? *
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
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              childrenAges: e.target.value
                            }))
                          }
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
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              petResponseWithChildren: e.target.value
                            }))
                          }
                          rows="2"
                          placeholder="Describe interaction..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* homeEnvironment */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. What kind of home environment do you live in? *
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
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            homeEnvironmentOther: e.target.value
                          }))
                        }
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
              {/* successOutcome */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  1. What would a successful outcome look like to you?
                </label>
                <textarea
                  value={formData.successOutcome}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, successOutcome: e.target.value }))
                  }
                  rows="4"
                  placeholder="Describe your goals and expectations..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* openToAdjustments */}
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

              {/* preferredSessionType */}
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

              {/* additionalNotes */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  4. Any other notes, concerns, or expectations you&apos;d like to share?
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      additionalNotes: e.target.value
                    }))
                  }
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
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, consentAccuracy: e.target.checked }))
                  }
                  className="w-4 h-4 text-primary mt-1 rounded"
                />
                <span className="text-gray-700">
                  I confirm that the information provided is accurate and agree to share this with
                  my assigned behaviour specialist through the Metavet platform. *
                </span>
              </label>
            </div>
          </section>

          {/* Submit button */}
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
