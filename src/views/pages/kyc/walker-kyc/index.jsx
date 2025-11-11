import React, { useState } from 'react'

const PetWalkerProviderKYC = () => {
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
    certificationFile: null,

    bondedOrInsured: null,
    bondedFile: null,

    hasFirstAid: null,
    firstAidFile: null,

    criminalCheck: null,
    criminalCheckFile: null,

    liabilityInsurance: null,
    liabilityProvider: '',
    liabilityPolicyNumber: '',
    insuranceExpiry: '',
    liabilityFile: null,

    businessLicenseFile: null,

    walkRadius: '',
    maxPetsPerWalk: '',
    preferredCommunication: '',

    declarations: {
      accurate: false,
      verifyOK: false,
      comply: false
    },

    signature: '',
    signatureDate: ''
  })

  // Generic setter that validates input against a provided regex.
  // Allows empty string so users can clear fields.
  const setIfValid = (field, value, regex) => {
    if (value === '' || regex.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleRadio = (field, val) => setFormData(prev => ({ ...prev, [field]: val }))
  const handleFileChange = (field, file) => setFormData(prev => ({ ...prev, [field]: file }))
  const handleDeclaration = (key, value) => setFormData(prev => ({ ...prev, declarations: { ...prev.declarations, [key]: value } }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // minimal required checks
    if (!formData.fullLegalName || !formData.email) {
      alert('Please fill required fields: Full legal name and email')
      return
    }
    console.log('Pet Walker Provider KYC submitted:', formData)
    alert('Form submitted — check console for payload.')
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">🚶 Metavet → Pet Walker KYC Summary</h1>
        <p className="text-center text-gray-600 mb-8">Provider onboarding — walking services</p>

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
                    onChange={(e) => setIfValid('phone', e.target.value, /^[0-9+\-\s]*$/u)}
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
                    onChange={(e) => setIfValid('yearsExperience', e.target.value, /^[0-9\- ]*$/u)}
                    placeholder="e.g., 2 or 1-3"
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
                      name="hasCertifications"
                      checked={formData.hasCertifications === true}
                      onChange={() => handleRadio('hasCertifications', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasCertifications"
                      checked={formData.hasCertifications === false}
                      onChange={() => handleRadio('hasCertifications', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasCertifications === true && (
                    <div className="mt-2 ml-4 space-y-2">
                      <input
                        type="text"
                        value={formData.certificationDetails}
                        onChange={(e) => setIfValid('certificationDetails', e.target.value, /^[A-Za-z0-9,\s\/.-]*$/u)}
                        placeholder="List certifications (or brief details)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <label className="block text-sm text-gray-600">Upload proof (PDF/JPG)</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('certificationFile', e.target.files[0])}
                        className="mt-1"
                      />
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
                      <label className="block text-sm text-gray-600">Upload documentation</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('bondedFile', e.target.files[0])}
                        className="mt-1"
                      />
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
                      <label className="block text-sm text-gray-600">Upload proof</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('firstAidFile', e.target.files[0])}
                        className="mt-1"
                      />
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
                        placeholder="Provider name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <input
                        type="text"
                        value={formData.liabilityPolicyNumber}
                        onChange={(e) => setIfValid('liabilityPolicyNumber', e.target.value, /^[A-Za-z0-9-]*$/u)}
                        placeholder="Policy number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <input
                        type="date"
                        value={formData.insuranceExpiry}
                        onChange={(e) => setFormData(prev => ({ ...prev, insuranceExpiry: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <label className="block text-sm text-gray-600">Upload certificate</label>
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
                <label className="block font-medium text-gray-700 mb-2">Upload Business License (if applicable)</label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileChange('businessLicenseFile', e.target.files[0])}
                />
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
                  onChange={(e) => setIfValid('walkRadius', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                  placeholder="e.g., 5 km radius"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <option>In-app</option>
                    <option>Text</option>
                    <option>Call</option>
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
                  checked={formData.declarations.accurate}
                  onChange={(e) => handleDeclaration('accurate', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I confirm all provided information is accurate and current.</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.verifyOK}
                  onChange={(e) => handleDeclaration('verifyOK', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I acknowledge Metavet may verify my insurance, certifications, and background prior to activation or renewal of my provider account.</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.comply}
                  onChange={(e) => handleDeclaration('comply', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I agree to comply with Metavet’s Provider Code of Conduct and Pet Safety Standards.</span>
              </label>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Signature (type full name)</label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setIfValid('signature', e.target.value, /^[A-Za-z\s.'-]*$/u)}
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, signatureDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Submit Walker KYC
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PetWalkerProviderKYC
