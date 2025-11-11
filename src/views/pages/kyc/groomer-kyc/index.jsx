import React, { useState } from 'react'

const PetGroomerKYC = () => {
  const [formData, setFormData] = useState({
    fullLegalName: '',
    businessName: '',
    hasBusinessLicense: null,
    businessLicenseFile: null,
    email: '',
    phone: '',
    address: '',
    serviceLocationType: '',
    yearsExperience: '',

    hasGroomingCert: null,
    groomingCertDetails: '',
    groomingCertFile: null,

    hasFirstAidCert: null,
    firstAidFile: null,

    hasInsurance: null,
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceExpiry: '',
    insuranceFile: null,

    criminalCheck: null,
    criminalCheckFile: null,

    liabilityInsurance: null,
    liabilityProvider: '',
    liabilityPolicyNumber: '',
    liabilityExpiry: '',
    liabilityFile: null,

    hasIncidentPolicy: null,
    incidentPolicyDetails: '',

    servicesOffered: [],
    servicesOtherText: '',
    servicesPrices: '',
    averageAppointmentDuration: '',
    serviceRadius: '',

    declarations: {
      accuracy: false,
      consentVerify: false,
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
  const handleCheckboxArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(i => i !== value) : [...prev[field], value]
    }))
  }
  const handleDeclaration = (key, value) => setFormData(prev => ({ ...prev, declarations: { ...prev.declarations, [key]: value } }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // minimal required checks
    if (!formData.fullLegalName || !formData.email) {
      alert('Please fill required fields: Full legal name and email')
      return
    }
    console.log('Pet Groomer KYC submitted:', formData)
    alert('Pet Groomer KYC submitted — check console for payload.')
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">🧾 Metavet → Pet Groomer KYC </h1>
        <p className="text-center text-gray-600 mb-8">Provider onboarding — grooming services</p>

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
                  placeholder="Business name (if any)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Business License</label>
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
                      <div className="mt-2">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Service Location Type</label>
                  <select
                    value={formData.serviceLocationType}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceLocationType: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option>Mobile</option>
                    <option>Salon</option>
                    <option>Home-based</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.yearsExperience}
                    onChange={(e) => setIfValid('yearsExperience', e.target.value, /^[0-9]*$/u)}
                    placeholder="e.g., 5"
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
                <label className="block font-medium text-gray-700 mb-2">Grooming Certifications</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasGroomingCert"
                      checked={formData.hasGroomingCert === true}
                      onChange={() => handleRadio('hasGroomingCert', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasGroomingCert"
                      checked={formData.hasGroomingCert === false}
                      onChange={() => handleRadio('hasGroomingCert', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasGroomingCert === true && (
                    <div className="mt-2 ml-4 space-y-2">
                      <input
                        type="text"
                        value={formData.groomingCertDetails}
                        onChange={(e) => setIfValid('groomingCertDetails', e.target.value, /^[A-Za-z0-9,\s\/.-]*$/u)}
                        placeholder="Upload proof or list details"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <label className="block text-sm text-gray-600">Upload proof (PDF/JPG)</label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange('groomingCertFile', e.target.files[0])}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Pet First Aid Certification</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasFirstAidCert"
                      checked={formData.hasFirstAidCert === true}
                      onChange={() => handleRadio('hasFirstAidCert', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasFirstAidCert"
                      checked={formData.hasFirstAidCert === false}
                      onChange={() => handleRadio('hasFirstAidCert', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasFirstAidCert === true && (
                    <div className="mt-2 ml-4">
                      <label className="block text-sm text-gray-600">Upload proof (PDF/JPG)</label>
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
                <label className="block font-medium text-gray-700 mb-2">Insurance Coverage</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasInsurance"
                      checked={formData.hasInsurance === true}
                      onChange={() => handleRadio('hasInsurance', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasInsurance"
                      checked={formData.hasInsurance === false}
                      onChange={() => handleRadio('hasInsurance', false)}
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
                        value={formData.liabilityExpiry}
                        onChange={(e) => setFormData(prev => ({ ...prev, liabilityExpiry: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
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
                <label className="block font-medium text-gray-700 mb-2">Business License (copy)</label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange('businessLicenseFile', e.target.files[0])}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Do you have a policy for pet incidents or injuries?</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasIncidentPolicy"
                      checked={formData.hasIncidentPolicy === true}
                      onChange={() => handleRadio('hasIncidentPolicy', true)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasIncidentPolicy"
                      checked={formData.hasIncidentPolicy === false}
                      onChange={() => handleRadio('hasIncidentPolicy', false)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-gray-700">No</span>
                  </label>

                  {formData.hasIncidentPolicy === true && (
                    <textarea
                      value={formData.incidentPolicyDetails}
                      onChange={(e) => setIfValid('incidentPolicyDetails', e.target.value, /^[A-Za-z0-9\s,.'"():;\/-]*$/u)}
                      rows="3"
                      placeholder="Please describe your policy..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary mt-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Operations & Services */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">🔧 Operations & Services</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Services Offered</label>
                <div className="space-y-2">
                  {[
                    'Full Groom (bath + cut)',
                    'Bath + brush only',
                    'Nail trim',
                    'Ear cleaning',
                    'Deshedding',
                    'Specialty/creative cut',
                    'Other'
                  ].map(opt => (
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
                      value={formData.servicesOtherText}
                      onChange={(e) => setIfValid('servicesOtherText', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                      placeholder="Please specify other service"
                      className="ml-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Prices of Services Offered</label>
                <input
                  type="text"
                  value={formData.servicesPrices}
                  onChange={(e) => setIfValid('servicesPrices', e.target.value, /^[A-Za-z0-9\s,.'-:/₹]*$/u)}
                  placeholder="e.g., Full groom: ₹800"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Average Appointment Duration (minutes)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.averageAppointmentDuration}
                    onChange={(e) => setIfValid('averageAppointmentDuration', e.target.value, /^[0-9]*$/u)}
                    placeholder="e.g., 60"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Service Radius / Area</label>
                  <input
                    type="text"
                    value={formData.serviceRadius}
                    onChange={(e) => setIfValid('serviceRadius', e.target.value, /^[A-Za-z0-9\s,.'-]*$/u)}
                    placeholder="e.g., 10 km radius"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus;border-primary"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Declarations */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary border-b-2 border-primary pb-2">✅ Declarations</h2>

            <div className="space-y-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.accuracy}
                  onChange={(e) => handleDeclaration('accuracy', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I confirm the accuracy of the provided information.</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.consentVerify}
                  onChange={(e) => handleDeclaration('consentVerify', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I consent to verification by Metavet of insurance, certifications, and background checks.</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarations.comply}
                  onChange={(e) => handleDeclaration('comply', e.target.checked)}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I agree to comply with Metavet’s Provider Code of Conduct and Pet Safety Policy.</span>
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
              Submit Groomer KYC
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PetGroomerKYC
