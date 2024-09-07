import { authenticate, authorize } from "../../auth/middelwares/auth.middelware.js";

import { Router } from "express";
import { validate } from "../../../middelwares/validation.middelware.js";
import { ROLES } from "../../../utilies/enums.js";
import { uploadMultiple, uploadSingle } from "../../../middelwares/upload.middelware.js";
import { validateFields } from "../../../middelwares/validateFields.js";
import { addLectureSchema, deleteLectureSchema, generateAccessCode, getLectureByIdSchema, lectureAccessRequest } from "../validations/lecture.validation.js";
import { accessLecture, addLecture, deleteLecture, generateLectureCode, getLectureById } from "../controllers/lecture.controller.js";


const router = Router()




router.get('/getLectureByID', authenticate, validate(getLectureByIdSchema), getLectureById)

router.post('/add_lecture',
    authenticate,
    authorize('teacher'),
    // uploadSingle('logo'),
    uploadMultiple([{ name: 'logo', maxCount: 1 }, { name: 'videos', maxCount: 10 }, { name: 'pdfs', maxCount: 10 }]),
    validate(addLectureSchema),
    addLecture
)
router.post('/delete_lecture',
    authenticate,
    authorize('teacher'),
    validate(deleteLectureSchema),
    deleteLecture
)

router.post('/generate_Access_code',
    authenticate,
    authorize('teacher'),
    validate(generateAccessCode),
    generateLectureCode
)


router.post('/lecture_access_request',
    authenticate,
    authorize('teacher', 'student'),
    validate(lectureAccessRequest),
    accessLecture
)



export default router

