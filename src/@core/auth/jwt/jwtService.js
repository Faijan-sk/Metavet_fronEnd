  import axios from 'axios'
  import jwtDefaultConfig from './jwtDefaultConfig'
// import jwt from '../../../enpoints/jwt/useJwt'

  // PRODUCTION GCP Configuration - PORT 8080 add kiya gaya hai
  // axios.defaults.baseURL = 'http://192.168.29.199:8080/'
  axios.defaults.baseURL = 'http://34.170.68.167:8080/'
  // axios.defaults.baseURL = 'http://192.168.1.15:8080/'

  export default class JwtService {
    //service file
    
    // ** jwtConfig <= Will be used by this service
    jwtConfig = { ...jwtDefaultConfig }

    // ** For Refreshing Token 
    isAlreadyFetchingAccessToken = false

    // ** For Refreshing Token
    subscribers = []

    constructor(jwtOverrideConfig) {
      this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

      // ** Request Interceptor
      axios.interceptors.request.use(
        (config) => {
          console.log('Making request to:', config.url);

          // ** Get token from localStorage
          const accessToken = this.getToken()

          // ** If token is present add it to request's Authorization Header
          if (accessToken) {
            // ** eslint-disable-next-line no-param-reassign
            config.headers = config.headers || {}
            config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
            console.log('Added Authorization header');
          } else {
            console.log('No access token found');
          }

          // IMPORTANT:
          // - If request data is FormData, DO NOT set Content-Type (let axios/browser set multipart boundary)
          // - For non-FormData requests, default to application/json if not provided
          if (config.data instanceof FormData) {
            // ensure we do not force Content-Type
            if (config.headers && config.headers['Content-Type']) {
              delete config.headers['Content-Type']
            }
          } else {
            config.headers = config.headers || {}
            config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
          }

          // DO NOT set Access-Control-Allow-Origin from client side
          if (config.headers && config.headers['Access-Control-Allow-Origin']) {
            delete config.headers['Access-Control-Allow-Origin']
          }

          return config
        },
        (error) => {
          console.error('Request interceptor error:', error);
          return Promise.reject(error);
        }
      )

      // ** Response Interceptor
      axios.interceptors.response.use(
        (response) => {
          console.log('Response received:', response.status);
          return response;
        },
        (error) => {
          console.error('Response error:', error.response?.status, error.response?.data);
          
          const { config, response } = error
          const originalRequest = config

          // Handle 401 Unauthorized responses (example)
         if (response && response.status === 401) {
  console.log('Unauthorized access - redirecting to login');

  // clear auth data
  localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
  localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);

  // prevent infinite loop (important)
  if (!originalRequest._retry) {
    originalRequest._retry = true;
    window.location.href = '/Signin';
  }
}

          if (!response) {
            console.error('Network error - check if backend is running');
          }
          
          return Promise.reject(error)
        }
      )
    }

    onAccessTokenFetched(accessToken) {
      this.subscribers = this.subscribers.filter((callback) =>
        callback(accessToken)
      )
    }

    
    addSubscriber(callback) {
      this.subscribers.push(callback)
    }

    getToken() {
      return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
    }

    getRefreshToken() {
      return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
    }

    setToken(value) {
      localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
    }

    setRefreshToken(value) {
      localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
    }

    refreshToken() {
      return axios.post(this.jwtConfig.refreshEndpoint, {
        refreshToken: this.getRefreshToken(),
      })
    }

    /*
    *     User Services
    */
    register(...args) {
      console.log('Calling register API');
      return axios.post(this.jwtConfig.registerEndpoint, ...args)
    }



    verifyOtp(otpData, token) {
      console.log('Calling verify OTP API');
      return axios.post(`${this.jwtConfig.otpVerifyEndPoint}/${token}`, otpData);
    }

    login(...args) {
      console.log('Calling login API');
      return axios.post(this.jwtConfig.loginEndpoint, ...args)
    }

    /*
    *   Doctor Services
    */
    createDoctor(payload) {
      console.log('Calling create doctor API');
      return axios.post(this.jwtConfig.updateDpctorEndPoint, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.jwtConfig.storageTokenKeyName)}`,
          "Content-Type": "application/json",
        },
      });
    }

    getDoctorSatus(){
      return axios.get(this.jwtConfig.doctorStatusCheckEndpoint)
    }

    getAllDoctors() {
      return axios.get(this.jwtConfig.getAllDoctorEndPoint);
    }

    getDoctorById(doctorId) {
      console.log('Calling get doctor by ID API');
      return axios.get(`${this.jwtConfig.getDoctorByIdEndPoint}/${doctorId}`)
    }

    createPets(...args) {
      console.log('Calling create pets API');
      return axios.post(this.jwtConfig.createPets, ...args)
    }
    
    getAllPets(userId) {
      console.log('Calling get all pets API');
      return axios.get(`${this.jwtConfig.getAllPets}${userId}`)
    }

    getUserByMobile(mobileNumber) {
      console.log('Calling get user by mobile API');
      return axios.get(`${this.jwtConfig.getUserByMobileEndPoint}`, {
        params: { phoneNumber: mobileNumber },
      });
    }

    /*
    *  Pet Services 
    */
    createServiceProvider(...args){
      return axios.post(this.jwtConfig.serviceProviderCreateEndpoint, ...args)
    }
    
    getAllPetsByOwner() {
      return axios.get(`${this.jwtConfig.getAllPetsByOwnerEndpoint}`);
    }

    createPet(payload) {
      return axios.post(this.jwtConfig.addPetEndPoint, payload);
    }

    createPetWithoutImage(...args) {
      return axios.post(this.jwtConfig.addPetEndpointwithoutImage, ...args);
    }

    updatePet(petId, ...payload) {
      console.log('Calling update pet API');
      return axios.put(`${this.jwtConfig.updatePetEndPoint}${petId}`, ...payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.jwtConfig.storageTokenKeyName)}`,
          "Content-Type": "application/json",
        },
      });
    }

    deletePet(petId) {
      console.log('Calling delete pet API');
      return axios.delete(`${this.jwtConfig.deletePetEndPoint}${petId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.jwtConfig.storageTokenKeyName)}`,
        },
      });
    }

    /*
    * Appointment Methods 
    */
    getDoctorByDay(day) {
      return axios.get(`${this.jwtConfig.getDoctorByDayEndpoint}/${day}/details`);
    }

    getAvailableSlots(doctorId, doctorDayId, date) {
      console.log('Calling get available slots API');
      return axios.get(this.jwtConfig.fetchAvailableSlotByDoctorEndpoint, {
        params: {
          doctorId: doctorId,
          doctorDayId: doctorDayId,
          date: date
        }
      });
    }

    getDoctorDayId(doctorId, day) {
      console.log('Calling get doctor day ID API');
      return axios.get(`${this.jwtConfig.fetDoctorDayIdByDoctorAndDay}/${doctorId}/day/${day}/id`);
    }

    bookAppointment(...payload) {
      console.log('Calling book appointment API with payload:', payload);
      return axios.post(this.jwtConfig.bookAppointmentEndPoint, ...payload);
    }

    getMyAppointments() {
      console.log('Calling get my appointments API');
      return axios.get(this.jwtConfig.getAppointmentEndpoint);
    }

    cancelAppointment(id) {
      console.log('Calling cancel appointment API');
      return axios.delete(`${this.jwtConfig.cancelAppointmentEndpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.jwtConfig.storageTokenKeyName)}`,
        },
      });
    }


