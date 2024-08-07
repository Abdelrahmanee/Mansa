import multer from 'multer';
import { v4 as uuid4 } from 'uuid';
import { AppError } from '../utilies/error.js';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const getUploadMiddleware = (folderName) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary.v2,
        params: {
            folder: 'Mansa', // replace with your folder name in Cloudinary
            public_id: (req, file) => uuid4(),
        },
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new AppError('Invalid file type. Only PDFs and images are allowed.', 403), false);
        }
    };

    const upload = multer({ storage, fileFilter });
    return upload;
};

export const uploadSingle = (fieldName, folderName) => {
    const upload = getUploadMiddleware(folderName);
    return upload.single(fieldName);
};

export default getUploadMiddleware;
