import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  lectureId: {
    type: mongoose.Types.ObjectId,
    ref: 'Lecture'
  },
  code: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
    default: 0
  },
  isUsed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })


export const LectureAccessCodeModel = mongoose.model('LectureAccessCode', Schema);