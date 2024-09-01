import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    teacherId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    logo: {
        type: String,
    },
    // LectureVideo: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Video'
    // },
    // LecturePdf: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Pdf'
    // }
}, { timestamps: true }
)


export const lectureModel = mongoose.model('Lecture', schema)