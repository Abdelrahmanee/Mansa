import { lectureModel } from "../models/lecture.model.js";
import { LectureAccessCodeModel } from "../models/LectureAccessCode.model .js";
import cloudinary from 'cloudinary';
import { v4 as uuid4 } from 'uuid';
import { StudentLectureModel } from "../models/StudentLecture.model.js";
import videoRepository from "../repos/video.repository.js";
import pdfRepository from "../repos/pdf.repository.js";
import { AppError } from "../../../utilies/error.js";
import logoRepository from "../repos/logo.repository.js";
import lectureRepository from "../repos/lecture.repository.js";
import { userModel } from "../../user/models/user.model.js";


class LectureService {

    async uploadLogo(logo, lectureId) {

        if (!logo) return { logoURL: '', publicId: '' };

        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                { folder: 'Mansa/Lectures', public_id: uuid4() },
                async (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                    const logoData = {
                        lectureId,
                        publicId: result.public_id,
                        logoURL: result.secure_url,
                    }
                    await logoRepository.saveLogo(logoData)
                }
            );

            stream.end(logo.buffer);
        });


        return {
            logoURL: uploadResponse.secure_url,
            publicId: uploadResponse.public_id
        };
    }
    // Upload Video
    async uploadVideo(secure_url, lectureId, public_id) {
        try {
            const videoData = {
                lectureId,
                publicId: public_id,
                videoURL: secure_url,
            }
            const video = await videoRepository.saveVideo(videoData)
            return {
                videoURL: secure_url,
                publicId: public_id,
                video
            };
        } catch (error) {
            throw new AppError('Video upload failed', 500);
        }
    }

    // Upload PDF
    async uploadPDF(secure_url, lectureId, public_id) {
        try {
            const pdfData = {
                lectureId,
                PDFURL: secure_url,
                publicId: public_id
            }
            const pdf = await pdfRepository.savePdf(pdfData)
            console.log({
                PDFURL: secure_url,
                publicId: public_id,
                pdf
            })
            return {
                PDFURL: secure_url,
                publicId: public_id,
                pdf
            };
        } catch (error) {

            throw new AppError('PDF upload failed', 500);
        }
    }

    async getLectureByTitle(title) {
        return await lectureRepository.getLectureByTitle(title)
    }

    async getLectureWithDescription(description) {
        return await lectureRepository.getLectureWithDescription(description)
    }

    async getLecture(id) {
        return await lectureRepository.getLectureInfo(id)
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


    async checkCodeIsGenerated({ lectureId, code }) {
        return await LectureAccessCodeModel.findOne({ code, lectureId })
    }
    async checkCodeIsAccessed({ lectureId, code, isUsed }) {
        return await LectureAccessCodeModel.findOne({ lectureId, code, isUsed: false })
    }


    async linkStudentWithLecture({ studentId, lectureId, accessCodeId, hasPermanentAccess }) {
        await StudentLectureModel.create({ studentId, lectureId, accessCodeId, hasPermanentAccess, });
        await userModel.findByIdAndUpdate(
            studentId,
            { $push: { lectures: { lectureId } } }
        );

    }


    async updateStudentLecture({ studentLecture, accessCodeID }) {
        studentLecture.hasPermanentAccess = true;
        studentLecture.accessCodeId = accessCodeID;
        await studentLecture.save();
    }


    async getLecture(id) {
        return await lectureModel.findOne({ _id: id })
    }

    async getAllLectures() {
        return lectureRepository.getAllLectures()
    }

    async getAllAccessCode() {
        return await LectureAccessCodeModel.find({})
    }

    async deleteAccessCode(accessCodeId) {

        if (!accessCodeId) throw new AppError("Access Code ID is required", 400)

        const accessCode = await lectureRepository.getAccessCode(accessCodeId)

        if (!accessCode) throw new AppError("Access Code not found", 404)

        if (accessCode.isUsed) throw new AppError("Access Code already used and can't be deleted", 400)

        return await lectureRepository.deleteAccessCode(accessCodeId)
    }


    async deleteResource(lectureId, repository, resourceName) {
        const resources = await repository.findByLectureId(lectureId);
        if (resources && resources.length > 0) {
            await Promise.all(resources.map(async (resource) => {
                if (resource.publicId) {
                    if (resourceName === 'Video') {
                        const result = await cloudinary.v2.uploader.destroy(resource.publicId, { resource_type: 'video' });
                    } else {
                        const result = await cloudinary.v2.uploader.destroy(resource.publicId);
                    }
                }
            }));
            await repository.deleteByLectureId(lectureId);
        }
    }

    async deleteLecture(lectureId) {
        try {
            const lecture = await lectureRepository.getLectureInfo(lectureId);
            if (!lecture) {
                throw new AppError("Lecture not found", 404);
            }

            // Delete associated resources
            await this.deleteResource(lectureId, logoRepository, 'Logo');
            await this.deleteResource(lectureId, videoRepository, 'Video');
            await this.deleteResource(lectureId, pdfRepository, 'PDF');

            // Delete access codes associated with the lecture
            await LectureAccessCodeModel.deleteMany({ lectureId });

            // Remove lecture reference from students
            await StudentLectureModel.deleteMany({ lectureId });
            await userModel.updateMany(
                { 'lectures.lectureId': lectureId },
                { $pull: { lectures: { lectureId } } }
            );

            // Finally, delete the lecture
            return await lectureRepository.deleteLecture(lectureId);
        } catch (error) {
            throw new AppError(`Error deleting lecture: ${error.message}`, 500);
        }
    }
}
export default new LectureService();