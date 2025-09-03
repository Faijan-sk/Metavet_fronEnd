import React from 'react'
import { Link } from 'react-router-dom'

const TreatmentPlans = () => {
  const timelineSteps = [
    {
      id: 1,
      title: 'Initial Assessment',
      description:
        "Our veterinarians conduct a thorough diagnosis to understand your pet's specific health concerns, whether it's illness, injury, or ongoing conditions.",
      icon: '🔍',
    },
    {
      id: 2,
      title: 'Personalized Treatment Plan',
      description:
        'We create a tailored approach that may include medications, dietary changes, follow-up visits, surgery, specialized treatments (physical therapy), and preventive care (vaccinations, parasite control).',
      icon: '📋',
    },
    {
      id: 3,
      title: 'Prescription & Guidance',
      description:
        'If medication is required, we provide an Rx with clear explanations of purpose, dosage, and potential side effects. Prescriptions can be filled at our in-house pharmacy, your preferred location, or shipped directly to you.',
      icon: '💊',
    },
    {
      id: 4,
      title: 'Active Monitoring',
      description:
        "Your involvement is crucial for success. Follow prescribed schedules, attend follow-up visits, and contact us immediately if you notice any side effects or changes in your pet's condition.",
      icon: '👥',
    },
    {
      id: 5,
      title: 'Plan Adjustment',
      description:
        "Treatment plans are continuously evaluated and can be adjusted based on your pet's response to ensure optimal outcomes and recovery.",
      icon: '🔄',
    },
  ]

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Treatment Plans / Rx
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A comprehensive approach to managing your pet's health through
          personalized care and expert guidance
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {timelineSteps.map((step, index) => (
          <div
            key={step.id}
            className="relative flex items-start mb-8 last:mb-0"
          >
            {/* Timeline dot */}
            <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center text-2xl z-10 shadow-sm">
              {step.icon}
            </div>

            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Step {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ready to Start Your Pet's Treatment Plan?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact our veterinary team to schedule a consultation and begin
            your pet's journey to better health.
          </p>
          <Link
            to="/appointment"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TreatmentPlans