createAppintment(payload){
  return axios.post(this.jwtConfig.createAppointmentEndpoint , payload)
}


    getBookedAppointment(){
      console.log('Calling get my appointments API');
      return axios.get(this.jwtConfig.getBookedAppoinmentEndpoint);
    }

    metavetToWalkerKyc(formData) {
      if (!(formData instanceof FormData)) {
        console.warn('metavetToWalkerKyc expects a FormData instance - sending as-is')
      }
      // No Content-Type header here; interceptor handles FormData case
      return axios.post(this.jwtConfig.metavetToWalkerKycEndpoint, formData)
    }

    metavetToGroomerKyc(formData) {
      if (!(formData instanceof FormData)) {
        console.warn('metavetToGroomerKyc expects a FormData instance - sending as-is')
      }
      // No Content-Type header here; interceptor handles FormData case
      return axios.post(this.jwtConfig.metavetToGroomerKyCEndpoint, formData)
    }

    metavetToBehaviouristKyc(formData) {
      if (!(formData instanceof FormData)) {
        console.warn('metavetToBehaviourist expects a FormData instance - sending as-is')
      }
      // No Content-Type header here; interceptor handles FormData case
      return axios.post(this.jwtConfig.metavetToBehaviouristKycEndPoint, formData)
    }

    walkerToClientKyc(formData) {
      if (!(formData instanceof FormData)) {
        console.warn('walker to client expects a FormData instance - sending as-is')
      }
      // No Content-Type header here; interceptor handles FormData case
      return axios.post(this.jwtConfig.walkerToClientKyc, formData)
    }

  groomerToClientKyc(formData) {
      if (!(formData instanceof FormData)) {
        console.warn('groomer to client kyc expect a data instance')
      }
      // No Content-Type header here; interceptor handles FormData case
      return axios.post(this.jwtConfig.groomerToClientKyc, formData)
    }

    behaviouristToClientKyc(formData) {
      if (!(formData instanceof FormData)) {
        console.warn('behaviourist to client kyc expect a data instance')
      }
      // No Content-Type header here; interceptor handles FormData case
      return axios.post(this.jwtConfig.behaviouristToClientKyc, formData)
    }

    getDoctorOwnDays(){
      return axios.get(this.jwtConfig.getOwnDays)
    }

    getAvailableSlotByDoctortoDate(date){
      return axios.get(this.jwtConfig.getDoctorSlotByDate.replace("{date}" , date))
    }

    bookOfflineAppointment(args){
      return axios.post(this.jwtConfig.bookOfflineAppointment,args)
    }

    getAllDoctorwithDistance(longittude, lattitude, distance) {
  let url = this.jwtConfig.getDoctorWithDistanceEndpoint
    .replace("{lattitude}", lattitude)
    .replace("{longittude}", longittude)
    .replace("{distance}", distance);

  return axios.get(url);
}

