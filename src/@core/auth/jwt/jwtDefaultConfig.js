// ** Auth Endpoints
export default {

  /*
  * user EendPoints 
  */
  registerEndpoint: '/api/auth/register',
  loginEndpoint: '/api/auth/login',
  otpVerifyEndPoint: '/api/auth/otp/verify-otp',
  getUserByMobileEndPoint : '/api/auth/byNumber',
  serviceProviderCreateEndpoint : '/api/auth/service-provider/create',
  
  /*
  * Doctor EndPoints
  */
  updateDpctorEndPoint: '/api/auth/create',
  getDoctorByIdEndPoint : 'api/doctors',
  getAllDoctorEndPoint : '/api/auth/doctors/available',
  getDoctorBySpecialityEndPoint:'api/doctors/specialization',
  getAllSpecializationEndPoint : 'api/doctors/specializations/available',
  getActiveSpecializationEndPoint : 'api/doctors/specializations/active',
  getOwnDays : "/api/doctor-days/getSelfDays",
  getDoctorSlotByDate: '/api/doctor-days/getSelfAvailableSlots?date={date}',
  getDoctorAllDoctorEndpoint: '/api/auth/doctors/byDistance?lat={lattitude}&lng={longittude}',
  getDoctorWithDistanceEndpoint: '/api/auth/doctors/byDistance?lat={lattitude}&lng={longittude}&distance={distance}',
  /*
  * Pet Endpoint
  */

  getAllPetsByOwnerEndpoint : '/api/pets/owner' ,
  addPetEndPoint : '/api/pets/create-with-image',
  addPetEndpointwithoutImage : '/api/pets/create',
  deletePetEndPoint : '/api/pets/delete/',
  updatePetEndPoint : '/api/pets/update/' ,

  /*
  * Appointment Endponint
  */
  getDoctorByDayEndpoint: '/api/doctor-days/day',
  getDoctorDaysFromDistance : '/api/doctor-days/doctor/{doctorId}',
  fetchAvailableSlotByDoctorEndpoint: '/api/appointments/available-slots',
  fetDoctorDayIdByDoctorAndDay : '/api/doctor-days/doctor',
  fetchAvailableSlotByDoctorEndpoint: '/api/appointments/available-slots',
  bookAppointmentEndPoint : '/api/appointments/book',
  getAppointmentEndpoint: '/api/appointments/my-appointments',
  cancelAppointmentEndpoint : '/api/appointments/my-appointments',
  createAppointmentEndpoint: '/api/doctor-days/days',
  getBookedAppoinmentEndpoint : 'api/appointments/my-appointments-doctor?status=BOOKED',
  bookOfflineAppointment : '/api/appointments/book-offline-simple',
  getSlotByDoctorEndpoint: '/api/appointments/getSlot?doctorId={doctorId}&doctorDayId={doctorDayId}&date={date}',
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh',

  //KYC 
  metavetToWalkerKycEndpoint : '/walkerkyc/create',
  metavetToGroomerKyCEndpoint : '/groomerkyc/create',
  metavetToBehaviouristKycEndPoint: '/behaviouristkyc/create',
  walkerToClientKyc : '/api/walker-kyc',
  groomerToClientKyc : '/api/groomer-kyc',
  behaviouristToClientKyc : '/api/behaviorist-kyc',
}