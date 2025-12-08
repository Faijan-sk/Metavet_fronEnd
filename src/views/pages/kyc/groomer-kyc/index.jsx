import React, { useState } from 'react'
import useJwt from "./../../../../enpoints/jwt/useJwt"

// 🔹 1. Initial state ko function me nikalo
const getInitialFormData = () => ({
  fullLegalName: '',
  businessName: '',
  hasBusinessLicense: null,
  businessLicenseDoc: null,
  email: '',
  phone: '',
  address: '',
  serviceLocationType: '',
  yearsExperience: '',

  hasGroomingCert: null,
  groomingCertDetails: '',
  GroomingCertificateDoc: null,

  hasFirstAidCert: null,
  firstAidCertificateDoc: null,

  hasInsurance: null,
  insuranceProvider: '',
  insurancePolicyNumber: '',
  insuranceExpiry: '',
  insuranceDoc: null,

  criminalCheck: null,
  crimialRecordDoc: null,

  liabilityInsurance: null,
  liabilityProvider: '',
  liabilityPolicyNumber: '',
  liabilityExpiry: '',
  liabilityInsuaranceDoc: null,

  hasIncidentPolicy: null,
  incidentPolicyDetails: '',

  servicesOffered: [],
  servicesOtherText: '',
  servicesPrices: '',
  averageAppointmentDuration: '',
  serviceRadius: '',

  declarationAccuracy: false,
  declarationConsentVerify: false,
  declarationComply: false,

  signature: '',
  signatureDate: ''
})

