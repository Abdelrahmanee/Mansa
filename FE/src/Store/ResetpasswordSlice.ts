import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResetPasswordState {
  identifier: string;
}

const initialState: ResetPasswordState = {
  identifier: "",
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setIdentifier: (state, action: PayloadAction<ResetPasswordState>) => {
      state.identifier = action.payload.identifier;
    },
    clearIdentifier: (state) => {
      state.identifier = "";
    }
  },
});

export const { setIdentifier , clearIdentifier } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
