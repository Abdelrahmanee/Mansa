


import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    code: {
        type: String,
        required:true
    },
    pdf: {
        type: String,
        required:true
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref:'Video',
        required:true
    },
    logo: {
        type: String,
    }
}, { timestamps: true }
)


export const lectureModel = mongoose.model('Lecture', schema)