const PetGroomerKYC = () => {
  // 🔹 2. yahan function se initial state lo
  const [formData, setFormData] = useState(getInitialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

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
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value]
    }))
  }

  const mapServiceToEnum = (service) => {
    const serviceMap = {
      'Full Groom (bath + cut)': 'FULL_GROOM',
      'Bath + brush only': 'BATH_BRUSH',
      'Nail trim': 'NAIL_TRIM',
      'Ear cleaning': 'EAR_CLEANING',
      'Deshedding': 'DESHEDDING',
      'Specialty/creative cut': 'SPECIALTY_CUT',
      'Other': 'OTHER'
    }
    return serviceMap[service] || service
  }

  const mapLocationTypeToEnum = (locationType) => {
    const locationMap = {
      'Mobile': 'MOBILE',
      'Salon': 'SALON',
      'Home-based': 'HOME_BASED'
    }
    return locationMap[locationType] || locationType
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus({ type: '', message: '' })

    // validations...
    if (!formData.fullLegalName || !formData.email) {
      setSubmitStatus({ type: 'error', message: 'Please fill required fields: Full legal name and email' })
      return
    }

    if (!formData.declarationAccuracy || !formData.declarationConsentVerify || !formData.declarationComply) {
      setSubmitStatus({ type: 'error', message: 'All declarations must be checked' })
      return
    }

    if (formData.hasBusinessLicense === true && !formData.businessLicenseDoc) {
      setSubmitStatus({ type: 'error', message: 'Business License document is required' })
      return
    }

    if (formData.hasGroomingCert === true && !formData.GroomingCertificateDoc) {
      setSubmitStatus({ type: 'error', message: 'Grooming Certificate document is required' })
      return
    }

    if (formData.hasFirstAidCert === true && !formData.firstAidCertificateDoc) {
      setSubmitStatus({ type: 'error', message: 'First Aid Certificate document is required' })
      return
    }

    if (formData.hasInsurance === true && !formData.insuranceDoc) {
      setSubmitStatus({ type: 'error', message: 'Insurance document is required' })
      return
    }

    if (formData.criminalCheck === true && !formData.crimialRecordDoc) {
      setSubmitStatus({ type: 'error', message: 'Criminal Record document is required' })
      return
    }

    if (formData.liabilityInsurance === true) {
      if (
        !formData.liabilityProvider ||
        !formData.liabilityPolicyNumber ||
        !formData.liabilityExpiry ||
        !formData.liabilityInsuaranceDoc
      ) {
        setSubmitStatus({ type: 'error', message: 'All liability insurance fields and document are required' })
        return
      }
    }

    setIsSubmitting(true)

    try {
      const apiFormData = new FormData()

      // append fields ...
      apiFormData.append('fullLegalName', formData.fullLegalName)
      if (formData.businessName) apiFormData.append('businessName', formData.businessName)
      if (formData.hasBusinessLicense !== null) apiFormData.append('hasBusinessLicense', formData.hasBusinessLicense)
      apiFormData.append('email', formData.email)
      if (formData.phone) apiFormData.append('phone', formData.phone)
      if (formData.address) apiFormData.append('address', formData.address)
      if (formData.serviceLocationType) apiFormData.append('serviceLocationType', mapLocationTypeToEnum(formData.serviceLocationType))
      if (formData.yearsExperience) apiFormData.append('yearsExperience', formData.yearsExperience)

      if (formData.hasGroomingCert !== null) apiFormData.append('hasGroomingCert', formData.hasGroomingCert)
      if (formData.groomingCertDetails) apiFormData.append('groomingCertDetails', formData.groomingCertDetails)
      if (formData.hasFirstAidCert !== null) apiFormData.append('hasFirstAidCert', formData.hasFirstAidCert)

      if (formData.hasInsurance !== null) apiFormData.append('hasInsurance', formData.hasInsurance)
      if (formData.insuranceProvider) apiFormData.append('insuranceProvider', formData.insuranceProvider)
      if (formData.insurancePolicyNumber) apiFormData.append('insurancePolicyNumber', formData.insurancePolicyNumber)
      if (formData.insuranceExpiry) apiFormData.append('insuranceExpiry', formData.insuranceExpiry)

      if (formData.criminalCheck !== null) apiFormData.append('criminalCheck', formData.criminalCheck)

      if (formData.liabilityInsurance !== null) apiFormData.append('liabilityInsurance', formData.liabilityInsurance)
      if (formData.liabilityProvider) apiFormData.append('liabilityProvider', formData.liabilityProvider)
      if (formData.liabilityPolicyNumber) apiFormData.append('liabilityPolicyNumber', formData.liabilityPolicyNumber)
      if (formData.liabilityExpiry) apiFormData.append('liabilityExpiry', formData.liabilityExpiry)

      if (formData.hasIncidentPolicy !== null) apiFormData.append('hasIncidentPolicy', formData.hasIncidentPolicy)
      if (formData.incidentPolicyDetails) apiFormData.append('incidentPolicyDetails', formData.incidentPolicyDetails)

      if (formData.servicesOffered.length > 0) {
        formData.servicesOffered.forEach(service => {
          apiFormData.append('servicesOffered', mapServiceToEnum(service))
        })
      }
      if (formData.servicesOtherText) apiFormData.append('servicesOtherText', formData.servicesOtherText)
      if (formData.servicesPrices) apiFormData.append('servicesPrices', formData.servicesPrices)
      if (formData.averageAppointmentDuration) apiFormData.append('averageAppointmentDuration', formData.averageAppointmentDuration)
      if (formData.serviceRadius) apiFormData.append('serviceRadius', formData.serviceRadius)

      apiFormData.append('declarationAccuracy', formData.declarationAccuracy)
      apiFormData.append('declarationConsentVerify', formData.declarationConsentVerify)
      apiFormData.append('declarationComply', formData.declarationComply)
      if (formData.signature) apiFormData.append('signature', formData.signature)
      if (formData.signatureDate) apiFormData.append('signatureDate', formData.signatureDate)

      if (formData.businessLicenseDoc) apiFormData.append('businessLicenseDoc', formData.businessLicenseDoc)
      if (formData.GroomingCertificateDoc) apiFormData.append('GroomingCertificateDoc', formData.GroomingCertificateDoc)
      if (formData.firstAidCertificateDoc) apiFormData.append('firstAidCertificateDoc', formData.firstAidCertificateDoc)
      if (formData.insuranceDoc) apiFormData.append('insuranceDoc', formData.insuranceDoc)
      if (formData.crimialRecordDoc) apiFormData.append('crimialRecordDoc', formData.crimialRecordDoc)
      if (formData.liabilityInsuaranceDoc) apiFormData.append('liabilityInsuaranceDoc', formData.liabilityInsuaranceDoc)

      console.log('Submitting FormData:', [...apiFormData.entries()])

      const response = await useJwt.metavetToGroomerKyc(apiFormData)
      console.log('******** API Response ********', response)

      setSubmitStatus({ type: 'success', message: 'Groomer KYC submitted successfully!' })

      // 🔹 3. SUCCESS ke baad form reset
      setFormData(getInitialFormData())
      // (optional) agar form ke native controls bhi reset karne hain:
      // e.target.reset()

    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: error?.response?.data || 'Failed to submit KYC. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen px-4 py-8 ">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-800">🧾 Metavet → Pet Groomer KYC</h1>
        <p className="text-center text-gray-600 mb-8">Provider onboarding — grooming services</p>

        {submitStatus.message && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitStatus.message}
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
                          accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                          onChange={(e) => handleFileChange('businessLicenseDoc', e.target.files[0])}
                          className="mt-1 text-sm"
                        />
                        {formData.businessLicenseDoc && (
                          <p className="text-xs text-green-600 mt-1">✓ {formData.businessLicenseDoc.name}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                    onKeyDown={(e) => {
                      const allowed = /^[a-zA-Z0-9@._-]$/;

                      if (
                        !allowed.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "Tab" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Phone</label>
                 <input
  type="tel"
  inputMode="tel"
  value={formData.phone}
  onChange={(e) => {
    const raw = e.target.value;
    // keep only digits to count them
    const digits = raw.replace(/\D/g, '');
    // if more than 10 digits, ignore the new input
    if (digits.length > 10) return;
    // allow formatted input (spaces, +, -) but ensure pattern still applied by setIfValid
    // using same regex as before
    const allowedPattern = /^[0-9+\-\s]*$/u;
    if (raw === '' || allowedPattern.test(raw)) {
      setFormData(prev => ({ ...prev, phone: raw }));
    }
  }}
  placeholder="+91 98765 43210"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
  maxLength={16}
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
                        placeholder="Certificate details"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <label className="block text-sm text-gray-600">Upload proof (PDF/JPG)</label>
                      <input
                        type="file"
                        accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('GroomingCertificateDoc', e.target.files[0])}
                        className="mt-1 text-sm"
                      />
                      {formData.GroomingCertificateDoc && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.GroomingCertificateDoc.name}</p>
                      )}
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
                        accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('firstAidCertificateDoc', e.target.files[0])}
                        className="mt-1 text-sm"
                      />
                      {formData.firstAidCertificateDoc && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.firstAidCertificateDoc.name}</p>
                      )}
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
                        accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('insuranceDoc', e.target.files[0])}
                        className="mt-1 text-sm"
                      />
                      {formData.insuranceDoc && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.insuranceDoc.name}</p>
                      )}
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
                        accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('crimialRecordDoc', e.target.files[0])}
                        className="mt-1 text-sm"
                      />
                      {formData.crimialRecordDoc && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.crimialRecordDoc.name}</p>
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
                        accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileChange('liabilityInsuaranceDoc', e.target.files[0])}
                        className="mt-1 text-sm"
                      />
                      {formData.liabilityInsuaranceDoc && (
                        <p className="text-xs text-green-600 mt-1">✓ {formData.liabilityInsuaranceDoc.name}</p>
                      )}
                    </div>
                  )}
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
                  placeholder="e.g., Full groom: $800"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
                  checked={formData.declarationAccuracy}
                  onChange={(e) => setFormData(prev => ({ ...prev, declarationAccuracy: e.target.checked }))}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I confirm the accuracy of the provided information. *</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarationConsentVerify}
                  onChange={(e) => setFormData(prev => ({ ...prev, declarationConsentVerify: e.target.checked }))}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I consent to verification by Metavet of insurance, certifications, and background checks. *</span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.declarationComply}
                  onChange={(e) => setFormData(prev => ({ ...prev, declarationComply: e.target.checked }))}
                  className="w-4 h-4 text-primary mt-1"
                />
                <span className="text-gray-700">I agree to comply with Metavet's Provider Code of Conduct and Pet Safety Policy. *</span>
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
    min={new Date().toISOString().split("T")[0]}   // ← blocks past dates
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, signatureDate: e.target.value }))
    }
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
  />
</div>

            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Groomer KYC'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PetGroomerKYC
