// ** Auth Endpoints
export default {

  /*
  * user EendPoints 
  */
  registerEndpoint: '/auth/register',
  loginEndpoint: '/auth/login',
  otpVerifyEndPoint: '/auth/otp/verify-otp',

  /*
  * Doctor EndPoints
  */
 updateDpctorEndPoint: '/auth/doctor/create',
 getDoctorByIdEndPoint : 'api/doctors',
 getAllDoctorEndPoint : 'auth/doctors/available',
 getDoctorBySpecialityEndPoint:'api/doctors/specialization',
 getAllSpecializationEndPoint : 'api/doctors/specializations/available',
 getActiveSpecializationEndPoint : 'api/doctors/specializations/active',
 createPets:'/api/pets/create',
getAllPets:'/api/pets/owner/',



  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh',
}
