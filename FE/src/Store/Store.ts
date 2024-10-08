import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import lectureSlice from "./LecuteSlice";
import ResetpasswordSlice from "./ResetpasswordSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lecture: lectureSlice,
    reserPassword: ResetpasswordSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
