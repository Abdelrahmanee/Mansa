






import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }

}, { timestamps: true }
)


export const videoModel = mongoose.model('Video', schema)