getDoctorDaysFromDistance(doctorId){
  return axios.get(this.jwtConfig.getDoctorDaysFromDistance.replace("{doctorId}",doctorId))
}
getSlotByDoctor(doctorId, doctorDayId,date){
 return axios.get(this.jwtConfig.getSlotByDoctorEndpoint.replace("{date}",date)
                                                  .replace("{doctorId}",doctorId)
                                                  .replace("{doctorDayId}",doctorDayId))
}


// getKycStatusGroomerToClinet(){
//   return axios.get(this.jwtConfig.getStatusGroomerToClient)
// }




getKycStatusBehaviouristToClinet(){
  return axios.get(this.jwtConfig.getStatusBehaviouristToClient)
}

getStatusWalkerToClientKyc(){
  return axios.get(this.jwtConfig.getStatusWalkerToClientKyc)
}



getStatusGroomerToClient(){
  return axios.get(this.jwtConfig.getStatusGroomerToClient)
}

getAllGroomerByDistance(latitude, longitude, page, distance) {
  return axios.get(
    this.jwtConfig.getAllGroomerByDistanceEndpoint
      .replace("{Distance}", distance)
      .replace("{page}", page)
      .replace("{latitude}", latitude)
      .replace("{longitude}", longitude)
  );
}

getAllWalkerByDistance(latitude, longitude, page, distance) {
  return axios.get(
    this.jwtConfig.getAllWalkerByDistance
      .replace("{Distance}", distance)
      .replace("{page}", page)
      .replace("{latitude}", latitude)
      .replace("{longitude}", longitude)
  );
}

getAllBehaviouristByDistance(latitude, longitude, page, distance) {
  return axios.get(
    this.jwtConfig.getAllBehaviouristByDistance
      .replace("{Distance}", distance)
      .replace("{page}", page)
      .replace("{latitude}", latitude)
      .replace("{longitude}", longitude)
  );
}


veriFyAppointmentPayment(SessionId,UserTypeEndpoint){
  return axios.get(this.jwtConfig.verifyAppointmentPaymentEndpoint.replace('{UserTypeEndpoint}', UserTypeEndpoint)
    .replace('{SessionId}',SessionId));
}
 

dummyAppointmentBook(...args){
  return axios.post(this.jwtConfig.dummyBook, ...args)
}


//service Provider 

getServiceProviderStatus(){
  return axios.get(this.jwtConfig.getStatusProvider)
}


//groomer 
createServices(...args){
  return axios.post(this.jwtConfig.createServicesEndpoint, ...args)
}

createDaysForGroomer(...args){
  return axios.post(this.jwtConfig.createDaysForGroomerEndpoint, ...args)
}

getGroomerAppointment(){
  return axios.get(this.jwtConfig.getGroomerAppointment)
}



// walker 
createDayAndSlot(...args){
  return axios.post(this.jwtConfig.createDayAndSlotEndpoint,...args)
}

getWalkerBookedAppointment(){
  return axios.get(this.jwtConfig.getWalkerBookedAppointment)
}


//Behaviourst 
createBehaviouristSlotAndDay(...args){
  return axios.post(this.jwtConfig.createBehaviouristDayAndSlot, ...args)
}

getWalkerAvailableDays(walkerUid){
  return axios.get(this.jwtConfig.getWalkerDaysEndPoint.replace('{Uid}',walkerUid))
}


getWalkerAvailableSlot(date, dayUid, walkerUid) {
    return axios.get(
        this.jwtConfig.getAvailableWalkerslotEndPoint
            .replace('{walkerUid}', walkerUid)
            .replace('{dayUid}', dayUid)
            .replace('{date}', date)
    )
}

getBehaviouristAvailableDay(uid){
  return axios.get(this.jwtConfig.getAvailableBehaviouristDay.replace('{Uid}', uid))
}


getBehaviouristAvailableSlot(providerUid, dayUid, date) {
  return axios.get(
    this.jwtConfig.getAvailableSlotBehaviourist
      .replace('{providerUid}', providerUid)
      .replace('{dayUid}', dayUid)   // ✅ Yeh sahi hai
      .replace('{date}', date)
  )
}




getAvailableGroomerDays(groomerUid) {
  return axios.get(this.jwtConfig.getGroomerAvailableDays.replace('{groomerUid}', groomerUid))
}
getGroomerAvailableSlotServices(date , groomerUid){

  return axios.get(this.jwtConfig.GetAvailableSlotAndService.replace('{date}', date)
                                                            .replace('{GroomerUid}', groomerUid))
}


bookBehaviouristAppointment(payload){
  return axios.post(this.jwtConfig.bookBehaviouristAppointment,payload)
}


getBehavioBookedAppoin(){
  return axios.get(this.jwtConfig.getBehaviBookedAppointment)
}

}
