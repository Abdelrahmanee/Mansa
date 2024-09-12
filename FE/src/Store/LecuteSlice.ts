import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LectureByID } from "../utils/types";

const initialState: LectureByID = {
  data: {
    _id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    duration: 0,
    logo: "",
    pdfs: [],
    price: 0,
    rating: 0,
    teacherId: "",
    videos: [],
  },
  status: "",
};

export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setLecture: (state, action: PayloadAction<LectureByID>) => {
      state.status = action.payload.status;
      state.data = action.payload.data;
    },
  },
});

export const { setLecture } = lectureSlice.actions;
export default lectureSlice.reducer;
