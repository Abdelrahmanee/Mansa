import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    pdf: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }

}, { timestamps: true }
)


export const pdfModel = mongoose.model('Pdf', schema)