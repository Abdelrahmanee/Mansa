
// repositories/VideoRepository.js

import Video from "../models/video.model.js";

class VideoRepository {
    // Save video to the database
    async saveVideo(videoData) {
        const video = new Video(videoData);
        await video.save();
        return video;
    }

    // Find videos by lectureId (optional, for retrieving videos later)
    async findByLectureId(lectureId) {
        return await Video.find({ lectureId });
    }

    // Find a single video by ID (optional)
    async findVideoById(videoId) {
        return await Video.findById(videoId);
    }

    // Delete a video by publicId (optional, for video deletion)
    async deleteVideoByPublicId(publicId) {
        return await Video.deleteOne({ publicId });
    }

    async deleteByLectureId(lectureId){
        return await Video.findOneAndDelete({lectureId})
    }
}

export default new VideoRepository();
