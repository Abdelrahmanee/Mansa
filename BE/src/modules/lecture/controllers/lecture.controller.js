import { AppError, catchAsyncError } from "../../../utilies/error.js";
import { lectureModel } from "../models/lecture.model.js";
import { v2 as cloudinary } from 'cloudinary';
import LectureService from "../service/lecture.service.js";
import mongoose from "mongoose";
import lectureService from "../service/lecture.service.js";
import { generateUniqueCode } from "../../../utilies/generateUniqueCode.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { deleteFileFromDisk } from "../../../utilies/removeFile.js";


// Get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const addLecture = catchAsyncError(async (req, res, next) => {

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.user) throw new AppError("you must be logged in", 498)
    // Create the lecture document without the logo first
    const lectureData = { ...req.body, teacherId: req.user._id };
    const lecture = await lectureService.createLecture(lectureData, session);

    // if (!req.file) throw new AppError('No file uploaded', 400)
    const { logoURL } = await LectureService.uploadLogo(req.files.logo[0], lecture._id)

    if (!logoURL) throw new AppError('Logo not found', 404)

    // Update the lecture document with the logo URL if the upload was successful
    lecture.logo = logoURL;

    // Upload videos if provided
    if (req.files && req.files.videos) {
      const videoPromises = req.files.videos.map(file =>
        LectureService.uploadVideo(file, lecture._id)
      );
      const videoUploadResults = await Promise.all(videoPromises);

      // Extract video URLs and update the lecture
      const videoURLs = videoUploadResults.map(result => result.videoURL);
      lecture.videos = videoURLs;

      req.files.videos.forEach(file => {
        const filePath = path.join(__dirname, '..', file.path);
        console.log(filePath);

        deleteFileFromDisk(filePath);
      });
    }

    // Upload PDFs if provided
    if (req.files && req.files.pdfs) {
      const pdfPromises = req.files.pdfs.map(file =>
        LectureService.uploadPDF(file, lecture._id)
      );
      const pdfUploadResults = await Promise.all(pdfPromises);

      // Extract PDF URLs and update the lecture
      const pdfURLs = pdfUploadResults.map(result => result.PDFURL);

      lecture.pdfs = pdfURLs;

      req.files.pdfs.forEach(file => {
        const filePath = path.join(__dirname, '..', file.path);
        deleteFileFromDisk(filePath);
      });
    }
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

    if (!lecture) throw new AppError('lecture not found', 404)

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


export const deleteLecture = catchAsyncError((req, res, next) => {

  const { lectureId } = req.params
})



export const accessLecture = catchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.user._id
    const { lectureId, code } = req.body;



    const studentLecture = await lectureService.hasAccess({ studentId, lectureId })

    if (studentLecture) {
      // If the student has permanent access, allow access
      if (studentLecture.hasPermanentAccess) {
        return res.status(200).json({ status: "success", message: "Already have Access ." });
      }
    }


    // If the student doesn't have permanent access, then require the code
    if (!code) {
      // If no code is provided, return an error since they don't have access
      return res.status(400).json({ status: "fail", message: "Access code is required." });
    }

    // If the code is generated
    const codeIsGenerated = await lectureService.checkCodeIsGenerated({ lectureId, code })

    if (!codeIsGenerated) {
      return res.status(403).json({ status: "fail", message: "Invalid code" });
    }
    // If the studentLecture does not exist or permanent access is not granted, verify the code
    const codeIsNotAccessed = await lectureService.checkCodeIsAccessed({ lectureId, code, isUsed: false })

    if (!codeIsNotAccessed) {
      return res.status(403).json({ status: "fail", message: "Code is already Used" });
    }

    // Mark the code as used
    codeIsNotAccessed.isUsed = true;
    await codeIsNotAccessed.save();

    // Record the student's access and grant permanent access
    if (!studentLecture) {
      const data = {
        studentId,
        lectureId,
        accessCodeId: codeIsNotAccessed._id,
        hasPermanentAccess: true,
      }

      await lectureService.linkStudentWithLecture(data);
    } else {
      await lectureService.updateStudentLecture({ studentLecture, accessCodeID: codeIsNotAccessed._id });
    }

    return res.status(200).json({ message: "Access Approved." });



  } catch (error) {
    return next(new AppError(error.message, 500))
  }

})
