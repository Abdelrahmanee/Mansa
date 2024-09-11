import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";


interface authState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: authState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  isAuthenticated: !!localStorage.getItem("user"),
};


export const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  }
});


export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
