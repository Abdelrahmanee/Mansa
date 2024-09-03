import { lectureModel } from "../models/lecture.model.js";



class LectureRepository {

    async deleteLecture(lectureId){
        return await lectureModel.findByIdAndDelete(lectureId)
    }
    async getLectureInfo(lectureId){
        return await lectureModel.findById(lectureId)
    }


}



export default new LectureRepository();