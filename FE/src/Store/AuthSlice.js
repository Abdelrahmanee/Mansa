import { createSlice } from "@reduxjs/toolkit";

const authSlice  = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  }
})


export const {setUser , clearUser} = authSlice.actions;
export default authSlice.reducer;