import React, { useState } from 'react'

const BehaviourSpecialistKYC = () => {
  const [formData, setFormData] = useState({
    fullLegalName: '',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    serviceArea: '',
    yearsExperience: '',

    hasCertifications: null,
    certificationDetails: '',
    certFile: null,

    educationBackground: '',
    hasInsurance: null,
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceExpiry: '',
    insuranceFile: null,

    criminalCheck: null,
    criminalCheckFile: null,

    liabilityInsurance: null,
    liabilityFile: null,
    businessLicense: null,
    businessLicenseFile: null,

    servicesOffered: [],
    specializations: [],
    serviceRadius: '',

    declarations: {
      infoTrue: false,
      verifyOK: false,
      abideStandards: false
    },

    signature: '',
    signatureDate: ''
  })

  // Generic setter with regex validation (allows empty)
  const setIfValid = (field, value, regex) => {
    if (value === '' || regex.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleCheckboxArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value]
    }))
  }

  const handleDeclaration = (key, value) => {
    setFormData(prev => ({ ...prev, declarations: { ...prev.declarations, [key]: value } }))
  }

  const handleFileChange = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // simple required checks
    if (!formData.fullLegalName || !formData.email) {
      alert('Please fill in required fields: Full legal name and email.')
      return
    }

    console.log('Behaviour Specialist KYC submitted:', formData)
    alert('Provider KYC submitted — check console for payload.')
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">🧠 Metavet → Behaviour Specialist KYC</h1>
        <p className="text-center text-gray-600 mb-6">Provider Onboarding — Behaviour & Training Specialists</p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="e.g., Jane Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Business / Operating Name</label>
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
                    onChange={(e) => setIfValid('email', e.target.value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/u)}
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
                    onChange={(e) => setIfValid('phone', e.target.value, /^[0-9+\-\s]{0,20}$/u)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setIfValid('address', e.target.value, /^[A-Za-z0-9\s,.'#\/-]*$/u)}
                    placeholder="Street, City, State, PIN"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Service Area</label>
                  <input
                    type="text"
                    value={formData.serviceArea}
                    onChange={(e) => setIfValid('serviceArea', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                    placeholder="e.g., South Mumbai, 10 km radius"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.yearsExperience}
                    onChange={(e) => setIfValid('yearsExperience', e.target.value, /^[0-9]{0,2}$/u)}
                    placeholder="e.g., 5"
                    pattern="^[0-9]+$"
                    title="Numbers only"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Professional Credentials */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">🎓 Professional Credentials</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Behavioural Certifications</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasCertifications"
                      checked={formData.hasCertifications === true}
                      onChange={() => setFormData(prev => ({ ...prev, hasCertifications: true }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasCertifications"
                      checked={formData.hasCertifications === false}
                      onChange={() => setFormData(prev => ({ ...prev, hasCertifications: false }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasCertifications === true && (
                    <div className="space-y-2 mt-2 ml-4">
                      <input
                        type="text"
                        value={formData.certificationDetails}
                        onChange={(e) => setIfValid('certificationDetails', e.target.value, /^[A-Za-z0-9,\s\/.-]*$/u)}
                        placeholder="e.g., CCPDT, IAABC"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />

                      <label className="block text-sm text-gray-600">Upload proof (PDF/JPG)</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('certFile', e.target.files[0])}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Education Background</label>
                <input
                  type="text"
                  value={formData.educationBackground}
                  onChange={(e) => setIfValid('educationBackground', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                  placeholder="Degrees, institutions"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Insurance Coverage</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasInsurance"
                      checked={formData.hasInsurance === true}
                      onChange={() => setFormData(prev => ({ ...prev, hasInsurance: true }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasInsurance"
                      checked={formData.hasInsurance === false}
                      onChange={() => setFormData(prev => ({ ...prev, hasInsurance: false }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasInsurance === true && (
                    <div className="mt-2 ml-4 space-y-2">
                      <input
                        type="text"
                        value={formData.insuranceProvider}
                        onChange={(e) => setIfValid('insuranceProvider', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                        placeholder="Provider name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />

                      <input
                        type="text"
                        value={formData.insurancePolicyNumber}
                        onChange={(e) => setIfValid('insurancePolicyNumber', e.target.value, /^[A-Za-z0-9-]*$/u)}
                        placeholder="Policy number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />

                      <input
                        type="date"
                        value={formData.insuranceExpiry}
                        onChange={(e) => setFormData(prev => ({ ...prev, insuranceExpiry: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />

                      <label className="block text-sm text-gray-600">Upload Certificate of Insurance</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('insuranceFile', e.target.files[0])}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Criminal Record Check (within 12 months)</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="criminalCheck"
                      checked={formData.criminalCheck === true}
                      onChange={() => setFormData(prev => ({ ...prev, criminalCheck: true }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="criminalCheck"
                      checked={formData.criminalCheck === false}
                      onChange={() => setFormData(prev => ({ ...prev, criminalCheck: false }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.criminalCheck === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload proof (PDF)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange('criminalCheckFile', e.target.files[0])}
                        className="mt-1"
                      />
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
                      onChange={() => setFormData(prev => ({ ...prev, liabilityInsurance: true }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="liabilityInsurance"
                      checked={formData.liabilityInsurance === false}
                      onChange={() => setFormData(prev => ({ ...prev, liabilityInsurance: false }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.liabilityInsurance === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload documentation</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('liabilityFile', e.target.files[0])}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Business License</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="businessLicense"
                      checked={formData.businessLicense === true}
                      onChange={() => setFormData(prev => ({ ...prev, businessLicense: true }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="businessLicense"
                      checked={formData.businessLicense === false}
                      onChange={() => setFormData(prev => ({ ...prev, businessLicense: false }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.businessLicense === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload copy</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('businessLicenseFile', e.target.files[0])}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Practice Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">🔧 Practice Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Services Offered</label>
                <div className="space-y-2">
                  {['Behavioural Consultation', 'Training', 'Follow-up', 'Virtual Sessions', 'Other'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.servicesOffered.includes(opt)}
                        onChange={() => handleCheckboxArray('servicesOffered', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.servicesOffered.includes('Other') && (
                    <input
                      type="text"
                      value={formData.serviceRadius}
                      onChange={(e) => setIfValid('serviceRadius', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                      placeholder="Describe other services or radius"
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Specializations</label>
                <div className="space-y-2">
                  {['Aggression', 'Separation Anxiety', 'Obedience', 'Puppy Training', 'Other'].map(opt => (
                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(opt)}
                        onChange={() => handleCheckboxArray('specializations', opt)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                  {formData.specializations.includes('Other') && (
                    <input
                      type="text"
                      value={formData.serviceRadius}
                      onChange={(e) => setIfValid('serviceRadius', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                      placeholder="Please specify other specialization"
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Service Radius / Availability</label>
                <input
                  type="text"
                  value={formData.serviceRadius}
                  onChange={(e) => setIfValid('serviceRadius', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                  placeholder="e.g., 10 km, Weekdays 9am-5pm"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
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
                  checked={formData.declarations.infoTrue}
                  onChange={(e) => handleDeclaration('infoTrue', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I confirm all information is true and current.</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.verifyOK}
                  onChange={(e) => handleDeclaration('verifyOK', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I understand that Metavet may verify my credentials and insurance before approval.</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.abideStandards}
                  onChange={(e) => handleDeclaration('abideStandards', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I agree to abide by Metavet’s Provider Conduct and Ethical Standards.</span>
              </label>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Signature (type full name)</label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setIfValid('signature', e.target.value, /^[A-Za-z\s.'-]*$/u)}
                  placeholder="Full name as signature"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus;border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, signatureDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus;border-primary"
                />
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Submit Provider KYC
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BehaviourSpecialistKYC
