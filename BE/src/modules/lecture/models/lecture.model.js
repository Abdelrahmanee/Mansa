


import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    codes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        {
            type: String,
            required: true
        }
    ],
    pdf: {
        type: String,
        required: true
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    logo: {
        type: String,
    },
    subscribers: [
        { user: mongoose.Types.ObjectId },
    ]
}, { timestamps: true }
)


export const lectureModel = mongoose.model('Lecture', schema)