import { authenticate, authorize } from "../../auth/middelwares/auth.middelware.js";
import { Router } from "express";
import { validate } from "../../../middelwares/validation.middelware.js";
import { uploadMultiple } from "../../../middelwares/upload.middelware.js";
import { addLectureSchema, checkingAccess, deleteAccessCodeSchema, deleteLectureSchema, generateAccessCode, getLectureByIdSchema, lectureAccessRequest } from "../validations/lecture.validation.js";
import { addLecture, checkStudentAccess, deleteAccessCode, deleteLecture, deleteLectureVideo, generateLectureCode, getAllAccessCode, getAllLectures, getLectureById, grantStudentAccess } from "../controllers/lecture.controller.js";
import { isLectureExists } from "../middlewares/lecture.middleware.js";
import { ROLES } from "../../../utilies/enums.js";


const router = Router()




router.get('/getAllAccessCode', authenticate, authorize(ROLES.TEACHER , ROLES.ADMIN), getAllAccessCode)
router.get('/getLectureByID/:lectureId', authenticate, validate(getLectureByIdSchema), getLectureById)
router.get('/', authenticate, authorize('teacher', 'student'), getAllLectures)

router.post('/add_lecture',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN),
    uploadMultiple([{ name: 'logo', maxCount: 1 }, { name: 'videos', maxCount: 10 }, { name: 'pdfs', maxCount: 10 }]),
    validate(addLectureSchema),
    addLecture
)
router.post('/delete_lecture',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN),
    validate(deleteLectureSchema),
    deleteLecture
)

router.post('/generate_Access_code',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN),
    validate(generateAccessCode),
    isLectureExists,
    generateLectureCode
)


router.post('/lecture_access_request',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN, ROLES.STUDENT),
    validate(lectureAccessRequest),
    isLectureExists,
    grantStudentAccess
)

router.post('/check_student_access',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN, ROLES.STUDENT),
    validate(checkingAccess),
    isLectureExists,
    checkStudentAccess
)

router.delete('/delete_access_code/:accessCodeId',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN),
    validate(deleteAccessCodeSchema),
    deleteAccessCode
)

router.delete('/delete_lecture/:lectureId',
    authenticate,
    authorize(ROLES.TEACHER , ROLES.ADMIN),
    validate(deleteLectureSchema),
    deleteLecture
)

router.delete('/delete_lecture_video',
    deleteLectureVideo
)


export default router

