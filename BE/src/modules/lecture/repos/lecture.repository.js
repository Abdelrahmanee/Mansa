import { lectureModel } from "../models/lecture.model.js";
import { LectureAccessCodeModel } from "../models/LectureAccessCode.model .js";



class LectureRepository {

    async deleteLecture(lectureId){
        return await lectureModel.findByIdAndDelete(lectureId)
    }
    async getLectureInfo(lectureId){
        return await lectureModel.findById(lectureId)
    }

    async getAllLectures(){
        return await lectureModel.find()
    }

    async deleteAccessCode(accessCodeId){
        return await LectureAccessCodeModel.findByIdAndDelete(accessCodeId)
    }

    async getAllAccessCode(){
        return await LectureAccessCodeModel.find()
    }


    async getAccessCode(accessCodeId){
        return await LectureAccessCodeModel.findById(accessCodeId)
    }


}



export default new LectureRepository();