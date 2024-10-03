


import Logo from "../models/logo.model.js";

class LogoRepository {
    async saveLogo(logoData){
        const logo = new Logo(logoData);
        await logo.save();
        return logo
    }
    async findByLectureId(lectureId){
        return await Logo.find({lectureId})
    }
    async findLogoById(logoId){
        return await Logo.findById(logoId)
    }
    async deleteLogoByPublicId(publicId){
        return await Logo.findOneAndDelete({publicId})
    }


    async deleteByLectureId(lectureId){
        return await Logo.findOneAndDelete({lectureId})
    }
}
export default new LogoRepository();