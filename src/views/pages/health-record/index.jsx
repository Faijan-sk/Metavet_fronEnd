
import { useState } from 'react'

import DoctorProfile from "./../../../assets/MetavetImages/Dr profile/dr4.png"

// Example doctor images
const doctorImages = {
  'Dr. Michael':
    './src/assets/MetavetImages/portrait-3d-male-doctor-removebg-preview.png',
  'Dr. Jasmine': './src/assets/MetavetImages/dr3.png',
  'Dr. Diannel': './src/assets/MetavetImages/dr4.png',
}

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      pet: 'Max',
      doctor: 'Dr. Michael',
      petType: 'Dog',
      date: '2024-10-05',
      time: '10:00 AM',
      reason: 'Vaccination',
      notes: 'Bring vaccination records',
    },
    {
      id: 2,
      pet: 'Bella',
      doctor: 'Dr. Jasmine',
      petType: 'Cat',
      date: '2024-10-06',
      time: '2:00 PM',
      reason: 'Annual Check-up',
      notes: 'Need to discuss diet',
    },
    {
      id: 3,
      pet: 'Charlie',
      doctor: 'Dr. Diannel',
      petType: 'Dog',
      date: '2024-10-10',
      time: '1:00 PM',
      reason: 'Dental Cleaning',
      notes: 'Monitor allergies',
    },
    {
      id: 4,
      pet: 'Luna',
      doctor: 'Dr. Michael',
      petType: 'Rabbit',
      date: '2024-10-12',
      time: '11:30 AM',
      reason: 'Wellness Check',
      notes: 'Confirm spay Status',
    },
    {
      id: 5,
      pet: 'Daisy',
      doctor: 'Dr. Jasmine',
      petType: 'Dog',
      date: '2024-10-15',
      time: '3:00 PM',
      reason: 'Behaviour Consultation',
      notes: 'Check for anxiety issues',
    },
    {
      id: 6,
      pet: 'Max',
      doctor: 'Dr. Diannel',
      petType: 'Dog',
      date: '2024-10-05',
      time: '10:00 AM',
      reason: 'Vaccination',
      notes: 'Bring vaccination records',
    },
    {
      id: 7,
      pet: 'Bella',
      doctor: 'Dr. Michael',
      petType: 'Cat',
      date: '2024-10-06',
      time: '2:00 PM',
      reason: 'Annual Check-up',
      notes: 'Need to discuss diet',
    },
    {
      id: 8,
      pet: 'Charlie',
      doctor: 'Dr. Jasmine',
      petType: 'Dog',
      date: '2024-10-10',
      time: '1:00 PM',
      reason: 'Dental Cleaning',
      notes: 'Monitor allergies',
    },
    {
      id: 9,
      pet: 'Luna',
      doctor: 'Dr. Diannel',
      petType: 'Rabbit',
      date: '2024-10-12',
      time: '11:30 AM',
      reason: 'Wellness Check',
      notes: 'Confirm spay Status',
    },
    {
      id: 10,
      pet: 'Daisy',
      doctor: 'Dr. Michael',
      petType: 'Dog',
      date: '2024-10-15',
      time: '3:00 PM',
      reason: 'Behaviour Consultation',
      notes: 'Check for anxiety issues',
    },
  ])

  const [editAppointment, setEditAppointment] = useState(null)
  const [originalAppointment, setOriginalAppointment] = useState(null)

  const handleEdit = (appointment) => {
    setOriginalAppointment({ ...appointment })
    setEditAppointment({ ...appointment })
  }

  const handleSaveEdit = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === editAppointment.id ? editAppointment : appointment
      )
    )
    setEditAppointment(null)
    setOriginalAppointment(null)
  }

  const handleCancelEdit = () => {
    setEditAppointment(null)
    setOriginalAppointment(null)
  }

  const handleDelete = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditAppointment((prevEdit) => ({
      ...prevEdit,
      [name]: value,
    }))
  }

  return (
    <div className="py-6 px-4">
      <p className="text-center text-3xl font-semibold">Health Record</p>

      {/* Horizontal scroll below xl */}
      <div className="overflow-x-auto xl:overflow-visible mt-10">
        <table className="min-w-[1200px] xl:min-w-full table-auto bg-white border-collapse">
          <thead>
            <tr className="border-b bg-primary">
              <th className="px-4 py-2 text-left font-semibold text-white">
                #
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Doctor
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Vet/Provider Name
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Pet Type
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Appointment Date
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Time
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Reason
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Notes
              </th>
              <th className="px-4 py-2 text-left font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {appointment.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 flex items-center">
                  <img
                    src={DoctorProfile}
                    alt={appointment.doctor}
                    className="w-24 h-20 mt-4 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <input
                      type="text"
                      name="doctor"
                      value={editAppointment.doctor}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border"
                    />
                  ) : (
                    appointment.doctor
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <input
                      type="text"
                      name="petType"
                      value={editAppointment.petType}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border"
                    />
                  ) : (
                    appointment.petType
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <input
                      type="date"
                      name="date"
                      value={editAppointment.date}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border"
                    />
                  ) : (
                    appointment.date
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <input
                      type="time"
                      name="time"
                      value={editAppointment.time}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border"
                    />
                  ) : (
                    appointment.time
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <input
                      type="text"
                      name="reason"
                      value={editAppointment.reason}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border"
                    />
                  ) : (
                    appointment.reason
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <textarea
                      name="notes"
                      value={editAppointment.notes}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 rounded border"
                    />
                  ) : (
                    appointment.notes
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {editAppointment?.id === appointment.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="btn w-full bg-primary text-white mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn w-full bg-primary text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="btn w-full hover:bg-primary hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="btn w-full hover:bg-primary hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appointment
