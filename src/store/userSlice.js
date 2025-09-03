import { createSlice } from '@reduxjs/toolkit'




const initialState=()=>{
  const data=window.localStorage.getItem('userData');
  return data?JSON.parse(data):{}
}


export const userSlice = createSlice({
  name: 'user',
  initialState:{
    userData:initialState(),
    access:localStorage.getItem('accessToken'),
    refresh:localStorage.getItem('refreshToken'),
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    },
    clearUser: (state) => {
      state.data = null
    },

    handleLogin:(state,action)=>{
      state.userData=action.payload.user;
      state.access=action.payload.accessToken
      state.refresh=action.payload.refreshToken;
      localStorage.setItem('userData',JSON.stringify(action.payload));
      localStorage.setItem('access',action.payload.accessToken)
      localStorage.setItem('refresh',action.payload.refreshToken)
    },
    handleLogout:(state)=>{
      localStorage.removeItem('userData')
      state.userData={};
    }
  },
})

export const { setUser, clearUser ,handleLogin} = userSlice.actions
export default userSlice.reducer
