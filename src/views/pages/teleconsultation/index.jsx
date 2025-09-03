import React from 'react'
import {
  Smartphone,
  User,
  Search,
  Calendar,
  CheckCircle,
  Video,
  Wifi,
  Lightbulb,
  FileText,
  MessageSquare,
} from 'lucide-react'

const Teleconsultation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Teleconsultation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expert veterinary care delivered directly to your home through
            secure video consultations, available whenever you need us.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* What is Teleconsultation */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <div className="flex items-center mb-6">
            <Video className="w-8 h-8 text-primary mr-4" />
            <h2 className="text-2xl font-light text-gray-900">
              What is Teleconsultation?
            </h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Teleconsultation offers you the convenience of connecting with a
            veterinary professional 24/7 via video call, phone call, or live
            chat. This service is ideal for addressing minor health concerns,
            behavioral issues, or seeking general advice about your animal's
            well-being without having to leave your home.
          </p>
        </div>

        {/* When to Use - Clean List */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            When to Use Teleconsultation
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: CheckCircle,
                title: 'Minor Health Concerns',
                desc: "Assess slight changes in your pet's behavior, appetite, or energy levels.",
              },
              {
                icon: FileText,
                title: 'Routine Advice',
                desc: 'General health questions, vaccination schedules, nutrition & grooming guidance.',
              },
              {
                icon: MessageSquare,
                title: 'Behavioral Issues',
                desc: 'Discuss and treat anxiety, barking, scratching, or other behavioral concerns.',
              },
              {
                icon: Calendar,
                title: 'Follow-up Care',
                desc: 'Post-surgery or ongoing care updates without the need to visit the clinic.',
              },
              {
                icon: Smartphone,
                title: 'Prescription Management',
                desc: 'Ongoing medication management, refills, or prescription adjustments.',
              },
              {
                icon: Search,
                title: 'Remote Areas',
                desc: 'Access to health services in underserved or remote locations.',
              },
              {
                icon: Lightbulb,
                title: 'Emergency Triage',
                desc: 'Assess whether a visit to the clinic is necessary.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4 mt-1">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Book - Timeline */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            How to Book a Teleconsultation
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            <div className="space-y-8">
              {[
                {
                  icon: Smartphone,
                  title: 'Download the Metavet App',
                  step: '01',
                },
                {
                  icon: User,
                  title: 'Complete Pet & Personal Profile',
                  step: '02',
                },
                {
                  icon: Search,
                  title: 'Explore Available Veterinarians',
                  step: '03',
                },
                {
                  icon: Calendar,
                  title: 'Schedule an Appointment',
                  step: '04',
                },
                {
                  icon: CheckCircle,
                  title: 'Prepare for Your Call',
                  step: '05',
                },
                { icon: Video, title: 'Join the Consultation', step: '06' },
              ].map((item, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center mr-6">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <span className="text-sm font-mono text-gray-400">
                        {item.step}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preparation */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            Preparing for Your Call
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <Wifi className="w-6 h-6 text-green-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Check Your Technology
                  </h3>
                  <p className="text-gray-600">
                    Ensure your device has a working camera and microphone, and
                    verify that your internet connection is stable.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Choose a Quiet, Well-lit Space
                  </h3>
                  <p className="text-gray-600">
                    Find a comfortable environment for you and your pet during
                    the consultation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-purple-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Prepare Health Information
                  </h3>
                  <p className="text-gray-600">
                    Have symptoms, history, and vitals ready for the
                    consultation.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MessageSquare className="w-6 h-6 text-primary mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Write Down Any Questions
                  </h3>
                  <p className="text-gray-600">
                    Prepare a list of questions to make the most of your
                    consultation time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teleconsultation
