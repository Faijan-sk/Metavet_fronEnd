import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

// PRODUCTION GCP Configuration - PORT 8080 add kiya gaya hai
// axios.defaults.baseURL = 'http://192.168.29.200:8010/'
axios.defaults.baseURL = 'http://34.61.254.251:8080/'

// Optional: Environment-based configuration
// const API_BASE_URL = process.env.NODE_ENV === 'production' 
//   ? 'http://34.61.254.251:8080/' 
//   : 'http://localhost:8080/';
// axios.defaults.baseURL = API_BASE_URL;

export default class JwtService {
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
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          console.log('Added Authorization header');
        } else {
          console.log('No access token found');
        }
        
        // Add common headers for CORS
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = '*';
        
        return config
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => {
        console.log('Response received:', response.status);
        return response;
      },
      (error) => {
        console.error('Response error:', error.response?.status, error.response?.data);
        
        const { config, response } = error
        const originalRequest = config

        // Handle 401 Unauthorized responses
        if (response && response.status === 401) {
          console.log('Unauthorized access - redirecting to login');
          // Optional: Clear token and redirect
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('userData');
          // window.location.href = '/login';
        }
        
        // Handle network errors
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
    // Use the token passed as parameter (from Redux)
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
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
  }

  getAllDoctors() {
    console.log('Calling get all doctors API');
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
      params: { phoneNumber: mobileNumber }, // matches @RequestParam
    });
  }
}