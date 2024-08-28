






import { lectureModel } from "../models/lecture.model.js";
import { videoModel } from "../models/videos.model.js";
import cloudinary from 'cloudinary';
import { v4 as uuid4 } from 'uuid';
class LectureService {
    
    async uploadLogo(logo){
        console.log(logo);
        
        
        if (!logo) return { profilePictureUrl: '', publicId: '' };

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
            profilePictureUrl: uploadResponse.secure_url,
            publicId: uploadResponse.public_id
        };
    }

    
    async uploadPDFs(pdfs){

    }
    async uploadVideos(videos){
        
    }
    async addPDFs(pdfs){
        return await videoModel.create([...pdfs])

    }
    async addVidoes(videos){
        return await videoModel.create([...videos])
    }
    async createLecture(data){
        return await lectureModel.create(data)
    }
    
}
export default new LectureService();