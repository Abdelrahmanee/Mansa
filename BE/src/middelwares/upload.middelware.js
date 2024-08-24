import multer from 'multer';

import { AppError } from '../utilies/error.js';

// Configure Multer with memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Invalid file type. Only PDFs and images are allowed.', 403), false);
    }
};

const upload = multer({ storage, fileFilter });

export const uploadSingle = (fieldName) => {
    return upload.single(fieldName);
};
