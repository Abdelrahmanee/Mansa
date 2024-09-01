import { lectureModel } from "../models/lecture.model.js";
import { LectureAccessCodeModel } from "../models/LectureAccessCode.model .js";
import { pdfModel } from "../models/pdfs.js";
import { videoModel } from "../models/videos.model.js";
import cloudinary from 'cloudinary';
import { v4 as uuid4 } from 'uuid';
import { StudentLectureModel } from "../models/StudentLecture.model.js";
class LectureService {

    async uploadLogo(logo) {
        if (!logo) return { logoURL: '', publicId: '' };

        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: 'Mansa/Lectures', public_id: uuid4() },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(logo.buffer);
        });


        return {
            logoURL: uploadResponse.secure_url,
            publicId: uploadResponse.public_id
        };
    }


    async uploadPDFs(pdfs) {

    }
    async uploadVideos(videos) {

    }
    async addPDFs(pdfs) {
        return await pdfModel.create([...pdfs])

    }
    async addVidoes(videos) {
        return await videoModel.create([...videos])
    }
    async createLecture(data) {
        return await lectureModel.create(data)
    }

    async generateLectureCode(data) {
        return await LectureAccessCodeModel.create(data)
    }

    async hasAccess({ studentId, lectureId }) {
        return await StudentLectureModel.findOne({ studentId, lectureId });
    }


    async getAccess({ lectureId, code, isUsed }) {
        return await LectureAccessCodeModel.findOne({ lectureId, code, isUsed: false })
    }


    async linkStudentWithLecture({
        studentId,
        lectureId,
        accessCodeId,
        hasPermanentAccess
    }) {
        return await StudentLectureModel.create({
            studentId,
            lectureId,
            accessCodeId,
            hasPermanentAccess,
        });
    }


    async updateStudentLecture({ studentLecture, accessCodeID }) {
        studentLecture.hasPermanentAccess = true;
        studentLecture.accessCodeId = accessCodeID;
        await studentLecture.save();
    }


    async getLecture(id) {
        return await lectureModel.findOne({ _id: id })
    }
}
export default new LectureService();