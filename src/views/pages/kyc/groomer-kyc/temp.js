import React, { useState } from 'react'

const Index = () => {
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
    addOns: []
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted successfully! Check console for data.')
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">
          🧼 Pet Groomer → Client KYC
        </h1>
        <p className="text-center text-gray-600 mb-8">Metavet Pet Grooming Services</p>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                  onChange={(e) => handleInputChange('preferredStyle', e.target.value)}
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
                  onChange={(e) => handleInputChange('avoidFocusAreas', e.target.value)}
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
                      onChange={(e) => handleInputChange('medicationDetails', e.target.value)}
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
                      onChange={(e) => handleInputChange('injurySurgeryDetails', e.target.value)}
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
                  onChange={(e) => handleInputChange('calmingMethods', e.target.value)}
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
                  onChange={(e) => handleInputChange('triggers', e.target.value)}
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
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
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
              className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Submit KYC Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
