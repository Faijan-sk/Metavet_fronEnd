// ** Auth Endpoints
export default {

  /*
  * user EendPoints 
  */
  registerEndpoint: '/api/auth/register',
  loginEndpoint: '/api/auth/login',
  otpVerifyEndPoint: '/api/auth/otp/verify-otp',
  getUserByMobileEndPoint : '/api/auth/user/byNumber',
  
  /*
  * Doctor EndPoints
  */
  updateDpctorEndPoint: '/api/auth/doctor/create',
  getDoctorByIdEndPoint : 'api/doctors',
  getAllDoctorEndPoint : '/api/auth/doctors/available',
  getDoctorBySpecialityEndPoint:'api/doctors/specialization',
  getAllSpecializationEndPoint : 'api/doctors/specializations/available',
  getActiveSpecializationEndPoint : 'api/doctors/specializations/active',

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
  fetchAvailableSlotByDoctorEndpoint: '/api/appointments/available-slots',
  fetDoctorDayIdByDoctorAndDay : '/api/doctor-days/doctor',
  fetchAvailableSlotByDoctorEndpoint: '/api/appointments/available-slots',
  bookAppointmentEndPoint : '/api/appointments/book',
  getAppointmentEndpoint: '/api/appointments/my-appointments',
  cancelAppointmentEndpoint : '/api/appointments/my-appointments',
  createAppointmentEndpoint: '/api/doctor-days/doctor',
  getBookedAppoinmentEndpoint : 'api/appointments/my-appointments-doctor?status=BOOKED',

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