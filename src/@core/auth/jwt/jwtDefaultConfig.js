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
 doctorStatusCheckEndpoint : '/api/doctors/get-status',
  updateDpctorEndPoint: '/api/doctors/create',
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
  getStatusWalkerToClientKyc : '/api/walker-kyc/get-status',
  getAllWalkerByDistance : '/walkerkyc/nearby?latitude={latitude}&longitude={longitude}&maxDistance={Distance}&page=0&size=10',


  groomerToClientKyc : '/api/groomer-kyc',
  getStatusGroomerToClient : '/api/groomer-kyc/get-status',
  getAllGroomerByDistanceEndpoint : '/groomerkyc/nearby?latitude={latitude}&longitude={longitude}&maxDistance={Distance}&page={page}&size=10',

  behaviouristToClientKyc : '/api/behaviorist-kyc',
  getStatusBehaviouristToClient : '/api/behaviorist-kyc/get-status',
  getAllBehaviouristByDistance : '/behaviouristkyc/nearby?latitude={latitude}&longitude={longitude}&maxDistance={Distance}&page={page}&size=10',


  //stripe verify payment
  // verifyAppointmentPaymentEndpoint: '/api/appointments/verify-payment/{SessionId}',
  verifyAppointmentPaymentEndpoint: '{UserTypeEndpoint}/verify-payment/{SessionId}',
  dummyBook : '/api/appointments/dummy-book',

  // redirectToStripe : '/api/stripe/endpoint'
    

  // service Provider Endpoint
  getStatusProvider : "/service-provider/status",

  // groomer 
  createServicesEndpoint : '/groomer/appointment/services',
  createDaysForGroomerEndpoint : '/groomer/appointment/days',
  getGroomerAppointment : '/groomer/appointment/my-appointments',
  //groomer-client side
  GetAvailableSlotAndService : '/groomer/appointment/{GroomerUid}/availability?date={date}',
  getGroomerAvailableDays: '/groomer/appointment/{groomerUid}/available-days',
                         // /groomer/appointment/{groomerUid}/available-days
  //walker 
  createDayAndSlotEndpoint : '/api/pet-walker-days/days',
  getWalkerBookedAppointment : '/api/walker-appointments/my-appointments',
  //walker-client side
  getWalkerDaysEndPoint : '/api/pet-walker-days/pet-walker/{Uid}',
  bookWalkerAppointment : '/api/walker-appointments/book',

  //behaviourist
  createBehaviouristDayAndSlot : '/api/behaviourist-days/days',
getAvailableWalkerslotEndPoint: '/api/walker-appointments/available-slots?petWalkerUid={walkerUid}&petWalkerDayUid={dayUid}&date={date}',  
//behaviourist-client side 
getAvailableBehaviouristDay : '/api/behaviourist-days/service-provider/{Uid}',
getAvailableSlotBehaviourist : '/api/behaviourist-appointments/available-slots?serviceProviderUid={providerUid}&behaviouristDayUid={dayUid}&date={date}',
bookBehaviouristAppointment : '/api/behaviourist-appointments/book',
getBehaviBookedAppointment : '/api/behaviourist-appointments/my-appointments',
getWalkerBookedAppointment : '/api/walker-appointments/my-appointments',
getGroomerBookedAppointment : '/groomer/appointment/my-appointments',
bookGroomerAppointment : '/groomer/appointment/book',

getGroomerBookedAppointmnetforClient:'/groomer/appointment/user/appointments',
getMetavetChargesEndpoint : '/metavet-charge/{userType}'

}