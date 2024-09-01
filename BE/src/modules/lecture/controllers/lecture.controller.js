import { AppError, catchAsyncError } from "../../../utilies/error.js";
import { lectureModel } from "../models/lecture.model.js";
import { videoModel } from "../models/videos.model.js";
import { v2 as cloudinary } from 'cloudinary';
import LectureService from "../service/lecture.service.js";
import mongoose from "mongoose";
import lectureService from "../service/lecture.service.js";
import { generateUniqueCode } from "../../../utilies/generateUniqueCode.js";



export const addLecture = catchAsyncError(async (req, res, next) => {

  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    if (!req.user) throw new AppError("you must be logged in", 498)

    // Create the lecture document without the logo first
    const lectureData = { ...req.body, teacherId: req.user._id };
    const lecture = await lectureService.createLecture(lectureData, session);


    if (!req.file) throw new AppError('No file uploaded', 400)

    const { logoURL, publicId } = await LectureService.uploadLogo(req.file)

    if (!logoURL) throw new AppError('Logo not found', 404)

    // Update the lecture document with the logo URL if the upload was successful
    lecture.logo = logoURL;
    await lecture.save({ session });



    // Commit the transaction if everything is successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: "success",
      message: 'Lecture is added successfully',
      data: lecture
    });

  } catch (error) {
    // If any operation fails, abort the transaction and rollback
    await session.abortTransaction();

    // Delete the lecture document if it was created but image upload failed
    if (error.message === 'Logo upload failed' && lecture) {
      await lecture.remove({ session });
    }

    session.endSession();
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }

});


export const getLectureById = catchAsyncError(async (req, res, next) => {

  const { lectureId } = req.body;

  try {

    const lecture = await lectureService.getLecture(lectureId)

    if(!lecture) throw new AppError('lecture not found', 404)

    res.status(200).json({
      status: "success",
      data: lecture
    });
  } catch (error) {
    return next(new AppError(error.message, 500))
  }

});


export const generateLectureCode = catchAsyncError(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { lectureId } = req.body
    const code = generateUniqueCode();

    if (!code) throw new AppError("Code is required", 400)

    const generatedCode = await lectureService.generateLectureCode({ lectureId, code, isUsed: false }, session, session)

    res.status(200).json({
      status: "success",
      message: 'Lecture code generated successfully',
      data: generatedCode
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(new AppError(error.message, 500))
  }

})



export const accessLecture = catchAsyncError(async (req, res, next) => {
  try {
    const { studentId } = req.user._id
    const { lectureId, code } = req.body;

    const studentLecture = await lectureService.hasAccess({ studentId, lectureId })

    if (studentLecture) {
      // If the student has permanent access, allow access
      if (studentLecture.hasPermanentAccess) {
        return res.status(200).json({ message: "Already have Access ." });
      }
    }

    // If the studentLecture does not exist or permanent access is not granted, verify the code
    const accessCode = await lectureService.getAccess({ lectureId, code, isUsed: false })

    if (!accessCode) {
      return res.status(403).json({ message: "Invalid or already used code." });
    }

    // Mark the code as used
    accessCode.isUsed = true;
    await accessCode.save();

    // Record the student's access and grant permanent access
    if (!studentLecture) {
      const data = {
        studentId,
        lectureId,
        accessCodeId: accessCode._id,
        hasPermanentAccess: true,
      }

      await lectureService.linkStudentWithLecture(data);
    } else {
      await lectureService.updateStudentLecture({ studentLecture, accessCodeID: accessCode._id });
    }

    return res.status(200).json({ message: "Access Approved." });



  } catch (error) {
    return next(new AppError(error.message, 500))
  }

})
