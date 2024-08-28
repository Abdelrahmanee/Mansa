import { authenticate, authorize } from "../../auth/middelwares/auth.middelware.js";

import { Router } from "express";
import { validate } from "../../../middelwares/validation.middelware.js";
import { ROLES } from "../../../utilies/enums.js";
import {  uploadMultiple, uploadSingle } from "../../../middelwares/upload.middelware.js";
import { validateFields } from "../../../middelwares/validateFields.js";
import { addLectureSchema } from "../validations/lecture.validation.js";
import { addLecture, getAllLectures } from "../controllers/lecture.controller.js";


const router = Router()




router.get('/', getAllLectures)

router.post('/add_lecture',
    // uploadSingle('pdf'),
    // validate(addLectureSchema),
    uploadMultiple([
        // { name: 'pdfs', maxCount: 5 },  // Single PDF for 'resume'
        { name: 'logo', maxCount: 1 },  // Single file for 'profilePicture'
        // { name: 'videos', maxCount: 10 },  // Multiple files for 'gallery'
    ]),
    addLecture)



export default router

