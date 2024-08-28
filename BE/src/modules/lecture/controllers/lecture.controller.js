import { AppError, catchAsyncError } from "../../../utilies/error.js";
import { lectureModel } from "../models/lecture.model.js";
import { videoModel } from "../models/videos.model.js";
import { v2 as cloudinary } from 'cloudinary';
import LectureService from "../service/lecture.service.js";



export const addLecture = catchAsyncError(async (req, res, next) => {



  console.log(req.files.logo[0].buffer);
  try {
    const { logo } = req.files
    const { profilePictureUrl, publicId } = await LectureService.uploadLogo(logo[0])
    console.log({ profilePictureUrl, publicId });

  } catch (error) {
    console.log(error);

  }

  // console.log(req.files);

  // let { code } = req.body
  // const { logo, videos, pdfs } = req.files
  // console.log(pdfs.length);


  // if (logo) {
  //   try {
  //     const uploadedResponse = await cloudinary.uploader.upload(logo); // رفع الصورة
  //     logo = uploadedResponse.secure_url;
  //   } catch (error) {
  //     return res.status(400).json({ error: "Can't upload image" });
  //   }
  // }
  // if (pdfs) {
  //   try {
  //     const uploadPromises = pdfs.map(async (pdf) => {
  //       console.log(pdf);
  //       const uploadedResponse = await cloudinary.uploader.upload(pdf.originalname); // Upload the file
  //       return { ...pdf, secure_url: uploadedResponse.secure_url , public_id : uploadedResponse.public_id  }; // Return the pdf with the secure_url
  //     });

  //     const uploadedPdfs = await Promise.all(uploadPromises); // Wait for all uploads to complete
  //     console.log(uploadedPdfs);
  //     return res.status(200).json({ message: 'Files uploaded successfully', pdfs: uploadedPdfs });

  //   } catch (error) {
  //     return res.status(400).json({ error: "Can't upload image" });
  //   }
  // }
  // if (videos) {
  //   try {
  //     const uploadedResponse = await cloudinary.uploader.upload(video, {
  //       resource_type: "video",
  //     });
  //     video = uploadedResponse.secure_url;
  //     const public_id = uploadedResponse.public_id;
  //   } catch (error) {
  //     console.log(error.message);Can't upload video" });
  //   }
  //     return res.status(400).json({ error: "
  // }




  // const addedVideo = await videoModel.create({ video, public_id })
  // const lecture = await lectureModel.create({ code, video: addedVideo, logo, pdf })

  res.status(200).json({
    status: "success",
    message: 'Lecture is added successfully',
    data: "zzz"
  });
});
export const getAllLectures = catchAsyncError(async (req, res, next) => {

  const lectures = await lectureModel.find()

  res.status(200).json({
    status: "success",
    data: lectures
  });
});
